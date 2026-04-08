import { useState, useEffect, useCallback } from "react";
import { Lock, Eye, EyeOff, Loader2 } from "lucide-react";

const TOKEN_KEY = "4ielts_access_token";

async function checkToken(token: string): Promise<boolean> {
  try {
    const res = await fetch("/api/auth/check", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    });
    const data = await res.json();
    return data.valid === true;
  } catch {
    return false;
  }
}

async function verifyPassword(password: string): Promise<string | null> {
  const res = await fetch("/api/auth/verify", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password }),
  });
  if (!res.ok) return null;
  const data = await res.json();
  return data.token ?? null;
}

interface PasswordGateProps {
  children: React.ReactNode;
}

export function PasswordGate({ children }: PasswordGateProps) {
  const [status, setStatus] = useState<"checking" | "locked" | "unlocked">("checking");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) { setStatus("locked"); return; }
    checkToken(token).then((valid) => {
      setStatus(valid ? "unlocked" : "locked");
    });
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) return;
    setLoading(true);
    setError("");
    try {
      const token = await verifyPassword(password.trim());
      if (token) {
        localStorage.setItem(TOKEN_KEY, token);
        setStatus("unlocked");
      } else {
        setError("Incorrect password. Please check with your instructor.");
      }
    } catch {
      setError("Connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [password]);

  if (status === "checking") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-teal-600" />
      </div>
    );
  }

  if (status === "unlocked") {
    return <>{children}</>;
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
              Enter your access password to continue
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1 text-center" dir="rtl" lang="ar">
              أدخل كلمة المرور للوصول إلى التطبيق
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                <Lock className="inline w-3.5 h-3.5 mr-1" />
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password…"
                  className="w-full px-4 py-3 pr-10 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
                  autoFocus
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {error && (
                <p className="text-xs text-red-500 mt-1.5">{error}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading || !password.trim()}
              className="w-full py-3 rounded-xl bg-teal-600 hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold transition-colors flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Lock className="w-4 h-4" />}
              {loading ? "Verifying…" : "Access App"}
            </button>
          </form>

          <p className="text-xs text-center text-gray-400 dark:text-gray-500 mt-6">
            Don't have a password?{" "}
            <a
              href="https://wa.me/4ielts"
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-600 hover:underline font-medium"
            >
              Contact us on WhatsApp
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
