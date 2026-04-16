import { useState, useEffect, useCallback, useRef } from "react";
import { Sparkles, Flame, AlertTriangle, Mic, PenTool, Headphones, BookOpen, Trophy, ChevronRight, X } from "lucide-react";
import { customFetch } from "@workspace/api-client-react";

const TOUR_KEY = "lexo_tour_completed";

interface TourStep {
  target: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  bgGradient: string;
  iconBg: string;
}

const steps: TourStep[] = [
  {
    target: "[data-tour='word-of-day']",
    title: "Word of the Day",
    description: "Every day a new academic word. Learn it, quiz yourself, earn XP.",
    icon: <Sparkles className="w-8 h-8 text-amber-400" />,
    bgGradient: "from-amber-500/20 via-orange-500/10 to-transparent",
    iconBg: "bg-amber-500/20 border-amber-400/30",
  },
  {
    target: "[data-tour='streak']",
    title: "Your Streak",
    description: "Study every day to keep your streak alive. Miss a day and it resets to zero.",
    icon: <Flame className="w-8 h-8 text-orange-500" />,
    bgGradient: "from-orange-500/20 via-red-500/10 to-transparent",
    iconBg: "bg-orange-500/20 border-orange-400/30",
  },
  {
    target: "[data-tour='weak-words']",
    title: "Weak Words",
    description: "Every word you get wrong is saved here automatically. Review them until you master them.",
    icon: <AlertTriangle className="w-8 h-8 text-rose-500" />,
    bgGradient: "from-rose-500/20 via-pink-500/10 to-transparent",
    iconBg: "bg-rose-500/20 border-rose-400/30",
  },
  {
    target: "[data-tour='ai-tools']",
    title: "Churchill & Orwell AI",
    description: "Practice Speaking with Churchill AI and get your Writing scored by Orwell AI.",
    icon: (
      <div className="flex -space-x-1">
        <Mic className="w-7 h-7 text-teal-400" />
        <PenTool className="w-7 h-7 text-violet-400" />
      </div>
    ),
    bgGradient: "from-teal-500/20 via-violet-500/10 to-transparent",
    iconBg: "bg-teal-500/20 border-teal-400/30",
  },
  {
    target: "[data-tour='tests']",
    title: "Tests & Mock IELTS",
    description: "Practice with Listening and Reading tests, or take a full timed Mock IELTS to get your band score estimate.",
    icon: (
      <div className="flex -space-x-1">
        <Headphones className="w-7 h-7 text-sky-400" />
        <Trophy className="w-7 h-7 text-amber-400" />
      </div>
    ),
    bgGradient: "from-sky-500/20 via-indigo-500/10 to-transparent",
    iconBg: "bg-sky-500/20 border-sky-400/30",
  },
];

function getScrollContainer(): Element | null {
  return document.querySelector("main.flex-1.overflow-y-auto") || document.scrollingElement;
}

function scrollToElement(el: Element) {
  el.scrollIntoView({ behavior: "smooth", block: "center" });
}

export function useGuidedTour() {
  const [showTour, setShowTour] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(TOUR_KEY);
    if (stored === "1") {
      setChecked(true);
      return;
    }
    customFetch<{ value: string }>("/api/user-data/tour_completed")
      .then((d) => {
        if (d?.value === "1") {
          localStorage.setItem(TOUR_KEY, "1");
        } else {
          setShowTour(true);
        }
      })
      .catch(() => {
        setShowTour(true);
      })
      .finally(() => setChecked(true));
  }, []);

  const completeTour = useCallback(() => {
    setShowTour(false);
    localStorage.setItem(TOUR_KEY, "1");
    customFetch("/api/user-data/tour_completed", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ value: "1" }),
    }).catch(() => {});
  }, []);

  return { showTour, checked, completeTour };
}

