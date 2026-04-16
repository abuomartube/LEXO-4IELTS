import { useState, useEffect, useMemo } from "react";
import {
  GraduationCap, Flame, Star, AlertTriangle, BookOpen,
  Trophy, ArrowUpDown, Search, X, LogIn, Eye, EyeOff,
  RefreshCw, Users, TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/utils";

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
  lastActivity: string | null;
}

type SortKey = "email" | "xp" | "streak" | "weakWordsCount" | "wordsKnown" | "quizzesTaken" | "level" | "lastActivity";

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

  const savedPass = typeof sessionStorage !== "undefined" ? sessionStorage.getItem("teacher_pass") : null;

  useEffect(() => {
    if (savedPass) {
      setPassword(savedPass);
      setAuthed(true);
    }
  }, []);

  useEffect(() => {
    if (authed) fetchStudents();
  }, [authed]);

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
    let list = students;
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
              <h1 className="text-2xl font-extrabold text-foreground">Teacher Dashboard</h1>
              <p className="text-sm text-muted-foreground">{students.length} student{students.length !== 1 ? "s" : ""} enrolled</p>
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
                  </tr>
                </thead>
                <tbody>
                  {filtered.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="px-4 py-12 text-center text-muted-foreground">
                        {students.length === 0 ? "No approved students yet" : `No students match "${search}"`}
                      </td>
                    </tr>
                  ) : (
                    filtered.map((s) => (
                      <tr key={s.email} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
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
                        <td className="px-3 py-3 text-muted-foreground whitespace-nowrap">
                          {formatDate(s.lastActivity)}
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
    </div>
  );
}
