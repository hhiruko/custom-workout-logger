
    const assets = [
  "/custom-workout-logger/index.html",
  "/custom-workout-logger/favicons/yandex-browser-manifest.json",
  "/custom-workout-logger/favicons/yandex-browser-50x50.png",
  "/custom-workout-logger/favicons/mstile-70x70.png",
  "/custom-workout-logger/favicons/mstile-310x310.png",
  "/custom-workout-logger/favicons/mstile-310x150.png",
  "/custom-workout-logger/favicons/mstile-150x150.png",
  "/custom-workout-logger/favicons/mstile-144x144.png",
  "/custom-workout-logger/favicons/manifest.webmanifest",
  "/custom-workout-logger/favicons/icon.svg",
  "/custom-workout-logger/favicons/favicon.ico",
  "/custom-workout-logger/favicons/favicon-48x48.png",
  "/custom-workout-logger/favicons/favicon-32x32.png",
  "/custom-workout-logger/favicons/favicon-16x16.png",
  "/custom-workout-logger/favicons/browserconfig.xml",
  "/custom-workout-logger/favicons/apple-touch-startup-image-828x1792.png",
  "/custom-workout-logger/favicons/apple-touch-startup-image-750x1334.png",
  "/custom-workout-logger/favicons/apple-touch-startup-image-640x1136.png",
  "/custom-workout-logger/favicons/apple-touch-startup-image-2796x1290.png",
  "/custom-workout-logger/favicons/apple-touch-startup-image-2778x1284.png",
  "/custom-workout-logger/favicons/apple-touch-startup-image-2732x2048.png",
  "/custom-workout-logger/favicons/apple-touch-startup-image-2688x1242.png",
  "/custom-workout-logger/favicons/apple-touch-startup-image-2556x1179.png",
  "/custom-workout-logger/favicons/apple-touch-startup-image-2532x1170.png",
  "/custom-workout-logger/favicons/apple-touch-startup-image-2436x1125.png",
  "/custom-workout-logger/favicons/apple-touch-startup-image-2388x1668.png",
  "/custom-workout-logger/favicons/apple-touch-startup-image-2266x1488.png",
  "/custom-workout-logger/favicons/apple-touch-startup-image-2224x1668.png",
  "/custom-workout-logger/favicons/apple-touch-startup-image-2208x1242.png",
  "/custom-workout-logger/favicons/apple-touch-startup-image-2160x1640.png",
  "/custom-workout-logger/favicons/apple-touch-startup-image-2160x1620.png",
  "/custom-workout-logger/favicons/apple-touch-startup-image-2048x2732.png",
  "/custom-workout-logger/favicons/apple-touch-startup-image-2048x1536.png",
  "/custom-workout-logger/favicons/apple-touch-startup-image-1792x828.png",
  "/custom-workout-logger/favicons/apple-touch-startup-image-1668x2388.png",
  "/custom-workout-logger/favicons/apple-touch-startup-image-1668x2224.png",
  "/custom-workout-logger/favicons/apple-touch-startup-image-1640x2160.png",
  "/custom-workout-logger/favicons/apple-touch-startup-image-1620x2160.png",
  "/custom-workout-logger/favicons/apple-touch-startup-image-1536x2048.png",
  "/custom-workout-logger/favicons/apple-touch-startup-image-1488x2266.png",
  "/custom-workout-logger/favicons/apple-touch-startup-image-1334x750.png",
  "/custom-workout-logger/favicons/apple-touch-startup-image-1290x2796.png",
  "/custom-workout-logger/favicons/apple-touch-startup-image-1284x2778.png",
  "/custom-workout-logger/favicons/apple-touch-startup-image-1242x2688.png",
  "/custom-workout-logger/favicons/apple-touch-startup-image-1242x2208.png",
  "/custom-workout-logger/favicons/apple-touch-startup-image-1179x2556.png",
  "/custom-workout-logger/favicons/apple-touch-startup-image-1170x2532.png",
  "/custom-workout-logger/favicons/apple-touch-startup-image-1136x640.png",
  "/custom-workout-logger/favicons/apple-touch-startup-image-1125x2436.png",
  "/custom-workout-logger/favicons/apple-touch-icon.png",
  "/custom-workout-logger/favicons/apple-touch-icon-precomposed.png",
  "/custom-workout-logger/favicons/apple-touch-icon-76x76.png",
  "/custom-workout-logger/favicons/apple-touch-icon-72x72.png",
  "/custom-workout-logger/favicons/apple-touch-icon-60x60.png",
  "/custom-workout-logger/favicons/apple-touch-icon-57x57.png",
  "/custom-workout-logger/favicons/apple-touch-icon-180x180.png",
  "/custom-workout-logger/favicons/apple-touch-icon-167x167.png",
  "/custom-workout-logger/favicons/apple-touch-icon-152x152.png",
  "/custom-workout-logger/favicons/apple-touch-icon-144x144.png",
  "/custom-workout-logger/favicons/apple-touch-icon-120x120.png",
  "/custom-workout-logger/favicons/apple-touch-icon-114x114.png",
  "/custom-workout-logger/favicons/apple-touch-icon-1024x1024.png",
  "/custom-workout-logger/favicons/android-chrome-96x96.png",
  "/custom-workout-logger/favicons/android-chrome-72x72.png",
  "/custom-workout-logger/favicons/android-chrome-512x512.png",
  "/custom-workout-logger/favicons/android-chrome-48x48.png",
  "/custom-workout-logger/favicons/android-chrome-384x384.png",
  "/custom-workout-logger/favicons/android-chrome-36x36.png",
  "/custom-workout-logger/favicons/android-chrome-256x256.png",
  "/custom-workout-logger/favicons/android-chrome-192x192.png",
  "/custom-workout-logger/favicons/android-chrome-144x144.png",
  "/custom-workout-logger/cdn/water.system.min.css",
  "/custom-workout-logger/cdn/water.light.min.css",
  "/custom-workout-logger/cdn/water.dark.min.css",
  "/custom-workout-logger/assets/index-iS_38sov.css",
  "/custom-workout-logger/assets/index-BSqGv3o8.js",
  "/custom-workout-logger/"
];
    const CACHE_NAME = 'v2025-08-30T09:10:49.231Z';

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
                        return caches.match('/custom-workout-logger/index.html');
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
