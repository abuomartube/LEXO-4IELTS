import { Link, useLocation } from "wouter";
import { BookOpen, Home, Layers, PieChart, ExternalLink, Sun, Moon, HelpCircle, Sparkles, Shuffle, FileText, BookMarked, Mic, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/context/theme-context";
import { Button } from "@/components/ui/button";

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

  const navItems = [
    { href: "/", label: "Dashboard", icon: Home },
    { href: "/study", label: "Study Mode", icon: BookOpen },
    { href: "/quiz", label: "Quiz Mode", icon: HelpCircle },
    { href: "/synonyms", label: "Synonyms", icon: Sparkles },
    { href: "/antonyms", label: "Antonyms", icon: Shuffle },
    { href: "/speaking", label: "Churchill AI", icon: Mic },
    { href: "/essay-checker", label: "Orwell AI", icon: FileText },
    { href: "/stories", label: "Short Stories", icon: BookMarked },
    { href: "/browse", label: "Browse Cards", icon: Layers },
    { href: "/progress", label: "Progress", icon: PieChart },
  ];

  return (
    <div className="min-h-[100dvh] flex flex-col md:flex-row bg-background">
      <aside className="w-full md:w-64 bg-card border-r border-border shrink-0 flex flex-col">
        <div className="p-5 border-b border-border flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <img
              src="/4ielts-logo.png"
              alt="4IELTS"
              className="h-24 w-auto object-contain"
            />
          </Link>
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

      {/* Mobile nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border px-2 py-2 flex justify-between items-center pb-safe">
        {navItems.map((item) => {
          const isActive = location === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-1 transition-colors p-2 rounded-xl min-w-0 flex-1",
                isActive ? "text-primary bg-primary/5" : "text-muted-foreground"
              )}
            >
              <item.icon className="w-5 h-5 shrink-0" />
              <span className="text-[9px] font-medium truncate">{item.label}</span>
            </Link>
          );
        })}
        <button
          onClick={toggleTheme}
          className="flex flex-col items-center gap-1 transition-colors p-2 rounded-xl text-muted-foreground flex-1"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          <span className="text-[9px] font-medium">Theme</span>
        </button>
        <button
          onClick={handleLogout}
          className="flex flex-col items-center gap-1 transition-colors p-2 rounded-xl text-muted-foreground flex-1"
          aria-label="Log out"
        >
          <LogOut className="w-5 h-5" />
          <span className="text-[9px] font-medium">Log Out</span>
        </button>
      </nav>

      <main className="flex-1 overflow-y-auto pb-24 md:pb-0">
        <div className="max-w-5xl mx-auto p-4 md:p-8">
          {children}
        </div>
      </main>

      {/* ── WhatsApp floating button ── */}
      <style>{`
        @keyframes wa-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(37,211,102,0.55), 0 4px 16px rgba(0,0,0,0.22); }
          60%       { box-shadow: 0 0 0 10px rgba(37,211,102,0),  0 4px 16px rgba(0,0,0,0.22); }
        }
        .wa-btn { animation: wa-pulse 2.4s ease-in-out infinite; }
        .wa-btn:hover .wa-tooltip { opacity: 1; transform: translateY(0); pointer-events: auto; }
      `}</style>

      <a
        href="https://wa.link/abuomar"
        target="_blank"
        rel="noopener noreferrer"
        className="wa-btn"
        style={{
          position: "fixed",
          bottom: "88px",
          left: "16px",
          zIndex: 9999,
          display: "flex",
          alignItems: "center",
          gap: "6px",
          background: "#25D366",
          color: "#fff",
          borderRadius: "999px",
          padding: "10px 16px 10px 12px",
          fontWeight: 700,
          fontSize: "13px",
          textDecoration: "none",
          whiteSpace: "nowrap",
          userSelect: "none",
        }}
      >
        {/* WhatsApp SVG icon */}
        <svg width="22" height="22" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
          <circle cx="16" cy="16" r="16" fill="#25D366"/>
          <path
            d="M23.5 8.5A10.44 10.44 0 0016 5.5C10.2 5.5 5.5 10.2 5.5 16a10.4 10.4 0 001.4 5.2L5.5 26.5l5.5-1.4A10.45 10.45 0 0016 26.5c5.8 0 10.5-4.7 10.5-10.5 0-2.8-1.1-5.4-3-7.5zm-7.5 16.1a8.6 8.6 0 01-4.4-1.2l-.3-.2-3.3.9.9-3.2-.2-.3A8.6 8.6 0 017.4 16c0-4.8 3.9-8.6 8.6-8.6 2.3 0 4.5.9 6.1 2.5a8.55 8.55 0 012.5 6.1c0 4.7-3.9 8.6-8.6 8.6zm4.7-6.4c-.3-.1-1.6-.8-1.8-.9-.2-.1-.4-.1-.6.1-.2.2-.6.9-.8 1-.1.2-.3.2-.5.1a7.33 7.33 0 01-2.2-1.3 8.24 8.24 0 01-1.5-1.9c-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.1.1-.3.2-.4 0-.2 0-.3-.1-.5-.1-.2-.6-1.4-.8-1.9-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.2-.9.9-.9 2.1s.9 2.4 1 2.6c.1.2 1.8 2.8 4.4 3.8.6.3 1.1.4 1.5.5.6.2 1.2.2 1.6.1.5-.1 1.6-.6 1.8-1.3.2-.6.2-1.1.1-1.2-.1-.1-.3-.2-.6-.3z"
            fill="#fff"
          />
        </svg>
        أبو عمر

        {/* Tooltip */}
        <span
          className="wa-tooltip"
          style={{
            position: "absolute",
            bottom: "calc(100% + 8px)",
            left: "50%",
            transform: "translateX(-50%) translateY(4px)",
            background: "rgba(0,0,0,0.78)",
            color: "#fff",
            fontSize: "11px",
            fontWeight: 600,
            padding: "4px 10px",
            borderRadius: "8px",
            whiteSpace: "nowrap",
            opacity: 0,
            pointerEvents: "none",
            transition: "opacity 0.18s ease, transform 0.18s ease",
          }}
        >
          تواصل مع أبو عمر
        </span>
      </a>
    </div>
  );
}
