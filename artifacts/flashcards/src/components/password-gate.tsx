import { useState, useEffect, useCallback, useRef } from "react";
import { Mail, Lock, Eye, EyeOff, Loader2, Clock, CalendarX, MessageCircle } from "lucide-react";

const STORAGE_KEY = "4ielts_email";
const WHATSAPP_URL = "https://wa.me/message/KMWPDZOBBNAAB1";
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

interface PasswordGateProps { children: React.ReactNode; }

export function PasswordGate({ children }: PasswordGateProps) {
  const [phase, setPhase] = useState<"checking" | "form" | "pending" | "unlocked" | "expired">("checking");
  const [email, setEmail] = useState("");
  const [accessCode, setAccessCode] = useState("");
  const [showCode, setShowCode] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const pollTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const expiredEmailRef = useRef<string>("");

  const stopPolling = () => { if (pollTimer.current) clearTimeout(pollTimer.current); };

  const startPolling = useCallback((em: string) => {
    stopPolling();
    const poll = async () => {
      const result = await checkStatus(em);
      if (result.status === "approved" && result.token) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ email: em, token: result.token }));
        setPhase("unlocked");
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
  }, []); // eslint-disable-line

  const startExpiredPolling = useCallback((em: string) => {
    stopPolling();
    const poll = async () => {
      const result = await checkStatus(em);
      if (result.status === "approved" && result.token) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ email: em, token: result.token }));
        setPhase("unlocked");
      } else {
        pollTimer.current = setTimeout(poll, 10000);
      }
    };
    pollTimer.current = setTimeout(poll, 10000);
  }, []); // eslint-disable-line

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) { setPhase("form"); return; }
    try {
      const { email: storedEmail, token } = JSON.parse(raw);
      checkStatus(storedEmail).then((result) => {
        if (result.status === "approved" && result.token === token) {
          setPhase("unlocked");
        } else if (result.status === "expired") {
          localStorage.removeItem(STORAGE_KEY);
          expiredEmailRef.current = storedEmail;
          setPhase("expired");
          startExpiredPolling(storedEmail);
        } else if (result.status === "pending") {
          setEmail(storedEmail);
          setPhase("pending");
          startPolling(storedEmail);
        } else {
          localStorage.removeItem(STORAGE_KEY);
          setPhase("form");
        }
      });
    } catch { localStorage.removeItem(STORAGE_KEY); setPhase("form"); }
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
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ email: normalizedEmail, token: result.token }));
      setPhase("unlocked");
    } else if (result.status === "expired") {
      localStorage.removeItem(STORAGE_KEY);
      expiredEmailRef.current = normalizedEmail;
      setPhase("expired");
      startExpiredPolling(normalizedEmail);
    } else if (result.status === "pending") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ email: normalizedEmail, token: "" }));
      setPhase("pending");
      startPolling(normalizedEmail);
    } else if (result.status === "rejected") {
      setError("Your request was not approved. Please contact your instructor.");
    } else {
      setError(result.error ?? "Something went wrong. Please try again.");
    }
  }, [email, accessCode, startPolling, startExpiredPolling]);

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

            {/* Auto-unlock indicator */}
            <div className="flex items-center justify-center gap-2 text-xs text-teal-600 dark:text-teal-400 mb-5 bg-teal-50 dark:bg-teal-900/20 rounded-xl py-2.5 px-3">
              <Loader2 className="w-3 h-3 animate-spin shrink-0" />
              Checking for renewal every 10 seconds — this will unlock automatically once renewed.
            </div>

            <div className="space-y-3">
              <a
                href={WHATSAPP_URL}
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
            <img src="/4ielts-logo.png" alt="4IELTS" className="h-20 w-auto object-contain mb-4" />
            <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white text-center">
              4IELTS Vocabulary App
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
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Mail className="w-4 h-4" />}
              {loading ? "Sending Request…" : "Request Access"}
            </button>
          </form>

          <p className="text-xs text-center text-gray-400 dark:text-gray-500 mt-6">
            Don't have an access code?{" "}
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
              className="text-teal-600 hover:underline font-medium">
              Contact us on WhatsApp
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
