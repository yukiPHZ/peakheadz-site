import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../public');
const types = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.png':'image/png','.svg':'image/svg+xml','.xml':'application/xml','.ico':'image/x-icon','.jpg':'image/jpeg'};
export function preview(port=8788) {
  const server = http.createServer((req,res)=>{
    try {
      const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
      let file=path.resolve(root,'.'+pathname);
      if(file!==root && !file.startsWith(root+path.sep)) {res.writeHead(403).end();return;}
      if(fs.existsSync(file) && fs.statSync(file).isDirectory()) file=path.join(file,'index.html');
      if(!fs.existsSync(file) && !path.extname(file)) file+='.html';
      if(!fs.existsSync(file) || !fs.statSync(file).isFile()) {res.writeHead(404).end();return;}
      res.writeHead(200,{'Content-Type':types[path.extname(file)]||'application/octet-stream'});
      fs.createReadStream(file).pipe(res);
    } catch {res.writeHead(400).end();}
  });
  return new Promise(resolve=>server.listen(port,'127.0.0.1',()=>resolve(server)));
}
if(process.argv[1] && path.resolve(process.argv[1])===fileURLToPath(import.meta.url)) {
  await preview(); console.log('Preview: http://127.0.0.1:8788/connect (local only; Pages clean URLs emulated)');
}
