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

const script = fs.readFileSync(new URL('../public/assets/js/connect.js',import.meta.url),'utf8');
function analytics({consent=true, enabled=true, origin='https://peakheadz.com', gpc=false, dnt='0', present=true, throws=false}={}) {
  const events=[]; let click; let consentState=consent;
  const adapter={enabled,contractVersion:'connect-v1',hasConsent:()=>{if(throws) throw Error('unavailable');return consentState;},track:(...args)=>events.push(args)};
  const root={location:{origin,search:'?email=private@example.com&utm_source=x'},navigator:{globalPrivacyControl:gpc,doNotTrack:dnt},document:{addEventListener:(type,fn)=>{click=fn;}},PeakheadzConnectAnalytics:present?adapter:undefined};
  vm.runInNewContext(script,{window:root});
  return {
    events,
    revoke:()=>{consentState=false;},
    click:(placement='follow')=>click({target:{closest:()=>({
      dataset:{linkId:'example',brand:'PEAKHEADZ',platform:'x',category:'social',destinationId:'example',placement},
      href:'https://x.com/?secret=test'
    })}})
  };
}
test('no send without adapter/consent or on preview, GPC, DNT and adapter errors',()=>{
  for(const options of [{present:false},{consent:false},{consent:'unknown'},{enabled:false},{origin:'http://localhost:8788'},{gpc:true},{dnt:'1'},{throws:true}]) {
    const a=analytics(options); a.click(); assert.equal(a.events.length,0);
  }
});
test('consented adapter receives fixed metadata only; withdrawal stops sends',()=>{
  const a=analytics();
  for(const placement of ['follow','featured','projects','coming_next']) a.click(placement);
  assert.deepEqual(a.events.map(x=>x[0]),['connect_page_view','connect_social_click','connect_featured_click','connect_project_click','connect_coming_soon_click']);
  assert.ok(!JSON.stringify(a.events).includes('private@example.com'));
  assert.ok(!JSON.stringify(a.events).includes('https://'));
  a.revoke(); a.click(); assert.equal(a.events.length,5);
});
