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

  const load = useCallback(async (): Promise<SavedPosition | null> => {
    try {
      const data = await customFetch<SavedPosition>(`/api/activity-position/${activity}`);
      return data;
    } catch {
      return null;
    }
  }, [activity]);

  const save = useCallback((position: number, filters: string) => {
    pendingRef.current = { position, filters };
    if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    saveTimeoutRef.current = setTimeout(() => {
      pendingRef.current = null;
      doSave(activity, position, filters);
    }, 500);
  }, [activity]);

  useEffect(() => {
    return () => {
      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
      if (pendingRef.current) {
        doSave(activity, pendingRef.current.position, pendingRef.current.filters);
        pendingRef.current = null;
      }
    };
  }, [activity]);

  return { load, save, loadedRef };
}
