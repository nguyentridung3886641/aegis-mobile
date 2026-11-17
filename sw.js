// AegisMobile Service Worker - v3.2 Network-First for Instant Updates
const CACHE_NAME = 'aegismobile-v3.5';
const ASSETS = [
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

self.addEventListener('install', (e) => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const url = e.request.url;

  // Let cloud sync API calls bypass SW cache completely
  if (url.includes('ntfy.sh') || url.includes('restful-api.dev') || url.includes('kvdb.io')) {
    return;
  }

  // HTML Navigation: NETWORK-FIRST so reloads always fetch fresh code from GitHub
  if (e.request.mode === 'navigate' || e.request.destination === 'document' || url.endsWith('.html') || url.endsWith('/')) {
    e.respondWith(
      fetch(e.request, { cache: 'no-cache' })
        .then((response) => {
          if (response && response.status === 200) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(e.request, clone));
          }
          return response;
        })
        .catch(() => caches.match(e.request))
    );
    return;
  }

  // Static Assets (icons, manifest): Cache-First
  e.respondWith(
    caches.match(e.request).then((res) => res || fetch(e.request))
  );
});
