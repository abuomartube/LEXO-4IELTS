import { Link, useLocation } from "wouter";
import { BookOpen, Home, Layers, PieChart, ExternalLink, Sun, Moon, HelpCircle, Sparkles, Shuffle, FileText, BookMarked, Mic } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/context/theme-context";
import { Button } from "@/components/ui/button";

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const { theme, toggleTheme } = useTheme();

  const navItems = [
    { href: "/", label: "Dashboard", icon: Home },
    { href: "/study", label: "Study Mode", icon: BookOpen },
    { href: "/quiz", label: "Quiz Mode", icon: HelpCircle },
    { href: "/synonyms", label: "Synonyms", icon: Sparkles },
    { href: "/antonyms", label: "Antonyms", icon: Shuffle },
    { href: "/essay-checker", label: "Essay Checker", icon: FileText },
    { href: "/stories", label: "Short Stories", icon: BookMarked },
    { href: "/speaking", label: "Churchill AI", icon: Mic },
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

        <div className="hidden md:block px-4 pb-5">
          <a
            href="https://www.4ielts.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-primary hover:bg-primary/5 transition-colors"
          >
            <ExternalLink className="w-4 h-4 shrink-0" />
            www.4ielts.com
          </a>
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
      </nav>

      <main className="flex-1 overflow-y-auto pb-24 md:pb-0">
        <div className="max-w-5xl mx-auto p-4 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
