import { glob } from 'glob';
import { loadEnv } from "vite";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import fs from "node:fs";

const __dirname = dirname(dirname(fileURLToPath(import.meta.url)));
const env = loadEnv(process.env.NODE_ENV || 'development', __dirname);

const base = '/' + env.VITE_APP_PATH;
const files = await glob('dist/**/*.*');
const assets = files.map(f => base + f.replace(/^dist[\\/]/, '').replace(/\\/g, '/'));
assets.push(base);

const cacheName = `v${new Date().toISOString()}`;

const serviceWorker = `
    const assets = ${JSON.stringify(assets, null, 2)};
    const CACHE_NAME = '${cacheName}';

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
                        return caches.match('${base}index.html');
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
`;

fs.writeFileSync('dist/service-worker.js', serviceWorker);