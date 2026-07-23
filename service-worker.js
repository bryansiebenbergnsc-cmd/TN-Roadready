const CACHE='tn-roadready-v7-1-1-lesson-fix';
const CORE=['./','./index.html?v=4.3','./styles.css?v=4.3','./app.bundle.js?v=4.3','./manifest.json','./icon-192.png','./icon-512.png'];
self.addEventListener('install',event=>{
  event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(CORE)).then(()=>self.skipWaiting()));
});
self.addEventListener('activate',event=>{
  event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch',event=>{
  const url=new URL(event.request.url);
  if(url.pathname.endsWith('app.bundle.js')||url.pathname.endsWith('styles.css')||url.pathname.endsWith('index.html')){
    event.respondWith(fetch(event.request,{cache:'no-store'}).then(resp=>{const copy=resp.clone();caches.open(CACHE).then(c=>c.put(event.request,copy));return resp}).catch(()=>caches.match(event.request)));
    return;
  }
  event.respondWith(caches.match(event.request).then(cached=>cached||fetch(event.request).then(resp=>{if(event.request.method==='GET'){const copy=resp.clone();caches.open(CACHE).then(c=>c.put(event.request,copy));}return resp})));
});
