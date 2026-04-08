import { useState, useMemo } from "react";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  ArrowLeft, ArrowRight, RefreshCw, CheckCircle2,
  XCircle, Volume2, BookOpen, Filter
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import synonymsRaw from "@/data/synonyms-data.json";

interface SynonymEntry {
  id: number;
  word: string;
  synonym: string;
  skill: string;
  translation: string;
  pronunciation: string;
  example: string;
  exampleAr: string;
}

const allSynonyms: SynonymEntry[] = synonymsRaw as SynonymEntry[];

const SKILLS = ["All Skills", "Writing", "Reading", "Listening", "Speaking"];

const skillColors: Record<string, string> = {
  Writing: "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300",
  Reading: "bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300",
  Listening: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
  Speaking: "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300",
  "All Skills": "bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300",
};

function speak(text: string) {
  if ("speechSynthesis" in window) {
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "en-GB";
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(u);
  }
}

export default function Synonyms() {
  const [skillFilter, setSkillFilter] = useState("All Skills");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [sessionStats, setSessionStats] = useState({ known: 0, unknown: 0 });
  const [sessionDone, setSessionDone] = useState(false);
  const [reviewedIds, setReviewedIds] = useState<Set<number>>(new Set());

  const cards = useMemo(() => {
    if (skillFilter === "All Skills") return allSynonyms;
    return allSynonyms.filter(c => c.skill === skillFilter || c.skill === "All Skills");
  }, [skillFilter]);

  const card = cards[currentIndex];

  const progressPercent = cards.length > 0 ? Math.round((currentIndex / cards.length) * 100) : 0;

  const handleNext = () => {
    if (currentIndex < cards.length - 1) {
      setIsFlipped(false);
      setTimeout(() => setCurrentIndex(i => i + 1), 150);
    } else {
      setSessionDone(true);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setIsFlipped(false);
      setTimeout(() => setCurrentIndex(i => i - 1), 150);
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
    handleNext();
  };

  const resetSession = () => {
    setCurrentIndex(0);
    setIsFlipped(false);
    setSessionStats({ known: 0, unknown: 0 });
    setSessionDone(false);
    setReviewedIds(new Set());
  };

  // ── Session Done ──────────────────────────────────────────────────────────
  if (sessionDone) {
    const total = sessionStats.known + sessionStats.unknown;
    const pct = total > 0 ? Math.round((sessionStats.known / total) * 100) : 0;
    return (
      <Layout>
        <div className="max-w-lg mx-auto mt-12 animate-in fade-in zoom-in duration-500">
          <div className="bg-card border border-border rounded-3xl p-10 text-center shadow-lg">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-primary" />
            </div>
            <h2 className="text-3xl font-extrabold text-foreground mb-2">Session Complete!</h2>
            <p className="text-muted-foreground mb-8">
              You reviewed {cards.length} synonym pairs.
            </p>
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-background rounded-2xl p-4 border border-border">
                <div className="text-3xl font-bold text-foreground">{total}</div>
                <div className="text-xs font-medium text-muted-foreground uppercase mt-1">Reviewed</div>
              </div>
              <div className="bg-background rounded-2xl p-4 border border-border">
                <div className="text-3xl font-bold text-green-600">{sessionStats.known}</div>
                <div className="text-xs font-medium text-muted-foreground uppercase mt-1">Known</div>
              </div>
              <div className="bg-background rounded-2xl p-4 border border-border">
                <div className="text-3xl font-bold text-orange-500">{sessionStats.unknown}</div>
                <div className="text-xs font-medium text-muted-foreground uppercase mt-1">Learning</div>
              </div>
            </div>
            <div className="mb-8">
              <div className="flex justify-between text-sm font-medium mb-2">
                <span className="text-muted-foreground">Accuracy</span>
                <span className="text-foreground font-bold">{pct}%</span>
              </div>
              <Progress value={pct} className="h-3" />
            </div>
            <Button onClick={resetSession} className="rounded-full">
              <RefreshCw className="w-4 h-4 mr-2" />
              Study Again
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="flex flex-col h-full max-w-2xl mx-auto animate-in fade-in duration-500">

        {/* Header */}
        <div className="flex flex-col gap-4 mb-6">
          <div className="flex flex-col md:flex-row gap-3 items-start md:items-center justify-between">
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-primary" />
              IELTS Synonyms
            </h1>
            <Select value={skillFilter} onValueChange={(v) => { setSkillFilter(v); resetSession(); }}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Skill" />
              </SelectTrigger>
              <SelectContent>
                {SKILLS.map(s => (
                  <SelectItem key={s} value={s}>{s}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <p className="text-sm text-muted-foreground">
            {cards.length} synonym pairs · Tap a card to reveal the Arabic translation and example
          </p>
        </div>

        {cards.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-8 bg-card rounded-2xl border border-dashed min-h-[400px]">
            <Filter className="w-12 h-12 text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">No synonyms found</h3>
            <p className="text-muted-foreground">Try a different skill filter.</p>
          </div>
        ) : card ? (
          <div className="flex-1 flex flex-col">
            {/* Progress bar */}
            <div className="mb-4">
              <div className="flex justify-between text-sm font-medium text-muted-foreground mb-2 px-1">
                <span>Card {currentIndex + 1} of {cards.length}</span>
                <div className="flex gap-3">
                  <span className="text-green-600 font-semibold">✓ {sessionStats.known}</span>
                  <span className="text-orange-500 font-semibold">✗ {sessionStats.unknown}</span>
                </div>
              </div>
              <Progress value={progressPercent} className="h-1.5" />
            </div>

            {/* Flip Card */}
            <div
              className="relative flex-1 min-h-[360px] cursor-pointer select-none"
              onClick={() => setIsFlipped(f => !f)}
              style={{ perspective: "1200px" }}
            >
              <div
                className="relative w-full h-full transition-transform duration-500"
                style={{
                  transformStyle: "preserve-3d",
                  transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                  minHeight: 360,
                }}
              >
                {/* Front */}
                <div
                  className="absolute inset-0 bg-card border border-border rounded-3xl p-8 flex flex-col items-center justify-center shadow-lg"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <span className={`text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-6 ${skillColors[card.skill] ?? skillColors["All Skills"]}`}>
                    {card.skill}
                  </span>
                  <div className="text-center mb-4">
                    <div className="flex items-center justify-center gap-3 mb-1">
                      <h2 className="text-4xl font-extrabold text-foreground">{card.word}</h2>
                      <button
                        onClick={e => { e.stopPropagation(); speak(card.word); }}
                        className="w-9 h-9 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center transition-colors"
                        aria-label="Listen"
                      >
                        <Volume2 className="w-4 h-4 text-primary" />
                      </button>
                    </div>
                    <p className="text-sm text-muted-foreground font-mono">{card.pronunciation}</p>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-muted-foreground text-sm font-medium">Synonym →</span>
                    <span className="text-2xl font-bold text-primary">{card.synonym}</span>
                    <button
                      onClick={e => { e.stopPropagation(); speak(card.synonym); }}
                      className="w-7 h-7 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center transition-colors"
                      aria-label="Listen"
                    >
                      <Volume2 className="w-3.5 h-3.5 text-primary" />
                    </button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-8 animate-pulse">Tap to reveal Arabic</p>
                </div>

                {/* Back */}
                <div
                  className="absolute inset-0 bg-primary text-primary-foreground rounded-3xl p-8 flex flex-col items-center justify-center shadow-lg"
                  style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                >
                  <span className={`text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-6 bg-white/15 text-primary-foreground`}>
                    {card.skill}
                  </span>
                  <p className="text-3xl font-bold arabic-text text-center mb-2" dir="rtl" lang="ar">
                    {card.translation}
                  </p>
                  <div className="w-12 h-px bg-primary-foreground/30 my-4" />
                  <p className="text-sm text-primary-foreground/80 italic text-center leading-relaxed mb-1">
                    {card.example}
                  </p>
                  <p className="text-sm text-primary-foreground/70 text-center leading-relaxed arabic-text" dir="rtl" lang="ar">
                    {card.exampleAr}
                  </p>
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="mt-8 flex justify-center items-center gap-4">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full w-12 h-12"
                onClick={handlePrev}
                disabled={currentIndex === 0}
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>

              <div className="flex gap-3 px-4">
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-full border-orange-200 hover:bg-orange-50 dark:hover:bg-orange-950/30 hover:text-orange-600 text-orange-600 font-semibold"
                  onClick={e => { e.stopPropagation(); markCard(false); }}
                >
                  <XCircle className="w-5 h-5 mr-2" />
                  Still Learning
                </Button>
                <Button
                  size="lg"
                  className="rounded-full bg-green-500 hover:bg-green-600 text-white font-semibold shadow-sm"
                  onClick={e => { e.stopPropagation(); markCard(true); }}
                >
                  <CheckCircle2 className="w-5 h-5 mr-2" />
                  Got it!
                </Button>
              </div>

              <Button
                variant="outline"
                size="icon"
                className="rounded-full w-12 h-12"
                onClick={handleNext}
                disabled={currentIndex === cards.length - 1}
              >
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        ) : null}
      </div>
    </Layout>
  );
}
