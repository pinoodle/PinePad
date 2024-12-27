const CACHE_NAME = 'pinepad-v2';
const urlsToCache = [
    '/games/Z0VKNWn5V0Cjcw3w_VU__w/',
    '/games/Z0VKNWn5V0Cjcw3w_VU__w/index.html',
    '/games/Z0VKNWn5V0Cjcw3w_VU__w/icon-192.png',
    '/games/Z0VKNWn5V0Cjcw3w_VU__w/icon-512.png',
    '/games/Z0VKNWn5V0Cjcw3w_VU__w/manifest.json'
];

// Install event - cache our files
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(urlsToCache);
            })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Fetch event - serve from cache, fall back to network
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Return cached version or fetch from network
                return response || fetch(event.request);
            })
    );
});
