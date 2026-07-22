const CACHE='tn-roadready-v3-1';
const ASSETS=['./','./index.html','./styles.css','./app.js','./data.js','./manifest.json','./icon-192.png','./icon-512.png','./DL_Manual.pdf'];
self.addEventListener('install',event=>{
  event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS)).then(()=>self.skipWaiting()));
});
self.addEventListener('activate',event=>{
  event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET') return;
  const url=new URL(event.request.url);
  const isCore=['/index.html','/app.js','/data.js','/styles.css','/manifest.json','/service-worker.js'].some(x=>url.pathname.endsWith(x)) || url.pathname.endsWith('/');
  if(isCore){
    event.respondWith(fetch(event.request,{cache:'no-store'}).then(response=>{
      const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(event.request,copy));return response;
    }).catch(()=>caches.match(event.request).then(r=>r||caches.match('./index.html'))));
  }else{
    event.respondWith(caches.match(event.request).then(r=>r||fetch(event.request).then(response=>{
      const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(event.request,copy));return response;
    })));
  }
});
