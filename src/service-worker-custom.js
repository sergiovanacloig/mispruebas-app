var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
    '/',
    '/index.html',
    '/assets'
];
var myApplicationURL = null;

console.log('NEW.21');

// Install Service Worker
this.addEventListener('install', function(event) {
    event.waitUntil(this.skipWaiting());
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(function(cache) {
            cache.addAll(urlsToCache);
            return cache;
        })
    );
});

// Service Worker Active
this.addEventListener('activate', function(event) {
    var cacheWhitelist = ['pages-cache-v1'];
    event.waitUntil(
        this.clients.claim(),   
        caches.keys().then(function(cacheNames) {
            return Promise.all(
            cacheNames.map(function(cacheName) {
                if (cacheWhitelist.indexOf(cacheName) === -1) {
                    return caches.delete(cacheName);
                }
                return null;
            })
            );
        })
    );
});

this.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
        .then(function(response) {
            if (response) {
                return response;
            }
            var fetchRequest = event.request.clone();
            return fetch(fetchRequest).then(
                function(response) {
                if(!response || response.status !== 200 || response.type !== 'basic') {
                    return response;
                }
                var responseToCache = response.clone();
                caches.open(CACHE_NAME)
                    .then(function(cache) {
                        cache.put(event.request, responseToCache);
                    });
                return response;
                }
            );
        })
    );
});

this.addEventListener('push', function(event) {
    const title = 'Star wars';
    const options = {
      body: 'Que la fuerza te acompañe',
      icon: './favicon.ico',
    };
  
    event.waitUntil(this.registration.showNotification(title, options));
});

this.addEventListener('notificationclick', function (event) {
    var clickedNotification = event.notification;
    clickedNotification.close();
    var promiseChain = this.clients.matchAll({
      type: 'window',
      includeUncontrolled: true
    }).then(function (windowClients) {
      var matchingClient = null;
  
      for (var i = 0; i < windowClients.length; i++) {
        var windowClient = windowClients[i];
  
        if (windowClient.url === myApplicationURL) {
          matchingClient = windowClient;
          break;
        }
      }
  
      if (matchingClient) {
        return matchingClient.focus();
      } else {
        return this.clients.openWindow(myApplicationURL);
      }
    });
    event.waitUntil(promiseChain);
});