const CACHE_NAME = 'sales-proposal-v1';
const ASSETS = [
  './',
  './index.html',
  './us-equities.html',
  './japan-equities.html',
  './emerging-markets.html',
  './em-value-stocks.html',
  './international-ex-us.html',
  './european-stocks.html',
  './em-stock-stories.html',
  './intl-stock-stories.html',
  './retail-fund-marketing.html',
  './japan-bonds.html',
  './global-bonds.html',
  './icon-192x192.png',
  './icon-512x512.png',
  './manifest.json'
];

// インストール時に全ファイルをキャッシュ
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

// 古いキャッシュを削除
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// キャッシュ優先、なければネットワーク
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(cached => cached || fetch(event.request))
  );
});
