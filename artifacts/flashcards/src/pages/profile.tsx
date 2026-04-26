import { useEffect, useRef, useState } from "react";
import { customFetch } from "@workspace/api-client-react";
import { User, Mail, Lock, Camera, Trash2, CheckCircle2, AlertCircle, Loader2, GraduationCap, Target } from "lucide-react";
import { Layout } from "@/components/layout";
import { cn } from "@/lib/utils";
import { levelLabel } from "@/lib/daily-plan";

const NAME_RE = /^[A-Za-z][A-Za-z\s'\-.]{1,39}$/;
const MAX_AVATAR_BYTES = 380_000; // server limit is 420k chars; leave headroom

function getStudentEmail(): string | null {
  try {
    const raw = localStorage.getItem("4ielts_email");
    if (!raw) return null;
    const { email } = JSON.parse(raw);
    return typeof email === "string" ? email : null;
  } catch {
    return null;
  }
}

async function resizeImageToDataUrl(file: File, max = 256): Promise<string> {
  const bitmap = await createImageBitmap(file);
  const ratio = Math.min(1, max / Math.max(bitmap.width, bitmap.height));
  const w = Math.max(1, Math.round(bitmap.width * ratio));
  const h = Math.max(1, Math.round(bitmap.height * ratio));
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas context unavailable");
  ctx.drawImage(bitmap, 0, 0, w, h);
  // Try progressively lower quality until we fit the size budget.
  for (const quality of [0.85, 0.75, 0.65, 0.55, 0.45]) {
    const url = canvas.toDataURL("image/jpeg", quality);
    if (url.length <= MAX_AVATAR_BYTES) return url;
  }
  // Fallback: return whatever the lowest quality produced.
  return canvas.toDataURL("image/jpeg", 0.4);
}

interface ProfileBundle {
  name: string;
  level: string;
  targetBand: string;
  examDate: string;
  avatar: string;
}

export default function ProfilePage() {
  const email = getStudentEmail();

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<ProfileBundle | null>(null);

  const [name, setName] = useState("");
  const [savingProfile, setSavingProfile] = useState(false);
  const [profileMsg, setProfileMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  const [avatarBusy, setAvatarBusy] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pwBusy, setPwBusy] = useState(false);
  const [pwMsg, setPwMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  // Initial load.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [n, l, b, d, a] = await Promise.all([
          customFetch<{ value: string }>("/api/user-data/name").catch(() => ({ value: "" })),
          customFetch<{ value: string }>("/api/user-data/current_level").catch(() => ({ value: "" })),
          customFetch<{ value: string }>("/api/user-data/target_band").catch(() => ({ value: "" })),
          customFetch<{ value: string }>("/api/user-data/exam_date").catch(() => ({ value: "" })),
          customFetch<{ value: string }>("/api/user-data/avatar").catch(() => ({ value: "" })),
        ]);
        if (cancelled) return;
        const bundle: ProfileBundle = {
          name: n.value || "",
          level: l.value || "",
          targetBand: b.value || "",
          examDate: d.value || "",
          avatar: a.value || "",
        };
        setData(bundle);
        setName(bundle.name);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const trimmedName = name.trim();
  const nameValid = NAME_RE.test(trimmedName);
  const profileDirty = !!data && trimmedName !== data.name;

  async function handleSaveProfile() {
    if (!nameValid || !profileDirty) return;
    setSavingProfile(true);
    setProfileMsg(null);
    try {
      await customFetch("/api/user-data/name", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ value: trimmedName }),
      });
      setData((prev) => (prev ? { ...prev, name: trimmedName } : prev));
      setProfileMsg({ type: "ok", text: "Saved." });
      try { window.dispatchEvent(new CustomEvent("lexo:profile-updated")); } catch { /* ignore */ }
    } catch {
      setProfileMsg({ type: "err", text: "Could not save. Please try again." });
    } finally {
      setSavingProfile(false);
    }
  }

  async function handleAvatarPick(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setProfileMsg({ type: "err", text: "Please choose an image file." });
      return;
    }
    setAvatarBusy(true);
    setProfileMsg(null);
    try {
      const dataUrl = await resizeImageToDataUrl(file);
      await customFetch("/api/user-data/avatar", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ value: dataUrl }),
      });
      setData((prev) => (prev ? { ...prev, avatar: dataUrl } : prev));
      setProfileMsg({ type: "ok", text: "Photo updated." });
      try { window.dispatchEvent(new CustomEvent("lexo:profile-updated")); } catch { /* ignore */ }
    } catch {
      setProfileMsg({ type: "err", text: "Could not upload photo. Please try a smaller image." });
    } finally {
      setAvatarBusy(false);
    }
  }

  async function handleAvatarRemove() {
    if (!data?.avatar) return;
    setAvatarBusy(true);
    setProfileMsg(null);
    try {
      await customFetch("/api/user-data/avatar", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ value: "" }),
      });
      setData((prev) => (prev ? { ...prev, avatar: "" } : prev));
      setProfileMsg({ type: "ok", text: "Photo removed." });
      try { window.dispatchEvent(new CustomEvent("lexo:profile-updated")); } catch { /* ignore */ }
    } catch {
      setProfileMsg({ type: "err", text: "Could not remove photo." });
    } finally {
      setAvatarBusy(false);
    }
  }

  async function handleChangePassword(e: React.FormEvent) {
    e.preventDefault();
    setPwMsg(null);
    if (!currentPassword) { setPwMsg({ type: "err", text: "Enter your current password." }); return; }
    if (newPassword.length < 6) { setPwMsg({ type: "err", text: "New password must be at least 6 characters." }); return; }
    if (newPassword !== confirmPassword) { setPwMsg({ type: "err", text: "New passwords don't match." }); return; }
    if (newPassword === currentPassword) { setPwMsg({ type: "err", text: "Pick a new password different from your current one." }); return; }

    setPwBusy(true);
    try {
      const res = await fetch("/api/access/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-student-email": email ?? "",
          "x-student-token": (() => {
            try {
              const raw = localStorage.getItem("4ielts_email");
              if (!raw) return "";
              const { token } = JSON.parse(raw);
              return token || "";
            } catch { return ""; }
          })(),
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) {
        setPwMsg({ type: "err", text: body?.error || "Could not change password." });
      } else {
        setPwMsg({ type: "ok", text: "Password updated." });
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      }
    } catch {
      setPwMsg({ type: "err", text: "Connection error. Please try again." });
    } finally {
      setPwBusy(false);
    }
  }

  if (loading) {
    return (
      <Layout>
        <div className="max-w-2xl mx-auto py-10 space-y-4">
          <div className="h-32 bg-muted rounded-3xl animate-pulse" />
          <div className="h-64 bg-muted rounded-3xl animate-pulse" />
          <div className="h-64 bg-muted rounded-3xl animate-pulse" />
        </div>
      </Layout>
    );
  }

  const initial = (data?.name || email || "?").trim().charAt(0).toUpperCase();

  return (
    <Layout>
      <div className="max-w-2xl mx-auto py-6 space-y-6">
        <div>
          <h1 className="text-3xl font-extrabold text-foreground">Your profile</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage your name, photo, and password.</p>
        </div>

        {/* ── Profile card ─────────────────────────────────────────────── */}
        <section className="rounded-3xl border border-border bg-card p-6 space-y-5">
          <div className="flex items-center gap-5">
            <div className="relative shrink-0">
              {data?.avatar ? (
                <img
                  src={data.avatar}
                  alt={data.name || "Avatar"}
                  className="w-24 h-24 rounded-full object-cover ring-2 ring-primary/30"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-teal-400 to-sky-500 text-white text-3xl font-extrabold flex items-center justify-center ring-2 ring-primary/30">
                  {initial}
                </div>
              )}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={avatarBusy}
                aria-label="Change photo"
                className="absolute -bottom-1 -right-1 w-9 h-9 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center hover:scale-105 transition disabled:opacity-50"
              >
                {avatarBusy ? <Loader2 className="w-4 h-4 animate-spin" /> : <Camera className="w-4 h-4" />}
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleAvatarPick}
                className="hidden"
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs uppercase tracking-widest font-bold text-muted-foreground">Photo</p>
              <p className="text-sm text-foreground mt-1">
                Square images look best (we resize to 256×256).
              </p>
              {data?.avatar && (
                <button
                  onClick={handleAvatarRemove}
                  disabled={avatarBusy}
                  className="mt-2 inline-flex items-center gap-1.5 text-xs font-bold text-red-600 hover:text-red-700 disabled:opacity-50"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Remove photo
                </button>
              )}
            </div>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="profile-name" className="text-xs uppercase tracking-widest font-bold text-muted-foreground flex items-center gap-1.5">
              <User className="w-3.5 h-3.5" /> Name
            </label>
            <input
              id="profile-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={40}
              className={cn(
                "w-full px-4 py-3 bg-background border rounded-xl text-foreground font-medium focus:outline-none focus:ring-2",
                trimmedName && !nameValid
                  ? "border-red-400 focus:ring-red-300"
                  : "border-border focus:ring-primary/50"
              )}
            />
            {trimmedName && !nameValid && (
              <p className="text-xs text-red-600 dark:text-red-400">
                Please use English letters only (2–40 chars).
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <label className="text-xs uppercase tracking-widest font-bold text-muted-foreground flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5" /> Email
            </label>
            <input
              type="email"
              value={email ?? ""}
              readOnly
              disabled
              className="w-full px-4 py-3 bg-muted/40 border border-border rounded-xl text-muted-foreground font-medium cursor-not-allowed"
            />
            <p className="text-[11px] text-muted-foreground">Email is locked. Contact your instructor to change it.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="rounded-2xl bg-muted/30 border border-border p-4">
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-muted-foreground">
                <GraduationCap className="w-3.5 h-3.5" /> Current level
              </div>
              <p className="text-sm font-bold text-foreground mt-1">
                {data?.level ? levelLabel(data.level) : "Not set"}
              </p>
            </div>
            <div className="rounded-2xl bg-muted/30 border border-border p-4">
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-muted-foreground">
                <Target className="w-3.5 h-3.5" /> Target band
              </div>
              <p className="text-sm font-bold text-foreground mt-1">
                {data?.targetBand ? `Band ${data.targetBand}` : "Not set"}
              </p>
            </div>
          </div>
          <p className="text-[11px] text-muted-foreground -mt-2">
            Level and target band are set in your study plan. Open <a href="/plan" className="text-primary font-semibold hover:underline">My Plan</a> to change them.
          </p>

          {profileMsg && (
            <div className={cn(
              "rounded-xl px-3 py-2 text-sm font-medium flex items-center gap-2",
              profileMsg.type === "ok"
                ? "bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-800"
                : "bg-red-50 text-red-700 border border-red-200 dark:bg-red-950/20 dark:text-red-400 dark:border-red-800"
            )}>
              {profileMsg.type === "ok" ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
              {profileMsg.text}
            </div>
          )}

          <div className="flex justify-end">
            <button
              onClick={handleSaveProfile}
              disabled={!profileDirty || !nameValid || savingProfile}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-primary-foreground font-bold text-sm hover:opacity-90 transition-opacity disabled:opacity-40"
            >
              {savingProfile && <Loader2 className="w-4 h-4 animate-spin" />}
              Save changes
            </button>
          </div>
        </section>

        {/* ── Change password card ─────────────────────────────────────── */}
        <section className="rounded-3xl border border-border bg-card p-6 space-y-4">
          <div>
            <h2 className="text-lg font-extrabold text-foreground flex items-center gap-2">
              <Lock className="w-4 h-4 text-primary" /> Change password
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              You'll need your current password to change it.
            </p>
          </div>

          <form className="space-y-3" onSubmit={handleChangePassword}>
            <div>
              <label htmlFor="cur-pw" className="text-xs uppercase tracking-widest font-bold text-muted-foreground">
                Current password
              </label>
              <input
                id="cur-pw"
                type="password"
                autoComplete="current-password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="mt-1 w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground font-medium focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <div>
              <label htmlFor="new-pw" className="text-xs uppercase tracking-widest font-bold text-muted-foreground">
                New password
              </label>
              <input
                id="new-pw"
                type="password"
                autoComplete="new-password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="mt-1 w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground font-medium focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <p className="text-[11px] text-muted-foreground mt-1">At least 6 characters.</p>
            </div>
            <div>
              <label htmlFor="conf-pw" className="text-xs uppercase tracking-widest font-bold text-muted-foreground">
                Confirm new password
              </label>
              <input
                id="conf-pw"
                type="password"
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1 w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground font-medium focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>

            {pwMsg && (
              <div className={cn(
                "rounded-xl px-3 py-2 text-sm font-medium flex items-center gap-2",
                pwMsg.type === "ok"
                  ? "bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-800"
                  : "bg-red-50 text-red-700 border border-red-200 dark:bg-red-950/20 dark:text-red-400 dark:border-red-800"
              )}>
                {pwMsg.type === "ok" ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                {pwMsg.text}
              </div>
            )}

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={pwBusy || !currentPassword || !newPassword || !confirmPassword}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-primary-foreground font-bold text-sm hover:opacity-90 transition-opacity disabled:opacity-40"
              >
                {pwBusy && <Loader2 className="w-4 h-4 animate-spin" />}
                Update password
              </button>
            </div>
          </form>
        </section>
      </div>
    </Layout>
  );
}
