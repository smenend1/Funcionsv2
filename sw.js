const CACHE_NAME = 'math-engine-v1';
const ASSETS = [
  './',                  // La raíz (index.html)
  './index.html',        // Asegúrate de que el nombre coincida con tu archivo
  './manifest.json',     // ¡Importante para que la PWA no falle!
  'https://cdn.jsdelivr.net/npm/chart.js',
  'https://cdnjs.cloudflare.com/ajax/libs/mathjs/11.8.0/math.js'
];

// Instalación: Guardar en caché
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('MathEngine: Archivos cacheados');
      return cache.addAll(ASSETS);
    })
  );
});

// Activación: Limpieza de versiones antiguas
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('MathEngine: Limpiando caché antigua');
            return caches.delete(key);
          }
        })
      );
    })
  );
});

// Fetch: Estrategia "Cache First" (funciona sin internet)
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => {
      return res || fetch(e.request);
    })
  );
});
