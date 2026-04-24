import { useState, useEffect, useCallback, useRef, type ReactNode } from "react";
import { Mail, Lock, Eye, EyeOff, Loader2, Clock, CalendarX, MessageCircle, LogIn, UserPlus, KeyRound, CheckCircle2, Sparkles, Brain, Mic, PenTool, BookOpen, ArrowLeftRight, ArrowUpDown, BarChart3, Flame, Zap, Star, Quote, Headphones, ShieldAlert, BadgeCheck } from "lucide-react";
import { Onboarding, useOnboardingCheck } from "./onboarding";
import { NotificationPrompt } from "./notification-prompt";
import { GuidedTour, useGuidedTour } from "./guided-tour";
import { LexoAiChat } from "./lexo-ai-chat";
import { ExitCommentPopup } from "./exit-comment-popup";
import { IdleWarningModal } from "./idle-warning-modal";
import { useIdleTimeout } from "../hooks/use-idle-timeout";

// Idle session timeouts (students). 30 minutes total, 2-minute warning.
const STUDENT_IDLE_TIMEOUT_MS = 30 * 60 * 1000;
const STUDENT_IDLE_WARNING_MS = 2 * 60 * 1000;
const LOGOUT_REASON_KEY = "lexo_logout_reason";

const STORAGE_KEY = "4ielts_email";
const WHATSAPP_URL = "https://wa.me/message/KMWPDZOBBNAAB1";
const WHATSAPP_VISITOR_URL = "https://wa.me/4ielts";
const CONTACT_EMAIL = "askabuomar@gmail.com";

type Phase =
  | "checking"
  | "landing"
  | "login"
  | "register"
  | "pending"
  | "approved-confirm"
  | "setup-password"
  | "unlocked"
  | "expired";

interface AuthResponse {
  status?: string;
  token?: string;
  error?: string;
  needsPasswordSetup?: boolean;
  setupToken?: string;
}

async function postJson<T = AuthResponse>(path: string, body: unknown): Promise<T & { error?: string }> {
  try {
    const res = await fetch(path, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok && !data.error) data.error = `Request failed (${res.status})`;
    return data as T & { error?: string };
  } catch {
    return { error: "Connection error. Please try again." } as T & { error?: string };
  }
}

async function checkStatus(email: string): Promise<AuthResponse> {
  return postJson("/api/access/check", { email });
}

async function saveSessionToDb(email: string, token: string) {
  try {
    await fetch("/api/session/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, token }),
    });
  } catch {}
}

