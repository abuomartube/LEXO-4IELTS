self.addEventListener("push", (event) => {
  let data = { title: "LEXO Study Reminder", body: "Time to study! Keep your streak alive 🔥", icon: "/logo.png" };
  try {
    if (event.data) data = { ...data, ...event.data.json() };
  } catch {}

  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: data.icon || "/logo.png",
      badge: "/logo.png",
      vibrate: [200, 100, 200],
      tag: "lexo-reminder",
      renotify: true,
      data: { url: "/" },
    })
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const url = event.notification.data?.url || "/";
  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((list) => {
      for (const client of list) {
        if (client.url.includes(self.location.origin) && "focus" in client) return client.focus();
      }
      return clients.openWindow(url);
    })
  );
});
