const CACHE_NAME='kansai-trip-pwa-v13-no-html-cache';
const urlsToCache=[
'./',
'./manifest.json'
];

self.addEventListener('install',event=>{
 event.waitUntil(
  caches.open(CACHE_NAME)
   .then(cache=>cache.addAll(urlsToCache))
   .then(()=>self.skipWaiting())
 );
});

self.addEventListener('activate',event=>{
 event.waitUntil(
  caches.keys().then(keys=>Promise.all(
   keys.map(key=>caches.delete(key))
  ))
 );
 self.clients.claim();
});

self.addEventListener('fetch',event=>{
 const req=event.request;
 const url=new URL(req.url);
 const isHtml=req.mode==='navigate'||url.pathname.endsWith('.html')||url.pathname.endsWith('/');

 if(isHtml){
  event.respondWith(
   fetch(req,{cache:'no-store'}).catch(()=>caches.match('./'))
  );
  return;
 }

 event.respondWith(
  fetch(req).then(networkResponse=>{
   const responseClone=networkResponse.clone();
   caches.open(CACHE_NAME).then(cache=>cache.put(req,responseClone));
   return networkResponse;
  }).catch(()=>caches.match(req))
 );
});
