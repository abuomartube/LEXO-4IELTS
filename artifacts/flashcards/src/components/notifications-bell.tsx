import { useState, useEffect, useRef, useCallback } from "react";
import { Bell, X, Megaphone, Sparkles, Trophy, Clock as ClockIcon } from "lucide-react";
import { customFetch } from "@workspace/api-client-react";
import { cn } from "@/lib/utils";

interface StudentNotification {
  id: number;
  message: string;
  type: string;
  audience: string;
  level: string | null;
  sent_at: string;
  read_at: string | null;
}

const TYPE_META: Record<string, { label: string; icon: React.ComponentType<{ className?: string }>; chip: string; ring: string }> = {
  reminder:     { label: "Reminder",     icon: ClockIcon,  chip: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-200", ring: "border-yellow-300 dark:border-yellow-700" },
  feature:      { label: "New Feature",  icon: Sparkles,   chip: "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-200",          ring: "border-blue-300 dark:border-blue-700" },
  announcement: { label: "Announcement", icon: Megaphone,  chip: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200", ring: "border-emerald-300 dark:border-emerald-700" },
  motivational: { label: "Motivational", icon: Trophy,     chip: "bg-amber-100 text-amber-900 dark:bg-amber-900/40 dark:text-amber-100",       ring: "border-amber-300 dark:border-amber-700" },
};

function formatWhen(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  const now = Date.now();
  const diff = (now - d.getTime()) / 1000;
  if (diff < 60) return "Just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return d.toLocaleString(undefined, {
    day: "numeric", month: "short", year: "numeric",
    hour: "numeric", minute: "2-digit",
  });
}

interface NotificationsBellProps {
  variant?: "sidebar" | "mobile";
}

