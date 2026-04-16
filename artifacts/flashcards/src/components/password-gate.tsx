import { useState, useEffect, useCallback, useRef } from "react";
import { Mail, Lock, Eye, EyeOff, Loader2, Clock, CalendarX, MessageCircle, LogIn, ChevronRight, Sparkles, Brain, Mic, PenTool, BookOpen, ArrowLeftRight, ArrowUpDown, BarChart3, Flame, Zap, CheckCircle2, Star, Quote, Headphones } from "lucide-react";

const STORAGE_KEY = "4ielts_email";
const WHATSAPP_URL = "https://wa.me/message/KMWPDZOBBNAAB1";
const WHATSAPP_VISITOR_URL = "https://wa.me/4ielts";
const CONTACT_EMAIL = "askabuomar@gmail.com";

async function checkStatus(email: string): Promise<{ status: string; token?: string }> {
  try {
    const res = await fetch("/api/access/check", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    return await res.json();
  } catch { return { status: "error" }; }
}

async function requestAccess(email: string, accessCode: string): Promise<{ status: string; token?: string; error?: string }> {
  try {
    const res = await fetch("/api/access/request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, accessCode }),
    });
    const data = await res.json();
    if (!res.ok) return { status: "error", error: data.error };
    return data;
  } catch { return { status: "error", error: "Connection error. Please try again." }; }
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
  }>>([]);

  useEffect(() => {
    fetch("/api/reviews/public")
      .then(r => r.json())
      .then(data => { if (Array.isArray(data)) setReviews(data); })
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
          </div>
        ))}
      </div>
    </section>
  );
}

