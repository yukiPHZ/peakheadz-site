const fs=require('node:fs'),path=require('node:path'),http=require('node:http');
const root=path.resolve(__dirname,'..'),out=path.join(root,'review/legacy-revival');
if(process.argv.includes('--public'))throw Error('This script only creates a local review.');
if(process.argv.includes('--serve')){
 const mime={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.svg':'image/svg+xml','.jpg':'image/jpeg','.jpeg':'image/jpeg','.png':'image/png','.ico':'image/x-icon','.webmanifest':'application/manifest+json'};
 http.createServer((req,res)=>{
  let url;try{url=decodeURIComponent(new URL(req.url,'http://127.0.0.1').pathname);}catch{res.writeHead(400).end();return;}
  const file=path.resolve(out,'.'+url+(url.endsWith('/')?'index.html':''));
  if(!['GET','HEAD'].includes(req.method)||!file.startsWith(out+path.sep)||!fs.existsSync(file)||!fs.statSync(file).isFile()||!mime[path.extname(file).toLowerCase()]){res.writeHead(404).end('Not found');return;}
  res.writeHead(200,{'Content-Type':mime[path.extname(file).toLowerCase()],'X-Robots-Tag':'noindex, nofollow, noarchive','Cache-Control':'no-store'});if(req.method==='HEAD')res.end();else fs.createReadStream(file).pipe(res);
 }).listen(4192,'127.0.0.1',()=>console.log('PEAKHEADZ review: http://127.0.0.1:4192/projects/'));
}else{
 const data=JSON.parse(fs.readFileSync(path.join(root,'data/legacy-revival.json'),'utf8'));
 if(data.productionLinkEnabled||data.publicationStatus!=='local-review')throw Error('Review state changed; verify publication separately.');
 const original=fs.readFileSync(path.join(root,'public/projects/index.html'),'utf8');
 const marker='      <p class="operator-note">';
 if(!original.includes(marker)||original.includes('id="kokuchijiko-review"'))throw Error('Review insertion point changed.');
 const esc=s=>s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const section='<article class="project-card" id="kokuchijiko-review"><h2>'+esc(data.name)+'</h2><p>'+esc(data.description)+'</p><p>制作中 / この画面だけの確認用導線</p><a href="'+esc(data.localPreviewUrl)+'">告知事項のローカルPreviewを見る →</a></article>\n\n';
 fs.mkdirSync(out,{recursive:true});fs.cpSync(path.join(root,'public'),out,{recursive:true});
 fs.writeFileSync(path.join(out,'projects/index.html'),original.replace(marker,section+marker).replace('<head>','<head>\n  <meta name="robots" content="noindex,nofollow,noarchive">'));
 fs.writeFileSync(path.join(out,'robots.txt'),'User-agent: *\nDisallow: /\n');
 fs.writeFileSync(path.join(out,'sitemap.xml'),'<?xml version="1.0"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"/>');
 console.log('Projects review generated; original public/ unchanged.');
}
