import { useEffect, useState } from "react";
import { Clock, ShieldAlert } from "lucide-react";

interface IdleWarningModalProps {
  open: boolean;
  msUntilLogout: number;
  onStayLoggedIn: () => void;
  onLogoutNow?: () => void;
}

function formatSeconds(ms: number): string {
  const total = Math.max(0, Math.ceil(ms / 1000));
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function IdleWarningModal({ open, msUntilLogout, onStayLoggedIn, onLogoutNow }: IdleWarningModalProps) {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (!open) return;
    const id = window.setInterval(() => setTick((n) => n + 1), 250);
    return () => window.clearInterval(id);
  }, [open]);
  void tick; // re-render hook

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="idle-warning-title"
    >
      <div className="w-full max-w-sm bg-card border border-border rounded-2xl shadow-2xl p-6 space-y-4 animate-in zoom-in-95 duration-200">
        <div className="flex items-start gap-3">
          <div className="w-11 h-11 rounded-full bg-amber-500/15 flex items-center justify-center shrink-0">
            <ShieldAlert className="w-6 h-6 text-amber-600 dark:text-amber-400" />
          </div>
          <div className="flex-1 min-w-0">
            <h2 id="idle-warning-title" className="font-bold text-foreground text-base">Still there?</h2>
            <p className="text-sm text-muted-foreground mt-1">
              You will be logged out in 2 minutes due to inactivity. Click to stay logged in.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-muted/50">
          <Clock className="w-4 h-4 text-muted-foreground" />
          <span className="font-mono text-2xl font-bold tabular-nums text-foreground">
            {formatSeconds(msUntilLogout)}
          </span>
        </div>

        <div className="flex flex-col-reverse sm:flex-row gap-2">
          {onLogoutNow ? (
            <button
              type="button"
              onClick={onLogoutNow}
              className="flex-1 py-2.5 rounded-xl text-sm font-bold text-muted-foreground hover:text-foreground bg-muted hover:bg-muted/80 transition-colors"
            >
              Log out now
            </button>
          ) : null}
          <button
            type="button"
            onClick={onStayLoggedIn}
            autoFocus
            className="flex-1 py-2.5 rounded-xl text-sm font-bold bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
          >
            Stay logged in
          </button>
        </div>
      </div>
    </div>
  );
}
