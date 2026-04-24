import { useEffect, useRef, useState, useCallback } from "react";

interface UseIdleTimeoutOptions {
  enabled: boolean;
  timeoutMs: number;       // total idle time before logout
  warningMs: number;       // ms before timeoutMs to start showing the warning
  onTimeout: () => void;   // fired when timeoutMs is reached without activity
}

interface UseIdleTimeoutReturn {
  warningOpen: boolean;
  msUntilLogout: number;   // updated each second once warning is showing
  stayLoggedIn: () => void;
}

const ACTIVITY_EVENTS: (keyof WindowEventMap)[] = [
  "mousemove",
  "mousedown",
  "keydown",
  "scroll",
  "touchstart",
  "wheel",
];

// Throttle activity reporting so we don't reset on every mousemove tick.
const ACTIVITY_THROTTLE_MS = 1000;

export function useIdleTimeout(opts: UseIdleTimeoutOptions): UseIdleTimeoutReturn {
  const { enabled, timeoutMs, warningMs, onTimeout } = opts;
  const [warningOpen, setWarningOpen] = useState(false);
  const [msUntilLogout, setMsUntilLogout] = useState(warningMs);

  const lastActivityRef = useRef<number>(Date.now());
  const lastReportRef = useRef<number>(0);
  // Hold the latest warningOpen value in a ref so the activity listener can
  // read it without forcing the listener-effect to re-run (which would
  // unintentionally reset listeners and lose throttling state).
  const warningOpenRef = useRef<boolean>(false);
  warningOpenRef.current = warningOpen;
  const onTimeoutRef = useRef(onTimeout);
  onTimeoutRef.current = onTimeout;

  const stayLoggedIn = useCallback(() => {
    lastActivityRef.current = Date.now();
    setMsUntilLogout(warningMs);
    setWarningOpen(false);
  }, [warningMs]);

  // Activity listeners — registered once per `enabled` flip, never per
  // warningOpen toggle. While the warning modal is open, user input does NOT
  // reset the idle timer; the only way to dismiss is the explicit
  // "Stay logged in" button (stayLoggedIn).
  useEffect(() => {
    if (!enabled) return;
    const onActivity = () => {
      if (warningOpenRef.current) return; // requirement: explicit dismissal only
      const now = Date.now();
      if (now - lastReportRef.current < ACTIVITY_THROTTLE_MS) return;
      lastReportRef.current = now;
      lastActivityRef.current = now;
    };
    for (const ev of ACTIVITY_EVENTS) {
      window.addEventListener(ev, onActivity, { passive: true });
    }
    return () => {
      for (const ev of ACTIVITY_EVENTS) {
        window.removeEventListener(ev, onActivity);
      }
    };
  }, [enabled]);

  // Timer effect — also registered once per `enabled` flip. The interval
  // body is the single source of truth for opening/closing the warning and
  // firing the timeout, based on the activity ref.
  useEffect(() => {
    if (!enabled) {
      setWarningOpen(false);
      return;
    }
    // Establish a fresh idle baseline whenever the feature becomes enabled.
    lastActivityRef.current = Date.now();
    setWarningOpen(false);
    setMsUntilLogout(warningMs);

    const id = window.setInterval(() => {
      const idleFor = Date.now() - lastActivityRef.current;
      if (idleFor >= timeoutMs) {
        window.clearInterval(id);
        setWarningOpen(false);
        onTimeoutRef.current();
        return;
      }
      const msLeft = timeoutMs - idleFor;
      if (msLeft <= warningMs) {
        setWarningOpen(true);
        setMsUntilLogout(msLeft);
      } else {
        setWarningOpen(false);
      }
    }, 1000);

    return () => window.clearInterval(id);
  }, [enabled, timeoutMs, warningMs]);

  return { warningOpen, msUntilLogout, stayLoggedIn };
}
