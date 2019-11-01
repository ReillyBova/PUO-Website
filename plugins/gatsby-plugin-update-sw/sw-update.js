self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

self.addEventListener('install', function(event) {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', function(event) {
  event.waitUntil(self.clients.claim());
});

let refreshing;

// The event listener that is fired when the service worker updates
// Here we reload the page
self.addEventListener('controllerchange', function() {
  if (refreshing) {
      return;
  }

  alert("hello");
  window.location.reload(true);
  refreshing = true;
});
