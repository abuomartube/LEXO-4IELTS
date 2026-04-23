import { useState, useEffect, useMemo } from "react";
import {
  GraduationCap, Flame, Star, AlertTriangle, BookOpen,
  Trophy, ArrowUpDown, Search, X, LogIn, Eye, EyeOff,
  RefreshCw, Users, TrendingUp, PlayCircle, Plus, Trash2, Loader2,
  UserCheck, UserX, KeyRound, Copy, Check, Bell, Mail, Clock, ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend,
} from "recharts";

const API = import.meta.env.VITE_API_URL || "";

interface StudentRow {
  email: string;
  joinedAt: string;
  xp: number;
  level: number;
  levelName: string;
  streak: number;
  weakWordsCount: number;
  wordsKnown: number;
  quizzesTaken: number;
  assignmentsCompleted: number;
  lessonsCompleted: number;
  lastActivity: string | null;
}

interface AdminLesson {
  id: number;
  title: string;
  vimeoUrl: string;
  embedUrl: string;
  orderIndex: number;
}

interface AdminLessonsResponse {
  libraryTitle: string;
  lessons: AdminLesson[];
}

interface AccessRequest {
  id: number;
  email: string;
  status: string;
  requestedAt: string;
  reviewedAt: string | null;
  expiresAt: string | null;
  accessCodeId: number | null;
}

interface AccessCodeRow {
  id: number;
  code: string;
  note: string | null;
  createdAt: string;
  usedByEmail: string | null;
  usedAt: string | null;
}

type SortKey = "email" | "xp" | "streak" | "weakWordsCount" | "wordsKnown" | "quizzesTaken" | "assignmentsCompleted" | "lessonsCompleted" | "level" | "lastActivity";

