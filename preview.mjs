import http from 'node:http';
import app from './dist/worker.mjs';
const server=http.createServer(async(req,res)=>{try{const result=app.fetch(new Request('http://127.0.0.1:19400'+req.url,{method:req.method}));res.writeHead(result.status,Object.fromEntries(result.headers));res.end(Buffer.from(await result.arrayBuffer()));}catch{res.writeHead(500);res.end('Preview unavailable');}});
server.listen(19400,'127.0.0.1',()=>console.log('http://127.0.0.1:19400'));
for(const signal of ['SIGTERM','SIGINT'])process.once(signal,()=>server.close());
