import { useGetProgressSummary } from "@workspace/api-client-react";
import { useWordOfDay, useStreak } from "@workspace/api-client-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { LevelBadge } from "@/components/level-badge";
import { useState, useEffect } from "react";
import {
  BookOpen, Trophy, Zap, Target,
  Volume2, Globe, Layers, Award, ExternalLink,
  Flame, Star, HelpCircle, Sparkles, MessageCircle,
  FileText, ArrowLeftRight, ArrowUpDown, BookMarked, Mic, Send, CheckCircle2, Loader2
} from "lucide-react";
import { Layout } from "@/components/layout";

function VocabDownloadSection() {
  return (
    <section className="bg-gradient-to-br from-teal-50 to-sky-50 dark:from-teal-900/20 dark:to-sky-900/20 border border-teal-200 dark:border-teal-800 rounded-3xl p-8 shadow-sm">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
        <div className="w-14 h-14 rounded-2xl bg-teal-600 flex items-center justify-center shrink-0 shadow-md">
          <FileText className="w-7 h-7 text-white" />
        </div>
        <div className="flex-1">
          <h2 className="text-xl font-extrabold text-foreground mb-1">
            Bilingual Vocabulary Reference
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-1">
            Browse the full bilingual vocabulary list — 3,000 unique IELTS words across 4 CEFR levels (A2–C1), with Arabic translations for every word and example sentence.
          </p>
          <p className="text-sm text-teal-700 dark:text-teal-400 font-medium" dir="rtl" lang="ar">
            قائمة المفردات الكاملة ثنائية اللغة · 3000 كلمة · 4 مستويات · ترجمة عربية لكل كلمة وجملة
          </p>
        </div>
        <div className="flex flex-col gap-2 shrink-0">
          <a
            href="/vocabulary-bilingual.html"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-2 rounded-full border border-teal-600 text-teal-700 dark:text-teal-400 hover:bg-teal-50 dark:hover:bg-teal-900/20 font-medium transition-colors text-sm"
          >
            <FileText className="w-4 h-4" />
            Click for 3,000 words
          </a>
        </div>
      </div>
    </section>
  );
}

const features = [
  {
    icon: Layers,
    title: "4 CEFR Levels",
    desc: "A2 · B1 · B2 · C1 — structured vocabulary from elementary to advanced.",
    color: "bg-teal-50 dark:bg-teal-900/20 text-teal-600",
  },
  {
    icon: Globe,
    title: "Arabic Translations",
    desc: "Every word comes with a full Arabic translation in clear, readable Cairo font.",
    color: "bg-sky-50 dark:bg-sky-900/20 text-sky-600",
  },
  {
    icon: Volume2,
    title: "Pronunciation Audio",
    desc: "Tap Listen on any card to hear the correct English pronunciation instantly.",
    color: "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600",
  },
  {
    icon: Award,
    title: "3,000 Flashcards",
    desc: "3,000 carefully curated IELTS words with bilingual example sentences in every card.",
    color: "bg-amber-50 dark:bg-amber-900/20 text-amber-600",
  },
];

