/* LEGACY AI SERVICE WORKER */
/* Atlas Technical Director - February 28, 2026 */

const CACHE_NAME = 'legacy-ai-v1.0.0'
const OFFLINE_CACHE = 'legacy-ai-offline-v1'

// Assets to cache for offline functionality
const STATIC_ASSETS = [
  '/',
  '/login',
  '/signup', 
  '/chat',
  '/settings',
  '/onboarding',
  '/manifest.json',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png'
]

// Assets that require network-first strategy
const NETWORK_FIRST_URLS = [
  '/api/',
  '/auth/'
]

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('[SW] Installing service worker...')
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[SW] Caching static assets')
        return cache.addAll(STATIC_ASSETS)
      })
      .then(() => {
        console.log('[SW] Service worker installed successfully')
        // Skip waiting to activate immediately
        return self.skipWaiting()
      })
      .catch((error) => {
        console.error('[SW] Installation failed:', error)
      })
  )
})

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating service worker...')
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((cacheName) => {
              // Remove old caches
              return cacheName !== CACHE_NAME && cacheName !== OFFLINE_CACHE
            })
            .map((cacheName) => {
              console.log('[SW] Deleting old cache:', cacheName)
              return caches.delete(cacheName)
            })
        )
      })
      .then(() => {
        console.log('[SW] Service worker activated')
        // Take control of all pages immediately
        return self.clients.claim()
      })
  )
})

// Fetch event - handle network requests
self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return
  }

  // Skip chrome-extension and non-http requests
  if (!url.protocol.startsWith('http')) {
    return
  }

  // Handle API requests (network-first)
  if (NETWORK_FIRST_URLS.some(path => url.pathname.startsWith(path))) {
    event.respondWith(networkFirst(request))
    return
  }

  // Handle page requests (cache-first with network fallback)
  event.respondWith(cacheFirst(request))
})

// Network-first strategy (for API calls)
async function networkFirst(request) {
  try {
    // Try network first
    const networkResponse = await fetch(request)
    
    // If successful and it's a GET request, cache the response
    if (networkResponse.ok && request.method === 'GET') {
      const cache = await caches.open(CACHE_NAME)
      cache.put(request, networkResponse.clone())
    }
    
    return networkResponse
  } catch (error) {
    console.log('[SW] Network failed, trying cache:', request.url)
    
    // Network failed, try cache
    const cachedResponse = await caches.match(request)
    if (cachedResponse) {
      return cachedResponse
    }
    
    // Return offline page for navigation requests
    if (request.destination === 'document') {
      return getOfflinePage()
    }
    
    throw error
  }
}

// Cache-first strategy (for static assets and pages)
async function cacheFirst(request) {
  try {
    // Try cache first
    const cachedResponse = await caches.match(request)
    if (cachedResponse) {
      return cachedResponse
    }
    
    // Cache miss, try network
    const networkResponse = await fetch(request)
    
    // Cache successful responses
    if (networkResponse.ok) {
      const cache = await caches.open(CACHE_NAME)
      cache.put(request, networkResponse.clone())
    }
    
    return networkResponse
  } catch (error) {
    console.log('[SW] Both cache and network failed:', request.url)
    
    // Return offline page for navigation requests
    if (request.destination === 'document') {
      return getOfflinePage()
    }
    
    throw error
  }
}

// Generate offline page
async function getOfflinePage() {
  const offlineHtml = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Offline - Legacy AI</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          background-color: #fafafa;
          margin: 0;
          padding: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
        }
        .container {
          text-align: center;
          max-width: 400px;
          padding: 2rem;
          background: white;
          border-radius: 12px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
        .logo {
          font-size: 2rem;
          font-weight: 700;
          color: #1e40af;
          margin-bottom: 1rem;
        }
        .icon {
          font-size: 4rem;
          margin-bottom: 1rem;
        }
        h1 {
          color: #0a0a0a;
          margin-bottom: 1rem;
        }
        p {
          color: #6b7280;
          line-height: 1.6;
          margin-bottom: 2rem;
        }
        .button {
          background-color: #1e40af;
          color: white;
          padding: 0.75rem 2rem;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          text-decoration: none;
          display: inline-block;
          font-weight: 500;
        }
        .button:hover {
          background-color: #1e3a8a;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="logo">LEGACY AI</div>
        <div class="icon">📱</div>
        <h1>You're offline</h1>
        <p>It looks like you're not connected to the internet. Check your connection and try again.</p>
        <button class="button" onclick="window.location.reload()">
          Try Again
        </button>
      </div>
    </body>
    </html>
  `
  
  return new Response(offlineHtml, {
    headers: {
      'Content-Type': 'text/html',
      'Cache-Control': 'no-cache'
    }
  })
}

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  console.log('[SW] Background sync:', event.tag)
  
  if (event.tag === 'sync-messages') {
    event.waitUntil(syncOfflineMessages())
  }
})

// Sync offline messages when connection is restored
async function syncOfflineMessages() {
  try {
    // TODO: Implement offline message syncing
    console.log('[SW] Syncing offline messages...')
    
    // Get offline messages from IndexedDB
    // Send to server
    // Update UI
    
    console.log('[SW] Offline messages synced')
  } catch (error) {
    console.error('[SW] Failed to sync offline messages:', error)
  }
}

// Push notification handling
self.addEventListener('push', (event) => {
  console.log('[SW] Push received:', event)
  
  if (!event.data) {
    return
  }
  
  const data = event.data.json()
  const options = {
    body: data.body,
    icon: '/icons/icon-192x192.png',
    badge: '/icons/icon-72x72.png',
    tag: 'legacy-ai-notification',
    requireInteraction: false,
    actions: [
      {
        action: 'open',
        title: 'Open Chat',
        icon: '/icons/icon-72x72.png'
      },
      {
        action: 'dismiss',
        title: 'Dismiss'
      }
    ]
  }
  
  event.waitUntil(
    self.registration.showNotification(data.title || 'Legacy AI', options)
  )
})

// Notification click handling
self.addEventListener('notificationclick', (event) => {
  console.log('[SW] Notification click:', event)
  
  event.notification.close()
  
  if (event.action === 'open') {
    event.waitUntil(
      clients.openWindow('/chat')
    )
  }
})

// Message handling from main thread
self.addEventListener('message', (event) => {
  console.log('[SW] Message received:', event.data)
  
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting()
  }
  
  if (event.data && event.data.type === 'GET_VERSION') {
    event.ports[0].postMessage({ version: CACHE_NAME })
  }
})