/**
 * Service Worker - Supeco DLC Manager
 * Handles caching and offline functionality
 */

const CACHE_NAME = 'supeco-dlc-v2.0.0';
const RUNTIME_CACHE = 'supeco-runtime-v2';

// Core files to precache
const PRECACHE_FILES = [
    './',
    './index.html',
    './dashboard.html',
    './settings.html',
    './scan.html',
    './styles/global.css',
    './styles/sidebar.css',
    './styles/forms.css',
    './styles/dashboard.css',
    './styles/charts.css',
    './js/namespace.js',
    './js/app.js',
    './js/database.js',
    './js/ui.js',
    './js/modals.js',
    './js/alerts.js',
    './js/storage.js',
    './js/router.js',
    './js/products.js',
    './js/dashboard.js',
    './js/settings.js',
    './js/scanner.js',
    './assets/icons/icon.svg'
];

// Install event - precache core files
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => cache.addAll(PRECACHE_FILES))
            .then(() => self.skipWaiting())
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames
                        .filter((cacheName) => cacheName !== CACHE_NAME && cacheName !== RUNTIME_CACHE)
                        .map((cacheName) => caches.delete(cacheName))
                );
            })
            .then(() => self.clients.claim())
    );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
    // Skip cross-origin requests
    if (!event.request.url.startsWith(self.location.origin)) return;

    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            if (cachedResponse) {
                return cachedResponse;
            }

            return caches.open(RUNTIME_CACHE).then((cache) => {
                return fetch(event.request).then((response) => {
                    // Put a copy of the response in the runtime cache.
                    return cache.put(event.request, response.clone()).then(() => {
                        return response;
                    });
                });
            });
        })
    );
});
