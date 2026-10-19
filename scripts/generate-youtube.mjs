import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
import {escape} from './generate-connect.mjs';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const read=p=>fs.readFileSync(path.join(root,p),'utf8').replace(/\r\n/g,'\n');
const origin='https://peakheadz.com';
export function loadData(){return {config:JSON.parse(read('data/youtube.json')),catalog:JSON.parse(read('data/profile-catalog.json'))};}
const platforms={x:'X',instagram:'Instagram',threads:'Threads',tiktok:'TikTok',github:'GitHub'};
export const verificationHash=row=>createHash('sha256').update(JSON.stringify([row.name,row.url])).digest('hex');
export function validate({config,catalog}){
 if(config.schemaVersion!==1||config.canonicalPath!=='/youtube/'||config.releaseStage!=='preview_only'||config.analytics?.enabled!==false)throw Error('YouTube Preview/analytics approval boundary changed');
 const sections=[['featuredRefs','product'],['appRefs','directory'],['serviceRefs','service'],['socialRefs','social']];
 const refs=[config.channelRef,config.supportRef];
 for(const [key,kind]of sections){
  if(!Array.isArray(config[key])||!config[key].length||config[key].length>20||new Set(config[key]).size!==config[key].length)throw Error('Invalid ordered references: '+key);
  for(const id of config[key]){if(catalog[id]?.youtube?.kind!==kind)throw Error('Wrong catalog kind: '+id);refs.push(id);}
 }
 for(const id of refs){
  const row=catalog[id],meta=row?.youtube;
  if(!/^[a-z][a-z0-9_]{1,63}$/.test(id)||!row||!meta||!['active','hidden'].includes(meta.status))throw Error('Unknown catalog reference/status: '+id);
  if(meta.status==='hidden')continue;
  const url=new URL(row.url);
  if(url.protocol!=='https:'||url.username||url.password||url.port||url.hash||/^(localhost|.*\.localhost|.*\.local|[\d.]+|\[.*\])$/i.test(url.hostname)||url.hostname.endsWith('.invalid')||row.url.includes('\\'))throw Error('Unsafe catalog URL: '+id);
  if(!row.name||!row.source||!meta.description||!meta.cta||!/^\d{4}-\d{2}-\d{2}$/.test(meta.verifiedAt??'')||!meta.verificationSource)throw Error('Active links require canonical name/URL and verification: '+id);
  if(meta.verificationSha256!==verificationHash(row))throw Error('Catalog name/URL changed: reverify '+id);
  if(meta.kind==='social'&&!platforms[meta.platform])throw Error('Unknown platform');
  if(meta.kind==='product'&&(meta.productId!==id||!meta.headline))throw Error('Product identity missing');
 }
 if(catalog[config.channelRef]?.youtube?.kind!=='channel'||catalog[config.channelRef].youtube.status!=='active'||!/^UC[\w-]{22}$/.test(catalog[config.channelRef].youtube.channelId))throw Error('Verified YouTube channel required');
 if(catalog[config.supportRef]?.youtube?.kind!=='support'||new URL(catalog[config.supportRef].url).hostname!=='peakheadz.booth.pm')throw Error('Verified BOOTH support destination required');
 // One URL source per destination; generated HTML/JSON are views, not editable registries.
 const urls=new Map();for(const [id,row]of Object.entries(catalog)){if(!refs.includes(id)||row.youtube.status==='hidden')continue;if(urls.has(row.url))throw Error('Duplicate URL in catalog');urls.set(row.url,id);}
 return true;
}
const arrow='<span aria-hidden="true">↗</span>';
const attributes=id=>`data-youtube-link="${escape(id)}"`;
function feature(id,row,index){
 const m=row.youtube;
 return `<article class="yt-feature" id="${escape(id)}"><div class="yt-feature-top"><span class="yt-tag">${escape(m.category??'APP')}</span><span class="yt-number">${String(index+1).padStart(2,'0')}</span></div><div class="yt-product-art" aria-hidden="true"><span class="yt-paper paper-back">PDF</span><span class="yt-paper paper-front">PDF<span>＋</span>PDF</span><span class="yt-art-caption">ORDER. MERGE. DONE.</span></div><h3>${escape(m.headline)}</h3><p class="yt-product-name">${escape(row.name)}</p><p class="yt-feature-copy">${escape(m.description)}</p><a class="yt-button yt-button-dark" ${attributes(id)} data-youtube-product="${escape(m.productId)}" href="${escape(row.url)}">${escape(m.cta)} ${arrow}</a></article>`;
}
function destination(id,row,index){return `<li><a class="yt-destination" ${attributes(id)} href="${escape(row.url)}"><span class="yt-number">${String(index+1).padStart(2,'0')}</span><span><strong>${escape(row.name)}</strong><span class="yt-description">${escape(row.youtube.description)}</span><span class="yt-action">${escape(row.youtube.cta)}</span></span>${arrow}</a></li>`;}
export function render(data,template){
 validate(data);const {config,catalog}=data,visible=key=>config[key].filter(id=>catalog[id].youtube.status==='active');
 const channel=catalog[config.channelRef],featured=visible('featuredRefs'),support=catalog[config.supportRef];
 const channelName=channel.name.split('　').map(escape).join('<span class="yt-name-space">　</span><br class="yt-name-break">');
 const fields={CHANNEL_REF:escape(config.channelRef),CHANNEL_NAME:escape(channel.name),CHANNEL_HEADING:channelName,CHANNEL_URL:escape(channel.url),CHANNEL_CTA:escape(channel.youtube.cta),CHANNEL_DESCRIPTION:escape(channel.youtube.description),
  QUICK_APP:featured.length?`<a class="yt-button yt-button-outline" ${attributes(featured[0])} href="${escape(catalog[featured[0]].url)}">動画で紹介したアプリへ ${arrow}</a>`:'',
  FEATURED:featured.map((id,i)=>feature(id,catalog[id],i)).join('\n'),
  APPS:visible('appRefs').map((id,i)=>destination(id,catalog[id],i)).join('\n'),
  SERVICES:visible('serviceRefs').map((id,i)=>destination(id,catalog[id],i)).join('\n'),
  SOCIAL:visible('socialRefs').map(id=>{const r=catalog[id],m=r.youtube;return `<li><a class="yt-social" ${attributes(id)} href="${escape(r.url)}"><span class="yt-social-heading"><strong>${escape(platforms[m.platform])}</strong>${arrow}</span><span class="yt-handle">${escape(r.name)}</span><span class="yt-description">${escape(m.brand)}</span></a></li>`;}).join('\n'),
  SUPPORT:support.youtube.status==='active'?`<p>${escape(support.youtube.description)}</p><a class="yt-button yt-button-light" ${attributes(config.supportRef)} href="${escape(support.url)}">${escape(support.youtube.cta)} ${arrow}</a><p class="yt-support-note">${escape(support.name)} · 購入先はBOOTHです。</p>`:'<p>応援先は、公開確認が整ってからご案内します。</p>'};
 return template.replace(/{{([A-Z_]+)}}/g,(_,key)=>{if(!(key in fields))throw Error('Unknown template field: '+key);return fields[key];});
}
export function destinations(data){
 validate(data);const {config,catalog}=data;
 return {schemaVersion:1,releaseStage:config.releaseStage,hubUrl:origin+config.canonicalPath,channelId:catalog[config.channelRef].youtube.channelId,
  products:config.featuredRefs.filter(id=>catalog[id].youtube.status==='active').map(id=>({catalogId:id,productId:catalog[id].youtube.productId,officialName:catalog[id].name,officialUrl:catalog[id].url,anchor:id,status:'active',verifiedAt:catalog[id].youtube.verifiedAt}))};
}
export function generate(){const data=loadData();return {html:render(data,read('templates/youtube.html')),manifest:JSON.stringify(destinations(data),null,2)+'\n'};}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 const output=generate();for(const [file,content]of [['public/youtube/index.html',output.html],['public/youtube/destinations.json',output.manifest]]){
  if(process.argv.includes('--check')){if(!fs.existsSync(path.join(root,file))||read(file)!==content)throw Error('Run node scripts/generate-youtube.mjs');}
  else{fs.mkdirSync(path.dirname(path.join(root,file)),{recursive:true});fs.writeFileSync(path.join(root,file),content);}
 }console.log('YouTube hub '+(process.argv.includes('--check')?'verified':'generated')+' (Preview only).');
}
