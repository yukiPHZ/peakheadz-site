// Supply an already installed playwright-core directory; no project dependency is added.
import {createRequire} from 'node:module';
import fs from 'node:fs';
import assert from 'node:assert/strict';
import path from 'node:path';
import {preview} from './preview-connect.mjs';
const require=createRequire(import.meta.url);
const {chromium}=require(path.resolve(process.argv[2]));
const server=await preview(0);
const origin=`http://127.0.0.1:${server.address().port}`;
const browser=await chromium.launch({headless:true,executablePath:process.argv[3]});
const context=await browser.newContext();
const page=await context.newPage();
const errors=[]; const external=[];
page.on('pageerror',e=>errors.push(e.message));
page.on('request',r=>{if(!r.url().startsWith(origin)) external.push(r.url());});
fs.mkdirSync('.cache/connect',{recursive:true});
const results=[];
try {
  for (const width of [320,375,390,768,1440]) {
    await page.setViewportSize({width,height:900});
    const response=await page.goto(origin+'/connect?utm_source=x&utm_medium=social&utm_campaign=profile');
    assert.equal(response.status(),200);
    await page.locator('.connect-hero img').waitFor();
    await page.locator('summary').click();
    const audit=await page.evaluate(()=>({
      width:innerWidth,scrollWidth:document.documentElement.scrollWidth,
      tooSmall:[...document.querySelectorAll('a,summary')].filter(x=>x.getClientRects().length && !x.classList.contains('skip-link')).filter(x=>x.getBoundingClientRect().height<44).map(x=>x.textContent.trim()),
      brokenImages:[...document.images].filter(x=>!x.complete || !x.naturalWidth).map(x=>x.src),
      unsafe:[...document.querySelectorAll('a[target="_blank"]')].filter(x=>!x.rel.includes('noopener')||!x.rel.includes('noreferrer')).length,
      canonical:document.querySelector('[rel="canonical"]').href,
      socialLinks:document.querySelectorAll('[data-placement="follow"]').length,
      featuredLinks:document.querySelectorAll('[data-placement="featured"]').length,
      noindex:!!document.querySelector('meta[name="robots"][content*="noindex"]')
    }));
    assert.equal(audit.scrollWidth,width); assert.deepEqual(audit.tooSmall,[]); assert.deepEqual(audit.brokenImages,[]); assert.equal(audit.unsafe,0);
    assert.equal(audit.canonical,'https://peakheadz.com/connect');assert.equal(audit.socialLinks,9);assert.equal(audit.featuredLinks,4);assert.equal(audit.noindex,false);
    await page.locator('summary').click();
    await page.screenshot({path:`.cache/connect/${width}.png`,fullPage:true});
    results.push(audit);
  }
  // Keyboard access, anchors, no-JS links, and future social-list growth.
  await page.goto(origin+'/connect'); await page.keyboard.press('Tab');
  assert.equal(await page.locator(':focus').textContent(),'本文へ進む');
  await page.keyboard.press('Enter'); assert.equal(await page.locator(':focus').getAttribute('id'),'main');
  await page.locator('a[href="#follow"]').click(); assert.match(page.url(),/#follow$/);
  await page.setViewportSize({width:320,height:900});
  await page.evaluate(()=>{const list=document.querySelector('.social-grid');for(let i=0;i<12;i++)list.append(list.firstElementChild.cloneNode(true));});
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth),320);
  const noJS=await browser.newContext({javaScriptEnabled:false});const staticPage=await noJS.newPage();
  await staticPage.goto(origin+'/connect');assert.equal(await staticPage.locator('[data-placement="follow"]').count(),9);await noJS.close();
  for(const route of ['/','/about','/information','/projects/','/orbit/']) {
    const r=await page.goto(origin+route); assert.equal(r.status(),200); assert.ok(await page.locator('h1').count());
  }
  assert.deepEqual(errors,[]);assert.deepEqual(external,[]);
  const report={results,keyboard:'PASS',anchors:'PASS',noJS:'PASS',growth:'PASS',existingPages:'PASS',pageErrors:errors,externalRequests:external};
  fs.writeFileSync('.cache/connect/browser-qa.json',JSON.stringify(report,null,2)+'\n');
  console.log(JSON.stringify(report,null,2));
} finally {await browser.close();await new Promise(r=>server.close(r));}
