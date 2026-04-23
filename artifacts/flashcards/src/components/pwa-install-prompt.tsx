import { useEffect, useState } from "react";
import { X, Share, Plus, Download } from "lucide-react";

const DISMISS_KEY = "lexo_pwa_install_dismissed_v1";
const MOBILE_DELAY_MS = 30_000;
const DESKTOP_DELAY_MS = 45_000;

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

function isMobileUA() {
  if (typeof navigator === "undefined") return false;
  return /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);
}

function isStandalone() {
  if (typeof window === "undefined") return false;
  // @ts-expect-error iOS-only flag
  if (window.navigator.standalone) return true;
  return window.matchMedia?.("(display-mode: standalone)").matches ?? false;
}

function isIOS() {
  if (typeof navigator === "undefined") return false;
  return /iPad|iPhone|iPod/.test(navigator.userAgent) && !(navigator as any).MSStream;
}

/**
 * PWA install prompt:
 *   • Android Chrome → bottom banner after 30 s (uses native beforeinstallprompt)
 *   • iOS Safari    → bottom tooltip after 30 s (manual Share → Add to Home Screen)
 *   • Desktop Chromium (Chrome/Edge/Brave/etc.) → subtle bottom-right pill after 45 s
 *
 * Never shows on:
 *   - Already-installed PWAs (display-mode: standalone)
 *   - Browsers without install support (e.g. desktop Firefox, Safari < 14)
 *   - After the user dismisses it (persisted to localStorage)
 */
export function PwaInstallPrompt() {
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null);
  const [show, setShow] = useState(false);
  const [variant, setVariant] = useState<"android" | "ios" | "desktop" | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (isStandalone()) return;
    try {
      if (localStorage.getItem(DISMISS_KEY)) return;
    } catch { /* ignore storage errors */ }

    const mobile = isMobileUA();
    let timer: number | undefined;

    const onBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferred(e as BeforeInstallPromptEvent);
      const desktop = !mobile;
      setVariant(desktop ? "desktop" : "android");
      timer = window.setTimeout(
        () => setShow(true),
        desktop ? DESKTOP_DELAY_MS : MOBILE_DELAY_MS,
      );
    };

    window.addEventListener("beforeinstallprompt", onBeforeInstall);

    // iOS Safari never fires beforeinstallprompt — schedule the manual tooltip.
    if (mobile && isIOS()) {
      setVariant("ios");
      timer = window.setTimeout(() => setShow(true), MOBILE_DELAY_MS);
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", onBeforeInstall);
      if (timer) window.clearTimeout(timer);
    };
  }, []);

  function dismiss() {
    setShow(false);
    try { localStorage.setItem(DISMISS_KEY, "1"); } catch { /* ignore */ }
  }

  async function install() {
    if (!deferred) return;
    try {
      await deferred.prompt();
      await deferred.userChoice;
    } finally {
      dismiss();
      setDeferred(null);
    }
  }

  if (!show || !variant) return null;

  // ── Desktop: subtle bottom-right pill ──
  if (variant === "desktop") {
    return (
      <div
        className="hidden md:flex fixed bottom-4 right-4 z-[1000] items-center gap-2 rounded-full bg-card border border-border shadow-lg pl-3 pr-1 py-1"
        role="dialog"
        aria-label="Install LEXO"
      >
        <img src="/icon-192.png" alt="" className="w-6 h-6 rounded-md" />
        <span className="text-sm font-semibold pr-1">Install LEXO as an app</span>
        <button
          onClick={install}
          className="h-9 px-3 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center gap-1.5 hover:opacity-90"
        >
          <Download className="w-3.5 h-3.5" /> Install
        </button>
        <button
          onClick={dismiss}
          aria-label="Dismiss"
          className="w-9 h-9 flex items-center justify-center rounded-full text-muted-foreground hover:bg-muted"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    );
  }

  // ── Mobile: bottom banner (Android install prompt or iOS tooltip) ──
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-[1000] px-3 pb-[max(12px,env(safe-area-inset-bottom))] pointer-events-none"
      role="dialog"
      aria-label="Install LEXO"
    >
      <div className="mx-auto max-w-md rounded-2xl bg-card border border-border shadow-2xl p-4 pointer-events-auto">
        <div className="flex items-start gap-3">
          <img src="/icon-192.png" alt="" className="w-11 h-11 rounded-xl shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="font-extrabold text-base leading-tight">Add LEXO to your home screen</p>
            {variant === "android" ? (
              <p className="text-sm text-muted-foreground mt-1">
                Get instant access and a full-screen experience — just like a native app.
              </p>
            ) : (
              <p className="text-sm text-muted-foreground mt-1 flex items-center flex-wrap gap-1">
                <span>Tap</span>
                <Share className="w-4 h-4 inline" aria-label="Share" />
                <span>then</span>
                <span className="font-semibold">Add to Home Screen</span>
                <Plus className="w-4 h-4 inline" aria-label="Add" />
              </p>
            )}
          </div>
          <button
            onClick={dismiss}
            aria-label="Dismiss"
            className="shrink-0 w-11 h-11 -mr-1 -mt-1 flex items-center justify-center rounded-lg text-muted-foreground hover:bg-muted"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        {variant === "android" && (
          <button
            onClick={install}
            className="mt-3 w-full min-h-[44px] rounded-xl bg-primary text-primary-foreground font-bold text-sm flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" /> Install LEXO
          </button>
        )}
      </div>
    </div>
  );
}
