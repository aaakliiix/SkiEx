// sw.js
const CACHE_NAME = 'gym-routine-v1';

// All three HTML pages + configuration file
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './gym.html',
  './gym-w-thomsen.html',
  './manifest.json'
];

// 1. Install & Cache all pages
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// 2. Activate & Clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
  self.skipWaiting();
});

// 3. Fetch from cache first (Instant offline access)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});