export function GuidedTour({ onComplete }: { onComplete: () => void }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const [animating, setAnimating] = useState(false);
  const [highlightRect, setHighlightRect] = useState<DOMRect | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const nextBtnRef = useRef<HTMLButtonElement>(null);

  const step = steps[currentStep];
  const isLast = currentStep === steps.length - 1;

  const syncHighlight = useCallback(() => {
    const el = document.querySelector(step.target);
    if (el) {
      const rect = el.getBoundingClientRect();
      setHighlightRect(rect);
    }
  }, [step.target]);

  useEffect(() => {
    let cancelled = false;
    let observer: MutationObserver | null = null;
    let attempts = 0;
    const maxAttempts = 20;

    function tryFind() {
      if (cancelled) return;
      const el = document.querySelector(step.target);
      if (el) {
        scrollToElement(el);
        setTimeout(() => {
          if (!cancelled) syncHighlight();
        }, 450);
        if (observer) observer.disconnect();
        return true;
      }
      return false;
    }

    if (!tryFind()) {
      observer = new MutationObserver(() => {
        attempts++;
        if (tryFind() || attempts > maxAttempts) {
          observer?.disconnect();
        }
      });
      observer.observe(document.body, { childList: true, subtree: true });
      const fallback = setTimeout(() => {
        if (!cancelled) setHighlightRect(null);
      }, 3000);
      return () => { cancelled = true; observer?.disconnect(); clearTimeout(fallback); };
    }

    return () => { cancelled = true; observer?.disconnect(); };
  }, [step.target, syncHighlight]);

  useEffect(() => {
    const scrollContainer = getScrollContainer();
    if (!scrollContainer) return;

    const handler = () => syncHighlight();
    scrollContainer.addEventListener("scroll", handler, { passive: true });
    window.addEventListener("resize", handler);
    return () => {
      scrollContainer.removeEventListener("scroll", handler);
      window.removeEventListener("resize", handler);
    };
  }, [syncHighlight]);

  useEffect(() => {
    nextBtnRef.current?.focus();
  }, [currentStep]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") { onComplete(); return; }
      if (e.key === "Enter" || e.key === "ArrowRight") { handleNext(); return; }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  });

  const goToStep = (next: number) => {
    if (animating) return;
    setAnimating(true);
    setDirection(next > currentStep ? "next" : "prev");
    setHighlightRect(null);
    setTimeout(() => {
      setCurrentStep(next);
      setAnimating(false);
    }, 250);
  };

  const handleNext = () => {
    if (isLast) { onComplete(); return; }
    goToStep(currentStep + 1);
  };

  const handleSkip = () => onComplete();

  const pad = 12;

  return (
    <div
      className="fixed inset-0 z-[9999]"
      role="dialog"
      aria-modal="true"
      aria-label="Guided tour"
      style={{ pointerEvents: "auto" }}
    >
      <svg className="absolute inset-0 w-full h-full" style={{ pointerEvents: "none" }}>
        <defs>
          <mask id="tour-mask">
            <rect x="0" y="0" width="100%" height="100%" fill="white" />
            {highlightRect && (
              <rect
                x={highlightRect.left - pad}
                y={highlightRect.top - pad}
                width={highlightRect.width + pad * 2}
                height={highlightRect.height + pad * 2}
                rx="20"
                fill="black"
                style={{ transition: "all 0.4s cubic-bezier(0.4,0,0.2,1)" }}
              />
            )}
          </mask>
        </defs>
        <rect
          x="0" y="0" width="100%" height="100%"
          fill="rgba(0,0,0,0.6)"
          mask="url(#tour-mask)"
          style={{ pointerEvents: "auto" }}
          onClick={(e) => e.stopPropagation()}
        />
      </svg>

      {highlightRect && (
        <div
          className="absolute rounded-[20px] border-2 border-primary/60 shadow-[0_0_0_4px_rgba(56,178,172,0.15)]"
          style={{
            left: highlightRect.left - pad,
            top: highlightRect.top - pad,
            width: highlightRect.width + pad * 2,
            height: highlightRect.height + pad * 2,
            transition: "all 0.4s cubic-bezier(0.4,0,0.2,1)",
            pointerEvents: "none",
          }}
        />
      )}

      <div
        ref={panelRef}
        className="fixed bottom-0 left-0 right-0 sm:bottom-6 sm:left-auto sm:right-6 sm:w-[420px] z-[10000]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-card border border-border sm:rounded-2xl rounded-t-2xl shadow-2xl overflow-hidden">
          <div className={`relative bg-gradient-to-br ${step.bgGradient} p-6 pb-4`}>
            <button
              onClick={handleSkip}
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/10 hover:bg-black/20 flex items-center justify-center transition-colors"
              aria-label="Skip tour"
            >
              <X className="w-4 h-4 text-foreground/70" />
            </button>

            <div
              className={`transform transition-all duration-250 ease-out ${
                animating
                  ? direction === "next"
                    ? "-translate-x-8 opacity-0"
                    : "translate-x-8 opacity-0"
                  : "translate-x-0 opacity-100"
              }`}
            >
              <div className={`w-16 h-16 rounded-2xl ${step.iconBg} border flex items-center justify-center mb-4`}>
                {step.icon}
              </div>
              <h3 className="text-xl font-extrabold text-foreground mb-1.5">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
            </div>
          </div>

          <div className="px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              {steps.map((_, i) => (
                <div
                  key={i}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === currentStep
                      ? "w-6 bg-primary"
                      : i < currentStep
                        ? "w-2 bg-primary/40"
                        : "w-2 bg-muted-foreground/20"
                  }`}
                />
              ))}
              <span className="ml-2 text-xs text-muted-foreground font-medium">
                {currentStep + 1} / {steps.length}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleSkip}
                className="px-4 py-2 text-xs font-bold text-muted-foreground hover:text-foreground transition-colors"
              >
                Skip
              </button>
              <button
                ref={nextBtnRef}
                onClick={handleNext}
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-bold hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2"
              >
                {isLast ? "Got it!" : "Next"}
                {!isLast && <ChevronRight className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
