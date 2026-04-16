import { useState } from "react";
import { useWeakWords, useMasterWeakWord, useAwardXp } from "@workspace/api-client-react";
import { Layout } from "@/components/layout";
import { LevelBadge } from "@/components/level-badge";
import { PronounceButton } from "@/components/pronounce-button";
import { Button } from "@/components/ui/button";
import {
  AlertTriangle, CheckCircle2, RotateCcw, Volume2, Sparkles,
  ArrowRight, ArrowLeft, Zap, Trophy
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function WeakWordsPage() {
  const { data: words, isLoading } = useWeakWords();
  const { mutate: masterWord } = useMasterWeakWord();
  const { mutate: awardXp } = useAwardXp();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [mastered, setMastered] = useState<Set<number>>(new Set());
  const [reviewMode, setReviewMode] = useState(false);

  const activeWords = (words ?? []).filter(w => !mastered.has(w.id));

  const handleMaster = (id: number) => {
    masterWord(id, {
      onSuccess: () => {
        setMastered(prev => new Set(prev).add(id));
        awardXp({ activity: "flashcard_review", amount: 2 });
        if (currentIndex >= activeWords.length - 1) {
          setCurrentIndex(Math.max(0, activeWords.length - 2));
        }
        setIsFlipped(false);
      },
    });
  };

  const goNext = () => {
    if (currentIndex < activeWords.length - 1) {
      setCurrentIndex(i => i + 1);
      setIsFlipped(false);
    }
  };

  const goPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(i => i - 1);
      setIsFlipped(false);
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      </Layout>
    );
  }

  if (!words || words.length === 0) {
    return (
      <Layout>
        <div className="max-w-xl mx-auto mt-16 text-center space-y-6">
          <div className="w-20 h-20 rounded-3xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto">
            <Trophy className="w-10 h-10 text-green-500" />
          </div>
          <h1 className="text-3xl font-extrabold text-foreground">No Weak Words!</h1>
          <p className="text-muted-foreground text-lg">
            You haven't missed any words in quizzes yet. Take some quizzes and any words you get wrong will appear here for review.
          </p>
          <p className="text-sm text-muted-foreground" dir="rtl" lang="ar">
            لا توجد كلمات ضعيفة حالياً — الكلمات التي تخطئ فيها في الاختبارات ستظهر هنا تلقائياً
          </p>
          <Button asChild className="rounded-full">
            <a href="/quiz"><Zap className="w-4 h-4 mr-2" />Take a Quiz</a>
          </Button>
        </div>
      </Layout>
    );
  }

  if (activeWords.length === 0 && mastered.size > 0) {
    return (
      <Layout>
        <div className="max-w-xl mx-auto mt-16 text-center space-y-6">
          <div className="w-20 h-20 rounded-3xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10 text-green-500" />
          </div>
          <h1 className="text-3xl font-extrabold text-foreground">All Mastered!</h1>
          <p className="text-muted-foreground text-lg">
            You've reviewed all {mastered.size} weak words in this session. Great work!
          </p>
          <p className="text-sm text-muted-foreground" dir="rtl" lang="ar">
            أحسنت! لقد راجعت جميع الكلمات الضعيفة في هذه الجلسة
          </p>
          <Button onClick={() => { setMastered(new Set()); setCurrentIndex(0); setReviewMode(false); }} className="rounded-full">
            <RotateCcw className="w-4 h-4 mr-2" />Review Again
          </Button>
        </div>
      </Layout>
    );
  }

  if (!reviewMode) {
    return (
      <Layout>
        <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in duration-500">
          <div className="bg-card border border-border rounded-3xl p-8 text-center space-y-5">
            <div className="w-16 h-16 rounded-2xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-8 h-8 text-amber-500" />
            </div>
            <h1 className="text-3xl font-extrabold text-foreground">Weak Words Deck</h1>
            <p className="text-muted-foreground text-lg">
              These are words you've gotten wrong in quizzes. Review them as flashcards and mark them as mastered when you're confident.
            </p>
            <p className="text-sm text-muted-foreground" dir="rtl" lang="ar">
              هذه الكلمات التي أخطأت فيها — راجعها وحدد "أتقنتها" عندما تكون واثقاً
            </p>

            <div className="grid grid-cols-3 gap-4 max-w-sm mx-auto">
              <div className="bg-muted/50 rounded-xl p-4 text-center">
                <div className="text-3xl font-extrabold text-amber-500">{words.length}</div>
                <div className="text-xs text-muted-foreground mt-1">Total</div>
              </div>
              <div className="bg-muted/50 rounded-xl p-4 text-center">
                <div className="text-3xl font-extrabold text-red-500">
                  {words.reduce((max, w) => Math.max(max, w.wrongCount), 0)}
                </div>
                <div className="text-xs text-muted-foreground mt-1">Most Missed</div>
              </div>
              <div className="bg-muted/50 rounded-xl p-4 text-center">
                <div className="text-3xl font-extrabold text-foreground">
                  {new Set(words.map(w => w.level)).size}
                </div>
                <div className="text-xs text-muted-foreground mt-1">Levels</div>
              </div>
            </div>

            <Button onClick={() => setReviewMode(true)} size="lg" className="rounded-full font-bold px-10 mt-4">
              <Sparkles className="w-5 h-5 mr-2" />
              Start Review ({words.length} words)
            </Button>
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-bold text-foreground">Your Weak Words</h2>
            <div className="grid gap-2">
              {words.map(w => (
                <div key={w.id} className="bg-card border border-border rounded-xl px-4 py-3 flex items-center gap-3">
                  <LevelBadge level={w.level} />
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-foreground truncate">{w.english}</div>
                    <div className="text-sm text-primary arabic-text truncate">{w.arabic}</div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-xs font-medium text-red-500 bg-red-50 dark:bg-red-900/20 px-2 py-1 rounded-md">
                      {w.wrongCount}x wrong
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  const card = activeWords[currentIndex];
  if (!card) return null;

  return (
    <Layout>
      <div className="max-w-md mx-auto space-y-6 animate-in fade-in duration-500">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-extrabold text-foreground flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-500" />
            Weak Words Review
          </h1>
          <span className="text-sm font-medium text-muted-foreground">
            {currentIndex + 1} / {activeWords.length}
          </span>
        </div>

        <div className="h-1.5 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-amber-500 transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / activeWords.length) * 100}%` }}
          />
        </div>

        <div
          className="w-full cursor-pointer"
          style={{ perspective: "1200px", minHeight: 360 }}
          onClick={() => setIsFlipped(!isFlipped)}
        >
          <div
            style={{
              position: "relative",
              width: "100%",
              minHeight: 360,
              transition: "transform 0.65s cubic-bezier(0.4, 0.2, 0.2, 1)",
              transformStyle: "preserve-3d",
              transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
            }}
          >
            <div
              style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden", minHeight: 360 }}
              className="absolute inset-0 bg-card border-2 border-amber-300 dark:border-amber-700 rounded-2xl p-6 flex flex-col shadow-md"
            >
              <div className="flex justify-between items-center">
                <LevelBadge level={card.level} />
                <span className="text-xs font-medium text-red-500 bg-red-50 dark:bg-red-900/20 px-2 py-1 rounded-md">
                  {card.wrongCount}x wrong
                </span>
              </div>
              <div className="flex-1 flex flex-col items-center justify-center text-center gap-5">
                <h2 className="text-4xl font-extrabold text-foreground">{card.english}</h2>
                <PronounceButton word={card.english} />
                {card.exampleSentence && (
                  <p className="text-sm text-muted-foreground italic max-w-xs">{card.exampleSentence}</p>
                )}
              </div>
              <p className="text-center text-xs text-muted-foreground">Tap to flip</p>
            </div>

            <div
              style={{
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
                minHeight: 360,
              }}
              className="absolute inset-0 bg-card border-2 border-primary rounded-2xl p-6 flex flex-col shadow-md"
            >
              <div className="flex justify-between items-center">
                <LevelBadge level={card.level} />
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
                  {card.category}
                </span>
              </div>
              <div className="flex-1 flex flex-col items-center justify-center text-center gap-4">
                <h2 className="text-4xl font-extrabold arabic-text text-primary">{card.arabic}</h2>
                <p className="text-lg font-medium text-foreground">{card.english}</p>
                {card.exampleSentenceArabic && (
                  <p className="text-sm arabic-text text-muted-foreground max-w-xs">{card.exampleSentenceArabic}</p>
                )}
              </div>
              <p className="text-center text-xs text-muted-foreground">Tap to flip back</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full w-12 h-12"
            onClick={goPrev}
            disabled={currentIndex === 0}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>

          <Button
            onClick={() => handleMaster(card.id)}
            className="flex-1 rounded-full bg-green-600 hover:bg-green-700 text-white font-bold h-12"
          >
            <CheckCircle2 className="w-5 h-5 mr-2" />
            I Know This Now
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="rounded-full w-12 h-12"
            onClick={goNext}
            disabled={currentIndex >= activeWords.length - 1}
          >
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>

        <p className="text-center text-xs text-muted-foreground">
          Mark words you've learned — they'll be removed from your weak deck
        </p>
      </div>
    </Layout>
  );
}