async function checkDbSession(email: string): Promise<{ status: string; token?: string }> {
  try {
    const res = await fetch("/api/session/check", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    return await res.json();
  } catch { return { status: "none" }; }
}

const landingFeatures = [
  { icon: BookOpen, text: "3,000 words from A2 to C1", color: "text-teal-400" },
  { icon: Sparkles, text: "Interactive flashcards + word pronunciation", color: "text-sky-400" },
  { icon: Brain, text: "Smart quizzes", color: "text-violet-400" },
  { icon: Headphones, text: "🎧 Listening and Reading Practice", color: "text-blue-400" },
  { icon: Mic, text: "Churchill AI (Speaking) + Topic Bank", color: "text-rose-400" },
  { icon: PenTool, text: "Orwell AI (Writing) + Templates Library", color: "text-amber-400" },
  { icon: CheckCircle2, text: "Quiz Mode", color: "text-emerald-400" },
  { icon: ArrowLeftRight, text: "Synonyms", color: "text-purple-400" },
  { icon: ArrowLeftRight, text: "Antonyms", color: "text-orange-400" },
  { icon: ArrowUpDown, text: "Phrasal Verbs", color: "text-indigo-400" },
  { icon: BarChart3, text: "Progress tracking", color: "text-cyan-400" },
  { icon: Flame, text: "Daily streak", color: "text-red-400" },
];

function LandingReviews() {
  const [reviews, setReviews] = useState<Array<{
    id: number; name: string | null; comment: string; rating: number; createdAt: string;
    adminReply: string | null; adminReplyAt: string | null;
  }>>([]);
  const [adminAvatar, setAdminAvatar] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/reviews/public")
      .then(r => r.json())
      .then(data => { if (Array.isArray(data)) setReviews(data); })
      .catch(() => {});
    fetch("/api/admin/avatar")
      .then(r => r.json())
      .then(d => { if (d?.dataUrl) setAdminAvatar(d.dataUrl); })
      .catch(() => {});
  }, []);

  if (reviews.length === 0) return null;

  return (
    <section className="mt-12 md:mt-16">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/15 border border-amber-500/25 text-amber-300 text-xs font-semibold tracking-wide uppercase mb-4">
          <Star className="w-3.5 h-3.5 fill-amber-300" />
          Student Reviews
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white">What Our Students Say</h2>
        <p className="text-white/40 text-sm mt-2" dir="rtl" lang="ar">آراء طلابنا</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {reviews.map(r => (
          <div key={r.id} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 relative">
            <Quote className="w-8 h-8 text-teal-400/20 absolute top-4 right-4" />
            <div className="flex gap-0.5 mb-3">
              {[1, 2, 3, 4, 5].map(s => (
                <Star
                  key={s}
                  className={`w-4 h-4 ${s <= r.rating ? "text-amber-400 fill-amber-400" : "text-white/20"}`}
                />
              ))}
            </div>
            <p className="text-white/80 text-sm leading-relaxed mb-3">"{r.comment}"</p>
            <div className="flex items-center justify-between">
              {r.name && <p className="text-teal-300 text-xs font-semibold">— {r.name}</p>}
              <span className="text-white/30 text-xs ml-auto">
                {new Date(r.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
              </span>
            </div>

            {r.adminReply && (
              <div className="mt-4 ml-4 border-l-2 border-teal-400/60 pl-4 bg-teal-500/10 rounded-r-xl py-3 pr-3">
                <div className="flex items-center gap-2 mb-1.5">
                  {adminAvatar ? (
                    <img
                      src={adminAvatar}
                      alt="Abu Omar"
                      className="w-7 h-7 rounded-full object-cover ring-2 ring-teal-300/60"
                    />
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-teal-400 to-sky-500 text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-teal-300/60">
                      AO
                    </div>
                  )}
                  <span className="text-teal-100 text-xs font-bold">Abu Omar</span>
                  <BadgeCheck className="w-4 h-4 text-sky-400 fill-sky-400/20" aria-label="Verified" />
                  <span className="text-white/50 text-xs">replied:</span>
                </div>
                <p className="text-white/85 text-sm leading-relaxed whitespace-pre-wrap">{r.adminReply}</p>
                {r.adminReplyAt && (
                  <p className="text-white/30 text-[10px] mt-1.5">
                    {new Date(r.adminReplyAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

function LandingPage({ onLogin, onRegister }: { onLogin: () => void; onRegister: () => void }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-teal-950 to-sky-950 text-white overflow-hidden relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-teal-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-sky-500/8 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal-400/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-8 flex flex-col min-h-screen">
        <header className="flex items-center justify-between mb-12 md:mb-16">
          <div className="flex items-center gap-3">
            <img src="/4ielts-logo.png" alt="4IELTS" className="h-10 w-auto object-contain" />
            <div className="hidden sm:block">
              <p className="text-xs font-semibold tracking-widest uppercase text-teal-400">AI-Powered By</p>
              <p className="text-sm font-bold text-white/90">4IELTS</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onRegister}
              className="hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-full bg-teal-500/20 hover:bg-teal-500/30 border border-teal-400/40 text-teal-100 text-sm font-semibold transition-all backdrop-blur-sm"
            >
              <UserPlus className="w-4 h-4" />
              Register
            </button>
            <button
              onClick={onLogin}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white text-sm font-semibold transition-all backdrop-blur-sm"
            >
              <LogIn className="w-4 h-4" />
              Log In
            </button>
          </div>
        </header>

        <main className="flex-1 flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-500/15 border border-teal-500/25 text-teal-300 text-xs font-semibold tracking-wide uppercase mb-6">
              <Zap className="w-3.5 h-3.5" />
              4IELTS Platform
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight mb-6 leading-[1.1]">
              <span className="text-white">LEXO</span>
            </h1>

            <p className="text-lg sm:text-xl text-white/60 leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0">
              Your AI-powered companion for IELTS success. Master vocabulary, ace your speaking and listening, practice reading and writing — all on one platform.
            </p>

            <p className="text-base text-white/40 mb-10 max-w-lg mx-auto lg:mx-0 font-cairo" dir="rtl" lang="ar">
              رفيقك الذكي في رحلة الآيلتس — تعلّم المفردات، أتقن المحادثة والاستماع، تدرب على القراءة والكتابة - كل شيء في مكان واحد
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button
                onClick={onRegister}
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-teal-500 hover:bg-teal-400 text-white font-bold text-lg transition-all shadow-lg shadow-teal-500/25 hover:shadow-teal-400/30"
              >
                <UserPlus className="w-5 h-5" />
                Register
              </button>
              <button
                onClick={onLogin}
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-lg transition-all"
              >
                <LogIn className="w-5 h-5" />
                Log In
              </button>
              <a
                href={WHATSAPP_VISITOR_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-green-600 hover:bg-green-500 text-white font-bold text-lg transition-all shadow-lg shadow-green-600/25 hover:shadow-green-500/30"
              >
                <MessageCircle className="w-5 h-5" />
                Subscribe · اشترك الآن
              </a>
            </div>
          </div>

          <div className="w-full max-w-md lg:max-w-sm xl:max-w-md">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl">
              <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-teal-400" />
                Features
              </h2>
              <div className="space-y-3">
                {landingFeatures.map((f, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 py-2 px-3 rounded-xl hover:bg-white/5 transition-colors group"
                  >
                    <div className={`w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-white/10 transition-colors`}>
                      <f.icon className={`w-4 h-4 ${f.color}`} />
                    </div>
                    <span className="text-sm text-white/80 font-medium">{f.text}</span>
                    {f.text === "Daily streak" && <span className="text-lg">🔥</span>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>

        <LandingReviews />

        <footer className="mt-12 md:mt-16 pb-6 text-center">
          <div className="flex items-center justify-center gap-2 text-white/30 text-sm">
            <span>Powered by</span>
            <a href="https://www.4ielts.com" target="_blank" rel="noopener noreferrer" className="text-teal-400/60 hover:text-teal-400 font-semibold transition-colors">
              4IELTS.com
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}

function PasswordGateUnlocked({ children }: { children: ReactNode }) {
  const { needsOnboarding, checked, setNeedsOnboarding } = useOnboardingCheck();
  const { showTour, checked: tourChecked, completeTour } = useGuidedTour();

  // Idle session timeout — log the student out after 30 minutes of inactivity,
  // with a 2-minute "Stay logged in?" warning modal. Onboarding/tour wizards
  // count as active screens, so the hook is always enabled while unlocked.
  const handleIdleLogout = useCallback(() => {
    try {
      sessionStorage.setItem(LOGOUT_REASON_KEY, "idle");
      localStorage.removeItem(STORAGE_KEY);
    } catch { /* ignore storage failures */ }
    window.location.reload();
  }, []);

  const { warningOpen, msUntilLogout, stayLoggedIn } = useIdleTimeout({
    enabled: true,
    timeoutMs: STUDENT_IDLE_TIMEOUT_MS,
    warningMs: STUDENT_IDLE_WARNING_MS,
    onTimeout: handleIdleLogout,
  });

  return (
    <>
      {!checked ? null : needsOnboarding ? (
        <Onboarding onComplete={() => setNeedsOnboarding(false)} />
      ) : null}
      {children}
      {checked && !needsOnboarding && tourChecked && showTour && (
        <GuidedTour onComplete={completeTour} />
      )}
      <NotificationPrompt />
      {checked && !needsOnboarding && <LexoAiChat />}
      {checked && !needsOnboarding && <ExitCommentPopup />}
      <IdleWarningModal
        open={warningOpen}
        msUntilLogout={msUntilLogout}
        onStayLoggedIn={stayLoggedIn}
        onLogoutNow={handleIdleLogout}
      />
    </>
  );
}

interface PasswordGateProps { children: React.ReactNode; }

// Shared shell so every screen looks consistent
function AuthShell({ children, footer }: { children: ReactNode; footer?: ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-900 via-teal-800 to-sky-900 p-4">
      <div className="w-full max-w-sm">
        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-8">
          <div className="flex flex-col items-center mb-6">
            <img src="/4ielts-logo.png" alt="4IELTS" className="h-14 w-auto object-contain" />
            <span className="text-[10px] font-semibold tracking-widest uppercase text-teal-600 dark:text-teal-400 mt-1">
              AI-Powered By 4IELTS
            </span>
            <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white mt-2">LEXO</h1>
          </div>
          {children}
          {footer}
        </div>
      </div>
    </div>
  );
}

export function PasswordGate({ children }: PasswordGateProps) {
  const [phase, setPhase] = useState<Phase>("checking");

  // Form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accessCode, setAccessCode] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Setup-password (legacy users)
  const [setupToken, setSetupToken] = useState<string | null>(null);

  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [loading, setLoading] = useState(false);

  const pollTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const expiredEmailRef = useRef<string>("");

  const stopPolling = () => { if (pollTimer.current) clearTimeout(pollTimer.current); };

  const unlockAndSave = useCallback((em: string, token: string) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ email: em, token }));
    localStorage.setItem("4ielts_last_email", em);
    saveSessionToDb(em, token);
    setPhase("unlocked");
  }, []);

  // Pending → polls /access/check until admin acts.
  // On approval we no longer auto-unlock; we surface a "Log in now" screen.
  const startPolling = useCallback((em: string) => {
    stopPolling();
    const poll = async () => {
      const result = await checkStatus(em);
      if (result.status === "approved") {
        // Account just became approved — user must log in with their password.
        // (needsPasswordSetup case only applies to legacy users, who never
        // reach this polling screen, so we treat all approvals the same.)
        setEmail(em);
        setPhase("approved-confirm");
      } else if (result.status === "expired") {
        localStorage.removeItem(STORAGE_KEY);
        expiredEmailRef.current = em;
        setPhase("expired");
        startExpiredPolling(em);
      } else if (result.status === "rejected") {
        setError("Your access request was not approved. Please contact your instructor.");
        localStorage.removeItem(STORAGE_KEY);
        setPhase("login");
      } else {
        pollTimer.current = setTimeout(poll, 8000);
      }
    };
    pollTimer.current = setTimeout(poll, 8000);
  }, []); // eslint-disable-line

  const startExpiredPolling = useCallback((em: string) => {
    stopPolling();
    const poll = async () => {
      const result = await checkStatus(em);
      if (result.status === "approved") {
        setEmail(em);
        setPhase("approved-confirm");
      } else {
        pollTimer.current = setTimeout(poll, 10000);
      }
    };
    pollTimer.current = setTimeout(poll, 10000);
  }, []);

  // Bootstrap: validate the localStorage token server-side before unlocking.
  useEffect(() => {
    async function init() {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        try {
          const { email: storedEmail, token } = JSON.parse(raw);
          if (storedEmail && token) {
            // Persist the token to the server-side store first so /session/check
            // can verify it. /session/save itself validates the token HMAC, so
            // a tampered localStorage value will be rejected here.
            await saveSessionToDb(storedEmail, token);
            const dbSession = await checkDbSession(storedEmail);
            if (dbSession.status === "active") {
              setPhase("unlocked");
              return;
            } else if (dbSession.status === "expired") {
              localStorage.removeItem(STORAGE_KEY);
              expiredEmailRef.current = storedEmail;
              setPhase("expired");
              startExpiredPolling(storedEmail);
              return;
            }
            // Server says token is invalid (or status changed).
            // Fall through to check pending/landing state.
            const result = await checkStatus(storedEmail);
            if (result.status === "pending") {
              setEmail(storedEmail);
              setPhase("pending");
              startPolling(storedEmail);
              return;
            }
          }
          localStorage.removeItem(STORAGE_KEY);
        } catch {
          localStorage.removeItem(STORAGE_KEY);
        }
      }

      const lastEmail = localStorage.getItem("4ielts_last_email");
      if (lastEmail) {
        const dbSession = await checkDbSession(lastEmail);
        if (dbSession.status === "active" && dbSession.token) {
          localStorage.setItem(STORAGE_KEY, JSON.stringify({ email: lastEmail, token: dbSession.token }));
          setPhase("unlocked");
          return;
        } else if (dbSession.status === "expired") {
          expiredEmailRef.current = lastEmail;
          setPhase("expired");
          startExpiredPolling(lastEmail);
          return;
        }
      }

      setPhase("landing");
    }
    init();
    return stopPolling;
  }, [startPolling, startExpiredPolling]);

  // ── Submit handlers ───────────────────────────────────────────────

  const handleRegister = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password || !accessCode.trim()) return;
    if (password.length < 6) { setError("Password must be at least 6 characters."); return; }
    setLoading(true); setError(""); setInfo("");
    const normalizedEmail = email.trim().toLowerCase();
    const result = await postJson("/api/access/request", {
      email: normalizedEmail,
      password,
      accessCode: accessCode.trim().toUpperCase(),
    });
    setLoading(false);
    if (result.status === "pending") {
      localStorage.setItem("4ielts_last_email", normalizedEmail);
      setPassword("");
      setAccessCode("");
      setEmail(normalizedEmail);
      setPhase("pending");
      startPolling(normalizedEmail);
    } else {
      setError(result.error ?? "Registration failed. Please try again.");
    }
  }, [email, password, accessCode, startPolling]);

  const handleLogin = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password) return;
    setLoading(true); setError(""); setInfo("");
    const normalizedEmail = email.trim().toLowerCase();
    const result = await postJson("/api/access/login", { email: normalizedEmail, password });
    setLoading(false);
    if (result.status === "approved" && result.token) {
      setPassword("");
      unlockAndSave(normalizedEmail, result.token);
    } else if (result.status === "needs_password_setup") {
      setError(result.error ?? "Your account is from a previous version. Please reopen LEXO from the device you originally used, or contact your instructor.");
    } else if (result.status === "pending") {
      localStorage.setItem("4ielts_last_email", normalizedEmail);
      setEmail(normalizedEmail);
      setPhase("pending");
      startPolling(normalizedEmail);
    } else if (result.status === "expired") {
      expiredEmailRef.current = normalizedEmail;
      setPhase("expired");
      startExpiredPolling(normalizedEmail);
    } else {
      setError(result.error ?? "Login failed.");
    }
  }, [email, password, unlockAndSave, startPolling, startExpiredPolling]);

  const handleSetupPassword = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password || !setupToken) return;
    if (password.length < 6) { setError("Password must be at least 6 characters."); return; }
    setLoading(true); setError("");
    const normalizedEmail = email.trim().toLowerCase();
    const result = await postJson("/api/access/setup-password", {
      email: normalizedEmail, setupToken, password,
    });
    setLoading(false);
    if (result.status === "approved" && result.token) {
      setPassword("");
      setSetupToken(null);
      unlockAndSave(normalizedEmail, result.token);
    } else {
      setError(result.error ?? "Could not set password.");
    }
  }, [email, password, setupToken, unlockAndSave]);

  const goToLogin = (em?: string) => {
    stopPolling();
    setError(""); setInfo("");
    if (em) setEmail(em);
    setPassword("");
    setAccessCode("");
    setPhase("login");
  };

  const goToRegister = () => {
    stopPolling();
    setError(""); setInfo("");
    setPassword("");
    setAccessCode("");
    setPhase("register");
  };

  // ── Render ─────────────────────────────────────────────────────────

  if (phase === "checking") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-teal-600" />
      </div>
    );
  }

  if (phase === "unlocked") return <PasswordGateUnlocked>{children}</PasswordGateUnlocked>;

  if (phase === "landing") {
    return <LandingPage onLogin={() => goToLogin()} onRegister={() => goToRegister()} />;
  }

  if (phase === "expired") {
    return (
      <AuthShell>
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mx-auto mb-4">
            <CalendarX className="w-8 h-8 text-red-500 dark:text-red-400" />
          </div>
          <h2 className="text-xl font-extrabold text-gray-900 dark:text-white mb-2">Subscription Expired</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
            Your access to LEXO has expired. Please contact Abu Omar to renew your subscription.
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mb-4" dir="rtl" lang="ar">
            انتهت صلاحية اشتراكك. تواصل مع أبو عمر لتجديد الاشتراك.
          </p>
          <div className="flex items-center justify-center gap-2 text-xs text-teal-600 dark:text-teal-400 mb-5 bg-teal-50 dark:bg-teal-900/20 rounded-xl py-2.5 px-3">
            <Loader2 className="w-3 h-3 animate-spin shrink-0" />
            Checking for renewal every 10 seconds — this will unlock automatically once renewed.
          </div>
          <div className="space-y-3">
            <a href={WHATSAPP_VISITOR_URL} target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-green-500 hover:bg-green-600 text-white font-semibold transition-colors text-sm">
              <MessageCircle className="w-4 h-4" /> Contact on WhatsApp
            </a>
            <a href={`mailto:${CONTACT_EMAIL}`}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 font-semibold transition-colors text-sm">
              <Mail className="w-4 h-4" /> {CONTACT_EMAIL}
            </a>
            <button onClick={() => goToLogin(expiredEmailRef.current)}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold transition-colors text-sm">
              Already renewed? Log in
            </button>
          </div>
        </div>
      </AuthShell>
    );
  }

  if (phase === "pending") {
    return (
      <AuthShell footer={
        <button onClick={() => goToLogin()} className="w-full mt-5 text-xs text-gray-400 hover:text-gray-600 underline">
          Use a different email
        </button>
      }>
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mx-auto mb-4">
            <Clock className="w-8 h-8 text-amber-600 dark:text-amber-400" />
          </div>
          <h2 className="text-xl font-extrabold text-gray-900 dark:text-white mb-2">Awaiting Approval</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
            Thanks for registering, <span className="font-semibold">{email}</span>. Your account is waiting for admin approval. Once approved, you'll be able to log in here.
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mb-6" dir="rtl" lang="ar">
            تم استلام طلب التسجيل. ستتمكن من الدخول بعد موافقة المسؤول.
          </p>
          <div className="flex items-center justify-center gap-2 text-xs text-teal-600 dark:text-teal-400">
            <Loader2 className="w-3 h-3 animate-spin" />
            Checking for approval every 8 seconds…
          </div>
          {error && <p className="text-xs text-red-500 mt-3">{error}</p>}
        </div>
      </AuthShell>
    );
  }

  if (phase === "approved-confirm") {
    return (
      <AuthShell>
        <div className="text-center">
          <div className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mx-auto mb-4 ring-4 ring-emerald-500/20">
            <CheckCircle2 className="w-10 h-10 text-emerald-500 dark:text-emerald-400" />
          </div>
          <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-2">You're Approved!</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
            Your account has been approved by the admin. Log in with your email and password to enter LEXO.
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mb-6" dir="rtl" lang="ar">
            تمت الموافقة على حسابك. سجّل الدخول بالبريد الإلكتروني وكلمة المرور.
          </p>
          <button
            onClick={() => goToLogin(email)}
            className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold transition-colors flex items-center justify-center gap-2"
          >
            <LogIn className="w-4 h-4" /> Log In Now
          </button>
        </div>
      </AuthShell>
    );
  }

  if (phase === "setup-password") {
    return (
      <AuthShell>
        <div className="text-center mb-6">
          <div className="w-16 h-16 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center mx-auto mb-3">
            <KeyRound className="w-8 h-8 text-teal-600 dark:text-teal-400" />
          </div>
          <h2 className="text-xl font-extrabold text-gray-900 dark:text-white">Create Your Password</h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Choose a password you'll use to log in from now on.
          </p>
          {info && <p className="text-xs text-teal-600 dark:text-teal-400 mt-2">{info}</p>}
        </div>
        <form onSubmit={handleSetupPassword} className="space-y-4">
          <FieldInput icon={<Mail className="w-3.5 h-3.5" />} label="Email" type="email" value={email} disabled />
          <FieldInput
            icon={<Lock className="w-3.5 h-3.5" />}
            label="New password (min. 6 characters)"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={setPassword}
            disabled={loading}
            autoFocus
            rightSlot={
              <button type="button" tabIndex={-1} onClick={() => setShowPassword(v => !v)} className="text-gray-400 hover:text-gray-600">
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            }
          />
          {error && <p className="text-xs text-red-500">{error}</p>}
          <button type="submit" disabled={loading || password.length < 6}
            className="w-full py-3 rounded-xl bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white font-semibold transition-colors flex items-center justify-center gap-2">
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
            Save & enter LEXO
          </button>
        </form>
      </AuthShell>
    );
  }

  if (phase === "register") {
    return (
      <AuthShell footer={
        <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-6">
          Already have an account?{" "}
          <button onClick={() => goToLogin()} className="text-teal-600 hover:underline font-semibold">Log in</button>
        </p>
      }>
        <div className="text-center mb-6">
          <h2 className="text-xl font-extrabold text-gray-900 dark:text-white">Create Account</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Use the access code your instructor gave you.
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1" dir="rtl" lang="ar">
            استخدم رمز الوصول الذي حصلت عليه من المدرس
          </p>
        </div>
        <form onSubmit={handleRegister} className="space-y-4">
          <FieldInput icon={<Mail className="w-3.5 h-3.5" />} label="Email Address"
            type="email" value={email} onChange={setEmail} placeholder="your@email.com" disabled={loading} autoFocus />
          <FieldInput icon={<Lock className="w-3.5 h-3.5" />} label="Password (min. 6 characters)"
            type={showPassword ? "text" : "password"} value={password} onChange={setPassword} placeholder="Choose a password" disabled={loading}
            rightSlot={
              <button type="button" tabIndex={-1} onClick={() => setShowPassword(v => !v)} className="text-gray-400 hover:text-gray-600">
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            } />
          <FieldInput icon={<KeyRound className="w-3.5 h-3.5" />} label="Access Code"
            type="text" value={accessCode}
            onChange={(v) => setAccessCode(v.toUpperCase())}
            placeholder="e.g. 7K9M2P4XAB" disabled={loading} mono />
          {error && <p className="text-xs text-red-500">{error}</p>}
          <button type="submit" disabled={loading || !email.trim() || password.length < 6 || !accessCode.trim()}
            className="w-full py-3 rounded-xl bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white font-semibold transition-colors flex items-center justify-center gap-2">
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <UserPlus className="w-4 h-4" />}
            Register
          </button>
        </form>
        <p className="text-xs text-center text-gray-400 dark:text-gray-500 mt-5">
          Don't have an access code?{" "}
          <a href={WHATSAPP_VISITOR_URL} target="_blank" rel="noopener noreferrer"
            className="text-teal-600 hover:underline font-medium">
            Contact us on WhatsApp
          </a>
        </p>
        <button onClick={() => setPhase("landing")}
          className="w-full mt-3 text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors text-center">
          ← Back to homepage
        </button>
      </AuthShell>
    );
  }

  // ── Login screen (default) ────────────────────────────────────────
  return (
    <AuthShell footer={
      <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-6">
        New here?{" "}
        <button onClick={goToRegister} className="text-teal-600 hover:underline font-semibold">Create an account</button>
      </p>
    }>
      <IdleLogoutBanner />
      <div className="text-center mb-6">
        <h2 className="text-xl font-extrabold text-gray-900 dark:text-white">Log In</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Welcome back. Enter your email and password.</p>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1" dir="rtl" lang="ar">
          مرحبًا بعودتك. سجّل الدخول بالبريد وكلمة المرور.
        </p>
        {info && <p className="text-xs text-teal-600 dark:text-teal-400 mt-2">{info}</p>}
      </div>
      <form onSubmit={handleLogin} className="space-y-4">
        <FieldInput icon={<Mail className="w-3.5 h-3.5" />} label="Email Address"
          type="email" value={email} onChange={setEmail} placeholder="your@email.com" disabled={loading} autoFocus autoComplete="email" />
        <FieldInput icon={<Lock className="w-3.5 h-3.5" />} label="Password"
          type={showPassword ? "text" : "password"} value={password} onChange={setPassword} placeholder="Your password" disabled={loading} autoComplete="current-password"
          rightSlot={
            <button type="button" tabIndex={-1} onClick={() => setShowPassword(v => !v)} className="text-gray-400 hover:text-gray-600">
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          } />
        {error && <p className="text-xs text-red-500">{error}</p>}
        <button type="submit" disabled={loading || !email.trim() || !password}
          className="w-full py-3 rounded-xl bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white font-semibold transition-colors flex items-center justify-center gap-2">
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <LogIn className="w-4 h-4" />}
          Log In
        </button>
      </form>
      <p className="text-xs text-center text-gray-400 dark:text-gray-500 mt-5">
        Need an access code?{" "}
        <a href={WHATSAPP_VISITOR_URL} target="_blank" rel="noopener noreferrer"
          className="text-teal-600 hover:underline font-medium">
          Contact us on WhatsApp
        </a>
      </p>
      <button onClick={() => setPhase("landing")}
        className="w-full mt-3 text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors text-center">
        ← Back to homepage
      </button>
    </AuthShell>
  );
}

