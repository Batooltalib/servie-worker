const cacheName = 'cache-v1';
const precacheResources = [
  '/',
  './index.html',
  './index.js',
  './AdminUI.js',
  './Home.js',
  './Khaadi.js'
];

window.self.addEventListener('install', event => {
  console.log('Service worker install event!');
  event.waitUntil(
    caches.open(cacheName)
      .then(cache => {
        return cache.addAll(precacheResources);
      })
  );
});

window.self.addEventListener('activate', event => {
  console.log('Service worker activate event!');
});

window.self.addEventListener('fetch', event => {
  console.log('Fetch intercepted for:', event.request.url);
  event.respondWith(caches.match(event.request)
    .then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(event.request);
      })
    );
});