// LEXO Service Worker — push notifications + offline cache
const CACHE_VERSION = "lexo-v1";
const STATIC_CACHE = `${CACHE_VERSION}-static`;
const RUNTIME_CACHE = `${CACHE_VERSION}-runtime`;

const PRECACHE_URLS = [
  "/",
  "/manifest.webmanifest",
  "/4ielts-logo.png",
  "/favicon.svg",
  "/offline.html",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => cache.addAll(PRECACHE_URLS).catch(() => {}))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((k) => !k.startsWith(CACHE_VERSION))
          .map((k) => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

// Network-first for navigation/API; cache-first for static assets.
self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;

  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  // Never cache auth or write APIs
  if (url.pathname.startsWith("/api/")) return;

  // Navigation requests: network-first, fallback to cached "/" then offline page
  if (req.mode === "navigate") {
    event.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(RUNTIME_CACHE).then((c) => c.put(req, copy)).catch(() => {});
          return res;
        })
        .catch(() =>
          caches.match(req).then((cached) =>
            cached ||
            caches.match("/") ||
            caches.match("/offline.html")
          )
        )
    );
    return;
  }

  // Static assets: cache-first, then network
  event.respondWith(
    caches.match(req).then((cached) => {
      if (cached) return cached;
      return fetch(req)
        .then((res) => {
          if (res.ok && (res.type === "basic" || res.type === "default")) {
            const copy = res.clone();
            caches.open(RUNTIME_CACHE).then((c) => c.put(req, copy)).catch(() => {});
          }
          return res;
        })
        .catch(() => caches.match("/offline.html"));
    })
  );
});

// ── Push notifications ──
// Payload may include: { title, body, icon, badge, tag, data: { url, notificationId, type } }
self.addEventListener("push", (event) => {
  let data = {
    title: "LEXO",
    body: "You have a new message",
    icon: "/4ielts-logo.png",
    badge: "/4ielts-logo.png",
    tag: "lexo-notif",
    data: { url: "/" },
  };
  try {
    if (event.data) data = { ...data, ...event.data.json() };
  } catch {}

  event.waitUntil(
    self.registration.showNotification(data.title || "LEXO", {
      body: data.body,
      icon: data.icon || "/4ielts-logo.png",
      badge: data.badge || "/4ielts-logo.png",
      vibrate: [200, 100, 200],
      // Unique tag per notification → multiple pushes stack instead of replacing each other.
      tag: data.tag || "lexo-notif",
      renotify: true,
      data: data.data || { url: "/" },
    })
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const url = event.notification.data?.url || "/";
  const targetURL = new URL(url, self.location.origin).href;
  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then(async (list) => {
      for (const client of list) {
        if (client.url.startsWith(self.location.origin)) {
          try {
            if ("navigate" in client) await client.navigate(targetURL);
          } catch {}
          if ("focus" in client) return client.focus();
        }
      }
      return clients.openWindow(targetURL);
    })
  );
});
