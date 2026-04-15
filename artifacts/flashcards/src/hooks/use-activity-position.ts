import { useEffect, useRef, useCallback } from "react";
import { customFetch } from "@workspace/api-client-react";

interface SavedPosition {
  position: number;
  filters: string;
}

function doSave(activity: string, position: number, filters: string) {
  customFetch(`/api/activity-position/${activity}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ position, filters }),
  }).catch(() => {});
}

export function useActivityPosition(activity: string, filtersKey: string) {
  const loadedRef = useRef(false);
  const saveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pendingRef = useRef<{ position: number; filters: string } | null>(null);
  const activityRef = useRef(activity);
  activityRef.current = activity;

  const load = useCallback(async (): Promise<SavedPosition | null> => {
    try {
      const data = await customFetch<SavedPosition>(`/api/activity-position/${activity}`);
      return data;
    } catch {
      return null;
    }
  }, [activity]);

  const flushPending = useCallback(() => {
    if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    if (pendingRef.current) {
      doSave(activityRef.current, pendingRef.current.position, pendingRef.current.filters);
      pendingRef.current = null;
    }
  }, []);

  const save = useCallback((position: number, filters: string) => {
    pendingRef.current = { position, filters };
    if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    saveTimeoutRef.current = setTimeout(() => {
      pendingRef.current = null;
      doSave(activityRef.current, position, filters);
    }, 500);
  }, []);

  useEffect(() => {
    const handleVisibility = () => {
      if (document.visibilityState === "hidden") flushPending();
    };
    const handleBeforeUnload = () => flushPending();

    document.addEventListener("visibilitychange", handleVisibility);
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("beforeunload", handleBeforeUnload);
      flushPending();
    };
  }, [flushPending]);

  return { load, save, loadedRef };
}
