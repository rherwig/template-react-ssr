const { assets } = global.serviceWorkerOption;

const CACHE_NAME = new Date().toISOString();
let assetsToCache = [
    ...assets,
    './',
    './icons/android-icon-36x36.png',
    './icons/android-icon-48x48.png',
    './icons/android-icon-72x72.png',
    './icons/android-icon-96x96.png',
    './icons/android-icon-144x144.png',
    './icons/android-icon-192x192.png',
    './icons/apple-icon.png',
    './icons/apple-icon-72x72.png',
    './icons/apple-icon-120x120.png',
    './icons/apple-icon-152x152.png',
    './icons/apple-icon-180x180.png',
    './icons/browserconfig.xml',
    './icons/favicon.ico',
    './icons/favicon-16x16.png',
    './icons/favicon-32x32.png',
    './icons/favicon-96x96.png',
    './icons/manifest.json',
    './icons/ms-icon-70x70.png',
    './icons/ms-icon-144x144.png',
    './icons/ms-icon-150x150.png',
    './icons/ms-icon-310x310.png'
];

assetsToCache = assetsToCache.map(path => new URL(path, global.location).toString());

self.addEventListener('install', event => {
    if (process.env.NODE_ENV === 'development') {
        return;
    }

    event.waitUntil(
        global.caches
            .open(CACHE_NAME)
            .then(cache => cache.addAll(assetsToCache))
            .catch(::console.error)
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        global.caches.keys().then(cacheNames => Promise.all(
            cacheNames.map(cacheName => {
                // Delete the caches that are not the current one.
                if (cacheName.indexOf(CACHE_NAME) === 0) {
                    return null;
                }

                return global.caches.delete(cacheName);
            }))
        )
    );
});

self.addEventListener('message', event => {
    switch (event.data.action) {
        case 'skipWaiting':
            if (self.skipWaiting) {
                self.skipWaiting();
                self.clients.claim();
            }
            break;
        default:
            break;
    }
});

self.addEventListener('fetch', event => {
    const request = event.request;

    if (request.method !== 'GET') {
        return;
    }

    const requestUrl = new URL(request.url);

    if (requestUrl.origin !== location.origin) {
        return;
    }

    const resource = global.caches.match(request).then(response => {
        if (response) {
            return response;
        }

        return fetch(request)
            .then(responseNetwork => {
                if (!responseNetwork || !responseNetwork.ok) {
                    return responseNetwork;
                }

                const responseCache = responseNetwork.clone();

                global.caches
                    .open(CACHE_NAME)
                    .then(cache => {
                        return cache.put(request, responseCache)
                    });

                return responseNetwork;
            })
            .catch(() => {
                if (event.request.mode === 'navigate') {
                    return global.caches.match('./')
                }

                return null;
            })
    });

    event.respondWith(resource);
});
