import { useEffect, useRef, useState } from "react";
import { MessageCircle, X } from "lucide-react";

const SESSION_KEY = "exitCommentDismissed";

export function ExitCommentPopup() {
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const dismissedRef = useRef<boolean>(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(SESSION_KEY) === "1") {
        dismissedRef.current = true;
        return;
      }
    } catch {
      // sessionStorage may be unavailable; fall through and use the in-memory ref only.
    }

    const handleMouseLeave = (event: MouseEvent) => {
      if (dismissedRef.current) return;
      if (event.clientY <= 0) {
        setOpen(true);
        // Mark dismissed immediately so it never re-triggers, even if the
        // user closes without clicking a button.
        dismissedRef.current = true;
        try { sessionStorage.setItem(SESSION_KEY, "1"); } catch { /* ignore */ }
        document.removeEventListener("mouseout", handleMouseLeave);
      }
    };

    document.addEventListener("mouseout", handleMouseLeave);
    return () => document.removeEventListener("mouseout", handleMouseLeave);
  }, []);

  const close = () => setOpen(false);

  const send = async () => {
    if (!comment.trim() || submitting) { close(); return; }
    setSubmitting(true);
    try {
      await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ comment: comment.trim() }),
      });
    } catch {
      // Best-effort — even if it fails we still don't pester the user again.
    } finally {
      setSubmitting(false);
      close();
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-md rounded-3xl border border-border bg-card p-6 shadow-2xl">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-500/10 text-teal-500">
              <MessageCircle className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground">Before you go</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Leave a quick comment or feedback for us.
              </p>
            </div>
          </div>
          <button
            onClick={close}
            className="rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="mt-4 min-h-28 w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-teal-500"
          placeholder="Tell us what you liked or what we should improve..."
        />

        <div className="mt-4 flex items-center justify-end gap-3">
          <button
            onClick={close}
            className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-muted"
          >
            Maybe later
          </button>
          <button
            onClick={send}
            disabled={submitting}
            className="rounded-full bg-teal-500 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-400 disabled:opacity-60"
          >
            {submitting ? "Sending..." : "Send feedback"}
          </button>
        </div>
      </div>
    </div>
  );
}