// ─── Idle-logout banner shown on the login screen when applicable ───
function IdleLogoutBanner() {
  const [reason, setReason] = useState<string | null>(null);
  useEffect(() => {
    try {
      const r = sessionStorage.getItem(LOGOUT_REASON_KEY);
      if (r) {
        setReason(r);
        sessionStorage.removeItem(LOGOUT_REASON_KEY);
      }
    } catch { /* ignore */ }
  }, []);
  if (reason !== "idle") return null;
  return (
    <div className="mb-4 flex items-start gap-2.5 px-3 py-2.5 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
      <ShieldAlert className="w-4 h-4 text-amber-600 dark:text-amber-400 mt-0.5 shrink-0" />
      <p className="text-xs text-amber-800 dark:text-amber-200 leading-snug">
        You were logged out due to inactivity. Please log in again to continue.
      </p>
    </div>
  );
}

// ─── Reusable input ─────────────────────────────────────────────────
function FieldInput({
  icon, label, type, value, onChange, placeholder, disabled, autoFocus, autoComplete, rightSlot, mono,
}: {
  icon: ReactNode;
  label: string;
  type: string;
  value: string;
  onChange?: (v: string) => void;
  placeholder?: string;
  disabled?: boolean;
  autoFocus?: boolean;
  autoComplete?: string;
  rightSlot?: ReactNode;
  mono?: boolean;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
        <span className="inline mr-1 align-middle">{icon}</span>
        {label}
      </label>
      <div className="relative">
        <input
          type={type}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
          autoFocus={autoFocus}
          disabled={disabled}
          autoComplete={autoComplete ?? "off"}
          className={`w-full px-4 py-3 ${rightSlot ? "pr-10" : ""} rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm disabled:opacity-60 ${mono ? "font-mono tracking-widest uppercase" : ""}`}
        />
        {rightSlot && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">{rightSlot}</div>
        )}
      </div>
    </div>
  );
}
