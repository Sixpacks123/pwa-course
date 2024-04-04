const cacheName = 'v1';
const filesToCache = [
  '/',
  '/index.html',
  '/icons/github-256.png',
  '/icons/github-512.png',
];

// Installation du Service Worker et mise en cache des ressources préchargées
self.addEventListener('install', event => {
    console.log('[SW] Install');
    event.waitUntil(
        caches.open(cacheName)
        .then(cache => {
            return cache.addAll(filesToCache);
        })
    );
});

// Intercepter les requêtes réseau et répondre avec les ressources mises en cache
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        return cachedResponse || fetch(event.request);
      })
  );
});
