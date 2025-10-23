self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('baqaya-v1').then((cache) =>
      cache.addAll([
        '/',
        '/offline.html',
        '/manifest.json',
        '/icons/icon-192.png',
        '/icons/icon-512.png'
      ])
    )
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Cache-first for OSM tiles
  if (url.hostname.endsWith('tile.openstreetmap.org')) {
    event.respondWith(
      caches.open('baqaya-tiles').then(async (cache) => {
        const cached = await cache.match(request);
        if (cached) return cached;
        try {
          const res = await fetch(request);
          cache.put(request, res.clone());
          return res;
        } catch (_e) {
          return caches.match('/offline.html');
        }
      })
    );
    return;
  }

  // Network-first for API, else cache-first
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      fetch(request).catch(() => caches.match('/offline.html'))
    );
    return;
  }

  event.respondWith(
    caches.match(request).then((cached) => {
      return (
        cached ||
        fetch(request).then((res) => {
          const resClone = res.clone();
          caches.open('baqaya-v1').then((cache) => cache.put(request, resClone));
          return res;
        }).catch(() => caches.match('/offline.html'))
      );
    })
  );
});
