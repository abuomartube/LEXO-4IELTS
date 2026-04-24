import { useState, useEffect, useCallback } from "react";
import {
  Eye, EyeOff, Loader2, CheckCircle2, XCircle, Clock, Trash2, RefreshCw,
  Lock, KeyRound, Users, AlertCircle, Calendar, CalendarX, Search,
  Download, Star, MessageSquare, ShieldCheck, KeySquare, Reply, Send,
  Pencil, Image as ImageIcon, Upload, BadgeCheck
} from "lucide-react";

// ── Types ────────────────────────────────────────────────────────────────────

interface AccessRequest {
  id: number;
  email: string;
  status: "pending" | "approved" | "rejected";
  requestedAt: string;
  reviewedAt: string | null;
  expiresAt: string | null;
}

interface Review {
  id: number;
  email: string;
  name: string | null;
  comment: string;
  rating: number;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
  reviewedAt: string | null;
  adminReply: string | null;
  adminReplyAt: string | null;
}

type Tab = "requests" | "reviews" | "settings";
type Filter = "all" | "pending" | "approved" | "rejected";

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

function oneYearFromNow(): string {
  const d = new Date();
  d.setFullYear(d.getFullYear() + 1);
  return d.toISOString().split("T")[0];
}

function expiryStatus(expiresAt: string | null): { label: string; color: string } | null {
  if (!expiresAt) return null;
  const exp = new Date(expiresAt);
  const now = new Date();
  const diffDays = Math.ceil((exp.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  if (diffDays < 0) return { label: "Expired", color: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400" };
  if (diffDays <= 7) return { label: `Expires in ${diffDays}d`, color: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" };
  return { label: `Expires ${formatDate(expiresAt)}`, color: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" };
}

function StarRow({ rating }: { rating: number }) {
  return (
    <span className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map(s => (
        <Star key={s} className={`w-3.5 h-3.5 ${s <= rating ? "text-amber-400 fill-amber-400" : "text-gray-300 dark:text-gray-600"}`} />
      ))}
    </span>
  );
}

function downloadCSV(requests: AccessRequest[], filter: Filter) {
  const rows = requests.filter(r => filter === "all" || r.status === filter);
  const header = "Email,Status,Requested At,Expires At";
  const lines = rows.map(r =>
    `"${r.email}","${r.status}","${formatDate(r.requestedAt)}","${r.expiresAt ? formatDate(r.expiresAt) : ""}"`
  );
  const csv = [header, ...lines].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `4ielts-students-${filter}-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

function printEmails(requests: AccessRequest[], filter: Filter) {
  const rows = requests.filter(r => filter === "all" || r.status === filter);
  const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>4IELTS Students</title>
  <style>body{font-family:sans-serif;padding:20px}table{width:100%;border-collapse:collapse}
  th,td{border:1px solid #ddd;padding:8px;text-align:left}th{background:#f5f5f5}
  h2{margin-bottom:4px}p{color:#666;font-size:13px}</style></head><body>
  <h2>4IELTS Student List — ${filter === "all" ? "All" : filter.charAt(0).toUpperCase() + filter.slice(1)}</h2>
  <p>Exported ${new Date().toLocaleString("en-GB")}</p>
  <table><thead><tr><th>#</th><th>Email</th><th>Status</th><th>Requested</th><th>Expires</th></tr></thead><tbody>
  ${rows.map((r, i) => `<tr><td>${i + 1}</td><td>${r.email}</td><td>${r.status}</td><td>${formatDate(r.requestedAt)}</td><td>${r.expiresAt ? formatDate(r.expiresAt) : "—"}</td></tr>`).join("")}
  </tbody></table></body></html>`;
  const w = window.open("", "_blank");
  if (w) { w.document.write(html); w.document.close(); w.print(); }
}

// ── Main Component ────────────────────────────────────────────────────────────

export default function AdminPage() {
  const [adminPassword, setAdminPassword] = useState("");
  const [showAdmin, setShowAdmin] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  const [requests, setRequests] = useState<AccessRequest[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState<Filter>("all");
  const [reviewFilter, setReviewFilter] = useState<Filter>("all");
  const [tab, setTab] = useState<Tab>("requests");
  const [actionLoading, setActionLoading] = useState<number | null>(null);
  const [reviewActionLoading, setReviewActionLoading] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const [pendingExpiry, setPendingExpiry] = useState<Record<number, string>>({});
  const [editExpiry, setEditExpiry] = useState<Record<number, string>>({});
  const [expiryLoading, setExpiryLoading] = useState<number | null>(null);

  const [accessCode, setAccessCode] = useState("");
  const [newCode, setNewCode] = useState("");
  const [showNewCode, setShowNewCode] = useState(false);
  const [codeMsg, setCodeMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [codeLoading, setCodeLoading] = useState(false);

  const [newPassword, setNewPassword] = useState("");
  const [showNewPwd, setShowNewPwd] = useState(false);
  const [pwdMsg, setPwdMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [pwdLoading, setPwdLoading] = useState(false);

  const [replyEditingId, setReplyEditingId] = useState<number | null>(null);
  const [replyDraft, setReplyDraft] = useState("");
  const [replyLoading, setReplyLoading] = useState<number | null>(null);
  const [replyError, setReplyError] = useState<{ id: number; text: string } | null>(null);

  const [adminAvatar, setAdminAvatar] = useState<string | null>(null);
  const [avatarUploading, setAvatarUploading] = useState(false);
  const [avatarMsg, setAvatarMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const fetchRequests = useCallback(async (ap: string) => {
    setRefreshing(true);
    try {
      const res = await fetch("/api/admin/requests", { headers: { "x-admin-password": ap } });
      if (res.ok) setRequests(await res.json());
    } finally { setRefreshing(false); }
  }, []);

  const fetchReviews = useCallback(async (ap: string) => {
    const res = await fetch("/api/admin/reviews", { headers: { "x-admin-password": ap } });
    if (res.ok) setReviews(await res.json());
  }, []);

  const fetchAccessCode = useCallback(async (ap: string) => {
    const res = await fetch("/api/admin/access-code", { headers: { "x-admin-password": ap } });
    if (res.ok) { const d = await res.json(); setAccessCode(d.code); }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError("");
    try {
      const res = await fetch("/api/admin/requests", { headers: { "x-admin-password": adminPassword } });
      if (res.ok) {
        setLoggedIn(true);
        setRequests(await res.json());
        fetchAccessCode(adminPassword);
        fetchReviews(adminPassword);
      } else { setLoginError("Wrong admin password. Try again."); }
    } catch { setLoginError("Connection error."); }
    finally { setLoginLoading(false); }
  };

  const handleApprove = async (id: number) => {
    setActionLoading(id);
    try {
      const expiresAt = (pendingExpiry[id] ?? oneYearFromNow());
      const expiryIso = new Date(expiresAt + "T23:59:59").toISOString();
      await fetch(`/api/admin/requests/${id}/approve`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-admin-password": adminPassword },
        body: JSON.stringify({ adminPassword, expiresAt: expiryIso }),
      });
      await fetchRequests(adminPassword);
    } finally { setActionLoading(null); }
  };

  const handleAction = async (id: number, action: "reject" | "delete") => {
    setActionLoading(id);
    try {
      const url = action === "delete" ? `/api/admin/requests/${id}` : `/api/admin/requests/${id}/${action}`;
      await fetch(url, {
        method: action === "delete" ? "DELETE" : "POST",
        headers: { "Content-Type": "application/json", "x-admin-password": adminPassword },
        body: JSON.stringify({ adminPassword }),
      });
      await fetchRequests(adminPassword);
    } finally { setActionLoading(null); }
  };

  const handleSetExpiry = async (id: number) => {
    setExpiryLoading(id);
    try {
      const dateStr = editExpiry[id];
      const expiresAt = dateStr ? new Date(dateStr + "T23:59:59").toISOString() : null;
      await fetch(`/api/admin/requests/${id}/set-expiry`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-admin-password": adminPassword },
        body: JSON.stringify({ adminPassword, expiresAt }),
      });
      setEditExpiry(prev => { const n = { ...prev }; delete n[id]; return n; });
      await fetchRequests(adminPassword);
    } finally { setExpiryLoading(null); }
  };

  const handleChangeCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCode.trim()) return;
    setCodeLoading(true);
    setCodeMsg(null);
    try {
      const res = await fetch("/api/admin/change-access-code", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-admin-password": adminPassword },
        body: JSON.stringify({ adminPassword, newCode: newCode.trim() }),
      });
      const d = await res.json();
      if (res.ok) {
        setCodeMsg({ type: "success", text: `Access code changed to: "${newCode.trim()}"` });
        setAccessCode(newCode.trim());
        setNewCode("");
      } else { setCodeMsg({ type: "error", text: d.error ?? "Failed" }); }
    } catch { setCodeMsg({ type: "error", text: "Connection error." }); }
    finally { setCodeLoading(false); }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword.trim()) return;
    setPwdLoading(true);
    setPwdMsg(null);
    try {
      const res = await fetch("/api/admin/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-admin-password": adminPassword },
        body: JSON.stringify({ adminPassword, newPassword: newPassword.trim() }),
      });
      const d = await res.json();
      if (res.ok) {
        setPwdMsg({ type: "success", text: "Admin password updated successfully. Use it on your next login." });
        setAdminPassword(newPassword.trim());
        setNewPassword("");
      } else { setPwdMsg({ type: "error", text: d.error ?? "Failed" }); }
    } catch { setPwdMsg({ type: "error", text: "Connection error." }); }
    finally { setPwdLoading(false); }
  };

  const handleReviewAction = async (id: number, action: "approve" | "reject" | "delete") => {
    setReviewActionLoading(id);
    try {
      const url = action === "delete" ? `/api/admin/reviews/${id}` : `/api/admin/reviews/${id}/${action}`;
      await fetch(url, {
        method: action === "delete" ? "DELETE" : "POST",
        headers: { "Content-Type": "application/json", "x-admin-password": adminPassword },
        body: JSON.stringify({ adminPassword }),
      });
      await fetchReviews(adminPassword);
    } finally { setReviewActionLoading(null); }
  };

  const startReply = (r: Review) => {
    setReplyEditingId(r.id);
    setReplyDraft(r.adminReply ?? "");
    setReplyError(null);
  };

  const cancelReply = () => {
    setReplyEditingId(null);
    setReplyDraft("");
    setReplyError(null);
  };

  const publishReply = async (id: number) => {
    if (!replyDraft.trim()) return;
    setReplyLoading(id);
    setReplyError(null);
    try {
      const res = await fetch(`/api/admin/reviews/${id}/reply`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-admin-password": adminPassword },
        body: JSON.stringify({ reply: replyDraft.trim() }),
      });
      if (res.ok) {
        await fetchReviews(adminPassword);
        cancelReply();
      } else {
        const d = await res.json().catch(() => ({}));
        setReplyError({ id, text: d.error ?? "Failed to publish reply." });
      }
    } catch {
      setReplyError({ id, text: "Connection error. Please try again." });
    } finally { setReplyLoading(null); }
  };

  const deleteReply = async (id: number) => {
    setReplyLoading(id);
    setReplyError(null);
    try {
      const res = await fetch(`/api/admin/reviews/${id}/reply`, {
        method: "DELETE",
        headers: { "x-admin-password": adminPassword },
      });
      if (res.ok) {
        await fetchReviews(adminPassword);
      } else {
        const d = await res.json().catch(() => ({}));
        setReplyError({ id, text: d.error ?? "Failed to delete reply." });
      }
    } catch {
      setReplyError({ id, text: "Connection error. Please try again." });
    } finally { setReplyLoading(null); }
  };

  const fetchAvatar = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/avatar");
      if (res.ok) { const d = await res.json(); setAdminAvatar(d.dataUrl ?? null); }
    } catch { /* ignore */ }
  }, []);

  useEffect(() => { fetchAvatar(); }, [fetchAvatar]);

  const handleAvatarFile = async (file: File) => {
    setAvatarMsg(null);
    if (!file.type.startsWith("image/")) {
      setAvatarMsg({ type: "error", text: "Please choose an image file." });
      return;
    }
    if (file.size > 1.5 * 1024 * 1024) {
      setAvatarMsg({ type: "error", text: "Image too large — pick one under 1.5 MB." });
      return;
    }
    // Downscale to a 256x256 square so we stay well under the API's 300 KB limit.
    const dataUrl = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        img.onload = () => {
          const size = 256;
          const canvas = document.createElement("canvas");
          canvas.width = size; canvas.height = size;
          const ctx = canvas.getContext("2d");
          if (!ctx) { reject(new Error("Canvas unsupported")); return; }
          // Cover-fit: crop to square, scale to 256.
          const min = Math.min(img.width, img.height);
          const sx = (img.width - min) / 2;
          const sy = (img.height - min) / 2;
          ctx.drawImage(img, sx, sy, min, min, 0, 0, size, size);
          resolve(canvas.toDataURL("image/jpeg", 0.85));
        };
        img.onerror = () => reject(new Error("Bad image"));
        img.src = reader.result as string;
      };
      reader.onerror = () => reject(new Error("Read error"));
      reader.readAsDataURL(file);
    });

    setAvatarUploading(true);
    try {
      const res = await fetch("/api/admin/avatar", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-admin-password": adminPassword },
        body: JSON.stringify({ dataUrl }),
      });
      const d = await res.json().catch(() => ({}));
      if (res.ok) {
        setAdminAvatar(d.dataUrl);
        setAvatarMsg({ type: "success", text: "Profile photo updated." });
      } else {
        setAvatarMsg({ type: "error", text: d.error ?? "Upload failed." });
      }
    } catch {
      setAvatarMsg({ type: "error", text: "Connection error." });
    } finally { setAvatarUploading(false); }
  };

  const removeAvatar = async () => {
    setAvatarUploading(true);
    setAvatarMsg(null);
    try {
      const res = await fetch("/api/admin/avatar", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-admin-password": adminPassword },
        body: JSON.stringify({ dataUrl: null }),
      });
      if (res.ok) {
        setAdminAvatar(null);
        setAvatarMsg({ type: "success", text: "Profile photo removed." });
      }
    } finally { setAvatarUploading(false); }
  };

  const filteredRequests = requests
    .filter(r => filter === "all" || r.status === filter)
    .filter(r => !searchQuery.trim() || r.email.toLowerCase().includes(searchQuery.trim().toLowerCase()));

  const filteredReviews = reviews.filter(r => reviewFilter === "all" || r.status === reviewFilter);

  const counts = {
    all: requests.length,
    pending: requests.filter(r => r.status === "pending").length,
    approved: requests.filter(r => r.status === "approved").length,
    rejected: requests.filter(r => r.status === "rejected").length,
  };

  const reviewCounts = {
    all: reviews.length,
    pending: reviews.filter(r => r.status === "pending").length,
    approved: reviews.filter(r => r.status === "approved").length,
    rejected: reviews.filter(r => r.status === "rejected").length,
  };

  const statusBadge = (r: AccessRequest) => {
    if (r.status === "approved") {
      const exp = r.expiresAt ? expiryStatus(r.expiresAt) : null;
      if (exp && exp.label === "Expired") {
        return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"><CalendarX className="w-3 h-3" />Expired</span>;
      }
      return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"><CheckCircle2 className="w-3 h-3" />Approved</span>;
    }
    if (r.status === "rejected") return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"><XCircle className="w-3 h-3" />Rejected</span>;
    return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"><Clock className="w-3 h-3" />Pending</span>;
  };

  const reviewStatusBadge = (status: string) => {
    if (status === "approved") return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"><CheckCircle2 className="w-3 h-3" />Approved</span>;
    if (status === "rejected") return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"><XCircle className="w-3 h-3" />Rejected</span>;
    return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"><Clock className="w-3 h-3" />Pending</span>;
  };

  const todayStr = new Date().toISOString().split("T")[0];

  // ── Login screen ─────────────────────────────────────────────────────────────

  if (!loggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-900 via-teal-800 to-sky-900 p-4">
        <div className="w-full max-w-sm bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-8">
          <div className="flex flex-col items-center mb-8">
            <img src="/4ielts-logo.png" alt="4IELTS" className="h-16 w-auto object-contain mb-3" />
            <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">Admin Panel</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage student access requests</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Admin Password</label>
              <div className="relative">
                <input type={showAdmin ? "text" : "password"} value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  placeholder="Enter admin password…"
                  className="w-full px-4 py-3 pr-10 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
                  autoFocus />
                <button type="button" onClick={() => setShowAdmin(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" tabIndex={-1}>
                  {showAdmin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {loginError && <p className="text-xs text-red-500 mt-1">{loginError}</p>}
            </div>
            <button type="submit" disabled={loginLoading || !adminPassword}
              className="w-full py-3 rounded-xl bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white font-semibold transition-colors flex items-center justify-center gap-2">
              {loginLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Lock className="w-4 h-4" />}
              {loginLoading ? "Checking…" : "Login"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ── Main panel ────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/4ielts-logo.png" alt="4IELTS" className="h-10 w-auto object-contain" />
          <div>
            <h1 className="text-lg font-extrabold text-gray-900 dark:text-white">Admin Panel</h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">4IELTS Vocabulary App</p>
          </div>
        </div>
        <button onClick={() => { fetchRequests(adminPassword); fetchReviews(adminPassword); }} disabled={refreshing}
          className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
          <RefreshCw className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`} />
          Refresh
        </button>
      </header>

      <div className="max-w-5xl mx-auto p-6">
        {/* Tabs */}
        <div className="flex gap-2 mb-6 flex-wrap">
          <button onClick={() => setTab("requests")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors ${tab === "requests" ? "bg-teal-600 text-white" : "bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700 hover:bg-gray-50"}`}>
            <Users className="w-4 h-4" />
            Requests
            {counts.pending > 0 && <span className="bg-amber-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{counts.pending}</span>}
          </button>
          <button onClick={() => setTab("reviews")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors ${tab === "reviews" ? "bg-teal-600 text-white" : "bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700 hover:bg-gray-50"}`}>
            <MessageSquare className="w-4 h-4" />
            Reviews
            {reviewCounts.pending > 0 && <span className="bg-amber-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{reviewCounts.pending}</span>}
          </button>
          <button onClick={() => setTab("settings")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors ${tab === "settings" ? "bg-teal-600 text-white" : "bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700 hover:bg-gray-50"}`}>
            <KeyRound className="w-4 h-4" />
            Settings
          </button>
        </div>

        {/* ── REQUESTS TAB ─────────────────────────────────────────────────────── */}
        {tab === "requests" && (
          <>
            {/* Stats */}
            <div className="grid grid-cols-4 gap-4 mb-6">
              {(["all", "pending", "approved", "rejected"] as Filter[]).map(f => (
                <button key={f} onClick={() => setFilter(f)}
                  className={`bg-white dark:bg-gray-900 rounded-2xl p-4 border text-left transition-all ${filter === f ? "border-teal-500 ring-2 ring-teal-200 dark:ring-teal-900" : "border-gray-200 dark:border-gray-800 hover:border-teal-300"}`}>
                  <p className="text-2xl font-extrabold text-gray-900 dark:text-white">{counts[f]}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 capitalize mt-0.5">{f}</p>
                </button>
              ))}
            </div>

            {/* Search + Export bar */}
            <div className="flex flex-col sm:flex-row gap-3 mb-5">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search by email…"
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
                />
              </div>
              <div className="flex gap-2 shrink-0">
                <button
                  onClick={() => downloadCSV(requests, filter)}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  title="Export as Excel/CSV"
                >
                  <Download className="w-4 h-4" />
                  Excel / CSV
                </button>
                <button
                  onClick={() => printEmails(requests, filter)}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  title="Print / Save as PDF"
                >
                  <Download className="w-4 h-4" />
                  PDF / Print
                </button>
              </div>
            </div>

            {/* List */}
            {filteredRequests.length === 0 ? (
              <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-12 text-center">
                <Users className="w-10 h-10 text-gray-300 dark:text-gray-700 mx-auto mb-3" />
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  {searchQuery ? `No results for "${searchQuery}"` : `No ${filter !== "all" ? filter : ""} requests yet.`}
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredRequests.map((r) => {
                  const exp = r.expiresAt ? expiryStatus(r.expiresAt) : null;
                  const isEditingExpiry = editExpiry[r.id] !== undefined;
                  return (
                    <div key={r.id} className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-4">
                      <div className="flex flex-wrap items-start gap-3">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{r.email}</p>
                          <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                            Requested {new Date(r.requestedAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                          </p>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {statusBadge(r)}
                            {exp && (
                              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${exp.color}`}>
                                <Calendar className="w-3 h-3" />
                                {exp.label}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex flex-col gap-2 items-end shrink-0">
                          {r.status === "pending" && (
                            <div className="flex items-center gap-2 flex-wrap justify-end">
                              <div className="flex items-center gap-1.5">
                                <Calendar className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                                <input
                                  type="date"
                                  min={todayStr}
                                  value={pendingExpiry[r.id] ?? oneYearFromNow()}
                                  onChange={e => setPendingExpiry(prev => ({ ...prev, [r.id]: e.target.value }))}
                                  className="text-xs px-2 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                                  title="Expiration date (defaults to 1 year from now)"
                                />
                              </div>
                              <button
                                onClick={() => handleApprove(r.id)}
                                disabled={actionLoading === r.id}
                                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-green-600 hover:bg-green-700 text-white text-xs font-medium transition-colors disabled:opacity-50"
                              >
                                {actionLoading === r.id ? <Loader2 className="w-3 h-3 animate-spin" /> : <CheckCircle2 className="w-3 h-3" />}
                                Approve
                              </button>
                              <button
                                onClick={() => handleAction(r.id, "reject")}
                                disabled={actionLoading === r.id}
                                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-100 hover:bg-red-200 dark:bg-red-900/30 dark:hover:bg-red-900/50 text-red-700 dark:text-red-400 text-xs font-medium transition-colors disabled:opacity-50"
                              >
                                <XCircle className="w-3 h-3" />
                                Reject
                              </button>
                            </div>
                          )}

                          {r.status === "approved" && (
                            <div className="flex items-center gap-2 flex-wrap justify-end">
                              {isEditingExpiry ? (
                                <>
                                  <input
                                    type="date"
                                    min={todayStr}
                                    value={editExpiry[r.id]}
                                    onChange={e => setEditExpiry(prev => ({ ...prev, [r.id]: e.target.value }))}
                                    className="text-xs px-2 py-1.5 rounded-lg border border-teal-400 dark:border-teal-600 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                                  />
                                  <button
                                    onClick={() => handleSetExpiry(r.id)}
                                    disabled={expiryLoading === r.id}
                                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-xs font-medium transition-colors disabled:opacity-50"
                                  >
                                    {expiryLoading === r.id ? <Loader2 className="w-3 h-3 animate-spin" /> : <CheckCircle2 className="w-3 h-3" />}
                                    Save
                                  </button>
                                  <button
                                    onClick={() => setEditExpiry(prev => { const n = { ...prev }; delete n[r.id]; return n; })}
                                    className="text-xs px-2 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                                  >
                                    Cancel
                                  </button>
                                </>
                              ) : (
                                <button
                                  onClick={() => setEditExpiry(prev => ({ ...prev, [r.id]: r.expiresAt ? r.expiresAt.split("T")[0] : oneYearFromNow() }))}
                                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 text-xs font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                                >
                                  <Calendar className="w-3 h-3" />
                                  {r.expiresAt ? "Change Expiry" : "Set Expiry"}
                                </button>
                              )}
                              <button
                                onClick={() => handleAction(r.id, "reject")}
                                disabled={actionLoading === r.id}
                                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-100 hover:bg-red-200 dark:bg-red-900/30 dark:hover:bg-red-900/50 text-red-700 dark:text-red-400 text-xs font-medium transition-colors disabled:opacity-50"
                              >
                                <XCircle className="w-3 h-3" />
                                Revoke
                              </button>
                            </div>
                          )}

                          {r.status === "rejected" && (
                            <button
                              onClick={() => handleApprove(r.id)}
                              disabled={actionLoading === r.id}
                              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-green-600 hover:bg-green-700 text-white text-xs font-medium transition-colors disabled:opacity-50"
                            >
                              <CheckCircle2 className="w-3 h-3" />
                              Re-approve
                            </button>
                          )}

                          <button
                            onClick={() => handleAction(r.id, "delete")}
                            disabled={actionLoading === r.id}
                            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs font-medium transition-colors disabled:opacity-50"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}

        {/* ── REVIEWS TAB ──────────────────────────────────────────────────────── */}
        {tab === "reviews" && (
          <>
            <div className="grid grid-cols-4 gap-4 mb-6">
              {(["all", "pending", "approved", "rejected"] as Filter[]).map(f => (
                <button key={f} onClick={() => setReviewFilter(f)}
                  className={`bg-white dark:bg-gray-900 rounded-2xl p-4 border text-left transition-all ${reviewFilter === f ? "border-teal-500 ring-2 ring-teal-200 dark:ring-teal-900" : "border-gray-200 dark:border-gray-800 hover:border-teal-300"}`}>
                  <p className="text-2xl font-extrabold text-gray-900 dark:text-white">{reviewCounts[f]}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 capitalize mt-0.5">{f}</p>
                </button>
              ))}
            </div>

            {filteredReviews.length === 0 ? (
              <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-12 text-center">
                <MessageSquare className="w-10 h-10 text-gray-300 dark:text-gray-700 mx-auto mb-3" />
                <p className="text-gray-500 dark:text-gray-400 text-sm">No {reviewFilter !== "all" ? reviewFilter : ""} reviews yet.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredReviews.map(r => (
                  <div key={r.id} className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-4 space-y-3">
                    <div className="flex items-start justify-between gap-3 flex-wrap">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="text-sm font-semibold text-gray-900 dark:text-white">
                            {r.name || <span className="text-gray-400 font-normal italic">Anonymous</span>}
                          </p>
                          {reviewStatusBadge(r.status)}
                        </div>
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{r.email} · {formatDate(r.createdAt)}</p>
                        <StarRow rating={r.rating} />
                      </div>
                      <div className="flex gap-2 shrink-0">
                        {r.status !== "approved" && (
                          <button
                            onClick={() => handleReviewAction(r.id, "approve")}
                            disabled={reviewActionLoading === r.id}
                            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-green-600 hover:bg-green-700 text-white text-xs font-medium transition-colors disabled:opacity-50"
                          >
                            {reviewActionLoading === r.id ? <Loader2 className="w-3 h-3 animate-spin" /> : <ShieldCheck className="w-3 h-3" />}
                            Approve
                          </button>
                        )}
                        {r.status !== "rejected" && (
                          <button
                            onClick={() => handleReviewAction(r.id, "reject")}
                            disabled={reviewActionLoading === r.id}
                            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-100 hover:bg-red-200 dark:bg-red-900/30 dark:hover:bg-red-900/50 text-red-700 dark:text-red-400 text-xs font-medium transition-colors disabled:opacity-50"
                          >
                            <XCircle className="w-3 h-3" />
                            Reject
                          </button>
                        )}
                        <button
                          onClick={() => handleReviewAction(r.id, "delete")}
                          disabled={reviewActionLoading === r.id}
                          className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs font-medium transition-colors disabled:opacity-50"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed bg-gray-50 dark:bg-gray-800 rounded-xl px-4 py-3">
                      {r.comment}
                    </p>

                    {/* Existing admin reply (if any) */}
                    {r.adminReply && replyEditingId !== r.id && (
                      <div className="ml-6 border-l-4 border-teal-400 dark:border-teal-600 bg-teal-50/60 dark:bg-teal-900/20 rounded-r-xl px-4 py-3">
                        <div className="flex items-start justify-between gap-2 mb-1.5">
                          <div className="flex items-center gap-1.5">
                            {adminAvatar ? (
                              <img src={adminAvatar} alt="Abu Omar" className="w-6 h-6 rounded-full object-cover ring-1 ring-teal-300 dark:ring-teal-700" />
                            ) : (
                              <div className="w-6 h-6 rounded-full bg-teal-600 text-white text-[10px] font-bold flex items-center justify-center">AO</div>
                            )}
                            <span className="text-xs font-semibold text-teal-800 dark:text-teal-300">Abu Omar</span>
                            <BadgeCheck className="w-3.5 h-3.5 text-sky-500 fill-sky-500/15" aria-label="Verified" />
                            <span className="text-xs text-gray-400">replied</span>
                            {r.adminReplyAt && (
                              <span className="text-xs text-gray-400">· {formatDate(r.adminReplyAt)}</span>
                            )}
                          </div>
                          <div className="flex gap-1">
                            <button
                              onClick={() => startReply(r)}
                              disabled={replyLoading === r.id}
                              className="flex items-center gap-1 px-2 py-1 rounded-md bg-white dark:bg-gray-800 border border-teal-200 dark:border-teal-800 text-teal-700 dark:text-teal-400 text-xs hover:bg-teal-50 dark:hover:bg-teal-900/30 transition-colors disabled:opacity-50"
                            >
                              <Pencil className="w-3 h-3" /> Edit
                            </button>
                            <button
                              onClick={() => deleteReply(r.id)}
                              disabled={replyLoading === r.id}
                              className="flex items-center gap-1 px-2 py-1 rounded-md bg-white dark:bg-gray-800 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-xs hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors disabled:opacity-50"
                            >
                              {replyLoading === r.id ? <Loader2 className="w-3 h-3 animate-spin" /> : <Trash2 className="w-3 h-3" />}
                            </button>
                          </div>
                        </div>
                        <p className="text-sm text-gray-800 dark:text-gray-200 whitespace-pre-wrap">{r.adminReply}</p>
                      </div>
                    )}

                    {/* Reply editor (publish or edit) */}
                    {replyEditingId === r.id && (
                      <div className="ml-6 border-l-4 border-teal-400 dark:border-teal-600 bg-teal-50/60 dark:bg-teal-900/20 rounded-r-xl px-4 py-3 space-y-2">
                        <div className="flex items-center gap-1.5">
                          {adminAvatar ? (
                            <img src={adminAvatar} alt="Abu Omar" className="w-6 h-6 rounded-full object-cover ring-1 ring-teal-300 dark:ring-teal-700" />
                          ) : (
                            <div className="w-6 h-6 rounded-full bg-teal-600 text-white text-[10px] font-bold flex items-center justify-center">AO</div>
                          )}
                          <span className="text-xs font-semibold text-teal-800 dark:text-teal-300">Abu Omar</span>
                          <BadgeCheck className="w-3.5 h-3.5 text-sky-500 fill-sky-500/15" />
                          <span className="text-xs text-gray-400">{r.adminReply ? "editing reply" : "writing a reply"}</span>
                        </div>
                        <textarea
                          value={replyDraft}
                          onChange={e => setReplyDraft(e.target.value)}
                          rows={3}
                          maxLength={2000}
                          placeholder="Write a public reply that students will see…"
                          className="w-full px-3 py-2 rounded-lg border border-teal-200 dark:border-teal-800 bg-white dark:bg-gray-900 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
                          autoFocus
                        />
                        <div className="flex items-center justify-between">
                          <p className="text-xs text-gray-400">{replyDraft.length}/2000</p>
                          <div className="flex gap-2">
                            <button
                              onClick={cancelReply}
                              disabled={replyLoading === r.id}
                              className="px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => publishReply(r.id)}
                              disabled={replyLoading === r.id || !replyDraft.trim()}
                              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold transition-colors disabled:opacity-50"
                            >
                              {replyLoading === r.id ? <Loader2 className="w-3 h-3 animate-spin" /> : <Send className="w-3 h-3" />}
                              {r.adminReply ? "Save" : "Publish"}
                            </button>
                          </div>
                        </div>
                        {replyError && replyError.id === r.id && (
                          <div className="flex items-center gap-2 text-xs rounded-lg p-2 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400">
                            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                            {replyError.text}
                          </div>
                        )}
                      </div>
                    )}
                    {replyError && replyError.id === r.id && replyEditingId !== r.id && (
                      <div className="flex items-center gap-2 text-xs rounded-lg p-2 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        {replyError.text}
                      </div>
                    )}

                    {/* Reply CTA: only for approved reviews without an existing reply / not currently editing */}
                    {r.status === "approved" && !r.adminReply && replyEditingId !== r.id && (
                      <button
                        onClick={() => startReply(r)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800 text-xs font-medium hover:bg-teal-100 dark:hover:bg-teal-900/50 transition-colors w-fit"
                      >
                        <Reply className="w-3.5 h-3.5" />
                        Reply as Abu Omar
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* ── SETTINGS TAB ─────────────────────────────────────────────────────── */}
        {tab === "settings" && (
          <div className="max-w-md space-y-6">

            {/* Access Code */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 space-y-6">
              <div className="flex items-center gap-2 mb-1">
                <KeyRound className="w-5 h-5 text-teal-600" />
                <h2 className="font-bold text-gray-900 dark:text-white">Student Access Code</h2>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">Current Access Code</p>
                <p className="text-2xl font-mono font-bold text-teal-700 dark:text-teal-300 tracking-widest bg-teal-50 dark:bg-teal-900/20 rounded-xl px-4 py-3">{accessCode || "—"}</p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">Share this with students who have paid.</p>
              </div>
              <form onSubmit={handleChangeCode} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">New Access Code</label>
                  <div className="relative">
                    <input type={showNewCode ? "text" : "password"} value={newCode}
                      onChange={(e) => setNewCode(e.target.value)}
                      placeholder="Enter new access code…"
                      className="w-full px-4 py-3 pr-10 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm" />
                    <button type="button" onClick={() => setShowNewCode(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" tabIndex={-1}>
                      {showNewCode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                {codeMsg && (
                  <div className={`flex items-center gap-2 text-sm rounded-xl p-3 ${codeMsg.type === "success" ? "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400" : "bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400"}`}>
                    {codeMsg.type === "success" ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
                    {codeMsg.text}
                  </div>
                )}
                <button type="submit" disabled={codeLoading || !newCode.trim()}
                  className="w-full py-3 rounded-xl bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white font-semibold transition-colors flex items-center justify-center gap-2">
                  {codeLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <KeyRound className="w-4 h-4" />}
                  {codeLoading ? "Saving…" : "Change Access Code"}
                </button>
              </form>
              <p className="text-xs text-gray-400 dark:text-gray-500">Changing the code does not affect already-approved students.</p>
            </div>

            {/* Admin Password */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
              <div className="flex items-center gap-2 mb-1">
                <KeySquare className="w-5 h-5 text-rose-600" />
                <h2 className="font-bold text-gray-900 dark:text-white">Admin Password</h2>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Change the password you use to log into this admin panel. Must be at least 6 characters.</p>
              <form onSubmit={handleChangePassword} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">New Admin Password</label>
                  <div className="relative">
                    <input type={showNewPwd ? "text" : "password"} value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Enter new password…"
                      minLength={6}
                      className="w-full px-4 py-3 pr-10 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-500 text-sm" />
                    <button type="button" onClick={() => setShowNewPwd(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" tabIndex={-1}>
                      {showNewPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                {pwdMsg && (
                  <div className={`flex items-center gap-2 text-sm rounded-xl p-3 ${pwdMsg.type === "success" ? "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400" : "bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400"}`}>
                    {pwdMsg.type === "success" ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
                    {pwdMsg.text}
                  </div>
                )}
                <button type="submit" disabled={pwdLoading || !newPassword.trim() || newPassword.trim().length < 6}
                  className="w-full py-3 rounded-xl bg-rose-600 hover:bg-rose-700 disabled:opacity-50 text-white font-semibold transition-colors flex items-center justify-center gap-2">
                  {pwdLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Lock className="w-4 h-4" />}
                  {pwdLoading ? "Saving…" : "Change Admin Password"}
                </button>
              </form>
            </div>

            {/* Reply Profile Photo */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
              <div className="flex items-center gap-2 mb-1">
                <ImageIcon className="w-5 h-5 text-teal-600" />
                <h2 className="font-bold text-gray-900 dark:text-white">Reply Profile Photo</h2>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Shown next to "Abu Omar" on every public reply. Square photo recommended; it will be cropped to a circle and resized to 256×256.
              </p>

              <div className="flex items-center gap-4">
                {adminAvatar ? (
                  <img
                    src={adminAvatar}
                    alt="Abu Omar"
                    className="w-16 h-16 rounded-full object-cover ring-2 ring-teal-300 dark:ring-teal-700"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-teal-600 text-white font-bold text-xl flex items-center justify-center ring-2 ring-teal-300 dark:ring-teal-700">
                    AO
                  </div>
                )}
                <div className="flex flex-col gap-2">
                  <label className={`flex items-center gap-2 px-4 py-2 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-sm font-medium cursor-pointer transition-colors ${avatarUploading ? "opacity-50 pointer-events-none" : ""}`}>
                    {avatarUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                    {adminAvatar ? "Change Photo" : "Upload Photo"}
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      disabled={avatarUploading}
                      onChange={(e) => {
                        const f = e.target.files?.[0];
                        if (f) handleAvatarFile(f);
                        e.target.value = "";
                      }}
                    />
                  </label>
                  {adminAvatar && (
                    <button
                      onClick={removeAvatar}
                      disabled={avatarUploading}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm font-medium transition-colors disabled:opacity-50"
                    >
                      <Trash2 className="w-4 h-4" /> Remove
                    </button>
                  )}
                </div>
              </div>

              {avatarMsg && (
                <div className={`flex items-center gap-2 text-sm rounded-xl p-3 ${avatarMsg.type === "success" ? "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400" : "bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400"}`}>
                  {avatarMsg.type === "success" ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
                  {avatarMsg.text}
                </div>
              )}
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
