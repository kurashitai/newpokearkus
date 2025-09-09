// Service Worker for PokeArkus PWA
// Version 1.0.0

const CACHE_NAME = 'pokearkus-v1.0.0';
const OFFLINE_CACHE = 'pokearkus-offline-v1.0.0';
const RUNTIME_CACHE = 'pokearkus-runtime-v1.0.0';

// Assets to cache on install
const STATIC_ASSETS = [
  '/',
  '/manifest.json',
  '/logo.png',
  '/POKEARKUS.jpg',
  '/offline.html',
  // Add core CSS and JS files
  '/_next/static/css/app/layout.css',
  '/_next/static/chunks/webpack.js',
  '/_next/static/chunks/main.js',
  // Add icon files
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
];

// Runtime caching strategies
const CACHE_STRATEGIES = {
  // Cache first for static assets
  CACHE_FIRST: 'cache-first',
  // Network first for dynamic content
  NETWORK_FIRST: 'network-first',
  // Stale while revalidate for images
  STALE_WHILE_REVALIDATE: 'stale-while-revalidate',
  // Cache only for offline fallbacks
  CACHE_ONLY: 'cache-only',
  // Network only for real-time data
  NETWORK_ONLY: 'network-only'
};

// Route patterns for different caching strategies
const CACHE_ROUTES = {
  // Static assets - cache first
  static: [
    /\/_next\/static\/.*/,
    /\/icons\/.*/,
    /\.(?:js|css|png|jpg|jpeg|gif|webp|svg|ico|woff|woff2)$/,
  ],
  // API routes - network first
  api: [
    /\/api\/.*/,
  ],
  // Images - stale while revalidate
  images: [
    /\.(?:png|jpg|jpeg|gif|webp|svg)$/,
  ],
  // Pages - network first
  pages: [
    /^\/(?!api|_next|icons).*/,
  ]
};

// Install event - cache static assets
self.addEventListener('install', event => {
  console.log('Service Worker: Installing...');
  
  event.waitUntil(
    Promise.all([
      // Cache static assets
      caches.open(CACHE_NAME).then(cache => {
        console.log('Service Worker: Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      }),
      // Create offline cache
      caches.open(OFFLINE_CACHE).then(cache => {
        console.log('Service Worker: Creating offline cache');
        return cache.add('/offline.html');
      }),
      // Skip waiting to activate immediately
      self.skipWaiting()
    ])
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  console.log('Service Worker: Activating...');
  
  event.waitUntil(
    Promise.all([
      // Clean up old caches
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== CACHE_NAME && 
                cacheName !== OFFLINE_CACHE && 
                cacheName !== RUNTIME_CACHE) {
              console.log('Service Worker: Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      }),
      // Claim clients to activate immediately
      self.clients.claim()
    ])
  );
});

// Fetch event - handle all network requests
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Skip chrome-extension and other non-http requests
  if (!url.protocol.startsWith('http')) {
    return;
  }

  // Skip requests to different origins
  if (url.origin !== self.location.origin) {
    return;
  }

  event.respondWith(handleRequest(request));
});

// Main request handler
async function handleRequest(request) {
  const url = new URL(request.url);
  
  try {
    // Check which caching strategy to use
    if (matchesPattern(url.pathname, CACHE_ROUTES.static)) {
      return await cacheFirstStrategy(request);
    } else if (matchesPattern(url.pathname, CACHE_ROUTES.api)) {
      return await networkFirstStrategy(request);
    } else if (matchesPattern(url.pathname, CACHE_ROUTES.images)) {
      return await staleWhileRevalidateStrategy(request);
    } else if (matchesPattern(url.pathname, CACHE_ROUTES.pages)) {
      return await networkFirstStrategy(request);
    } else {
      // Default to network first
      return await networkFirstStrategy(request);
    }
  } catch (error) {
    console.error('Service Worker: Request failed:', error);
    return await handleOfflineFallback(request);
  }
}

// Cache first strategy - for static assets
async function cacheFirstStrategy(request) {
  const cachedResponse = await caches.match(request);
  
  if (cachedResponse) {
    return cachedResponse;
  }

  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.error('Service Worker: Cache first failed:', error);
    throw error;
  }
}

// Network first strategy - for dynamic content
async function networkFirstStrategy(request) {
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      const cache = await caches.open(RUNTIME_CACHE);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.log('Service Worker: Network failed, trying cache');
    const cachedResponse = await caches.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    throw error;
  }
}

// Stale while revalidate strategy - for images
async function staleWhileRevalidateStrategy(request) {
  const cachedResponse = await caches.match(request);
  
  const fetchPromise = fetch(request).then(networkResponse => {
    if (networkResponse.ok) {
      const cache = caches.open(RUNTIME_CACHE);
      cache.then(c => c.put(request, networkResponse.clone()));
    }
    return networkResponse;
  }).catch(error => {
    console.error('Service Worker: Stale while revalidate fetch failed:', error);
    return cachedResponse;
  });

  return cachedResponse || fetchPromise;
}

// Offline fallback handler
async function handleOfflineFallback(request) {
  const url = new URL(request.url);
  
  // For navigation requests, return offline page
  if (request.mode === 'navigate') {
    const offlineResponse = await caches.match('/offline.html');
    if (offlineResponse) {
      return offlineResponse;
    }
  }
  
  // For images, try to return a cached version or placeholder
  if (request.destination === 'image') {
    const cachedImage = await caches.match(request);
    if (cachedImage) {
      return cachedImage;
    }
    
    // Return placeholder image
    return new Response(
      '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><rect width="200" height="200" fill="#f3f4f6"/><text x="50%" y="50%" dominant-baseline="central" text-anchor="middle" fill="#9ca3af">Image unavailable</text></svg>',
      {
        headers: {
          'Content-Type': 'image/svg+xml',
          'Cache-Control': 'no-cache'
        }
      }
    );
  }
  
  // For other requests, return a generic offline response
  return new Response(
    JSON.stringify({
      error: 'Offline',
      message: 'This content is not available offline',
      timestamp: new Date().toISOString()
    }),
    {
      status: 503,
      statusText: 'Service Unavailable',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
      }
    }
  );
}

