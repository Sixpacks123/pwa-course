const cacheName = 'v2';
const filesToCache = [
  '/index.html',
  '/icons/github-256.png',
  '/icons/github-512.png',
];

// Installation du Service Worker et mise en cache des ressources préchargées
self.addEventListener("insall", (e) => {
    console.log("[SW] install");
    e.waitUntil((async () => {
        const cache = await caches.open(cacheName);
        console.log("[SW] Caching files");
        await cache.addAll(filesToCache);
    })());
});

// Intercepter les requêtes réseau et répondre avec les ressources mises en cache
self.addEventListener("fetch", (e) => {
    console.log("[SW] Fetching url: ", e.request.url);
    e.respondWith((async () => {

        const match = await caches.match(e.request);
        if (match) return match;

        const response = await fetch(e.request);

        if (e.request.method === "GET" && !(e.request.headers.get("Cache-Control") === "no-cache" || e.request.headers.get("Cache-Control") === "no-store")) {
            const cache = await caches.open(cacheName);
            console.log("[SW] Caching new resource: ", e.request.url);
            cache.put(e.request, response.clone());
        }

        return response;
    })())
});