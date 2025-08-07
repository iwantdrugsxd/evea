const CACHE_NAME = 'evea-v1.0.0'
const STATIC_CACHE_NAME = 'evea-static-v1.0.0'
const DYNAMIC_CACHE_NAME = 'evea-dynamic-v1.0.0'

// Assets to cache on install
const STATIC_ASSETS = [
  '/',
  '/manifest.json',
  '/offline.html',
  // Add your critical CSS and JS files here
  // '/styles/globals.css',
]

// Routes to cache dynamically
const DYNAMIC_ROUTES = [
  '/marketplace',
  '/services',
  '/about',
  '/contact',
]

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...')
  
  event.waitUntil(
    Promise.all([
      // Cache static assets
      caches.open(STATIC_CACHE_NAME)
        .then((cache) => {
          console.log('Service Worker: Caching static assets')
          return cache.addAll(STATIC_ASSETS)
        }),
      
      // Skip waiting to activate immediately
      self.skipWaiting()
    ])
  )
})

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...')
  
  event.waitUntil(
    Promise.all([
      // Clean up old caches
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (
              cacheName !== STATIC_CACHE_NAME &&
              cacheName !== DYNAMIC_CACHE_NAME &&
              cacheName !== CACHE_NAME
            ) {
              console.log('Service Worker: Deleting old cache:', cacheName)
              return caches.delete(cacheName)
            }
          })
        )
      }),
      
      // Take control of all pages
      self.clients.claim()
    ])
  )
})

// Fetch event - serve from cache or network
self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)

  // Skip cross-origin requests
  if (url.origin !== location.origin) {
    return
  }

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return
  }

  // Skip API routes (they should always be fresh)
  if (url.pathname.startsWith('/api/')) {
    return
  }

  // Skip authentication routes
  if (url.pathname.includes('/login') || url.pathname.includes('/register')) {
    return
  }

  event.respondWith(handleFetch(request))
})

async function handleFetch(request) {
  const url = new URL(request.url)
  
  try {
    // Strategy 1: Static assets - Cache First
    if (isStaticAsset(url.pathname)) {
      return await cacheFirst(request, STATIC_CACHE_NAME)
    }
    
    // Strategy 2: API calls - Network First
    if (url.pathname.startsWith('/api/')) {
      return await networkFirst(request, DYNAMIC_CACHE_NAME)
    }
    
    // Strategy 3: Pages - Stale While Revalidate
    if (isPageRoute(url.pathname)) {
      return await staleWhileRevalidate(request, DYNAMIC_CACHE_NAME)
    }
    
    // Strategy 4: Images - Cache First with fallback
    if (isImage(url.pathname)) {
      return await cacheFirstWithFallback(request, STATIC_CACHE_NAME)
    }
    
    // Default: Network First
    return await networkFirst(request, DYNAMIC_CACHE_NAME)
    
  } catch (error) {
    console.error('Service Worker: Fetch error:', error)
    
    // Return offline page for navigation requests
    if (request.destination === 'document') {
      const cache = await caches.open(STATIC_CACHE_NAME)
      return await cache.match('/offline.html') || new Response('Offline')
    }
    
    return new Response('Network error', { status: 500 })
  }
}

// Cache strategies
async function cacheFirst(request, cacheName) {
  const cache = await caches.open(cacheName)
  const cached = await cache.match(request)
  
  if (cached) {
    return cached
  }
  
  const response = await fetch(request)
  if (response.ok) {
    cache.put(request, response.clone())
  }
  
  return response
}

async function networkFirst(request, cacheName) {
  const cache = await caches.open(cacheName)
  
  try {
    const response = await fetch(request)
    if (response.ok) {
      cache.put(request, response.clone())
    }
    return response
  } catch (error) {
    const cached = await cache.match(request)
    if (cached) {
      return cached
    }
    throw error
  }
}

async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName)
  const cached = await cache.match(request)
  
  // Fetch in background to update cache
  const fetchPromise = fetch(request).then((response) => {
    if (response.ok) {
      cache.put(request, response.clone())
    }
    return response
  })
  
  // Return cached version immediately if available
  if (cached) {
    return cached
  }
  
  // Otherwise wait for network
  return await fetchPromise
}

async function cacheFirstWithFallback(request, cacheName) {
  const cache = await caches.open(cacheName)
  const cached = await cache.match(request)
  
  if (cached) {
    return cached
  }
  
  try {
    const response = await fetch(request)
    if (response.ok) {
      cache.put(request, response.clone())
    }
    return response
  } catch (error) {
    // Return a fallback image for failed image requests
    return await cache.match('/images/placeholder.jpg') || 
           new Response('', { status: 404 })
  }
}

// Helper functions
function isStaticAsset(pathname) {
  return /\.(css|js|ico|png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/.test(pathname)
}

function isPageRoute(pathname) {
  return DYNAMIC_ROUTES.some(route => pathname.startsWith(route)) ||
         pathname === '/' ||
         pathname.startsWith('/marketplace/') ||
         pathname.startsWith('/vendor/') ||
         pathname.startsWith('/blog/')
}

function isImage(pathname) {
  return /\.(png|jpg|jpeg|gif|svg|webp|avif)$/.test(pathname)
}

// Message handling for cache updates
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting()
  }
  
  if (event.data && event.data.type === 'CACHE_UPDATE') {
    // Force cache update for critical resources
    event.waitUntil(updateCriticalCache())
  }
})

async function updateCriticalCache() {
  const cache = await caches.open(STATIC_CACHE_NAME)
  const criticalResources = ['/', '/marketplace', '/services']
  
  return Promise.all(
    criticalResources.map(async (url) => {
      try {
        const response = await fetch(url)
        if (response.ok) {
          await cache.put(url, response)
        }
      } catch (error) {
        console.warn('Failed to update cache for:', url)
      }
    })
  )
}

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(handleBackgroundSync())
  }
})

async function handleBackgroundSync() {
  // Handle queued actions when coming back online
  // This could include form submissions, bookings, etc.
  console.log('Service Worker: Background sync triggered')
}

// Push notifications
self.addEventListener('push', (event) => {
  if (!event.data) return
  
  const data = event.data.json()
  const options = {
    body: data.body,
    icon: '/icons/icon-192x192.png',
    badge: '/icons/badge-72x72.png',
    image: data.image,
    vibrate: [200, 100, 200],
    data: {
      url: data.url || '/',
      timestamp: Date.now(),
    },
    actions: [
      {
        action: 'view',
        title: 'View Details',
        icon: '/icons/view-icon.png'
      },
      {
        action: 'dismiss',
        title: 'Dismiss',
        icon: '/icons/dismiss-icon.png'
      }
    ],
    requireInteraction: true,
    renotify: true,
    tag: data.tag || 'general',
  }
  
  event.waitUntil(
    self.registration.showNotification(data.title, options)
  )
})

// Notification click handling
self.addEventListener('notificationclick', (event) => {
  event.notification.close()
  
  const { action, data } = event
  const url = data?.url || '/'
  
  if (action === 'dismiss') {
    return
  }
  
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then((clientList) => {
      // Check if app is already open
      for (const client of clientList) {
        if (client.url.includes(url) && 'focus' in client) {
          return client.focus()
        }
      }
      
      // Open new window if app is not open
      if (clients.openWindow) {
        return clients.openWindow(url)
      }
    })
  )
})

// Periodic background sync
self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'sync-data') {
    event.waitUntil(syncData())
  }
})

async function syncData() {
  // Sync important data in background
  // This could be user preferences, cached search results, etc.
  console.log('Service Worker: Periodic background sync')
}