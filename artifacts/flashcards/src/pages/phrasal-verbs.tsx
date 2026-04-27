import { useState, useMemo, useEffect } from "react";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { usePhrasalVerbWeak } from "@workspace/api-client-react";
import { cn } from "@/lib/utils";
import {
  ArrowLeft, ArrowRight, RefreshCw, CheckCircle2, Flag,
  XCircle, ArrowUpDown, Trophy, RotateCcw
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import phrasalVerbsRaw from "@/data/phrasal-verbs-data.json";
import { PronounceButton } from "@/components/pronounce-button";
import { useActivityPosition } from "@/hooks/use-activity-position";
import { useToast } from "@/hooks/use-toast";

interface PhrasalVerbEntry {
  id: number;
  phrasalVerb: string;
  meaning: string;
  example: string;
  meaningAr: string;
  phrasalVerbAr: string;
  exampleAr: string;
  level: string;
}

const allVerbs: PhrasalVerbEntry[] = phrasalVerbsRaw as PhrasalVerbEntry[];

const LEVELS = ["All Levels", "A2", "B1", "B2", "C1"];

const levelColors: Record<string, string> = {
  A2: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800",
  B1: "bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300 border border-sky-200 dark:border-sky-800",
  B2: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300 border border-amber-200 dark:border-amber-800",
  C1: "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300 border border-rose-200 dark:border-rose-800",
  "All Levels": "bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-300 border border-teal-200 dark:border-teal-800",
};

export default function PhrasalVerbs() {
  const [levelFilter, setLevelFilter] = useState("All Levels");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [sessionStats, setSessionStats] = useState({ known: 0, unknown: 0 });
  const [sessionDone, setSessionDone] = useState(false);
  const [reviewedIds, setReviewedIds] = useState<Set<number>>(new Set());
  const [positionLoaded, setPositionLoaded] = useState(false);
  const { weakIds, toggle: toggleWeakVerb } = usePhrasalVerbWeak();

  const { toast } = useToast();
  const { load: loadPosition, save: savePosition, loadedRef } = useActivityPosition("phrasal-verbs", levelFilter);

  const cards = useMemo(() => {
    if (levelFilter === "All Levels") return allVerbs;
    return allVerbs.filter(c => c.level === levelFilter);
  }, [levelFilter]);

  useEffect(() => {
    if (loadedRef.current) return;
    loadPosition().then((saved) => {
      if (!saved) { setPositionLoaded(true); return; }
      try {
        const f = JSON.parse(saved.filters);
        if (f.level) setLevelFilter(f.level);
        if (typeof f.known === "number" || typeof f.unknown === "number") {
          setSessionStats({ known: f.known ?? 0, unknown: f.unknown ?? 0 });
        }
      } catch {}
      if (saved.position > 0) setCurrentIndex(saved.position);
      loadedRef.current = true;
      setPositionLoaded(true);
    });
  }, []);

  useEffect(() => {
    if (positionLoaded && cards.length > 0 && currentIndex >= cards.length) {
      setCurrentIndex(cards.length - 1);
    }
  }, [cards, positionLoaded, currentIndex]);

  useEffect(() => {
    if (!positionLoaded) return;
    savePosition(currentIndex, JSON.stringify({ level: levelFilter, known: sessionStats.known, unknown: sessionStats.unknown }));
  }, [currentIndex, levelFilter, positionLoaded, sessionStats]);

  const card = cards[currentIndex];
  const progressPercent = cards.length > 0 ? Math.round((currentIndex / cards.length) * 100) : 0;

  const handleNext = () => {
    if (currentIndex < cards.length - 1) {
      setIsFlipped(false);
      setTimeout(() => setCurrentIndex(i => i + 1), 180);
    } else {
      setSessionDone(true);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setIsFlipped(false);
      setTimeout(() => setCurrentIndex(i => i - 1), 180);
    }
  };

  const markCard = (known: boolean) => {
    if (!card) return;
    if (!reviewedIds.has(card.id)) {
      setReviewedIds(prev => new Set(prev).add(card.id));
      setSessionStats(prev => ({
        known: known ? prev.known + 1 : prev.known,
        unknown: !known ? prev.unknown + 1 : prev.unknown,
      }));
    }
    toast({
      title: known ? "✅ Got it!" : "💪 Keep learning!",
      description: known ? "Marked as known." : "We'll show this card again soon.",
      duration: 1500,
    });
    handleNext();
  };

  const resetSession = () => {
    setCurrentIndex(0);
    setIsFlipped(false);
    setSessionStats({ known: 0, unknown: 0 });
    setSessionDone(false);
    setReviewedIds(new Set());
  };

  if (sessionDone) {
    const total = sessionStats.known + sessionStats.unknown;
    const pct = total > 0 ? Math.round((sessionStats.known / total) * 100) : 0;
    const grade =
      pct >= 90 ? { label: "Excellent!", color: "text-green-600", icon: "🏆" } :
      pct >= 70 ? { label: "Great work!", color: "text-teal-600", icon: "⭐" } :
      pct >= 50 ? { label: "Good effort!", color: "text-amber-600", icon: "💪" } :
      { label: "Keep going!", color: "text-orange-500", icon: "📚" };

    return (
      <Layout>
        <div className="max-w-lg mx-auto mt-12 animate-in fade-in zoom-in duration-500">
          <div className="bg-card border border-border rounded-3xl p-10 text-center shadow-lg">
            <div className="text-6xl mb-4">{grade.icon}</div>
            <h2 className={`text-3xl font-extrabold mb-1 ${grade.color}`}>{grade.label}</h2>
            <p className="text-muted-foreground mb-8">
              You completed {cards.length} phrasal verb cards.
            </p>

            <div className="grid grid-cols-3 gap-3 mb-8">
              <div className="bg-background rounded-2xl p-4 border border-border">
                <div className="text-3xl font-bold text-foreground">{total}</div>
                <div className="text-xs font-medium text-muted-foreground uppercase mt-1">Reviewed</div>
              </div>
              <div className="bg-background rounded-2xl p-4 border border-green-100 dark:border-green-900">
                <div className="text-3xl font-bold text-green-600">{sessionStats.known}</div>
                <div className="text-xs font-medium text-muted-foreground uppercase mt-1">Known</div>
              </div>
              <div className="bg-background rounded-2xl p-4 border border-orange-100 dark:border-orange-900">
                <div className="text-3xl font-bold text-orange-500">{sessionStats.unknown}</div>
                <div className="text-xs font-medium text-muted-foreground uppercase mt-1">Learning</div>
              </div>
            </div>

            <div className="mb-8">
              <div className="flex justify-between text-sm font-medium mb-2">
                <span className="text-muted-foreground">Score</span>
                <span className={`font-bold text-lg ${grade.color}`}>{pct}%</span>
              </div>
              <Progress value={pct} className="h-3" />
            </div>

            <div className="flex gap-3 justify-center flex-wrap">
              <Button onClick={resetSession} className="rounded-full">
                <RefreshCw className="w-4 h-4 mr-2" />
                Play Again
              </Button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="flex flex-col h-full max-w-2xl mx-auto animate-in fade-in duration-500">

        <div className="flex flex-col gap-3 mb-5">
          <div className="flex flex-col md:flex-row gap-3 items-start md:items-center justify-between">
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <ArrowUpDown className="w-6 h-6 text-primary" />
              IELTS Phrasal Verbs
            </h1>
            <Select value={levelFilter} onValueChange={(v) => { setLevelFilter(v); resetSession(); }}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Level" />
              </SelectTrigger>
              <SelectContent>
                {LEVELS.map(s => (
                  <SelectItem key={s} value={s}>{s}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <p className="text-sm text-muted-foreground">
            {cards.length} cards · See the phrasal verb → guess the meaning → flip to check
          </p>
        </div>

        {card ? (
          <div className="flex-1 flex flex-col">
            <div className="mb-4">
              <div className="flex justify-between text-sm font-medium text-muted-foreground mb-2 px-1">
                <span className="font-semibold text-foreground">
                  {currentIndex + 1} <span className="text-muted-foreground font-normal">/ {cards.length}</span>
                </span>
                <div className="flex gap-4">
                  <span className="flex items-center gap-1 text-green-600 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" /> {sessionStats.known}
                  </span>
                  <span className="flex items-center gap-1 text-orange-500 font-semibold">
                    <XCircle className="w-3.5 h-3.5" /> {sessionStats.unknown}
                  </span>
                </div>
              </div>
              <Progress value={progressPercent} className="h-2" />
            </div>

            <div
              className="relative flex-1 min-h-[420px] cursor-pointer select-none"
              onClick={() => setIsFlipped(f => !f)}
              style={{ perspective: "1200px" }}
            >
              <div
                className="relative w-full h-full transition-transform duration-500"
                style={{
                  transformStyle: "preserve-3d",
                  transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                  minHeight: 420,
                }}
              >

                <div
                  className="absolute inset-0 bg-card border-2 border-border rounded-3xl flex flex-col items-center justify-center shadow-lg p-8"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <span className={`text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-8 ${levelColors[card.level] ?? levelColors["All Levels"]}`}>
                    {card.level}
                  </span>

                  <div className="text-center mb-6">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight mb-3">
                      {card.phrasalVerb}
                    </h2>
                    <PronounceButton word={card.phrasalVerb} />
                  </div>

                  <div className="mt-4 text-center">
                    <p className="text-muted-foreground text-base font-medium">Do you know the meaning?</p>
                    <p className="text-muted-foreground text-sm mt-1 arabic-text" dir="rtl" lang="ar">هل تعرف معنى هذا الفعل المركب؟</p>
                  </div>

                  <div className="absolute bottom-5 left-0 right-0 flex justify-center">
                    <span className="flex items-center gap-1.5 text-xs text-muted-foreground animate-pulse">
                      <RotateCcw className="w-3.5 h-3.5" /> Tap to reveal
                    </span>
                  </div>
                </div>

                <div
                  className="absolute inset-0 bg-primary text-primary-foreground rounded-3xl flex flex-col shadow-lg overflow-hidden"
                  style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                >
                  <div className="px-8 pt-7 pb-5 border-b border-primary-foreground/20">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-white/15 text-primary-foreground">
                        {card.level}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 mb-2">
                      <h2 className="text-3xl font-extrabold">{card.phrasalVerb}</h2>
                      <PronounceButton word={card.phrasalVerb} variant="inverted" />
                    </div>

                    <p className="text-primary-foreground/90 text-base leading-relaxed mt-2">
                      {card.meaning}
                    </p>
                  </div>

                  <div className="flex-1 px-8 py-5 flex flex-col justify-center gap-4 overflow-y-auto">
                    <div className="text-center">
                      <p className="text-xs text-primary-foreground/50 uppercase tracking-widest mb-1">
                        Arabic · المعنى بالعربية
                      </p>
                      <p className="text-xl font-bold arabic-text" dir="rtl" lang="ar">
                        {card.phrasalVerbAr}
                      </p>
                      <p className="text-sm text-primary-foreground/75 arabic-text mt-1" dir="rtl" lang="ar">
                        {card.meaningAr}
                      </p>
                    </div>

                    <div className="w-10 h-px bg-primary-foreground/25 mx-auto" />

                    <div>
                      <p className="text-xs text-primary-foreground/50 uppercase tracking-widest mb-1.5">IELTS Example · مثال</p>
                      <p className="text-sm text-primary-foreground/90 italic leading-relaxed mb-2">
                        "{card.example}"
                      </p>
                      <p className="text-sm text-primary-foreground/75 leading-relaxed arabic-text text-right" dir="rtl" lang="ar">
                        «{card.exampleAr}»
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3">
              <div className={`flex gap-3 justify-center transition-opacity duration-300 ${isFlipped ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-full flex-1 max-w-[200px] border-orange-200 hover:bg-orange-50 dark:hover:bg-orange-950/30 text-orange-600 font-semibold"
                  onClick={e => { e.stopPropagation(); markCard(false); }}
                >
                  <XCircle className="w-5 h-5 mr-2" />
                  Still Learning
                </Button>
                <Button
                  size="lg"
                  className="rounded-full flex-1 max-w-[200px] bg-green-500 hover:bg-green-600 text-white font-semibold shadow-sm"
                  onClick={e => { e.stopPropagation(); markCard(true); }}
                >
                  <CheckCircle2 className="w-5 h-5 mr-2" />
                  Got it!
                </Button>
              </div>

              <div className="flex justify-center items-center gap-4">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full w-11 h-11"
                  onClick={handlePrev}
                  disabled={currentIndex === 0}
                >
                  <ArrowLeft className="w-5 h-5" />
                </Button>
                <span className="text-xs text-muted-foreground font-medium w-20 text-center">
                  {isFlipped ? "Rate yourself" : "Tap card to flip"}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full w-11 h-11"
                  onClick={handleNext}
                  disabled={currentIndex === cards.length - 1}
                >
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </div>

              {/* Mark as Weak (persistent toggle via server) */}
              {card && (() => {
                const isWeak = weakIds.includes(card.id);
                return (
                  <div className="flex justify-center">
                    <button
                      onClick={() => {
                        toggleWeakVerb.mutate(card.id);
                        toast({
                          title: isWeak ? "Removed from Weak Words" : "Added to Weak Words",
                          description: isWeak
                            ? `"${card.phrasalVerb}" removed from weak list.`
                            : `"${card.phrasalVerb}" flagged for extra review.`,
                        });
                      }}
                      className={cn(
                        "flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border transition-colors",
                        isWeak
                          ? "bg-red-50 border-red-300 text-red-600 dark:bg-red-950/20 dark:border-red-800 dark:text-red-400"
                          : "border-border text-muted-foreground hover:border-red-300 hover:text-red-500"
                      )}
                    >
                      <Flag className="w-3.5 h-3.5" />
                      {isWeak ? "Marked as Weak ✓" : "Mark as Weak"}
                    </button>
                  </div>
                );
              })()}
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-8 bg-card rounded-2xl border border-dashed min-h-[400px]">
            <Trophy className="w-12 h-12 text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">No cards found</h3>
            <p className="text-muted-foreground">Try a different level filter.</p>
          </div>
        )}
      </div>
    </Layout>
  );
}
