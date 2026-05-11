const CACHE_NAME='kansai-trip-pwa-v12';
const urlsToCache=[
'./',
'./index.html',
'./guide.html',
'./usj.html',
'./quick.html',
'./today.html',
'./reminders.html',
'./expense.html',
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
   keys.filter(key=>key!==CACHE_NAME).map(key=>caches.delete(key))
  ))
 );
 self.clients.claim();
});

self.addEventListener('fetch',event=>{
 event.respondWith(
  caches.match(event.request)
   .then(response=>response||fetch(event.request)
    .then(networkResponse=>{
      const responseClone=networkResponse.clone();
      caches.open(CACHE_NAME).then(cache=>cache.put(event.request,responseClone));
      return networkResponse;
    })
   ).catch(()=>caches.match('./main.html'))
 );
});