function LandingPage({ onLogin }: { onLogin: () => void }) {
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
          <button
            onClick={onLogin}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white text-sm font-semibold transition-all backdrop-blur-sm"
          >
            <LogIn className="w-4 h-4" />
            Log In
          </button>
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
                onClick={onLogin}
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-teal-500 hover:bg-teal-400 text-white font-bold text-lg transition-all shadow-lg shadow-teal-500/25 hover:shadow-teal-400/30"
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

interface PasswordGateProps { children: React.ReactNode; }

export function PasswordGate({ children }: PasswordGateProps) {
  const [phase, setPhase] = useState<"checking" | "landing" | "form" | "pending" | "unlocked" | "expired">("checking");
  const [email, setEmail] = useState("");
  const [accessCode, setAccessCode] = useState("");
  const [showCode, setShowCode] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const pollTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const expiredEmailRef = useRef<string>("");

  const stopPolling = () => { if (pollTimer.current) clearTimeout(pollTimer.current); };

  const unlockAndSave = useCallback((em: string, token: string) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ email: em, token }));
    saveSessionToDb(em, token);
    setPhase("unlocked");
  }, []);

  const startPolling = useCallback((em: string) => {
    stopPolling();
    const poll = async () => {
      const result = await checkStatus(em);
      if (result.status === "approved" && result.token) {
        unlockAndSave(em, result.token);
      } else if (result.status === "expired") {
        localStorage.removeItem(STORAGE_KEY);
        expiredEmailRef.current = em;
        setPhase("expired");
        startExpiredPolling(em);
      } else if (result.status === "rejected") {
        setError("Your access request was not approved. Please contact your instructor.");
        localStorage.removeItem(STORAGE_KEY);
        setPhase("form");
      } else {
        pollTimer.current = setTimeout(poll, 8000);
      }
    };
    pollTimer.current = setTimeout(poll, 8000);
  }, [unlockAndSave]); // eslint-disable-line

  const startExpiredPolling = useCallback((em: string) => {
    stopPolling();
    const poll = async () => {
      const result = await checkStatus(em);
      if (result.status === "approved" && result.token) {
        unlockAndSave(em, result.token);
      } else {
        pollTimer.current = setTimeout(poll, 10000);
      }
    };
    pollTimer.current = setTimeout(poll, 10000);
  }, [unlockAndSave]); // eslint-disable-line

  useEffect(() => {
    async function init() {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        try {
          const { email: storedEmail, token } = JSON.parse(raw);
          const result = await checkStatus(storedEmail);
          if (result.status === "approved" && result.token === token) {
            saveSessionToDb(storedEmail, token);
            setPhase("unlocked");
            return;
          } else if (result.status === "expired") {
            localStorage.removeItem(STORAGE_KEY);
            expiredEmailRef.current = storedEmail;
            setPhase("expired");
            startExpiredPolling(storedEmail);
            return;
          } else if (result.status === "pending") {
            setEmail(storedEmail);
            setPhase("pending");
            startPolling(storedEmail);
            return;
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

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !accessCode.trim()) return;
    setLoading(true);
    setError("");
    const normalizedEmail = email.trim().toLowerCase();
    const result = await requestAccess(normalizedEmail, accessCode.trim());
    setLoading(false);
    if (result.status === "approved" && result.token) {
      localStorage.setItem("4ielts_last_email", normalizedEmail);
      unlockAndSave(normalizedEmail, result.token);
    } else if (result.status === "expired") {
      localStorage.removeItem(STORAGE_KEY);
      expiredEmailRef.current = normalizedEmail;
      setPhase("expired");
      startExpiredPolling(normalizedEmail);
    } else if (result.status === "pending") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ email: normalizedEmail, token: "" }));
      localStorage.setItem("4ielts_last_email", normalizedEmail);
      setPhase("pending");
      startPolling(normalizedEmail);
    } else if (result.status === "rejected") {
      setError("Your request was not approved. Please contact your instructor.");
    } else {
      setError(result.error ?? "Something went wrong. Please try again.");
    }
  }, [email, accessCode, startPolling, startExpiredPolling, unlockAndSave]);

  const resetForm = () => {
    stopPolling();
    localStorage.removeItem(STORAGE_KEY);
    setPhase("form");
    setEmail("");
    setAccessCode("");
    setError("");
  };

  if (phase === "checking") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-teal-600" />
      </div>
    );
  }

  if (phase === "unlocked") return <>{children}</>;

  if (phase === "landing") {
    return <LandingPage onLogin={() => setPhase("form")} />;
  }

  if (phase === "expired") {
    const tryAgain = () => {
      stopPolling();
      setEmail(expiredEmailRef.current);
      setAccessCode("");
      setError("");
      setPhase("form");
    };

    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-900 via-teal-800 to-sky-900 p-4">
        <div className="w-full max-w-sm">
          <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-8 text-center">
            <img src="/4ielts-logo.png" alt="4IELTS" className="h-16 w-auto object-contain mx-auto mb-6" />
            <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mx-auto mb-4">
              <CalendarX className="w-8 h-8 text-red-500 dark:text-red-400" />
            </div>
            <h2 className="text-xl font-extrabold text-gray-900 dark:text-white mb-2">Subscription Expired</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
              Your access to 4IELTS has expired. Please contact Abu Omar to renew your subscription.
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mb-4" dir="rtl" lang="ar">
              انتهت صلاحية اشتراكك. تواصل مع أبو عمر لتجديد الاشتراك.
            </p>

            <div className="flex items-center justify-center gap-2 text-xs text-teal-600 dark:text-teal-400 mb-5 bg-teal-50 dark:bg-teal-900/20 rounded-xl py-2.5 px-3">
              <Loader2 className="w-3 h-3 animate-spin shrink-0" />
              Checking for renewal every 10 seconds — this will unlock automatically once renewed.
            </div>

            <div className="space-y-3">
              <a
                href={WHATSAPP_VISITOR_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-green-500 hover:bg-green-600 text-white font-semibold transition-colors text-sm"
              >
                <MessageCircle className="w-4 h-4" />
                Contact on WhatsApp
              </a>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 font-semibold transition-colors text-sm"
              >
                <Mail className="w-4 h-4" />
                {CONTACT_EMAIL}
              </a>
              <button
                onClick={tryAgain}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold transition-colors text-sm"
              >
                Already renewed? Try logging in
              </button>
            </div>
            <button onClick={resetForm} className="mt-5 text-xs text-gray-400 hover:text-gray-600 underline">
              Use a different email
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (phase === "pending") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-900 via-teal-800 to-sky-900 p-4">
        <div className="w-full max-w-sm">
          <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-8 text-center">
            <img src="/4ielts-logo.png" alt="4IELTS" className="h-16 w-auto object-contain mx-auto mb-6" />
            <div className="w-16 h-16 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-amber-600 dark:text-amber-400" />
            </div>
            <h2 className="text-xl font-extrabold text-gray-900 dark:text-white mb-2">Request Sent!</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
              Your access request has been sent. This page will unlock automatically once your instructor approves it.
            </p>
            {error && <p className="text-xs text-red-500 mb-3">{error}</p>}
            <p className="text-xs text-gray-400 dark:text-gray-500 mb-6" dir="rtl" lang="ar">
              تم إرسال طلبك. ستُفتح الصفحة تلقائياً عند الموافقة.
            </p>
            <div className="flex items-center justify-center gap-2 text-xs text-teal-600 dark:text-teal-400 mb-6">
              <Loader2 className="w-3 h-3 animate-spin" />
              Checking for approval every 8 seconds…
            </div>
            <button onClick={resetForm} className="text-xs text-gray-400 hover:text-gray-600 underline">
              Use a different email
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-900 via-teal-800 to-sky-900 p-4">
      <div className="w-full max-w-sm">
        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-8">
          <div className="flex flex-col items-center mb-8">
            <div className="flex flex-col items-center gap-1 mb-4">
              <img src="/4ielts-logo.png" alt="4IELTS" className="h-16 w-auto object-contain" />
              <span className="text-xs font-semibold tracking-widest uppercase text-teal-600 dark:text-teal-400">
                AI-Powered By 4IELTS
              </span>
            </div>
            <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white text-center">
              LEXO
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 text-center">
              Enter your email and the access code from your instructor
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1 text-center" dir="rtl" lang="ar">
              أدخل بريدك الإلكتروني ورمز الوصول
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                <Mail className="inline w-3.5 h-3.5 mr-1" />
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
                autoFocus
                disabled={loading}
                autoComplete="email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                <Lock className="inline w-3.5 h-3.5 mr-1" />
                Access Code
              </label>
              <div className="relative">
                <input
                  type={showCode ? "text" : "password"}
                  value={accessCode}
                  onChange={(e) => setAccessCode(e.target.value)}
                  placeholder="Enter access code…"
                  className="w-full px-4 py-3 pr-10 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
                  disabled={loading}
                  autoComplete="off"
                />
                <button type="button" onClick={() => setShowCode(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600" tabIndex={-1}>
                  {showCode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && <p className="text-xs text-red-500">{error}</p>}

            <button
              type="submit"
              disabled={loading || !email.trim() || !accessCode.trim()}
              className="w-full py-3 rounded-xl bg-teal-600 hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold transition-colors flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <LogIn className="w-4 h-4" />}
              {loading ? "جاري الدخول... | Signing In…" : "دخول | Sign In"}
            </button>
          </form>

          <p className="text-xs text-center text-gray-400 dark:text-gray-500 mt-6">
            Don't have an access code?{" "}
            <a href={WHATSAPP_VISITOR_URL} target="_blank" rel="noopener noreferrer"
              className="text-teal-600 hover:underline font-medium">
              Contact us on WhatsApp
            </a>
          </p>

          <button
            onClick={() => setPhase("landing")}
            className="w-full mt-4 text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors text-center"
          >
            ← Back to homepage
          </button>
        </div>
      </div>
    </div>
  );
}
