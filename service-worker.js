
    const assets = [
  "/template/index.html",
  "/template/cdn/water.system.min.css",
  "/template/cdn/water.light.min.css",
  "/template/cdn/water.dark.min.css",
  "/template/assets/index-u3Q6TFvF.css",
  "/template/assets/index-di9vnRmY.js",
  "/template/"
];
    const CACHE_NAME = 'v2025-08-22T10:54:13.086Z';

    self.addEventListener('install', event => {
        self.skipWaiting();
        event.waitUntil(
            caches.open(CACHE_NAME).then(async cache => {
                for(const asset of assets) {
                    try {
                        await cache.add(asset);
                    } catch (e) {
                        console.error('❌ Failed to cache:', asset, e);
                    }
                }
            })
        );
    });

    self.addEventListener('fetch', event => {
        event.respondWith(
            caches.match(event.request).then(response => {
                if(response) return response;
                return fetch(event.request).catch(() => {
                    if(event.request.mode === 'navigate') {
                        return caches.match('/template/index.html');
                    }
                });
            })
        );
    });

    self.addEventListener('activate', event => {
        self.clients.claim();
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
