import { Link, useLocation } from "wouter";
import { BookOpen, Home, Layers, PieChart } from "lucide-react";
import { cn } from "@/lib/utils";

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();

  const navItems = [
    { href: "/", label: "Dashboard", icon: Home },
    { href: "/study", label: "Study Mode", icon: BookOpen },
    { href: "/browse", label: "Browse Cards", icon: Layers },
    { href: "/progress", label: "Progress", icon: PieChart },
  ];

  return (
    <div className="min-h-[100dvh] flex flex-col md:flex-row bg-background">
      <aside className="w-full md:w-64 bg-card border-r border-border shrink-0 flex flex-col">
        <div className="p-6">
          <Link href="/" className="flex items-center gap-3 font-bold text-2xl text-primary">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground shadow-sm">
              <span className="font-arabic text-xl leading-none mb-1">ع</span>
            </div>
            Lisan
          </Link>
        </div>
        <nav className="flex-1 px-4 pb-4 space-y-1 overflow-y-auto hidden md:block">
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
      </aside>

      {/* Mobile nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border px-6 py-3 flex justify-between items-center pb-safe">
        {navItems.map((item) => {
          const isActive = location === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-1 transition-colors p-2 rounded-xl",
                isActive ? "text-primary bg-primary/5" : "text-muted-foreground"
              )}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <main className="flex-1 overflow-y-auto pb-24 md:pb-0">
        <div className="max-w-5xl mx-auto p-4 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