export function NotificationsBell({ variant = "sidebar" }: NotificationsBellProps) {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<StudentNotification[]>([]);
  const [unread, setUnread] = useState(0);
  const [loading, setLoading] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const fetchUnread = useCallback(async () => {
    try {
      const res = await customFetch<{ unread: number }>("/api/notifications/unread-count");
      setUnread(res?.unread ?? 0);
    } catch {
      // Stay quiet; bell simply won't show a dot.
    }
  }, []);

  const fetchList = useCallback(async () => {
    setLoading(true);
    try {
      const res = await customFetch<{ notifications: StudentNotification[] }>("/api/notifications");
      setItems(res?.notifications ?? []);
    } catch {
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Poll unread count every 60s.
  useEffect(() => {
    fetchUnread();
    const t = setInterval(fetchUnread, 60_000);
    return () => clearInterval(t);
  }, [fetchUnread]);

  // Refresh unread when window/tab regains focus.
  useEffect(() => {
    const onFocus = () => { fetchUnread(); };
    window.addEventListener("focus", onFocus);
    document.addEventListener("visibilitychange", onFocus);
    return () => {
      window.removeEventListener("focus", onFocus);
      document.removeEventListener("visibilitychange", onFocus);
    };
  }, [fetchUnread]);

  // Close panel on outside click / Escape.
  useEffect(() => {
    if (!open) return;
    function onPointerDown(e: MouseEvent) {
      const target = e.target as Node | null;
      if (!target) return;
      if (panelRef.current?.contains(target)) return;
      if (buttonRef.current?.contains(target)) return;
      setOpen(false);
    }
    function onKey(e: KeyboardEvent) { if (e.key === "Escape") setOpen(false); }
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  async function handleOpen() {
    const next = !open;
    setOpen(next);
    if (next) {
      await fetchList();
    }
  }

  async function markRead(n: StudentNotification) {
    if (n.read_at) return;
    // Optimistic update.
    setItems((cur) => cur.map((it) => it.id === n.id ? { ...it, read_at: new Date().toISOString() } : it));
    setUnread((u) => Math.max(0, u - 1));
    try {
      await customFetch(`/api/notifications/${n.id}/read`, { method: "POST" });
    } catch {
      // Revert on failure.
      setItems((cur) => cur.map((it) => it.id === n.id ? { ...it, read_at: null } : it));
      fetchUnread();
    }
  }

  const buttonClass = variant === "mobile"
    ? "relative w-9 h-9 rounded-lg bg-muted hover:bg-muted/80 flex items-center justify-center transition-colors"
    : "relative w-9 h-9 rounded-full hover:bg-accent flex items-center justify-center transition-colors";

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        type="button"
        onClick={handleOpen}
        className={buttonClass}
        aria-label={unread > 0 ? `Notifications (${unread} unread)` : "Notifications"}
      >
        <Bell className="w-5 h-5 text-foreground" />
        {unread > 0 && (
          <span className="absolute top-1 right-1 min-w-[16px] h-4 px-1 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-card">
            {unread > 99 ? "99+" : unread}
          </span>
        )}
      </button>

      {open && (
        <>
          {/* Mobile backdrop */}
          <div
            className="md:hidden fixed inset-0 z-[70] bg-black/40"
            onClick={() => setOpen(false)}
            aria-hidden
          />
          <div
            ref={panelRef}
            className={cn(
              "z-[80] bg-card border border-border rounded-2xl shadow-xl overflow-hidden flex flex-col",
              "fixed left-3 right-3 top-16 max-h-[80vh]",
              "md:absolute md:left-auto md:right-0 md:top-12 md:w-96 md:max-h-[70vh]",
            )}
            role="dialog"
            aria-label="Notifications"
          >
            <div className="px-4 py-3 border-b border-border flex items-center justify-between bg-muted/30">
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4 text-primary" />
                <span className="font-bold text-sm text-foreground">Notifications</span>
                {unread > 0 && (
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-red-500 text-white">
                    {unread} new
                  </span>
                )}
              </div>
              <button
                onClick={() => setOpen(false)}
                className="w-7 h-7 rounded-lg hover:bg-accent flex items-center justify-center"
                aria-label="Close"
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>

            <div className="overflow-y-auto flex-1">
              {loading && items.length === 0 ? (
                <div className="px-4 py-10 text-center text-sm text-muted-foreground">
                  Loading…
                </div>
              ) : items.length === 0 ? (
                <div className="px-6 py-12 text-center">
                  <Bell className="w-8 h-8 mx-auto mb-2 text-muted-foreground/50" />
                  <p className="text-sm font-medium text-foreground">No notifications yet</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Updates from your teacher will appear here.
                  </p>
                </div>
              ) : (
                <ul className="divide-y divide-border">
                  {items.map((n) => {
                    const meta = TYPE_META[n.type] ?? TYPE_META["announcement"]!;
                    const Icon = meta.icon;
                    const isUnread = !n.read_at;
                    return (
                      <li key={n.id}>
                        <button
                          type="button"
                          onClick={() => markRead(n)}
                          className={cn(
                            "w-full text-left px-4 py-3 flex gap-3 transition-colors",
                            isUnread ? "bg-primary/5 hover:bg-primary/10" : "hover:bg-accent/40"
                          )}
                        >
                          <div className={cn(
                            "w-9 h-9 rounded-xl border-2 flex items-center justify-center shrink-0",
                            meta.chip, meta.ring,
                          )}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap mb-1">
                              <span className={cn("text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full", meta.chip)}>
                                {meta.label}
                              </span>
                              {n.audience === "level" && n.level && (
                                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-muted text-muted-foreground">
                                  {n.level}
                                </span>
                              )}
                              {isUnread && (
                                <span className="w-2 h-2 rounded-full bg-red-500" aria-label="Unread" />
                              )}
                            </div>
                            <p className={cn(
                              "text-sm leading-snug whitespace-pre-wrap break-words",
                              isUnread ? "text-foreground font-medium" : "text-muted-foreground"
                            )}>
                              {n.message}
                            </p>
                            <p className="text-[11px] text-muted-foreground mt-1">
                              {formatWhen(n.sent_at)}
                            </p>
                          </div>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
