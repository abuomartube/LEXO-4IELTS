import { useState, useEffect, useCallback } from "react";
import { Eye, EyeOff, Loader2, CheckCircle2, XCircle, Clock, Trash2, RefreshCw, Lock, KeyRound, Users, AlertCircle } from "lucide-react";

interface AccessRequest {
  id: number;
  email: string;
  status: "pending" | "approved" | "rejected";
  requestedAt: string;
  reviewedAt: string | null;
}

type Tab = "requests" | "settings";
type Filter = "all" | "pending" | "approved" | "rejected";

export default function AdminPage() {
  const [adminPassword, setAdminPassword] = useState("");
  const [showAdmin, setShowAdmin] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  const [requests, setRequests] = useState<AccessRequest[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState<Filter>("all");
  const [tab, setTab] = useState<Tab>("requests");
  const [actionLoading, setActionLoading] = useState<number | null>(null);

  const [accessCode, setAccessCode] = useState("");
  const [newCode, setNewCode] = useState("");
  const [showNewCode, setShowNewCode] = useState(false);
  const [codeMsg, setCodeMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [codeLoading, setCodeLoading] = useState(false);

  const fetchRequests = useCallback(async (ap: string) => {
    setRefreshing(true);
    try {
      const res = await fetch("/api/admin/requests", { headers: { "x-admin-password": ap } });
      if (res.ok) { setRequests(await res.json()); }
    } finally { setRefreshing(false); }
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
      } else { setLoginError("Wrong admin password. Try again."); }
    } catch { setLoginError("Connection error."); }
    finally { setLoginLoading(false); }
  };

  const handleAction = async (id: number, action: "approve" | "reject" | "delete") => {
    setActionLoading(id);
    try {
      const url = action === "delete" ? `/api/admin/requests/${id}` : `/api/admin/requests/${id}/${action}`;
      await fetch(url, {
        method: action === "delete" ? "DELETE" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ adminPassword }),
      });
      await fetchRequests(adminPassword);
    } finally { setActionLoading(null); }
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

  const filtered = requests.filter(r => filter === "all" || r.status === filter);
  const counts = {
    all: requests.length,
    pending: requests.filter(r => r.status === "pending").length,
    approved: requests.filter(r => r.status === "approved").length,
    rejected: requests.filter(r => r.status === "rejected").length,
  };

  const statusBadge = (status: string) => {
    if (status === "approved") return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"><CheckCircle2 className="w-3 h-3" />Approved</span>;
    if (status === "rejected") return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"><XCircle className="w-3 h-3" />Rejected</span>;
    return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"><Clock className="w-3 h-3" />Pending</span>;
  };

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
        <button onClick={() => fetchRequests(adminPassword)} disabled={refreshing}
          className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
          <RefreshCw className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`} />
          Refresh
        </button>
      </header>

      <div className="max-w-5xl mx-auto p-6">
        <div className="flex gap-2 mb-6">
          <button onClick={() => setTab("requests")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors ${tab === "requests" ? "bg-teal-600 text-white" : "bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700 hover:bg-gray-50"}`}>
            <Users className="w-4 h-4" />
            Requests {counts.pending > 0 && <span className="bg-amber-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{counts.pending}</span>}
          </button>
          <button onClick={() => setTab("settings")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors ${tab === "settings" ? "bg-teal-600 text-white" : "bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700 hover:bg-gray-50"}`}>
            <KeyRound className="w-4 h-4" />
            Access Code
          </button>
        </div>

        {tab === "requests" && (
          <>
            <div className="grid grid-cols-4 gap-4 mb-6">
              {(["all", "pending", "approved", "rejected"] as Filter[]).map(f => (
                <button key={f} onClick={() => setFilter(f)}
                  className={`bg-white dark:bg-gray-900 rounded-2xl p-4 border text-left transition-all ${filter === f ? "border-teal-500 ring-2 ring-teal-200 dark:ring-teal-900" : "border-gray-200 dark:border-gray-800 hover:border-teal-300"}`}>
                  <p className="text-2xl font-extrabold text-gray-900 dark:text-white">{counts[f]}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 capitalize mt-0.5">{f}</p>
                </button>
              ))}
            </div>

            {filtered.length === 0 ? (
              <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-12 text-center">
                <Users className="w-10 h-10 text-gray-300 dark:text-gray-700 mx-auto mb-3" />
                <p className="text-gray-500 dark:text-gray-400 text-sm">No {filter !== "all" ? filter : ""} requests yet.</p>
              </div>
            ) : (
              <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-100 dark:border-gray-800">
                      <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Email</th>
                      <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Status</th>
                      <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Requested</th>
                      <th className="text-right px-6 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((r, i) => (
                      <tr key={r.id} className={`border-b border-gray-50 dark:border-gray-800/50 last:border-0 ${i % 2 === 0 ? "" : "bg-gray-50/50 dark:bg-gray-800/20"}`}>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">{r.email}</td>
                        <td className="px-6 py-4">{statusBadge(r.status)}</td>
                        <td className="px-6 py-4 text-xs text-gray-500 dark:text-gray-400">
                          {new Date(r.requestedAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end gap-2">
                            {r.status !== "approved" && (
                              <button onClick={() => handleAction(r.id, "approve")} disabled={actionLoading === r.id}
                                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-green-600 hover:bg-green-700 text-white text-xs font-medium transition-colors disabled:opacity-50">
                                {actionLoading === r.id ? <Loader2 className="w-3 h-3 animate-spin" /> : <CheckCircle2 className="w-3 h-3" />}
                                Approve
                              </button>
                            )}
                            {r.status !== "rejected" && (
                              <button onClick={() => handleAction(r.id, "reject")} disabled={actionLoading === r.id}
                                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-100 hover:bg-red-200 dark:bg-red-900/30 dark:hover:bg-red-900/50 text-red-700 dark:text-red-400 text-xs font-medium transition-colors disabled:opacity-50">
                                {actionLoading === r.id ? <Loader2 className="w-3 h-3 animate-spin" /> : <XCircle className="w-3 h-3" />}
                                Reject
                              </button>
                            )}
                            <button onClick={() => handleAction(r.id, "delete")} disabled={actionLoading === r.id}
                              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs font-medium transition-colors disabled:opacity-50">
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}

        {tab === "settings" && (
          <div className="max-w-md">
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 space-y-6">
              <div>
                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">Current Access Code</p>
                <p className="text-2xl font-mono font-bold text-teal-700 dark:text-teal-300 tracking-widest bg-teal-50 dark:bg-teal-900/20 rounded-xl px-4 py-3">{accessCode || "—"}</p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">This is the code you share with students who have paid.</p>
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
          </div>
        )}
      </div>
    </div>
  );
}
