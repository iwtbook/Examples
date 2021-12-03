// worker.js

const CACHE_NAME = 'pwa-demo';

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(
        [
          'https://examples.cse135.site/pwa-demo/products.json'
        ]
      );
    })
  );

});

self.addEventListener('activate', function (event) {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.match(event.request).then(function (response) {
        return response || fetch(event.request)
          .then(function (response) {
            cache.put(event.request, response.clone());
            return response;
          });
      });
    })
  );
});