function formatDate(d: string | null): string {
  if (!d) return "—";
  const date = new Date(d);
  return date.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

function LevelBadge({ level, name }: { level: number; name: string }) {
  const colors: Record<number, string> = {
    1: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
    2: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
    3: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900 dark:text-cyan-300",
    4: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
    5: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300",
    6: "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300",
    7: "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300",
    8: "bg-rose-100 text-rose-700 dark:bg-rose-900 dark:text-rose-300",
  };
  return (
    <span className={cn("text-xs font-bold px-2 py-0.5 rounded-full whitespace-nowrap", colors[level] || colors[1])}>
      L{level} {name}
    </span>
  );
}

export default function TeacherDashboard() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [students, setStudents] = useState<StudentRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("xp");
  const [sortDesc, setSortDesc] = useState(true);
  const [lessonCounts, setLessonCounts] = useState<Record<string, number>>({});

  // Lessons manager state
  const [lessonsData, setLessonsData] = useState<AdminLessonsResponse | null>(null);
  const [lessonsLoading, setLessonsLoading] = useState(false);
  const [lessonsError, setLessonsError] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [creating, setCreating] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  // Approval queue state
  const [pendingRequests, setPendingRequests] = useState<AccessRequest[]>([]);
  const [requestsLoading, setRequestsLoading] = useState(false);
  const [actingOnId, setActingOnId] = useState<number | null>(null);

  // Access codes state
  const [accessCodes, setAccessCodes] = useState<AccessCodeRow[]>([]);
  const [unusedCount, setUnusedCount] = useState(0);
  const [codesLoading, setCodesLoading] = useState(false);
  const [codesError, setCodesError] = useState("");
  const [newCodeNote, setNewCodeNote] = useState("");
  const [newCodeCount, setNewCodeCount] = useState(1);
  const [generating, setGenerating] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const [deletingCodeId, setDeletingCodeId] = useState<number | null>(null);
  // Per-student writing history modal
  const [historyEmail, setHistoryEmail] = useState<string | null>(null);
  const [sentenceEmail, setSentenceEmail] = useState<string | null>(null);
  const [showOnlyUnused, setShowOnlyUnused] = useState(true);

  const savedPass = typeof sessionStorage !== "undefined" ? sessionStorage.getItem("teacher_pass") : null;

  useEffect(() => {
    if (savedPass) {
      setPassword(savedPass);
      setAuthed(true);
    }
  }, []);

  useEffect(() => {
    if (authed) {
      fetchStudents();
      fetchLessonCounts();
      fetchLessons();
      fetchPendingRequests();
      fetchAccessCodes();
    }
  }, [authed]);

  // Auto-poll the approval queue every 20s so admins see new signups quickly.
  useEffect(() => {
    if (!authed) return;
    const t = setInterval(() => { fetchPendingRequests(); }, 20000);
    return () => clearInterval(t);
  }, [authed, password]);

  async function fetchPendingRequests() {
    setRequestsLoading(true);
    try {
      const res = await fetch(`${API}/api/admin/requests`, {
        headers: { "x-admin-password": password },
      });
      if (!res.ok) return;
      const all: AccessRequest[] = await res.json();
      setPendingRequests(all.filter((r) => r.status === "pending"));
    } catch { /* ignore */ }
    finally { setRequestsLoading(false); }
  }

  async function approveRequest(id: number) {
    setActingOnId(id);
    try {
      // Default expiry: 1 year from now
      const expiresAt = new Date(Date.now() + 365 * 86400000).toISOString();
      const res = await fetch(`${API}/api/admin/requests/${id}/approve`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-admin-password": password },
        body: JSON.stringify({ expiresAt }),
      });
      if (res.ok) {
        await Promise.all([fetchPendingRequests(), fetchStudents()]);
      }
    } finally { setActingOnId(null); }
  }

  async function rejectRequest(id: number, email: string) {
    if (!confirm(`Reject access request from ${email}?`)) return;
    setActingOnId(id);
    try {
      const res = await fetch(`${API}/api/admin/requests/${id}/reject`, {
        method: "POST",
        headers: { "x-admin-password": password },
      });
      if (res.ok) await fetchPendingRequests();
    } finally { setActingOnId(null); }
  }

  async function fetchAccessCodes() {
    setCodesLoading(true);
    setCodesError("");
    try {
      const res = await fetch(`${API}/api/admin/access-codes`, {
        headers: { "x-admin-password": password },
      });
      if (!res.ok) { setCodesError("Failed to load codes"); return; }
      const data = await res.json();
      setAccessCodes(data.codes ?? []);
      setUnusedCount(data.unusedCount ?? 0);
    } catch { setCodesError("Network error"); }
    finally { setCodesLoading(false); }
  }

  async function generateCodes(e: React.FormEvent) {
    e.preventDefault();
    setGenerating(true);
    setCodesError("");
    try {
      const res = await fetch(`${API}/api/admin/access-codes`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-admin-password": password },
        body: JSON.stringify({ count: newCodeCount, note: newCodeNote.trim() || null }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        setCodesError(j.error || "Could not generate codes");
        return;
      }
      setNewCodeNote("");
      setNewCodeCount(1);
      await fetchAccessCodes();
    } catch { setCodesError("Network error"); }
    finally { setGenerating(false); }
  }

  async function deleteCode(id: number, code: string) {
    if (!confirm(`Delete access code ${code}? This cannot be undone.`)) return;
    setDeletingCodeId(id);
    try {
      const res = await fetch(`${API}/api/admin/access-codes/${id}`, {
        method: "DELETE",
        headers: { "x-admin-password": password },
      });
      if (res.ok) await fetchAccessCodes();
    } finally { setDeletingCodeId(null); }
  }

  function copyCode(code: string) {
    navigator.clipboard?.writeText(code).then(() => {
      setCopiedCode(code);
      setTimeout(() => setCopiedCode((c) => (c === code ? null : c)), 1500);
    }).catch(() => {});
  }

  async function fetchLessonCounts() {
    try {
      const res = await fetch(`${API}/api/admin/lesson-completion-counts`, {
        headers: { "x-admin-password": password },
      });
      if (!res.ok) return;
      const data: Array<{ email: string; completed: number }> = await res.json();
      const map: Record<string, number> = {};
      for (const r of data) map[r.email] = r.completed;
      setLessonCounts(map);
    } catch { /* ignore */ }
  }

  async function fetchLessons() {
    setLessonsLoading(true);
    setLessonsError("");
    try {
      const res = await fetch(`${API}/api/admin/lessons`, {
        headers: { "x-admin-password": password },
      });
      if (!res.ok) { setLessonsError("Failed to load lessons"); return; }
      setLessonsData(await res.json());
    } catch {
      setLessonsError("Network error");
    } finally {
      setLessonsLoading(false);
    }
  }

  async function createLesson(e: React.FormEvent) {
    e.preventDefault();
    if (!newTitle.trim() || !newUrl.trim()) return;
    setCreating(true);
    setLessonsError("");
    try {
      const res = await fetch(`${API}/api/admin/lessons`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-admin-password": password },
        body: JSON.stringify({ title: newTitle.trim(), vimeoUrl: newUrl.trim() }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        setLessonsError(j.error || "Could not add lesson");
        return;
      }
      setNewTitle("");
      setNewUrl("");
      await fetchLessons();
    } catch {
      setLessonsError("Network error");
    } finally {
      setCreating(false);
    }
  }

  async function deleteLesson(id: number) {
    if (!confirm("Delete this lesson? Students will lose access immediately.")) return;
    setDeletingId(id);
    try {
      const res = await fetch(`${API}/api/admin/lessons/${id}`, {
        method: "DELETE",
        headers: { "x-admin-password": password },
      });
      if (res.ok) await fetchLessons();
    } finally {
      setDeletingId(null);
    }
  }

  async function fetchStudents() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API}/api/teacher/students`, {
        headers: { "x-admin-password": password },
      });
      if (!res.ok) {
        if (res.status === 403) {
          setAuthed(false);
          setError("Incorrect password");
          sessionStorage.removeItem("teacher_pass");
        } else {
          setError("Failed to load data");
        }
        setStudents([]);
        return;
      }
      const data: StudentRow[] = await res.json();
      setStudents(data);
    } catch {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  }

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (!password.trim()) return;
    sessionStorage.setItem("teacher_pass", password.trim());
    setAuthed(true);
  }

  function toggleSort(key: SortKey) {
    if (sortKey === key) setSortDesc(!sortDesc);
    else { setSortKey(key); setSortDesc(true); }
  }

  const filtered = useMemo(() => {
    let list = students.map((s) => ({ ...s, lessonsCompleted: lessonCounts[s.email] ?? 0 }));
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((s) => s.email.toLowerCase().includes(q));
    }
    list = [...list].sort((a, b) => {
      let aVal: number | string = a[sortKey] ?? "";
      let bVal: number | string = b[sortKey] ?? "";
      if (typeof aVal === "string") aVal = aVal.toLowerCase();
      if (typeof bVal === "string") bVal = bVal.toLowerCase();
      if (aVal < bVal) return sortDesc ? 1 : -1;
      if (aVal > bVal) return sortDesc ? -1 : 1;
      return 0;
    });
    return list;
  }, [students, search, sortKey, sortDesc]);

  const totals = useMemo(() => ({
    students: students.length,
    avgXp: students.length ? Math.round(students.reduce((s, r) => s + r.xp, 0) / students.length) : 0,
    activeToday: students.filter((s) => s.lastActivity === new Date().toISOString().slice(0, 10)).length,
    avgStreak: students.length ? (students.reduce((s, r) => s + r.streak, 0) / students.length).toFixed(1) : "0",
  }), [students]);

  if (!authed) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <form onSubmit={handleLogin} className="bg-card border border-border rounded-3xl p-8 w-full max-w-sm space-y-5">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
              <GraduationCap className="w-7 h-7 text-primary" />
            </div>
            <h1 className="text-2xl font-extrabold text-foreground">Teacher Dashboard</h1>
            <p className="text-sm text-muted-foreground">Enter admin password to view student progress</p>
          </div>
          <div className="relative">
            <input
              type={showPass ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Admin password"
              className="w-full px-4 py-3 pr-10 bg-muted/50 border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              autoFocus
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {error && <p className="text-sm text-red-500 text-center">{error}</p>}
          <button
            type="submit"
            className="w-full bg-primary text-primary-foreground font-bold py-3 rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
          >
            <LogIn className="w-4 h-4" />
            Sign In
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-foreground flex items-center gap-2 flex-wrap">
                Teacher Dashboard
                {pendingRequests.length > 0 && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500 text-white text-xs font-bold animate-pulse">
                    <Bell className="w-3 h-3" />
                    {pendingRequests.length} pending
                  </span>
                )}
              </h1>
              <p className="text-sm text-muted-foreground">
                {students.length} student{students.length !== 1 ? "s" : ""} enrolled
                {" · "}{unusedCount} unused code{unusedCount !== 1 ? "s" : ""}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={fetchStudents}
              disabled={loading}
              className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground bg-muted/50 px-4 py-2 rounded-xl transition-colors disabled:opacity-50"
            >
              <RefreshCw className={cn("w-4 h-4", loading && "animate-spin")} />
              Refresh
            </button>
            <button
              onClick={() => { sessionStorage.removeItem("teacher_pass"); setAuthed(false); setPassword(""); setStudents([]); }}
              className="flex items-center gap-2 text-sm font-medium text-red-500 hover:text-red-600 bg-red-50 dark:bg-red-950/20 px-4 py-2 rounded-xl transition-colors"
            >
              <LogIn className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-card border border-border rounded-2xl p-4 text-center">
            <Users className="w-5 h-5 text-primary mx-auto mb-1" />
            <div className="text-2xl font-extrabold text-foreground">{totals.students}</div>
            <div className="text-xs text-muted-foreground">Total Students</div>
          </div>
          <div className="bg-card border border-border rounded-2xl p-4 text-center">
            <Star className="w-5 h-5 text-amber-500 mx-auto mb-1" />
            <div className="text-2xl font-extrabold text-foreground">{totals.avgXp}</div>
            <div className="text-xs text-muted-foreground">Avg XP</div>
          </div>
          <div className="bg-card border border-border rounded-2xl p-4 text-center">
            <Flame className="w-5 h-5 text-orange-500 mx-auto mb-1" />
            <div className="text-2xl font-extrabold text-foreground">{totals.avgStreak}</div>
            <div className="text-xs text-muted-foreground">Avg Streak</div>
          </div>
          <div className="bg-card border border-border rounded-2xl p-4 text-center">
            <TrendingUp className="w-5 h-5 text-green-500 mx-auto mb-1" />
            <div className="text-2xl font-extrabold text-foreground">{totals.activeToday}</div>
            <div className="text-xs text-muted-foreground">Active Today</div>
          </div>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by email..."
            className="w-full pl-10 pr-10 py-3 bg-card border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
          {search && (
            <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {error && (
          <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-xl px-4 py-3 text-sm text-red-700 dark:text-red-400">
            {error}
          </div>
        )}

        {/* ── Pending Approvals ──────────────────────────────────────── */}
        <section className={cn(
          "bg-card border rounded-2xl overflow-hidden",
          pendingRequests.length > 0 ? "border-amber-400 dark:border-amber-600 shadow-lg shadow-amber-500/10" : "border-border"
        )}>
          <div className="px-5 py-4 border-b border-border flex items-center gap-3 flex-wrap">
            <div className={cn(
              "w-9 h-9 rounded-xl flex items-center justify-center",
              pendingRequests.length > 0 ? "bg-amber-500/20" : "bg-muted"
            )}>
              <UserCheck className={cn("w-5 h-5", pendingRequests.length > 0 ? "text-amber-600 dark:text-amber-400" : "text-muted-foreground")} />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-base font-extrabold text-foreground flex items-center gap-2">
                Pending Approvals
                {pendingRequests.length > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-amber-500 text-white text-xs font-bold">
                    {pendingRequests.length}
                  </span>
                )}
              </h2>
              <p className="text-xs text-muted-foreground">
                Students who registered with a valid code and are waiting for your approval.
              </p>
            </div>
            <button
              onClick={fetchPendingRequests}
              disabled={requestsLoading}
              className="text-xs font-medium text-muted-foreground hover:text-foreground bg-muted/50 px-3 py-1.5 rounded-lg flex items-center gap-1.5 disabled:opacity-50"
            >
              <RefreshCw className={cn("w-3.5 h-3.5", requestsLoading && "animate-spin")} />
              Refresh
            </button>
          </div>
          {pendingRequests.length === 0 ? (
            <div className="px-5 py-8 text-center text-sm text-muted-foreground">
              No pending requests. New signups will show up here.
            </div>
          ) : (
            <ul className="divide-y divide-border">
              {pendingRequests.map((r) => (
                <li key={r.id} className="px-5 py-3 flex items-center gap-3 flex-wrap">
                  <div className="w-9 h-9 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-sm text-foreground truncate" title={r.email}>{r.email}</div>
                    <div className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      Requested {formatDate(r.requestedAt)}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => approveRequest(r.id)}
                      disabled={actingOnId === r.id}
                      className="px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg transition-colors disabled:opacity-50 flex items-center gap-1.5"
                    >
                      {actingOnId === r.id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5" />}
                      Approve
                    </button>
                    <button
                      onClick={() => rejectRequest(r.id, r.email)}
                      disabled={actingOnId === r.id}
                      className="px-3 py-2 bg-red-50 hover:bg-red-100 dark:bg-red-950/30 dark:hover:bg-red-950/50 text-red-700 dark:text-red-400 text-xs font-bold rounded-lg transition-colors disabled:opacity-50 flex items-center gap-1.5"
                    >
                      <UserX className="w-3.5 h-3.5" />
                      Reject
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* ── Access Codes ───────────────────────────────────────────── */}
        <section className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="px-5 py-4 border-b border-border flex items-center gap-3 flex-wrap">
            <div className="w-9 h-9 rounded-xl bg-violet-500/10 flex items-center justify-center">
              <KeyRound className="w-5 h-5 text-violet-500" />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-base font-extrabold text-foreground">Access Codes</h2>
              <p className="text-xs text-muted-foreground">
                Generate single-use codes. Share each code with one student — it expires when they register.
              </p>
            </div>
            <div className="text-xs font-bold text-violet-600 dark:text-violet-400 bg-violet-500/10 px-3 py-1.5 rounded-lg">
              {unusedCount} unused
            </div>
            <button
              onClick={fetchAccessCodes}
              disabled={codesLoading}
              className="text-xs font-medium text-muted-foreground hover:text-foreground bg-muted/50 px-3 py-1.5 rounded-lg flex items-center gap-1.5 disabled:opacity-50"
            >
              <RefreshCw className={cn("w-3.5 h-3.5", codesLoading && "animate-spin")} />
              Refresh
            </button>
          </div>

          <form onSubmit={generateCodes} className="p-5 grid grid-cols-1 md:grid-cols-[2fr_1fr_auto] gap-3">
            <input
              type="text"
              value={newCodeNote}
              onChange={(e) => setNewCodeNote(e.target.value)}
              placeholder="Note (optional, e.g. student name or batch)"
              maxLength={200}
              className="px-4 py-2.5 bg-muted/40 border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            <input
              type="number"
              min={1}
              max={50}
              value={newCodeCount}
              onChange={(e) => setNewCodeCount(Math.max(1, Math.min(50, Number(e.target.value) || 1)))}
              className="px-4 py-2.5 bg-muted/40 border border-border rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              title="How many codes to generate (1–50)"
            />
            <button
              type="submit"
              disabled={generating}
              className="px-4 py-2.5 bg-violet-600 hover:bg-violet-700 text-white font-bold rounded-xl transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {generating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
              Generate
            </button>
          </form>

          {codesError && (
            <div className="mx-5 mb-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-xl px-3 py-2 text-xs text-red-700 dark:text-red-400">
              {codesError}
            </div>
          )}

          <div className="px-5 pb-3 flex items-center gap-3">
            <label className="flex items-center gap-2 text-xs text-muted-foreground cursor-pointer">
              <input
                type="checkbox"
                checked={showOnlyUnused}
                onChange={(e) => setShowOnlyUnused(e.target.checked)}
                className="rounded"
              />
              Show only unused codes
            </label>
          </div>

          <div className="border-t border-border max-h-96 overflow-y-auto">
            {codesLoading && accessCodes.length === 0 ? (
              <div className="px-5 py-10 text-center text-sm text-muted-foreground">
                <Loader2 className="w-5 h-5 mx-auto mb-2 animate-spin" />
                Loading codes…
              </div>
            ) : accessCodes.length === 0 ? (
              <div className="px-5 py-8 text-center text-sm text-muted-foreground">
                No codes yet. Generate some above to start inviting students.
              </div>
            ) : (
              <ul className="divide-y divide-border">
                {accessCodes
                  .filter((c) => !showOnlyUnused || !c.usedByEmail)
                  .map((c) => {
                    const used = !!c.usedByEmail;
                    return (
                      <li key={c.id} className="px-5 py-3 flex items-center gap-3 flex-wrap">
                        <button
                          onClick={() => copyCode(c.code)}
                          disabled={used}
                          className={cn(
                            "font-mono font-bold text-sm tracking-widest px-3 py-1.5 rounded-lg flex items-center gap-2 transition-colors",
                            used
                              ? "bg-muted text-muted-foreground line-through cursor-not-allowed"
                              : "bg-violet-500/10 text-violet-700 dark:text-violet-300 hover:bg-violet-500/20"
                          )}
                          title={used ? "Already used" : "Click to copy"}
                        >
                          {c.code}
                          {!used && (copiedCode === c.code ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5 opacity-60" />)}
                        </button>
                        <div className="flex-1 min-w-0 text-xs text-muted-foreground">
                          {c.note && <div className="font-medium text-foreground/80 truncate" title={c.note}>{c.note}</div>}
                          {used ? (
                            <div className="truncate" title={c.usedByEmail ?? ""}>
                              Used by <span className="font-semibold">{c.usedByEmail}</span> on {formatDate(c.usedAt)}
                            </div>
                          ) : (
                            <div>Created {formatDate(c.createdAt)}</div>
                          )}
                        </div>
                        <button
                          onClick={() => deleteCode(c.id, c.code)}
                          disabled={deletingCodeId === c.id}
                          className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 p-2 rounded-lg transition-colors disabled:opacity-50"
                          title="Delete code"
                        >
                          {deletingCodeId === c.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                        </button>
                      </li>
                    );
                  })}
                {accessCodes.filter((c) => !showOnlyUnused || !c.usedByEmail).length === 0 && (
                  <li className="px-5 py-6 text-center text-sm text-muted-foreground">
                    All generated codes have been used. Generate more above.
                  </li>
                )}
              </ul>
            )}
          </div>
        </section>

        {/* ── Lessons Manager ─────────────────────────────────────────── */}
        <section className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="px-5 py-4 border-b border-border flex items-center gap-3 flex-wrap">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 flex items-center justify-center">
              <PlayCircle className="w-5 h-5 text-emerald-500" />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-base font-extrabold text-foreground">Pro Tips — Lessons Manager</h2>
              <p className="text-xs text-muted-foreground">Add Vimeo videos. All approved students see the same library, in the order they're added.</p>
            </div>
            <button
              onClick={fetchLessons}
              disabled={lessonsLoading}
              className="text-xs font-medium text-muted-foreground hover:text-foreground bg-muted/50 px-3 py-1.5 rounded-lg flex items-center gap-1.5 disabled:opacity-50"
            >
              <RefreshCw className={cn("w-3.5 h-3.5", lessonsLoading && "animate-spin")} />
              Refresh
            </button>
          </div>

          {/* Add lesson form */}
          <form onSubmit={createLesson} className="p-5 grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-3">
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Lesson title (e.g. Introduction to Task 1)"
              className="px-4 py-2.5 bg-muted/40 border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            <input
              type="text"
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
              placeholder="Vimeo URL or video ID"
              className="px-4 py-2.5 bg-muted/40 border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            <button
              type="submit"
              disabled={creating || !newTitle.trim() || !newUrl.trim()}
              className="px-4 py-2.5 bg-primary text-primary-foreground font-bold rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {creating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
              Add Lesson
            </button>
          </form>

          {lessonsError && (
            <div className="mx-5 mb-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-xl px-3 py-2 text-xs text-red-700 dark:text-red-400">
              {lessonsError}
            </div>
          )}

          {/* Lesson list for active course */}
          <div className="border-t border-border">
            {lessonsLoading && !lessonsData ? (
              <div className="px-5 py-10 text-center text-sm text-muted-foreground">
                <Loader2 className="w-5 h-5 mx-auto mb-2 animate-spin" />
                Loading lessons…
              </div>
            ) : !lessonsData || lessonsData.lessons.length === 0 ? (
              <div className="px-5 py-8 text-center text-sm text-muted-foreground">
                No lessons yet. Add one above to get started.
              </div>
            ) : (
              <ul className="divide-y divide-border">
                {lessonsData.lessons.map((l, idx) => (
                  <li key={l.id} className="px-5 py-3 flex items-center gap-3">
                    <span className="w-7 h-7 rounded-full bg-muted text-xs font-bold text-muted-foreground flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-sm text-foreground truncate">{l.title}</div>
                      <a
                        href={l.embedUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-muted-foreground truncate block hover:text-primary"
                        title={l.vimeoUrl}
                      >
                        {l.vimeoUrl}
                      </a>
                    </div>
                    <button
                      onClick={() => deleteLesson(l.id)}
                      disabled={deletingId === l.id}
                      className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 p-2 rounded-lg transition-colors disabled:opacity-50"
                      title="Delete lesson"
                    >
                      {deletingId === l.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>

        {loading ? (
          <div className="text-center py-20 text-muted-foreground">
            <RefreshCw className="w-8 h-8 mx-auto mb-3 animate-spin opacity-50" />
            <p>Loading student data...</p>
          </div>
        ) : (
          <div className="bg-card border border-border rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/30">
                    {([
                      ["email", "Student"],
                      ["level", "Level"],
                      ["xp", "XP"],
                      ["streak", "Streak"],
                      ["wordsKnown", "Words Known"],
                      ["weakWordsCount", "Weak Words"],
                      ["quizzesTaken", "Quizzes"],
                      ["assignmentsCompleted", "Assignments"],
                      ["lessonsCompleted", "Lessons"],
                      ["lastActivity", "Last Active"],
                    ] as [SortKey, string][]).map(([key, label]) => (
                      <th
                        key={key}
                        onClick={() => toggleSort(key)}
                        className="px-3 py-3 text-left font-bold text-muted-foreground text-xs uppercase tracking-wider cursor-pointer hover:text-foreground transition-colors select-none whitespace-nowrap"
                      >
                        <span className="flex items-center gap-1">
                          {label}
                          <ArrowUpDown className={cn("w-3 h-3", sortKey === key ? "text-primary" : "opacity-30")} />
                        </span>
                      </th>
                    ))}
                    <th className="px-3 py-3 text-left font-bold text-muted-foreground text-xs uppercase tracking-wider whitespace-nowrap">Writing</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.length === 0 ? (
                    <tr>
                      <td colSpan={11} className="px-4 py-12 text-center text-muted-foreground">
                        {students.length === 0 ? "No approved students yet" : `No students match "${search}"`}
                      </td>
                    </tr>
                  ) : (
                    filtered.map((s) => (
                      <tr key={s.email} className="border-b border-border/50 hover:bg-muted/20 transition-colors" data-row-completed={s.lessonsCompleted}>
                        <td className="px-3 py-3">
                          <div className="font-medium text-foreground truncate max-w-[200px]" title={s.email}>
                            {s.email}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Joined {formatDate(s.joinedAt)}
                          </div>
                        </td>
                        <td className="px-3 py-3">
                          <LevelBadge level={s.level} name={s.levelName} />
                        </td>
                        <td className="px-3 py-3">
                          <div className="flex items-center gap-1 font-bold text-foreground">
                            <Star className="w-3.5 h-3.5 text-amber-500" />
                            {s.xp.toLocaleString()}
                          </div>
                        </td>
                        <td className="px-3 py-3">
                          <div className="flex items-center gap-1 font-bold text-foreground">
                            <Flame className={cn("w-3.5 h-3.5", s.streak > 0 ? "text-orange-500" : "text-muted-foreground/30")} />
                            {s.streak}
                          </div>
                        </td>
                        <td className="px-3 py-3">
                          <div className="flex items-center gap-1 font-medium text-foreground">
                            <BookOpen className="w-3.5 h-3.5 text-green-500" />
                            {s.wordsKnown.toLocaleString()}
                          </div>
                        </td>
                        <td className="px-3 py-3">
                          <div className={cn("flex items-center gap-1 font-medium", s.weakWordsCount > 10 ? "text-red-500" : "text-foreground")}>
                            <AlertTriangle className={cn("w-3.5 h-3.5", s.weakWordsCount > 10 ? "text-red-500" : "text-muted-foreground/30")} />
                            {s.weakWordsCount}
                          </div>
                        </td>
                        <td className="px-3 py-3">
                          <div className="flex items-center gap-1 font-medium text-foreground">
                            <Trophy className="w-3.5 h-3.5 text-purple-500" />
                            {s.quizzesTaken}
                          </div>
                        </td>
                        <td className="px-3 py-3">
                          <div className={cn("flex items-center gap-1 font-bold", (s.assignmentsCompleted ?? 0) > 0 ? "text-foreground" : "text-muted-foreground")}>
                            <span className="text-base">✍️</span>
                            {s.assignmentsCompleted ?? 0}
                          </div>
                        </td>
                        <td className="px-3 py-3">
                          <div className={cn("flex items-center gap-1 font-bold", (lessonCounts[s.email] ?? 0) > 0 ? "text-emerald-600 dark:text-emerald-400" : "text-muted-foreground")}>
                            <PlayCircle className={cn("w-3.5 h-3.5", (lessonCounts[s.email] ?? 0) > 0 ? "text-emerald-500" : "text-muted-foreground/30")} />
                            {lessonCounts[s.email] ?? 0}
                          </div>
                        </td>
                        <td className="px-3 py-3 text-muted-foreground whitespace-nowrap">
                          {formatDate(s.lastActivity)}
                        </td>
                        <td className="px-3 py-3">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <button
                              onClick={() => setHistoryEmail(s.email)}
                              className="text-xs font-bold px-2 py-1 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary transition-colors"
                            >
                              Writing
                            </button>
                            <button
                              onClick={() => setSentenceEmail(s.email)}
                              className="text-xs font-bold px-2 py-1 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-700 dark:text-cyan-400 transition-colors"
                            >
                              Sentences
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {historyEmail && (
        <AdminWritingHistoryModal
          email={historyEmail}
          adminPassword={password}
          onClose={() => setHistoryEmail(null)}
        />
      )}
      {sentenceEmail && (
        <AdminSentenceSessionsModal
          email={sentenceEmail}
          adminPassword={password}
          onClose={() => setSentenceEmail(null)}
        />
      )}
    </div>
  );
}

// ── Admin Writing History modal ──────────────────────────────────────────

interface AdminHistoryItem {
  id: number;
  category: string;
  taskTypeLabel: string | null;
  band: number | null;
  wordCount: number | null;
  createdAt: string;
  preview: string;
}

interface AdminChartSeries {
  task1: { date: string; band: number }[];
  task2: { date: string; band: number }[];
  paragraph: { date: string; band: number }[];
  freecheck: { date: string; band: number }[];
}

interface AdminCoach {
  ok: true;
  summary: null | {
    overallTrend: string;
    averageBand: number;
    topStrengths: string[];
    topImprovements: string[];
    studyRecommendation: string;
    motivation: string;
  };
  submissionCount: number;
  milestone?: number;
  message?: string;
}

interface AdminDetail {
  id: number;
  taskTypeLabel: string | null;
  band: number | null;
  wordCount: number | null;
  createdAt: string;
  text: string | null;
  prompt: string | null;
  feedback: Record<string, unknown> | null;
}

const ADMIN_CAT_COLOR: Record<string, string> = {
  task1: "#3b82f6", task2: "#8b5cf6", paragraph: "#10b981", freecheck: "#f59e0b",
};

function AdminWritingHistoryModal({ email, adminPassword, onClose }: {
  email: string; adminPassword: string; onClose: () => void;
}) {
  const [items, setItems] = useState<AdminHistoryItem[] | null>(null);
  const [chart, setChart] = useState<AdminChartSeries | null>(null);
  const [coach, setCoach] = useState<AdminCoach | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [openId, setOpenId] = useState<number | null>(null);
  const [openDetail, setOpenDetail] = useState<AdminDetail | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const headers = { "x-admin-password": adminPassword };
        const [hRes, cRes] = await Promise.all([
          fetch(`${API}/api/admin/students/${encodeURIComponent(email)}/orwell-history`, { headers }),
          fetch(`${API}/api/admin/students/${encodeURIComponent(email)}/orwell-coach-summary`, { headers }),
        ]);
        if (!hRes.ok) throw new Error("Failed to load history");
        const hData = await hRes.json();
        if (cancelled) return;
        setItems(hData.items ?? []);
        setChart(hData.chart ?? null);
        if (cRes.ok) setCoach(await cRes.json());
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : "Failed");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [email, adminPassword]);

  useEffect(() => {
    if (openId === null) { setOpenDetail(null); return; }
    let cancelled = false;
    (async () => {
      setDetailLoading(true);
      try {
        const res = await fetch(`/api/admin/students/${encodeURIComponent(email)}/orwell-history/${openId}`, {
          headers: { "x-admin-password": adminPassword },
        });
        if (!res.ok) throw new Error("Failed");
        const data = await res.json();
        if (!cancelled) setOpenDetail(data);
      } catch {
        if (!cancelled) setOpenDetail(null);
      } finally {
        if (!cancelled) setDetailLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [openId, email, adminPassword]);

  const chartData = useMemo(() => {
    if (!chart) return [] as Array<Record<string, number | string>>;
    const merged = new Map<string, Record<string, number | string>>();
    (["task1", "task2", "paragraph", "freecheck"] as const).forEach((k) => {
      for (const p of chart[k]) {
        const day = p.date.slice(0, 10);
        const row = merged.get(day) ?? { date: day };
        row[k] = p.band;
        merged.set(day, row);
      }
    });
    return Array.from(merged.values()).sort((a, b) => String(a.date).localeCompare(String(b.date)));
  }, [chart]);

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-end sm:items-center justify-center p-0 sm:p-4 overflow-y-auto" onClick={onClose}>
      <div
        className="bg-background w-full sm:max-w-4xl max-h-[95vh] overflow-y-auto rounded-t-2xl sm:rounded-2xl border border-border shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-background border-b border-border p-4 flex items-center justify-between z-10">
          <div className="min-w-0">
            <h3 className="font-bold truncate">Writing History</h3>
            <p className="text-xs text-muted-foreground truncate">{email}</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-lg hover:bg-accent flex items-center justify-center">
            <X className="w-4 h-4" />
          </button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
          </div>
        ) : error ? (
          <div className="p-4 text-sm text-rose-600">{error}</div>
        ) : (
          <div className="p-4 space-y-5">
            {coach?.summary ? (
              <div className="rounded-xl border-2 border-primary/30 bg-primary/5 p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-primary" />
                  <h4 className="font-bold text-sm">Personal Coach Summary</h4>
                  <span className="text-xs text-muted-foreground ml-auto">
                    Avg band {typeof coach.summary.averageBand === "number" ? coach.summary.averageBand.toFixed(1) : "—"} • Trend: {coach.summary.overallTrend}
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs font-bold text-emerald-700 dark:text-emerald-300 mb-1">🌟 Strengths</p>
                    <ol className="text-xs space-y-0.5 list-decimal list-inside">
                      {coach.summary.topStrengths.map((s, i) => <li key={i}>{s}</li>)}
                    </ol>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-amber-700 dark:text-amber-300 mb-1">🎯 Areas to improve</p>
                    <ol className="text-xs space-y-0.5 list-decimal list-inside">
                      {coach.summary.topImprovements.map((s, i) => <li key={i}>{s}</li>)}
                    </ol>
                  </div>
                </div>
                <div>
                  <p className="text-xs font-bold text-blue-700 dark:text-blue-300 mb-1">📚 Study plan</p>
                  <p className="text-xs whitespace-pre-wrap">{coach.summary.studyRecommendation}</p>
                </div>
              </div>
            ) : (
              <div className="rounded-xl border border-border bg-muted/30 p-3 text-xs text-muted-foreground">
                {coach?.message ?? `Coach summary unlocks after 5 submissions (${coach?.submissionCount ?? 0} so far).`}
              </div>
            )}

            <div className="rounded-xl border border-border bg-card p-3">
              <p className="text-xs font-bold text-muted-foreground mb-2">Band score over time</p>
              {chartData.length === 0 ? (
                <p className="text-xs text-muted-foreground py-6 text-center">No graded submissions yet.</p>
              ) : (
                <div className="w-full h-56">
                  <ResponsiveContainer>
                    <LineChart data={chartData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                      <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                      <YAxis domain={[0, 9]} tick={{ fontSize: 10 }} />
                      <Tooltip />
                      <Legend wrapperStyle={{ fontSize: 11 }} />
                      <Line type="monotone" dataKey="task1" stroke={ADMIN_CAT_COLOR.task1} strokeWidth={2} connectNulls dot />
                      <Line type="monotone" dataKey="task2" stroke={ADMIN_CAT_COLOR.task2} strokeWidth={2} connectNulls dot />
                      <Line type="monotone" dataKey="paragraph" stroke={ADMIN_CAT_COLOR.paragraph} strokeWidth={2} connectNulls dot />
                      <Line type="monotone" dataKey="freecheck" stroke={ADMIN_CAT_COLOR.freecheck} strokeWidth={2} connectNulls dot />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              )}
            </div>

            <div className="space-y-1.5">
              <p className="text-xs font-bold text-muted-foreground">{items?.length ?? 0} submissions</p>
              {items?.length === 0 ? (
                <p className="text-xs text-muted-foreground py-4 text-center">No submissions yet.</p>
              ) : (
                items?.map((it) => (
                  <button
                    key={it.id}
                    onClick={() => setOpenId(it.id)}
                    className="w-full text-left rounded-lg border border-border bg-card hover:border-primary hover:bg-primary/5 transition-all p-3 flex items-start gap-2"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap text-xs">
                        <span className="font-bold">{it.taskTypeLabel ?? it.category}</span>
                        {it.band !== null && (
                          <span className="font-bold px-1.5 py-0.5 rounded-full bg-primary/10 text-primary">Band {it.band.toFixed(1)}</span>
                        )}
                        <span className="text-muted-foreground">{formatDate(it.createdAt)}</span>
                        {it.wordCount !== null && <span className="text-muted-foreground">{it.wordCount} w</span>}
                      </div>
                      {it.preview && <p className="text-xs text-muted-foreground truncate mt-0.5">{it.preview}</p>}
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>
        )}

        {openId !== null && (
          <div className="fixed inset-0 z-[60] bg-black/60 flex items-end sm:items-center justify-center p-0 sm:p-4 overflow-y-auto" onClick={() => setOpenId(null)}>
            <div className="bg-background w-full sm:max-w-2xl max-h-[95vh] overflow-y-auto rounded-t-2xl sm:rounded-2xl border border-border shadow-xl" onClick={(e) => e.stopPropagation()}>
              <div className="sticky top-0 bg-background border-b border-border p-4 flex items-center justify-between">
                <h3 className="font-bold text-sm truncate">{openDetail?.taskTypeLabel ?? "Submission"}</h3>
                <button onClick={() => setOpenId(null)} className="w-8 h-8 rounded-lg hover:bg-accent flex items-center justify-center">
                  <X className="w-4 h-4" />
                </button>
              </div>
              {detailLoading || !openDetail ? (
                <div className="flex items-center justify-center py-16">
                  <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
                </div>
              ) : (
                <div className="p-4 space-y-3 text-sm">
                  <p className="text-xs text-muted-foreground">
                    {new Date(openDetail.createdAt).toLocaleString("en-GB")}
                    {openDetail.band !== null && <> • <span className="font-bold">Band {openDetail.band.toFixed(1)}</span></>}
                    {openDetail.wordCount !== null && <> • {openDetail.wordCount} words</>}
                  </p>
                  {openDetail.prompt && (
                    <div>
                      <p className="text-xs font-bold text-muted-foreground mb-1">Assignment</p>
                      <div className="rounded-lg border border-border bg-muted/30 p-2 text-xs whitespace-pre-wrap">{openDetail.prompt}</div>
                    </div>
                  )}
                  <div>
                    <p className="text-xs font-bold text-muted-foreground mb-1">Student writing</p>
                    <div className="rounded-lg border border-border bg-card p-2 text-xs whitespace-pre-wrap">{openDetail.text || <span className="italic text-muted-foreground">(no writing)</span>}</div>
                  </div>
                  {openDetail.feedback && (
                    <div>
                      <p className="text-xs font-bold text-muted-foreground mb-1">AI feedback</p>
                      <pre className="rounded-lg border border-border bg-muted/30 p-2 text-[10px] whitespace-pre-wrap leading-relaxed overflow-x-auto">
                        {JSON.stringify(openDetail.feedback, null, 2)}
                      </pre>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Admin Sentence-Builder Sessions modal ────────────────────────────────

interface SentenceItem {
  word: string;
  arabic: string;
  attempts: number;
  finalSentence: string;
  isCorrect: boolean;
  errorHighlight: string | null;
  explanation: string;
  corrected: string;
  arabicCorrected: string;
  vocabBand: number;
  grammarBand: number;
  firstAttemptCorrect: boolean;
}

interface AdminSentenceSession {
  id: number;
  email: string;
  level: string;
  totalWords: number;
  firstAttemptCorrect: number;
  neededCorrection: number;
  avgVocabBand: number;
  avgGrammarBand: number;
  commonMistakes: string[];
  items: SentenceItem[];
  endedEarly: boolean;
  completedAt: string;
}

function AdminSentenceSessionsModal({
  email,
  adminPassword,
  onClose,
}: {
  email: string;
  adminPassword: string;
  onClose: () => void;
}) {
  const [sessions, setSessions] = useState<AdminSentenceSession[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [openId, setOpenId] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${API}/api/teacher/sentence-sessions?email=${encodeURIComponent(email)}`,
          { headers: { "x-admin-password": adminPassword } }
        );
        if (!res.ok) {
          if (!cancelled) setSessions([]);
          return;
        }
        const data = await res.json();
        if (!cancelled) setSessions(data);
      } catch {
        if (!cancelled) setSessions([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [email, adminPassword]);

  const open = sessions?.find((s) => s.id === openId) ?? null;

  return (
    <div className="fixed inset-0 z-[60] bg-black/60 flex items-end sm:items-center justify-center p-0 sm:p-4 overflow-y-auto" onClick={onClose}>
      <div className="bg-background w-full sm:max-w-3xl max-h-[95vh] overflow-y-auto rounded-t-2xl sm:rounded-2xl border border-border shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="sticky top-0 bg-background border-b border-border p-4 flex items-center justify-between z-10">
          <div className="min-w-0">
            <h3 className="font-extrabold text-base">Sentence Builder Sessions</h3>
            <p className="text-xs text-muted-foreground truncate">{email}</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-lg hover:bg-accent flex items-center justify-center shrink-0">
            <X className="w-4 h-4" />
          </button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
          </div>
        ) : !sessions || sessions.length === 0 ? (
          <div className="px-5 py-12 text-center text-sm text-muted-foreground">
            No sentence-builder sessions yet for this student.
          </div>
        ) : open ? (
          <SessionDetail session={open} onBack={() => setOpenId(null)} />
        ) : (
          <ul className="divide-y divide-border">
            {sessions.map((s) => {
              const accuracy = s.totalWords > 0 ? Math.round((s.firstAttemptCorrect / s.totalWords) * 100) : 0;
              const avgBand = ((s.avgVocabBand + s.avgGrammarBand) / 2).toFixed(1);
              return (
                <li key={s.id}>
                  <button
                    onClick={() => setOpenId(s.id)}
                    className="w-full px-5 py-4 flex items-center gap-3 text-left hover:bg-muted/30 transition-colors"
                  >
                    <div className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center shrink-0 font-bold text-xs",
                      accuracy >= 80 ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                        : accuracy >= 60 ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400"
                          : "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400"
                    )}>
                      {accuracy}%
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-sm">
                        {s.totalWords} words · Level {s.level} · Band {avgBand}
                        {s.endedEarly && <span className="text-amber-600 ml-1.5 text-xs">(ended early)</span>}
                      </div>
                      <div className="text-xs text-muted-foreground mt-0.5">
                        {new Date(s.completedAt).toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" })}
                        <span className="mx-1.5">·</span>
                        ✓ {s.firstAttemptCorrect} first try
                        <span className="mx-1.5">·</span>
                        ✎ {s.neededCorrection} corrected
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-muted-foreground shrink-0" />
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}

function SessionDetail({ session, onBack }: { session: AdminSentenceSession; onBack: () => void }) {
  const accuracy = session.totalWords > 0 ? Math.round((session.firstAttemptCorrect / session.totalWords) * 100) : 0;
  const avgBand = ((session.avgVocabBand + session.avgGrammarBand) / 2).toFixed(1);
  return (
    <div className="p-5 space-y-4">
      <button
        onClick={onBack}
        className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1"
      >
        ← Back to sessions
      </button>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <Stat label="Words" value={session.totalWords} />
        <Stat label="First Try ✓" value={session.firstAttemptCorrect} accent="green" />
        <Stat label="Needed Fix" value={session.neededCorrection} accent="amber" />
        <Stat label="Avg Band" value={avgBand} accent="primary" />
      </div>

      <div className="bg-muted/30 border border-border rounded-xl p-3 text-xs">
        <div className="font-bold mb-1">Most common mistakes</div>
        {session.commonMistakes.length === 0 ? (
          <span className="text-muted-foreground">None — all clean.</span>
        ) : (
          <ul className="space-y-0.5">
            {session.commonMistakes.map((m) => (
              <li key={m}>• {m}</li>
            ))}
          </ul>
        )}
      </div>

      <div className="text-xs text-muted-foreground">
        {new Date(session.completedAt).toLocaleString("en-GB")} · Level {session.level} · {accuracy}% first-try accuracy
        {session.endedEarly && <span className="text-amber-600 ml-1">· Ended early</span>}
      </div>

      <div className="space-y-2">
        {session.items.map((it, i) => (
          <div
            key={i}
            className={cn(
              "rounded-xl p-3 border text-xs",
              it.firstAttemptCorrect
                ? "bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-900/30"
                : "bg-rose-50 dark:bg-rose-900/10 border-rose-200 dark:border-rose-900/30"
            )}
          >
            <div className="flex items-center justify-between mb-1.5 gap-2">
              <span className="font-extrabold">
                {i + 1}. {it.word} <span className="font-normal text-primary" dir="rtl">{it.arabic}</span>
              </span>
              <span className="text-[10px] font-bold uppercase">
                {it.firstAttemptCorrect ? "✓ first try" : `${it.attempts} attempt${it.attempts === 1 ? "" : "s"}`}
                {" · V" + it.vocabBand?.toFixed(1) + " · G" + it.grammarBand?.toFixed(1)}
              </span>
            </div>
            <div className="text-muted-foreground italic mb-1">"{it.finalSentence}"</div>
            {it.corrected && it.corrected.toLowerCase() !== it.finalSentence.toLowerCase() && (
              <>
                <div className="text-[10px] font-bold uppercase text-primary mt-1">Correction</div>
                <div className="font-semibold">{it.corrected}</div>
                {it.arabicCorrected && (
                  <div className="text-muted-foreground" dir="rtl">{it.arabicCorrected}</div>
                )}
              </>
            )}
            {it.explanation && (
              <div className="text-muted-foreground mt-1 pt-1 border-t border-border/50">💡 {it.explanation}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function Stat({ label, value, accent }: { label: string; value: number | string; accent?: "green" | "amber" | "primary" }) {
  const color = accent === "green" ? "text-green-600" : accent === "amber" ? "text-amber-600" : accent === "primary" ? "text-primary" : "text-foreground";
  return (
    <div className="bg-card border border-border rounded-xl p-2.5 text-center">
      <div className={cn("text-xl font-extrabold", color)}>{value}</div>
      <div className="text-[10px] text-muted-foreground uppercase tracking-wider">{label}</div>
    </div>
  );
}
