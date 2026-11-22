/* Mi plan DAP · service worker · build 56ed0a85a9 */
const CACHE = 'plan-dap-56ed0a85a9';
const ASSETS = ["./", "./index.html", "./manifest.webmanifest", "./vendor/jspdf.umd.min.js", "./icons/icon-192.png", "./icons/icon-512.png", "./icons/apple-touch-icon.png", "./fonts/bricolage-grotesque-latin-wght-normal.woff2", "./fonts/figtree-latin-wght-normal.woff2"];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS))); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('message', e => { if (e.data === 'SKIP_WAITING') self.skipWaiting(); });
self.addEventListener('fetch', e => {
  const req = e.request; if (req.method !== 'GET') return;
  let url; try { url = new URL(req.url); } catch (err) { return; }
  if (url.origin !== location.origin) return;
  if (req.mode === 'navigate'){
    e.respondWith(caches.match('./index.html').then(c => c || fetch(req).then(r => { if (r && r.ok) caches.open(CACHE).then(cc => cc.put('./index.html', r.clone())); return r; })));
    return;
  }
  e.respondWith(caches.match(req).then(c => c || fetch(req).then(r => { if (r && r.ok) caches.open(CACHE).then(cc => cc.put(req, r.clone())); return r; })));
});
