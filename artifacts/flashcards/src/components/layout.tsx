import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { BookOpen, Home, Layers, PieChart, ExternalLink, Sun, Moon, HelpCircle, Sparkles, Shuffle, ArrowUpDown, FileText, BookMarked, Mic, LogOut, GraduationCap, Headphones, Menu, X, AlertTriangle, NotebookPen, Trophy, BookText, PlayCircle, User } from "lucide-react";
import { customFetch } from "@workspace/api-client-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/context/theme-context";
import { Button } from "@/components/ui/button";
import { MyPlanButton } from "@/components/my-plan-button";
import { NotificationsBell } from "@/components/notifications-bell";

function handleLogout() {
  try {
    const raw = localStorage.getItem("4ielts_email");
    if (raw) {
      const { email, token } = JSON.parse(raw);
      if (email) {
        const body = JSON.stringify({ email, token });
        if (navigator.sendBeacon) {
          const blob = new Blob([body], { type: "application/json" });
          navigator.sendBeacon("/api/session/clear", blob);
        } else {
          fetch("/api/session/clear", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body,
            keepalive: true,
          }).catch(() => {});
        }
      }
    }
  } catch {}
  localStorage.removeItem("4ielts_email");
  localStorage.removeItem("4ielts_last_email");
  window.location.reload();
}

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [avatar, setAvatar] = useState<string>("");
  const [displayName, setDisplayName] = useState<string>("");

  useEffect(() => {
    let cancelled = false;
    async function refreshProfile() {
      try {
        const [a, n] = await Promise.all([
          customFetch<{ value: string }>("/api/user-data/avatar").catch(() => ({ value: "" })),
          customFetch<{ value: string }>("/api/user-data/name").catch(() => ({ value: "" })),
        ]);
        if (cancelled) return;
        setAvatar(a.value || "");
        setDisplayName(n.value || "");
      } catch { /* ignore */ }
    }
    refreshProfile();
    const handler = () => refreshProfile();
    window.addEventListener("lexo:profile-updated", handler);
    return () => { cancelled = true; window.removeEventListener("lexo:profile-updated", handler); };
  }, []);

  const initial = (displayName || "?").trim().charAt(0).toUpperCase() || "?";

  const navItems = [
    { href: "/", label: "Dashboard", icon: Home },
    { href: "/profile", label: "Profile", icon: User },
    { href: "/lessons", label: "Lessons", icon: PlayCircle },
    { href: "/study", label: "Study Mode", icon: BookOpen },
    { href: "/quiz", label: "Quiz Mode", icon: HelpCircle },
    { href: "/weak-words", label: "Weak Words", icon: AlertTriangle },
    { href: "/synonyms", label: "Synonyms", icon: Sparkles },
    { href: "/antonyms", label: "Antonyms", icon: Shuffle },
    { href: "/phrasal-verbs", label: "Phrasal Verbs", icon: ArrowUpDown },
    { href: "/grammar", label: "Grammar", icon: BookText },
    { href: "/speaking", label: "Churchill AI", icon: Mic },
    { href: "/speaking-topics", label: "Topic Bank", icon: BookOpen },
    { href: "/essay-checker", label: "Orwell AI", icon: FileText },
    { href: "/writing-templates", label: "Writing Templates", icon: NotebookPen },
    { href: "/listening-test", label: "Listening Practice", icon: Headphones },
    { href: "/reading-test", label: "Reading Practice", icon: GraduationCap },
    { href: "/stories", label: "Short Stories", icon: BookMarked },
    { href: "/browse", label: "Browse Cards", icon: Layers },
    { href: "/mock-test", label: "Mock Test", icon: Trophy },
    { href: "/progress", label: "Progress", icon: PieChart },
  ];

  return (
    <div className="min-h-[100dvh] flex flex-col md:flex-row bg-background">
      <aside className="w-full md:w-64 bg-card border-r border-border shrink-0 flex flex-col">
        <div className="p-5 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5 text-foreground" />
            </button>
            <Link href="/" className="flex items-center gap-3">
              <img
                src="/4ielts-logo.png"
                alt="4IELTS"
                className="h-24 w-auto object-contain"
              />
            </Link>
          </div>
          <div className="flex items-center gap-1">
            <Link
              href="/profile"
              aria-label="Open your profile"
              className="shrink-0 rounded-full ring-2 ring-transparent hover:ring-primary/40 transition-all"
            >
              {avatar ? (
                <img
                  src={avatar}
                  alt={displayName || "Profile"}
                  className="w-9 h-9 rounded-full object-cover"
                />
              ) : (
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-teal-400 to-sky-500 text-white text-sm font-extrabold flex items-center justify-center">
                  {initial}
                </div>
              )}
            </Link>
            <NotificationsBell variant="sidebar" />
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full hidden md:flex"
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>
          </div>
        </div>
        <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto hidden md:block">
          {navItems.map((item) => {
            const isActive = location === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors font-medium text-sm",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )}
              >
                <item.icon className={cn("w-5 h-5", isActive ? "text-primary" : "text-muted-foreground")} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:block px-4 pb-5 space-y-1">
          <a
            href="https://www.4ielts.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-primary hover:bg-primary/5 transition-colors"
          >
            <ExternalLink className="w-4 h-4 shrink-0" />
            www.4ielts.com
          </a>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-destructive hover:bg-destructive/5 transition-colors w-full"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            Log Out
          </button>
        </div>
      </aside>

      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-[60]">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="absolute top-0 left-0 bottom-0 w-72 bg-card border-r border-border flex flex-col animate-in slide-in-from-left duration-200">
            <div className="p-4 border-b border-border flex items-center justify-between">
              <Link href="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3">
                <img
                  src="/4ielts-logo.png"
                  alt="4IELTS"
                  className="h-16 w-auto object-contain"
                />
              </Link>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="w-9 h-9 rounded-lg bg-muted hover:bg-muted/80 flex items-center justify-center transition-colors"
                aria-label="Close menu"
              >
                <X className="w-5 h-5 text-foreground" />
              </button>
            </div>

            <nav className="flex-1 px-3 py-3 space-y-0.5 overflow-y-auto">
              {navItems.map((item) => {
                const isActive = location === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-3 py-3 rounded-xl transition-colors font-medium text-sm",
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                    )}
                  >
                    <item.icon className={cn("w-5 h-5", isActive ? "text-primary" : "text-muted-foreground")} />
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="px-3 pb-5 pt-2 border-t border-border space-y-0.5">
              <button
                onClick={() => { toggleTheme(); setMobileMenuOpen(false); }}
                className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors w-full"
              >
                {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                {theme === "dark" ? "Light Mode" : "Dark Mode"}
              </button>
              <a
                href="https://www.4ielts.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium text-muted-foreground hover:text-primary hover:bg-primary/5 transition-colors"
              >
                <ExternalLink className="w-5 h-5 shrink-0" />
                www.4ielts.com
              </a>
              <button
                onClick={() => { handleLogout(); setMobileMenuOpen(false); }}
                className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium text-muted-foreground hover:text-destructive hover:bg-destructive/5 transition-colors w-full"
              >
                <LogOut className="w-5 h-5 shrink-0" />
                Log Out
              </button>
            </div>
          </div>
        </div>
      )}

      <main className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto p-4 md:p-8 pt-16 md:pt-8">
          {children}
        </div>
      </main>

      <MyPlanButton />
    </div>
  );
}
