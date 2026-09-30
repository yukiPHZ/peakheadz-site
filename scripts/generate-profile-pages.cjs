// Generated HTML is a view. Run node scripts/generate-profile-pages.cjs [--check].
const fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..');
const ns=false;
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const esc=v=>String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const pages=JSON.parse(read('data/profile-pages.json'));
const brand=ns?'NICE SKILL':'PEAKHEADZ',origin=ns?'https://niceskill.com':'https://peakheadz.com';
const catalog=ns?niceCatalog():JSON.parse(read('data/profile-catalog.json'));
function niceCatalog(){
 const source=read('NICE_SKILL_PARENT_REFRESH_V1_20260921.md');
 const result={way_entry:{name:'考え方',url:'https://niceskill.com/way/'},works:{name:'作品',url:'https://niceskill.com/works/'}};
 for(const [id,name,host] of [['thanks','THANKS','thanks'],['handshake','HANDSHAKE','handshake'],['hourglass','Hourglass','hourglass']]){
  const url='https://'+host+'.niceskill.com/';
  const i=source.indexOf(url);if(i<0)throw Error('Missing approved source '+id);
  const copy=source.slice(i).match(/\*\*([^*]+)\*\*/)?.[1];if(!copy)throw Error('Missing exact approved copy '+id);
  result[id]={name,url,description:copy};
 }return result;
}
function parentFooter(){
 // Reuse the current Parent Refresh footer's single source, including its order.
 const source=read('public/assets/js/niceskill-observation.js');
 const groups=[['primary','NICE SKILL','footer_primary'],['featured','Featured works','footer_featured']];
 let html='<footer class="site-footer site-footer--shared" data-parent-footer="static">';
 for(const [id,label,group] of groups){
  const match=source.match(new RegExp('appendLinks\\('+id+', \\[([\\s\\S]*?)\\], "'+group+'"\\)'));
  if(!match)throw Error('Parent footer source changed: '+id);
  const items=[...match[1].matchAll(/\["([^"]+)", "([^"]+)", "([^"]+)"\]/g)];
  html+='<nav class="site-footer-'+id+'" aria-label="'+label+'">'+items.map(m=>'<a href="'+esc(m[2])+'" data-mo-cta="'+m[3]+'" data-mo-cta-group="'+group+'">'+esc(m[1])+'</a>').join('')+'</nav>';
 }
 const credit=source.match(/copyright.innerHTML = "([^"\n]+)"/)?.[1];if(!credit)throw Error('Parent copyright source changed');
 return html+'<div class="site-utility-links"><a href="https://peakheadz.com/" data-mo-cta="peakheadz" data-mo-cta-group="footer_utility">PEAKHEADZ</a><a href="/about/#analytics">アクセス解析について</a></div><p class="site-copyright">'+credit+'</p></footer>';
}
const phFooter=ns?'':read('templates/profile-footer.html');
for(const [medium,p] of Object.entries(pages)){
 const values={title:esc(p.title),description:esc(p.intro.join(' ')),canonical:origin+'/'+medium+'/',brand,medium,project:ns?'niceskill':'peakheadz_brand',heading:esc(p.heading),intro:p.intro.map(x=>'<p>'+esc(x)+'</p>').join(''),baseCss:ns?'/style.css':'/assets/css/style.css',ogImage:origin+(ns?'/assets/favicon/icon-512.png':'/assets/phzlogo1.png'),brandMark:ns?'<span class="profile-wordmark">NICE SKILL</span>':'<img src="/assets/phzlogo1.png" alt="" width="104" height="104"><span class="profile-wordmark">PEAKHEADZ</span><p>Stay motion.</p>',links:p.items.map((id,i)=>{const item=catalog[id];if(!item)throw Error('Unknown approved reference '+id);return '<a class="profile-link'+(i===0?' profile-link--primary':'')+'" href="'+esc(item.url)+'" data-mo-cta="'+id+'" data-mo-cta-group="'+(i===0?'profile_primary':'profile_links')+'">'+(p.labels?.[id]?'<span class="profile-action">'+esc(p.labels[id])+'</span>':'')+'<span class="profile-name">'+esc(item.name)+'</span>'+(item.description?'<span class="profile-description">'+esc(item.description)+'</span>':'')+'<span class="profile-arrow" aria-hidden="true">↗</span></a>';}).join(''),author:medium==='x'?'':'<p class="profile-author">Created by <a href="https://yukihikokikuta.com/" data-mo-cta="creator_profile" data-mo-cta-group="author">菊田幸彦</a></p>',footer:ns?parentFooter():phFooter,parentScript:ns?'<script src="/assets/js/niceskill-observation.js"></script>':''};
 let output=read('templates/profile.html').replace(/{{(\w+)}}/g,(_,k)=>{if(!(k in values))throw Error('Unknown template field '+k);return values[k]});
 output='<!-- Generated from templates/profile.html, data/profile-pages.json and approved sources. Regenerate with node scripts/generate-profile-pages.cjs. -->\n'+output;
 output=output.replace(/[\t ]+$/gm,'');
 const file=path.join(root,'public',medium,'index.html');
 if(process.argv.includes('--check')){if(!fs.existsSync(file)||fs.readFileSync(file,'utf8')!==output)throw Error('Stale profile '+medium)}else{fs.mkdirSync(path.dirname(file),{recursive:true});fs.writeFileSync(file,output)}
}console.log(brand+': '+Object.keys(pages).length+' static profiles '+(process.argv.includes('--check')?'verified':'generated'));
