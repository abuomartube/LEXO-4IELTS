import { useState, useEffect } from "react";
import { Lock, Eye, EyeOff, CheckCircle2, AlertCircle, Loader2, KeyRound } from "lucide-react";

export default function AdminPage() {
  const [adminPassword, setAdminPassword] = useState("");
  const [showAdmin, setShowAdmin] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [currentPassword, setCurrentPassword] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [fetching, setFetching] = useState(false);

  const fetchCurrent = async (ap: string) => {
    setFetching(true);
    try {
      const res = await fetch("/api/admin/current-password", {
        headers: { "x-admin-password": ap },
      });
      if (res.ok) {
        const data = await res.json();
        setCurrentPassword(data.password);
      } else {
        setCurrentPassword(null);
      }
    } catch {
      setCurrentPassword(null);
    } finally {
      setFetching(false);
    }
  };

  const handleAdminCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetchCurrent(adminPassword);
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword.trim() || newPassword.trim().length < 4) {
      setStatus("error");
      setMessage("Password must be at least 4 characters.");
      return;
    }
    setStatus("loading");
    setMessage("");
    try {
      const res = await fetch("/api/admin/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ adminPassword, newPassword: newPassword.trim() }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("success");
        setMessage(`Password changed to: "${newPassword.trim()}"`);
        setCurrentPassword(newPassword.trim());
        setNewPassword("");
      } else {
        setStatus("error");
        setMessage(data.error ?? "Failed to change password.");
      }
    } catch {
      setStatus("error");
      setMessage("Connection error. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-900 via-teal-800 to-sky-900 p-4">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-8">
          <div className="flex flex-col items-center mb-8">
            <img src="/4ielts-logo.png" alt="4IELTS" className="h-16 w-auto object-contain mb-3" />
            <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">Admin Panel</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Change the student access password</p>
          </div>

          {currentPassword === null ? (
            <form onSubmit={handleAdminCheck} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Admin Password
                </label>
                <div className="relative">
                  <input
                    type={showAdmin ? "text" : "password"}
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    placeholder="Enter admin password…"
                    className="w-full px-4 py-3 pr-10 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
                    autoFocus
                  />
                  <button type="button" onClick={() => setShowAdmin((v) => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" tabIndex={-1}>
                    {showAdmin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <button
                type="submit"
                disabled={fetching || !adminPassword}
                className="w-full py-3 rounded-xl bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white font-semibold transition-colors flex items-center justify-center gap-2"
              >
                {fetching ? <Loader2 className="w-4 h-4 animate-spin" /> : <Lock className="w-4 h-4" />}
                {fetching ? "Checking…" : "Login"}
              </button>
              {currentPassword === null && adminPassword && !fetching && (
                <p className="text-xs text-red-500 text-center">Wrong admin password or not set.</p>
              )}
            </form>
          ) : (
            <div className="space-y-6">
              <div className="bg-teal-50 dark:bg-teal-900/30 rounded-2xl p-4">
                <p className="text-xs text-teal-600 dark:text-teal-400 font-medium mb-1">Current student password</p>
                <p className="text-xl font-mono font-bold text-teal-700 dark:text-teal-300 tracking-widest">{currentPassword}</p>
              </div>

              <form onSubmit={handleChangePassword} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    <KeyRound className="inline w-3.5 h-3.5 mr-1" />
                    New Student Password
                  </label>
                  <div className="relative">
                    <input
                      type={showNew ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Enter new password…"
                      className="w-full px-4 py-3 pr-10 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
                      autoFocus
                    />
                    <button type="button" onClick={() => setShowNew((v) => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" tabIndex={-1}>
                      {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {status === "success" && (
                  <div className="flex items-center gap-2 text-green-600 dark:text-green-400 text-sm bg-green-50 dark:bg-green-900/20 rounded-xl p-3">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    {message}
                  </div>
                )}
                {status === "error" && (
                  <div className="flex items-center gap-2 text-red-600 dark:text-red-400 text-sm bg-red-50 dark:bg-red-900/20 rounded-xl p-3">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    {message}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === "loading" || !newPassword.trim()}
                  className="w-full py-3 rounded-xl bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  {status === "loading" ? <Loader2 className="w-4 h-4 animate-spin" /> : <KeyRound className="w-4 h-4" />}
                  {status === "loading" ? "Saving…" : "Change Password"}
                </button>
              </form>

              <p className="text-xs text-gray-400 text-center">
                Changing the password immediately logs out all existing students.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
