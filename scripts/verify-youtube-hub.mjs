// GET-only Preview inspection. Never registers a Publisher route or changes approval state.
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
import {loadData} from './generate-youtube.mjs';
const esc=s=>String(s).replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
const decode=s=>s.replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/&lt;/g,'<').replace(/&gt;/g,'>');
export function inspectHub(html,manifest,product,channelId){
 if(manifest.schemaVersion!==1||manifest.hubUrl!=='https://peakheadz.com/youtube/'||manifest.channelId!==channelId||manifest.releaseStage!=='preview_only')throw Error('Hub identity or Preview stage mismatch');
 const row=manifest.products.filter(x=>x.productId===product.youtube.productId);
 if(row.length!==1||row[0].officialName!==product.name||row[0].officialUrl!==product.url||row[0].status!=='active')throw Error('Product manifest mismatch');
 const anchors=[...html.matchAll(/<a\b([^>]+)>/g)].filter(m=>new RegExp('data-youtube-product="'+esc(row[0].productId)+'"').test(m[1]));
 if(anchors.length!==1||decode(anchors[0][1].match(/\bhref="([^"]*)"/)?.[1]??'')!==product.url||!html.includes('id="'+row[0].anchor+'"'))throw Error('Actual product link mismatch');
 if(!html.includes('rel="canonical" href="'+manifest.hubUrl+'"')||!html.includes('name="robots" content="noindex,follow"'))throw Error('Preview canonical/robots mismatch');
 return {validation:'preview_only',hubUrl:manifest.hubUrl,productId:row[0].productId,officialName:product.name,officialUrl:product.url,anchor:row[0].anchor,htmlSha256:createHash('sha256').update(html).digest('hex'),manifestSha256:createHash('sha256').update(JSON.stringify(manifest)).digest('hex'),manifestAndActualLinkMatch:true,publisherRouteReady:false,
  remaining:['Owner Preview acceptance','Separate production release approval and deployment','Actual YouTube profile link installation and public verification','Fresh production hub-to-product verification and owner-approved Publisher route evidence'],providerWrites:0};
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 const [address,productId='dake_pdf_merge',output='.cache/youtube/hub-route-proof.json']=process.argv.slice(2);
 if(!address)throw Error('APPROVED_PREVIEW_URL_REQUIRED');
 const url=new URL(address);
 if(url.username||url.password||url.search||url.hash||url.pathname!=='/youtube/'||!(url.hostname.endsWith('.peakheadz-site.pages.dev')&&url.protocol==='https:'||url.hostname==='127.0.0.1'&&url.protocol==='http:'))throw Error('Unexpected Preview location');
 const [page,json]=await Promise.all([fetch(url,{redirect:'manual'}),fetch(new URL('destinations.json',url),{redirect:'manual'})]);
 if(page.status!==200||json.status!==200)throw Error('Preview read failed');
 const data=loadData(),product=data.catalog[productId];if(!product)throw Error('UNKNOWN_CANONICAL_PRODUCT');
 const proof={observedAt:new Date().toISOString(),previewUrl:url.href,...inspectHub(await page.text(),await json.json(),product,data.catalog[data.config.channelRef].youtube.channelId),headers:{robots:page.headers.get('x-robots-tag'),csp:page.headers.get('content-security-policy')}};
 fs.mkdirSync(path.dirname(output),{recursive:true});fs.writeFileSync(output,JSON.stringify(proof,null,2)+'\n');console.log(JSON.stringify(proof,null,2));
}