export default function Home() {
  const { data: summary, isLoading } = useGetProgressSummary();
  const { data: wordOfDay } = useWordOfDay();
  const { data: streakInfo } = useStreak();

  const speak = (text: string) => {
    if ("speechSynthesis" in window) {
      const u = new SpeechSynthesisUtterance(text);
      u.lang = "en-GB";
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(u);
    }
  };

  return (
    <Layout>
      <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">

        {/* ── Hero ── */}
        <section className="relative rounded-3xl overflow-hidden bg-primary px-8 py-12 shadow-lg">
          <div className="relative z-10 max-w-2xl">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary-foreground/70 mb-3">
              4IELTS Vocabulary App
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-primary-foreground leading-tight mb-4">
              Learn Smarter With Lexo
            </h1>
            <p className="text-primary-foreground/80 text-lg mb-8 leading-relaxed">
              3,000 flashcards across A2–C1 levels, with Arabic translations, audio
              pronunciation and smart quizzes — built for Arabic-speaking IELTS students.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg" className="rounded-full bg-white text-primary hover:bg-white/90 font-bold shadow-md">
                <Link href="/study">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Start Studying
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full border-white/40 text-primary-foreground hover:bg-white/10 font-semibold">
                <Link href="/quiz">
                  <HelpCircle className="w-4 h-4 mr-2" />
                  Take a Quiz
                </Link>
              </Button>
            </div>
          </div>
          <Zap className="absolute -bottom-8 -right-8 w-52 h-52 text-primary-foreground/8 rotate-12" />
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/5 -translate-y-1/3 translate-x-1/3" />
        </section>

        {/* ── Streak + Word of the Day ── */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Streak */}
          <div className="bg-card border border-border rounded-2xl p-6 flex items-center gap-5">
            <div className="w-14 h-14 rounded-2xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center shrink-0">
              <Flame className="w-7 h-7 text-orange-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Daily Streak</p>
              <div className="flex items-end gap-1">
                <span className="text-4xl font-extrabold text-foreground">{streakInfo?.streak ?? 0}</span>
                <span className="text-lg font-semibold text-muted-foreground mb-1">day{streakInfo?.streak !== 1 ? "s" : ""}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">{streakInfo?.totalDays ?? 0} total study days</p>
            </div>
          </div>

          {/* Word of the Day */}
          {wordOfDay && (
            <div className="bg-card border border-primary/20 rounded-2xl p-6 relative overflow-hidden">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-xs font-semibold uppercase tracking-widest text-primary">Word of the Day</span>
                <LevelBadge level={wordOfDay.level} className="ml-auto" />
              </div>
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-2xl font-extrabold text-foreground">{wordOfDay.english}</h3>
                <button
                  onClick={() => speak(wordOfDay.english)}
                  className="w-8 h-8 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center transition-colors"
                  aria-label="Listen"
                >
                  <Volume2 className="w-4 h-4 text-primary" />
                </button>
              </div>
              <p className="text-xl font-bold arabic-text text-primary mb-2">{wordOfDay.arabic}</p>
              {wordOfDay.exampleSentence && (
                <p className="text-sm text-muted-foreground italic">{wordOfDay.exampleSentence}</p>
              )}
              <Star className="absolute -right-4 -bottom-4 w-20 h-20 text-primary/5" />
            </div>
          )}
        </section>

        {/* ── Features ── */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-6">What's inside</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((f, i) => (
              <div
                key={f.title}
                className="bg-card border border-border rounded-2xl p-5 hover:border-primary/30 transition-colors animate-in fade-in slide-in-from-bottom-4"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${f.color}`}>
                  <f.icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-foreground mb-1">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Bilingual Vocabulary Download ── */}
        <VocabDownloadSection />

        {/* ── Owner / About ── */}
        <section className="bg-card border border-border rounded-3xl overflow-hidden shadow-sm">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-56 shrink-0">
              <img src="/owner.png" alt="Instructor" className="w-full h-auto md:h-full md:w-56 object-cover object-center block" />
            </div>
            <div className="p-8 flex flex-col justify-center">
              <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-2">Meet Your Instructor</span>
              <h2 className="text-2xl font-extrabold text-foreground mb-1">Abu Omar</h2>
              <p className="text-primary font-semibold mb-3">Your Guide to Band 7+</p>
              <p className="text-muted-foreground leading-relaxed mb-5">
                This app was created by the team behind{" "}
                <a href="https://www.4ielts.com" target="_blank" rel="noopener noreferrer" className="text-primary font-semibold hover:underline">
                  4IELTS.com
                </a>
                {" "}— a platform dedicated to helping Arabic-speaking students achieve their target IELTS band. Every word has been hand-picked to match the vocabulary demands of the IELTS exam.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="https://www.4ielts.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">
                  Visit 4IELTS.com <ExternalLink className="w-4 h-4" />
                </a>
                <a
                  href="https://wa.me/4ielts"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500 hover:bg-green-600 text-white text-sm font-semibold transition-colors shadow-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  Contact on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── Progress Dashboard ── */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2].map((i) => <div key={i} className="h-32 bg-muted animate-pulse rounded-2xl" />)}
          </div>
        ) : summary ? (
          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <Trophy className="w-6 h-6 text-primary" />
              Your Progress
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-primary text-primary-foreground p-6 rounded-3xl shadow-lg relative overflow-hidden">
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-4 opacity-90">
                    <Trophy className="w-5 h-5" />
                    <h3 className="font-semibold text-lg">Total Progress</h3>
                  </div>
                  <div className="flex items-end gap-2 mb-2">
                    <span className="text-5xl font-bold">{summary.totalKnown}</span>
                    <span className="text-primary-foreground/80 mb-1">/ {summary.totalCards} words learned</span>
                  </div>
                  <Progress
                    value={summary.totalCards > 0 ? (summary.totalKnown / summary.totalCards) * 100 : 0}
                    className="h-2 bg-primary-foreground/20 [&>div]:bg-white mt-6"
                  />
                </div>
                <Zap className="absolute -bottom-6 -right-6 w-32 h-32 text-primary-foreground/10 rotate-12" />
              </div>
              <div className="bg-card border border-border p-6 rounded-3xl shadow-sm flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-4 text-muted-foreground">
                  <Target className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold text-lg text-foreground">Quick Actions</h3>
                </div>
                <div className="flex flex-col gap-3">
                  <Button asChild className="rounded-full">
                    <Link href="/study"><BookOpen className="w-4 h-4 mr-2" />Study Flashcards</Link>
                  </Button>
                  <Button asChild variant="outline" className="rounded-full">
                    <Link href="/quiz"><HelpCircle className="w-4 h-4 mr-2" />Take a Quiz</Link>
                  </Button>
                  <Button asChild variant="outline" className="rounded-full border-teal-300 text-teal-700 dark:text-teal-400 hover:bg-teal-50 dark:hover:bg-teal-900/20">
                    <Link href="/synonyms"><ArrowLeftRight className="w-4 h-4 mr-2" />IELTS Synonyms</Link>
                  </Button>
                  <Button asChild variant="outline" className="rounded-full border-orange-300 text-orange-700 dark:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-900/20">
                    <Link href="/antonyms"><ArrowLeftRight className="w-4 h-4 mr-2" />IELTS Antonyms</Link>
                  </Button>
                  <Button asChild variant="outline" className="rounded-full border-indigo-300 text-indigo-700 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20">
                    <Link href="/phrasal-verbs"><ArrowUpDown className="w-4 h-4 mr-2" />Phrasal Verbs</Link>
                  </Button>
                  <Button asChild variant="outline" className="rounded-full border-violet-300 text-violet-700 dark:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-900/20">
                    <Link href="/essay-checker"><FileText className="w-4 h-4 mr-2" />Orwell AI</Link>
                  </Button>
                  <Button asChild variant="outline" className="rounded-full border-teal-300 text-teal-700 dark:text-teal-400 hover:bg-teal-50 dark:hover:bg-teal-900/20">
                    <Link href="/stories"><BookMarked className="w-4 h-4 mr-2" />Short Stories</Link>
                  </Button>
                  <Button asChild variant="outline" className="rounded-full border-rose-300 text-rose-700 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-900/20">
                    <Link href="/speaking"><Mic className="w-4 h-4 mr-2" />Churchill AI</Link>
                  </Button>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {summary.byLevel.map((stat, i) => {
                const percent = stat.total > 0 ? Math.round((stat.known / stat.total) * 100) : 0;
                return (
                  <div
                    key={stat.level}
                    className="bg-card border border-border p-5 rounded-2xl hover:border-primary/30 transition-colors animate-in fade-in"
                    style={{ animationDelay: `${i * 100}ms` }}
                  >
                    <div className="flex justify-between items-center mb-3">
                      <span className="font-bold text-xl">{stat.level}</span>
                      <span className="text-sm font-medium px-2 py-1 bg-muted rounded-md">{percent}%</span>
                    </div>
                    <Progress value={percent} className="h-2 mb-3" />
                    <div className="text-sm text-muted-foreground">{stat.known} of {stat.total} known</div>
                  </div>
                );
              })}
            </div>
          </section>
        ) : null}

        {/* ── Approved Reviews ── */}
        <ApprovedReviews />

        {/* ── Leave a Review ── */}
        <ReviewSection />

      </div>
    </Layout>
  );
}

function ApprovedReviews() {
  const [reviews, setReviews] = useState<Array<{
    id: number; name: string | null; comment: string; rating: number; createdAt: string;
  }>>([]);

  useEffect(() => {
    fetch("/api/reviews/public")
      .then(r => r.json())
      .then(data => { if (Array.isArray(data)) setReviews(data); })
      .catch(() => {});
  }, []);

  if (reviews.length === 0) return null;

  return (
    <section className="bg-card border border-border rounded-3xl p-8 space-y-5">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center shrink-0">
          <MessageCircle className="w-5 h-5 text-amber-500" />
        </div>
        <div>
          <h2 className="text-xl font-extrabold text-foreground">What Students Say</h2>
          <p className="text-sm text-muted-foreground">Real feedback from LEXO users · آراء الطلاب</p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {reviews.map(r => (
          <div key={r.id} className="bg-muted/40 border border-border rounded-2xl p-5 space-y-2">
            <div className="flex items-center gap-2">
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map(s => (
                  <Star
                    key={s}
                    className={`w-4 h-4 ${s <= r.rating ? "text-amber-400 fill-amber-400" : "text-muted-foreground/30"}`}
                  />
                ))}
              </div>
              <span className="text-xs text-muted-foreground ml-auto">
                {new Date(r.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
              </span>
            </div>
            <p className="text-sm text-foreground leading-relaxed">"{r.comment}"</p>
            {r.name && (
              <p className="text-xs font-medium text-muted-foreground">— {r.name}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

function ReviewSection() {
  const storedRaw = typeof window !== "undefined" ? localStorage.getItem("4ielts_email") : null;
  let storedEmail = "";
  try { storedEmail = storedRaw ? JSON.parse(storedRaw).email ?? "" : ""; } catch { storedEmail = ""; }

  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim() || comment.trim().length < 10) {
      setError("Please write at least 10 characters.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: storedEmail, name: name.trim(), comment: comment.trim(), rating }),
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        const d = await res.json();
        setError(d.error ?? "Failed to submit. Please try again.");
      }
    } catch {
      setError("Connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <section className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-3xl p-8 text-center">
        <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-3" />
        <h3 className="text-xl font-bold text-foreground mb-2">Thank you for your feedback!</h3>
        <p className="text-muted-foreground text-sm">Your review has been submitted and will appear after it is approved.</p>
        <p className="text-xs text-muted-foreground mt-1" dir="rtl" lang="ar">شكراً لمراجعتك! ستظهر بعد موافقة المشرف.</p>
      </section>
    );
  }

  return (
    <section className="bg-card border border-border rounded-3xl p-8 space-y-5">
      <div className="flex items-center gap-3 mb-1">
        <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center shrink-0">
          <Star className="w-5 h-5 text-amber-500" />
        </div>
        <div>
          <h2 className="text-xl font-extrabold text-foreground">Leave a Review</h2>
          <p className="text-sm text-muted-foreground">Share your experience with LEXO · شارك تجربتك</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">Your Name (optional)</label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="e.g. Ahmed from Saudi Arabia"
            maxLength={80}
            className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Rating</label>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map(s => (
              <button
                key={s}
                type="button"
                onClick={() => setRating(s)}
                onMouseEnter={() => setHoverRating(s)}
                onMouseLeave={() => setHoverRating(0)}
                className="transition-transform hover:scale-110"
              >
                <Star
                  className={`w-8 h-8 transition-colors ${(hoverRating || rating) >= s ? "text-amber-400 fill-amber-400" : "text-muted-foreground/40"}`}
                />
              </button>
            ))}
            <span className="ml-2 text-sm font-medium text-muted-foreground self-center">
              {rating === 5 ? "Excellent" : rating === 4 ? "Good" : rating === 3 ? "Average" : rating === 2 ? "Fair" : "Poor"}
            </span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">
            Your Comment <span className="text-muted-foreground font-normal">(min. 10 characters)</span>
          </label>
          <textarea
            value={comment}
            onChange={e => setComment(e.target.value)}
            placeholder="Tell us what you think about LEXO — what helped you most? What would you improve?"
            rows={4}
            maxLength={2000}
            className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm resize-none"
          />
          <p className="text-xs text-muted-foreground mt-1 text-right">{comment.length}/2000</p>
        </div>

        {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}

        <button
          type="submit"
          disabled={loading || !comment.trim()}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          {loading ? "Submitting…" : "Submit Review"}
        </button>
      </form>
    </section>
  );
}
