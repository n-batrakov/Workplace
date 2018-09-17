var CACHE = 'offline-fallback';
var ASSETS = [
    './',
    './images',
    './app.bundle.js',
    './favicon.png',
    './index.html',
    './vendors~app.bundle.js',
    './vendors~app.css'
];
var FALLBACK =
    '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="180" stroke-linejoin="round">' +
    '  <path stroke="#DDD" stroke-width="25" d="M99,18 15,162H183z"/>' +
    '  <path stroke-width="17" fill="#FFF" d="M99,18 15,162H183z" stroke="#eee"/>' +
    '  <path d="M91,70a9,9 0 0,1 18,0l-5,50a4,4 0 0,1-8,0z" fill="#aaa"/>' +
    '  <circle cy="138" r="9" cx="100" fill="#aaa"/>' +
    '</svg>';

self.addEventListener('install', function(evt) {
  evt.waitUntil(precache().then(function () {
    return self.skipWaiting();
  }));

  function precache() {
    return caches.open(CACHE).then(function (cache) {
      return cache.addAll(ASSETS);
    });
  }
});

self.addEventListener('activate', function (evt) {
  evt.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', function(evt) {
  evt.respondWith(fromNetworkOrCache(evt.request).catch(function () {
    return useFallback();
  }));
});

function fromNetworkOrCache(request) {
  return fetch(request).then(function (response) {
    return response.ok ? response : fromCache(request);
  })
  .catch(function () {
    return fromCache(request);
  });
}

function fromCache(request) {
    return caches.open(CACHE).then(function (cache) {
      return cache.match(request).then(function (matching) {
        return matching || Promise.reject('request-not-in-cache');
      });
    });
  }

function useFallback() {
  return Promise.resolve(new Response(FALLBACK, { headers: {
    'Content-Type': 'image/svg+xml'
  }}));
}

