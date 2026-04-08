import { useState, useMemo } from "react";
import { useListFlashcards, useGetProgress, useUpsertProgress, useListCategories } from "@workspace/api-client-react";
import { useSrsDue, useUpdateSrs, useListBookmarks } from "@workspace/api-client-react";
import { Layout } from "@/components/layout";
import { FlashcardView } from "@/components/flashcard";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, XCircle, ArrowRight, ArrowLeft, RefreshCw, Filter, BookOpen, Zap, Bookmark } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import type { ListFlashcardsLevel } from "@workspace/api-client-react/src/generated/api.schemas";

type StudyMode = "all" | "srs" | "bookmarks" | "unknown";

interface SessionSummary {
  total: number;
  known: number;
  unknown: number;
}

export default function Study() {
  const [levelFilter, setLevelFilter] = useState<ListFlashcardsLevel | "ALL">("ALL");
  const [categoryFilter, setCategoryFilter] = useState<string>("ALL");
  const [studyMode, setStudyMode] = useState<StudyMode>("all");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [sessionStats, setSessionStats] = useState({ known: 0, unknown: 0 });
  const [sessionDone, setSessionDone] = useState(false);
  const [reviewedIds, setReviewedIds] = useState<Set<number>>(new Set());

  const { toast } = useToast();

  const { data: allCards, isLoading: cardsLoading } = useListFlashcards({
    level: levelFilter === "ALL" ? undefined : levelFilter,
    category: categoryFilter === "ALL" ? undefined : categoryFilter
  });

  const { data: categories } = useListCategories();
  const { data: progress } = useGetProgress();
  const { data: srsCards, isLoading: srsLoading } = useSrsDue(levelFilter === "ALL" ? undefined : levelFilter);
  const { data: bookmarks } = useListBookmarks();
  const upsertProgress = useUpsertProgress();
  const updateSrs = useUpdateSrs();

  const cards = useMemo(() => {
    if (!allCards) return [];
    if (studyMode === "srs") return srsCards ?? [];
    if (studyMode === "bookmarks") {
      const bSet = new Set(bookmarks ?? []);
      return allCards.filter(c => bSet.has(c.id));
    }
    if (studyMode === "unknown") {
      const latestMap = new Map<number, boolean>();
      (progress ?? []).forEach(p => {
        const prev = latestMap.get(p.flashcardId);
        if (prev === undefined) latestMap.set(p.flashcardId, p.known);
      });
      return allCards.filter(c => !latestMap.get(c.id));
    }
    return allCards;
  }, [allCards, studyMode, srsCards, bookmarks, progress]);

  const isLoading = cardsLoading || (studyMode === "srs" && srsLoading);

  const handleNext = () => {
    if (cards && currentIndex < cards.length - 1) {
      setIsFlipped(false);
      setTimeout(() => setCurrentIndex(prev => prev + 1), 150);
    } else {
      setSessionDone(true);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setIsFlipped(false);
      setTimeout(() => setCurrentIndex(prev => prev - 1), 150);
    }
  };

  const resetSession = () => {
    setCurrentIndex(0);
    setIsFlipped(false);
    setSessionStats({ known: 0, unknown: 0 });
    setSessionDone(false);
    setReviewedIds(new Set());
  };

  const currentCard = cards?.[currentIndex];

  const currentProgress = useMemo(() => {
    if (!currentCard || !progress) return null;
    return [...(progress ?? [])].filter(p => p.flashcardId === currentCard.id).sort((a, b) => new Date(b.reviewedAt).getTime() - new Date(a.reviewedAt).getTime())[0];
  }, [currentCard, progress]);

  const markCard = (known: boolean) => {
    if (!currentCard) return;

    if (!reviewedIds.has(currentCard.id)) {
      setReviewedIds(prev => new Set(prev).add(currentCard.id));
      setSessionStats(prev => ({
        known: known ? prev.known + 1 : prev.known,
        unknown: !known ? prev.unknown + 1 : prev.unknown,
      }));
    }

    upsertProgress.mutate({ data: { flashcardId: currentCard.id, known } });
    updateSrs.mutate({ id: currentCard.id, known });

    toast({
      title: known ? "✅ Got it!" : "💪 Keep learning!",
      description: known ? "Marked as known." : "We'll show this card again soon.",
      duration: 1500,
    });
    handleNext();
  };

  const progressPercent = cards && cards.length > 0 ? Math.round((currentIndex / cards.length) * 100) : 0;

  // ── Session Summary ──────────────────────────────────────────────────────
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
            <p className="text-muted-foreground mb-8">Great work reviewing {cards?.length ?? 0} cards today.</p>

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

            <div className="flex gap-3 justify-center flex-wrap">
              <Button onClick={resetSession} className="rounded-full">
                <RefreshCw className="w-4 h-4 mr-2" />
                Study Again
              </Button>
              <Button variant="outline" className="rounded-full" onClick={() => { setStudyMode("unknown"); resetSession(); }}>
                Review Unknown
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
        <div className="flex flex-col gap-4 mb-6">
          <div className="flex flex-col md:flex-row gap-3 items-start md:items-center justify-between">
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-primary" />
              Study Mode
            </h1>
            <div className="flex gap-2 flex-wrap">
              <Select value={levelFilter} onValueChange={(v) => { setLevelFilter(v as any); resetSession(); }}>
                <SelectTrigger className="w-[110px]"><SelectValue placeholder="Level" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">All Levels</SelectItem>
                  <SelectItem value="A1">A1</SelectItem>
                  <SelectItem value="A2">A2</SelectItem>
                  <SelectItem value="B1">B1</SelectItem>
                  <SelectItem value="B2">B2</SelectItem>
                  <SelectItem value="C1">C1</SelectItem>
                </SelectContent>
              </Select>
              <Select value={categoryFilter} onValueChange={(v) => { setCategoryFilter(v); resetSession(); }}>
                <SelectTrigger className="w-[130px]"><SelectValue placeholder="Category" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">All Categories</SelectItem>
                  {categories?.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Study Mode Tabs */}
          <div className="flex gap-2 flex-wrap">
            {(["all", "srs", "unknown", "bookmarks"] as StudyMode[]).map((mode) => {
              const labels: Record<StudyMode, { label: string; icon: React.ReactNode }> = {
                all: { label: "All Cards", icon: <BookOpen className="w-3.5 h-3.5" /> },
                srs: { label: "Due (SRS)", icon: <Zap className="w-3.5 h-3.5" /> },
                unknown: { label: "Still Learning", icon: <XCircle className="w-3.5 h-3.5" /> },
                bookmarks: { label: "Bookmarked", icon: <Bookmark className="w-3.5 h-3.5" /> },
              };
              const { label, icon } = labels[mode];
              return (
                <button
                  key={mode}
                  onClick={() => { setStudyMode(mode); resetSession(); }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors border ${
                    studyMode === mode
                      ? "bg-primary text-primary-foreground border-primary"
                      : "border-border text-muted-foreground hover:border-primary/50"
                  }`}
                >
                  {icon}{label}
                </button>
              );
            })}
          </div>
        </div>

        {isLoading ? (
          <div className="flex-1 flex items-center justify-center min-h-[400px]">
            <RefreshCw className="w-8 h-8 animate-spin text-primary/50" />
          </div>
        ) : !cards || cards.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-8 bg-card rounded-2xl border border-dashed min-h-[400px]">
            <Filter className="w-12 h-12 text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">
              {studyMode === "srs" ? "No cards due for review!" :
               studyMode === "bookmarks" ? "No bookmarked cards." :
               studyMode === "unknown" ? "All caught up!" :
               "No cards found"}
            </h3>
            <p className="text-muted-foreground">
              {studyMode === "srs" ? "You've reviewed all your due cards. Come back later!" :
               studyMode === "bookmarks" ? "Bookmark cards from the Browse page to study them here." :
               studyMode === "unknown" ? "You know all the cards in this filter. Great job!" :
               "Try adjusting your filters to see more cards."}
            </p>
          </div>
        ) : currentCard ? (
          <div className="flex-1 flex flex-col">
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

            <FlashcardView
              card={currentCard}
              isFlipped={isFlipped}
              onFlip={() => setIsFlipped(!isFlipped)}
            />

            <div className="mt-8 flex justify-center items-center gap-4">
              <Button variant="outline" size="icon" className="rounded-full w-12 h-12" onClick={handlePrev} disabled={currentIndex === 0}>
                <ArrowLeft className="w-5 h-5" />
              </Button>

              <div className="flex gap-3 px-4">
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-full border-orange-200 hover:bg-orange-50 dark:hover:bg-orange-950/30 hover:text-orange-600 text-orange-600 font-semibold"
                  onClick={(e) => { e.stopPropagation(); markCard(false); }}
                  disabled={upsertProgress.isPending}
                >
                  <XCircle className="w-5 h-5 mr-2" />
                  Still Learning
                </Button>
                <Button
                  size="lg"
                  className="rounded-full bg-green-500 hover:bg-green-600 text-white font-semibold shadow-sm"
                  onClick={(e) => { e.stopPropagation(); markCard(true); }}
                  disabled={upsertProgress.isPending}
                >
                  <CheckCircle2 className="w-5 h-5 mr-2" />
                  Got it!
                </Button>
              </div>

              <Button variant="outline" size="icon" className="rounded-full w-12 h-12" onClick={handleNext} disabled={currentIndex === cards.length - 1}>
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        ) : null}
      </div>
    </Layout>
  );
}
