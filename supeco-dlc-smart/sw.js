const CACHE_NAME = 'supeco-dlc-smart-v1';
// This list includes all the core files and CDN links needed for the app shell to run offline.
const urlsToCache = [
  './',
  './index.html',
  './index.tsx',
  './App.tsx',
  './types.ts',
  './constants.ts',
  './components/Dashboard.tsx',
  './components/Login.tsx',
  './components/Sidebar.tsx',
  './components/Header.tsx',
  './components/Card.tsx',
  './components/icons/index.tsx',
  './components/views/DashboardView.tsx',
  './components/views/ProductListView.tsx',
  './components/views/AISuggestionsView.tsx',
  './components/CameraModal.tsx',
  './components/ProductFormModal.tsx',
  './assets/logo.ts',
  './data/productService.ts',
  './services/geminiService.ts',
  'https://cdn.tailwindcss.com',
  'https://aistudiocdn.com/react@^19.2.0',
  'https://aistudiocdn.com/react-dom@^19.2.0/client',
  'https://aistudiocdn.com/recharts@^3.2.1',
  'https://aistudiocdn.com/@google/genai@^1.24.0',
  'https://i.pravatar.cc/40?u=manager'
];

// Install event: opens a cache and adds all core assets to it.
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        // Using { cache: 'reload' } ensures we get the latest versions from the network upon install.
        return cache.addAll(urlsToCache.map(url => new Request(url, { cache: 'reload' })));
      })
  );
});

// Fetch event: serves requests from the cache first, falling back to the network.
self.addEventListener('fetch', event => {
  // We only cache GET requests. Other requests (POST, etc.) are passed through.
  if (event.request.method !== 'GET') {
    return;
  }
  
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // If the request is in the cache, return the cached response.
        if (response) {
          return response;
        }

        // If not in cache, fetch from the network.
        return fetch(event.request.clone()).then(
          response => {
            // Check for a valid response to cache.
            if (!response || response.status !== 200) {
              return response;
            }
            
            // Only cache responses from basic or cors origins.
            if(response.type !== 'basic' && response.type !== 'cors') {
                return response;
            }

            const responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
  );
});

// Activate event: cleans up old, unused caches to save space.
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});