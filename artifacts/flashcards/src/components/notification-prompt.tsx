import { useState, useEffect, useCallback } from "react";
import { Bell, BellOff, X } from "lucide-react";
import { customFetch } from "@workspace/api-client-react";
import { cn } from "@/lib/utils";

const base = import.meta.env.BASE_URL?.replace(/\/$/, "") || "";
const DISMISSED_KEY = "lexo_notif_dismissed";

function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const raw = atob(base64);
  const arr = new Uint8Array(raw.length);
  for (let i = 0; i < raw.length; ++i) arr[i] = raw.charCodeAt(i);
  return arr;
}

async function registerSW(): Promise<ServiceWorkerRegistration | null> {
  if (!("serviceWorker" in navigator)) return null;
  try {
    return await navigator.serviceWorker.register(`${base}/sw.js`);
  } catch {
    return null;
  }
}

async function subscribeToPush(reg: ServiceWorkerRegistration, vapidKey: string) {
  const sub = await reg.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(vapidKey),
  });
  return sub;
}

export function NotificationPrompt() {
  const [show, setShow] = useState(false);
  const [enabling, setEnabling] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (!("Notification" in window) || !("serviceWorker" in navigator)) return;
    if (Notification.permission === "granted") return;
    if (Notification.permission === "denied") return;
    if (sessionStorage.getItem(DISMISSED_KEY)) return;

    const timer = setTimeout(() => setShow(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleEnable = useCallback(async () => {
    setEnabling(true);
    try {
      const { publicKey } = await customFetch<{ publicKey: string }>("/api/notifications/vapid-key");
      if (!publicKey) { setShow(false); return; }

      const reg = await registerSW();
      if (!reg) { setShow(false); return; }

      const permission = await Notification.requestPermission();
      if (permission !== "granted") {
        setShow(false);
        sessionStorage.setItem(DISMISSED_KEY, "1");
        return;
      }

      const sub = await subscribeToPush(reg, publicKey);
      const subJson = sub.toJSON();

      await customFetch("/api/notifications/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subscription: {
            endpoint: subJson.endpoint,
            keys: subJson.keys,
          },
        }),
      });

      setEnabled(true);
      setTimeout(() => setShow(false), 2000);
    } catch {
      setShow(false);
    } finally {
      setEnabling(false);
    }
  }, []);

  const dismiss = () => {
    setShow(false);
    sessionStorage.setItem(DISMISSED_KEY, "1");
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-96 z-50 animate-in slide-in-from-bottom-4 fade-in duration-500">
      <div className="bg-card border border-border rounded-2xl shadow-xl p-4 space-y-3">
        {enabled ? (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center shrink-0">
              <Bell className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="font-bold text-foreground text-sm">Notifications enabled!</p>
              <p className="text-xs text-muted-foreground">You'll get class messages and study reminders.</p>
            </div>
          </div>
        ) : (
          <>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                <Bell className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-foreground text-sm">Turn on push notifications</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Get class messages from your teacher and daily study reminders — even when LEXO is closed.
                </p>
                <p className="text-xs text-muted-foreground mt-0.5" dir="rtl" lang="ar">
                  استقبل رسائل من معلمك وتذكيرات الدراسة، حتى عند إغلاق التطبيق
                </p>
              </div>
              <button onClick={dismiss} className="text-muted-foreground hover:text-foreground shrink-0">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="flex gap-2 ml-13">
              <button onClick={dismiss}
                className="flex-1 py-2 rounded-xl text-xs font-bold text-muted-foreground hover:text-foreground bg-muted transition-colors"
              >Not now</button>
              <button onClick={handleEnable} disabled={enabling}
                className="flex-1 py-2 rounded-xl text-xs font-bold bg-primary text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-1.5"
              >
                {enabling ? "Enabling..." : "Enable notifications"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
