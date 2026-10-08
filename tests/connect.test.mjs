import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {generate, render, validate, loadData} from '../scripts/generate-connect.mjs';
const data = loadData();
const template = fs.readFileSync(new URL('../templates/connect.html',import.meta.url),'utf8');

test('generated output is current and has unique IDs and verified public links', () => {
  validate(data);
  assert.equal(generate(),fs.readFileSync(new URL('../public/connect.html',import.meta.url),'utf8').replace(/\r\n/g,'\n'));
  assert.equal(data.links.filter(x=>x.category==='social' && x.status==='active').length,9);
  assert.equal(data.links.filter(x=>x.featured && x.status==='active').length,4);
});

test('CONNECT references the pinned central route and fixed CTA ledger IDs',()=>{
  const profile=JSON.parse(fs.readFileSync(new URL('../public/assets/market-observer/generated/peakheadz_brand.profile.json',import.meta.url),'utf8'));
  const route=profile.route_contracts['/connect'];
  assert.equal(profile.project_id,'peakheadz_brand');
  assert.equal(route.route_id,'connect');
  assert.equal(route.production_enabled,false);
  assert.equal(route.preview_enabled,false);
  assert.equal(route.reporting_enabled,false);
  assert.deepEqual(route.allowed_events,['page_view','cta_click']);
  for(const row of data.links.filter(x=>x.status==='active')) {
    assert.equal(route.cta_destinations[row.id],new URL(row.url,'https://peakheadz.com').href);
    assert.ok(profile.aliases.cta_ids.includes(row.id));
  }
  const html=generate();
  for(const name of ['runtime-package.js','market-observer.js','consent-banner.js','profile-observation.js']) assert.equal(html.split(name).length-1,1);
  assert.ok(!html.includes('/assets/js/connect.js'));
  assert.ok(!fs.existsSync(new URL('../public/assets/js/connect.js',import.meta.url)));
});

test('shared bootstrap rejects unknown ID, destination drift and unapproved group',()=>{
  const profile=JSON.parse(fs.readFileSync(new URL('../public/assets/market-observer/generated/peakheadz_brand.profile.json',import.meta.url),'utf8'));
  const script=fs.readFileSync(new URL('../public/assets/js/profile-observation.js',import.meta.url),'utf8');
  let click; let listeners=0,initializations=0; const events=[];
  const root={location:new URL('https://peakheadz.com/connect?email=private#private'),document:{body:{getAttribute:()=> 'peakheadz_brand'},addEventListener:(name,fn)=>{listeners++;click=fn;}},MarketObserverRuntimePackage:{profiles:{peakheadz_brand:profile},profileHashes:{peakheadz_brand:'fixture'}},MarketObserver:{init:()=>{initializations++;return {ok:true};},trackPageView:()=>events.push(['page_view']),track:(...args)=>events.push(args)}};
  vm.runInNewContext(script,{window:root});
  vm.runInNewContext(script,{window:root});
  assert.equal(initializations,1); assert.equal(listeners,1);
  const send=(id,href,group)=>click({target:{closest:()=>({href,getAttribute:k=>k==='data-mo-cta'?id:group})}});
  const href=profile.route_contracts['/connect'].cta_destinations.peakheadz_instagram;
  for(const args of [['unknown',href,'connect_follow'],['peakheadz_instagram',href+'?private=1','connect_follow'],['peakheadz_instagram',href,'free_input']])send(...args);
  assert.equal(events.length,1);
  send('peakheadz_instagram',href,'connect_follow');
  assert.equal(events[1][0],'cta_click');
  assert.deepEqual(Object.keys(events[1][1]).sort(),['content_type','cta_group','cta_id','route_id']);
  assert.ok(!JSON.stringify(events).includes('private'));
});
test('page-specific SEO, canonical, brand OGP and sitemap are present',()=>{
  const html=generate();
  for(const required of ['<title>PEAKHEADZ CONNECT','name="description"','property="og:title"','property="og:description"','property="og:url" content="https://peakheadz.com/connect"','property="og:image" content="https://peakheadz.com/assets/phzlogo1.png"','name="twitter:card"','rel="canonical" href="https://peakheadz.com/connect"']) assert.ok(html.includes(required),required);
  assert.ok(!html.includes('noindex'));
  assert.ok(fs.existsSync(new URL('../public/assets/phzlogo1.png',import.meta.url)));
  const sitemap=fs.readFileSync(new URL('../public/sitemap.xml',import.meta.url),'utf8');
  assert.equal((sitemap.match(/https:\/\/peakheadz.com\/connect/g)||[]).length,1);
  assert.ok(!sitemap.includes('/it-support/') && !sitemap.includes('/quiet-workflow/'));
});
test('ledger changes update output; hidden fields and planned URLs cannot leak', () => {
  const changed = structuredClone(data);
  changed.links[0].accountName = '<script>ledger update</script>';
  changed.links.push({id:'hidden_test',status:'hidden',url:'https://secret.invalid/',accountName:'SECRET_INTERNAL'});
  changed.comingNext.push({id:'planned_test',status:'planned',brand:'PEAKHEADZ',platform:'website',accountName:'承認済み企画',description:'公開準備中',category:'Other Projects',displayOrder:1,announcementApprovedAt:'2026-10-08'});
  const html = render(changed,template);
  assert.ok(html.includes('&lt;script&gt;ledger update&lt;/script&gt;'));
  assert.ok(!html.includes('secret.invalid') && !html.includes('SECRET_INTERNAL'));
  assert.match(html,/準備中/);
  changed.comingNext[0].url = 'https://secret.invalid/';
  assert.throws(()=>render(changed,template),/must not expose URLs/);
  delete changed.comingNext[0].url;
  delete changed.comingNext[0].announcementApprovedAt;
  assert.throws(()=>render(changed,template),/approval/);
});
test('unsafe links, unverified active rows and internal UTMs fail generation', () => {
  for (const url of ['javascript:alert(1)','http://example.com/','https://user:secret@example.com/','/projects/?utm_source=x','https://peakheadz.com/about?utm_campaign=test']) {
    const changed=structuredClone(data); changed.links[0].url=url;
    assert.throws(()=>validate(changed));
  }
  const changed=structuredClone(data); changed.links[0].verifiedAt=null;
  assert.throws(()=>validate(changed),/verification/);
  changed.links[0].verifiedAt='2026-10-08'; changed.analytics.enabled=true;
  assert.throws(()=>validate(changed),/onboarding/);
});
