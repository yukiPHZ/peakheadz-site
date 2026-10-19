import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {loadData,generate,render,validate,destinations,verificationHash} from '../scripts/generate-youtube.mjs';
import {inspectHub} from '../scripts/verify-youtube-hub.mjs';
const data=loadData(),template=fs.readFileSync(new URL('../templates/youtube.html',import.meta.url),'utf8');
const clone=()=>structuredClone(data);

test('generated HTML/manifest use one catalog, exact product and channel identity',()=>{
 const result=generate();assert.equal(result.html,fs.readFileSync(new URL('../public/youtube/index.html',import.meta.url),'utf8').replaceAll('\r\n','\n'));
 assert.deepEqual(JSON.parse(result.manifest),destinations(data));
 const product=data.catalog.dake_pdf_merge;
 assert.equal(product.url,'https://dakeapp.com/apps/pdf-merge/');assert.equal(product.name,'DakePDF結合');
 assert.equal(Object.values(data.catalog).filter(r=>r.url===product.url).length,1);
 const proof=inspectHub(result.html,JSON.parse(result.manifest),product,data.catalog.yukiz_youtube.youtube.channelId);
 assert.equal(proof.manifestAndActualLinkMatch,true);assert.equal(proof.publisherRouteReady,false);assert.equal(proof.providerWrites,0);
});
test('data-only ordering/selection affects featured cards and the first app CTA',()=>{
 const d=clone();d.catalog.test_product={...structuredClone(d.catalog.dake_pdf_merge),name:'Synthetic app',url:'https://example.com/synthetic-only',youtube:{...d.catalog.dake_pdf_merge.youtube,productId:'test_product',headline:'Synthetic fixture'}};
 d.catalog.test_product.youtube.verificationSha256=verificationHash(d.catalog.test_product);
 d.config.featuredRefs=['test_product','dake_pdf_merge'];const html=render(d,template);
 assert.ok(html.indexOf('id="test_product"')<html.indexOf('id="dake_pdf_merge"'));
 assert.ok(html.includes('data-youtube-link="test_product" href="https://example.com/synthetic-only"'));
 assert.deepEqual(destinations(d).products.map(p=>p.productId),['test_product','dake_pdf_merge']);
});
test('hidden entries never leak in HTML, hero CTAs or product manifest',()=>{
 const d=clone();d.catalog.dake_pdf_merge.youtube.status='hidden';d.catalog.yukiz_instagram.youtube.status='hidden';d.catalog.dake_pdf_merge_booth.youtube.status='hidden';
 const html=render(d,template);for(const value of [data.catalog.dake_pdf_merge.url,data.catalog.yukiz_instagram.url,data.catalog.dake_pdf_merge_booth.url])assert.ok(!html.includes(value));
 assert.deepEqual(destinations(d).products,[]);
});
test('missing verification, unknown IDs, wrong kinds, unsafe links and accidental URL changes fail closed',()=>{
 for(const mutate of [d=>d.config.appRefs.push('unknown'),d=>d.config.featuredRefs.push('dake_pdf_merge'),d=>d.config.appRefs.push('yukiz_x'),d=>delete d.catalog.dake_pdf_merge.youtube.verifiedAt,d=>d.catalog.dake_pdf_merge.source='',d=>d.catalog.dake_pdf_merge.youtube.status='planned',d=>d.catalog.dake_pdf_merge.url='https://dakeapp.com/apps/not-verified/',d=>d.catalog.dake_pdf_merge.url='javascript:alert(1)',d=>d.catalog.dake_pdf_merge.url='https://127.0.0.1/private',d=>d.catalog.dake_pdf_merge.url='https://user:password@example.com/']){
  const d=clone();mutate(d);assert.throws(()=>validate(d));
 }
});
test('catalog copy is escaped; verification binding includes name and URL',()=>{
 const d=clone();d.catalog.dake_pdf_merge.name='<script>fixture</script>';assert.throws(()=>validate(d));
 d.catalog.dake_pdf_merge.youtube.verificationSha256=verificationHash(d.catalog.dake_pdf_merge);
 const html=render(d,template);assert.ok(html.includes('&lt;script&gt;fixture&lt;/script&gt;'));assert.ok(!html.includes('<script>fixture'));
});
test('Preview SEO and accessibility preserve all required destinations without any script/tracker',()=>{
 const html=generate().html;
 for(const token of ['name="robots" content="noindex,follow"','rel="canonical" href="https://peakheadz.com/youtube/"','PEAKHEADZ公式ロゴ','id="main"','本文へ進む','aria-label="目的から探す"','by <span lang="en">Yukihiko Kikuta</span>'])assert.ok(html.includes(token),token);
 assert.equal((html.match(/<h1\b/g)||[]).length,1);
 for(const id of [...data.config.appRefs,...data.config.serviceRefs,...data.config.socialRefs,data.config.supportRef])assert.ok(html.includes('href="'+data.catalog[id].url+'"'),id);
 assert.ok(!/<script|<iframe|gtag\(|localStorage|googletagmanager|beacon|data-mo-/i.test(html));
 const headers=fs.readFileSync(new URL('../public/_headers',import.meta.url),'utf8').split('/youtube/*')[1];
 assert.ok(headers.includes("script-src 'none'"));assert.ok(headers.includes("connect-src 'none'"));
 const sitemap=fs.readFileSync(new URL('../public/sitemap.xml',import.meta.url),'utf8');assert.ok(!sitemap.includes('/youtube/'));
 const d=clone();d.config.analytics.enabled=true;assert.throws(()=>validate(d));
});
test('hub route checker rejects ID/name/URL drift and a false manifest while never authorizing publication',()=>{
 const html=generate().html,m=destinations(data),p=data.catalog.dake_pdf_merge,channel=data.catalog.yukiz_youtube.youtube.channelId;
 for(const mutate of [x=>x.products[0].officialUrl+='fake',x=>x.products[0].officialName='Unverified',x=>x.products[0].status='hidden',x=>x.channelId='wrong',x=>x.releaseStage='production']){const changed=structuredClone(m);mutate(changed);assert.throws(()=>inspectHub(html,changed,p,channel));}
 assert.throws(()=>inspectHub(html.replace('data-youtube-product="dake_pdf_merge" href="'+p.url+'"','data-youtube-product="dake_pdf_merge" href="https://example.com/wrong"'),m,p,channel));
 assert.throws(()=>inspectHub(html.replace('data-youtube-product="dake_pdf_merge" href="'+p.url+'"','data-href="'+p.url+'" data-youtube-product="dake_pdf_merge" href="https://example.com/wrong"'),m,p,channel));
 assert.throws(()=>inspectHub(html.replace(/<a\b[^>]*data-youtube-product="dake_pdf_merge"[^>]*>[\s\S]*?<\/a>/,'<!-- $& -->'),m,p,channel));
});