// Utility function to match URL patterns
function matchesPattern(pathname, patterns) {
  return patterns.some(pattern => {
    if (pattern instanceof RegExp) {
      return pattern.test(pathname);
    }
    return pathname === pattern;
  });
}

// Background sync for offline actions
self.addEventListener('sync', event => {
  console.log('Service Worker: Background sync triggered:', event.tag);
  
  if (event.tag === 'pokemon-data-sync') {
    event.waitUntil(syncPokemonData());
  }
});

// Sync Pokemon data when back online
async function syncPokemonData() {
  try {
    console.log('Service Worker: Syncing Pokemon data...');
    
    // Get pending sync data from IndexedDB or localStorage
    const pendingData = await getPendingSyncData();
    
    if (pendingData && pendingData.length > 0) {
      for (const data of pendingData) {
        try {
          await fetch('/api/sync', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          });
          
          // Remove from pending after successful sync
          await removePendingSyncData(data.id);
        } catch (error) {
          console.error('Service Worker: Failed to sync data:', error);
        }
      }
    }
    
    console.log('Service Worker: Pokemon data sync completed');
  } catch (error) {
    console.error('Service Worker: Background sync failed:', error);
  }
}

// Push notification handler
self.addEventListener('push', event => {
  console.log('Service Worker: Push notification received');
  
  const options = {
    body: 'New Pokemon discovered in your area!',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/badge-72x72.png',
    vibrate: [200, 100, 200],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Explore Map',
        icon: '/icons/map-action.png'
      },
      {
        action: 'close',
        title: 'Dismiss',
        icon: '/icons/close-action.png'
      }
    ]
  };

  if (event.data) {
    const data = event.data.json();
    options.body = data.body || options.body;
    options.data = { ...options.data, ...data };
  }

  event.waitUntil(
    self.registration.showNotification('PokeArkus', options)
  );
});

// Notification click handler
self.addEventListener('notificationclick', event => {
  console.log('Service Worker: Notification clicked:', event.action);
  
  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/mapa')
    );
  } else if (event.action === 'close') {
    // Just close the notification
    return;
  } else {
    // Default action - open the app
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// Message handler for communication with main thread
self.addEventListener('message', event => {
  console.log('Service Worker: Message received:', event.data);
  
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  } else if (event.data && event.data.type === 'GET_VERSION') {
    event.ports[0].postMessage({ version: CACHE_NAME });
  } else if (event.data && event.data.type === 'CACHE_POKEMON_DATA') {
    cachePokemonData(event.data.payload);
  }
});

// Cache Pokemon data
async function cachePokemonData(data) {
  try {
    const cache = await caches.open(RUNTIME_CACHE);
    const response = new Response(JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'max-age=86400' // 24 hours
      }
    });
    
    await cache.put('/api/pokemon-data', response);
    console.log('Service Worker: Pokemon data cached successfully');
  } catch (error) {
    console.error('Service Worker: Failed to cache Pokemon data:', error);
  }
}

// Utility functions for sync data management
async function getPendingSyncData() {
  // This would typically use IndexedDB
  // For now, return empty array
  return [];
}

async function removePendingSyncData(id) {
  // This would typically remove from IndexedDB
  console.log('Service Worker: Removing sync data:', id);
}

console.log('Service Worker: Script loaded successfully');