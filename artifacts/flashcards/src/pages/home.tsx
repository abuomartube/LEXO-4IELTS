import { useGetProgressSummary } from "@workspace/api-client-react";
import { useWordOfDay, useStreak } from "@workspace/api-client-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { LevelBadge } from "@/components/level-badge";
import {
  BookOpen, Trophy, Zap, Target,
  Volume2, Globe, Layers, Award, ExternalLink,
  Flame, Star, HelpCircle, Sparkles, MessageCircle,
  FileText, Download, Loader2, CheckCircle2
} from "lucide-react";
import { Layout } from "@/components/layout";
import { useState, useCallback, useEffect } from "react";

function VocabDownloadSection() {
  const [pdfState, setPdfState] = useState<"checking" | "ready" | "generating" | "downloading" | "error">("checking");
  const [errorMsg, setErrorMsg] = useState("");

  const poll = useCallback(async (attempt = 0) => {
    try {
      const res = await fetch("/api/vocab-pdf/status");
      const data: { status: string } = await res.json();
      if (data.status === "ready") {
        setPdfState("ready");
        return;
      }
      if (data.status === "not_started") {
        fetch("/api/vocab-pdf").catch(() => {});
      }
      setPdfState("generating");
      if (attempt < 72) {
        setTimeout(() => poll(attempt + 1), 5000);
      } else {
        setErrorMsg("Still generating — please refresh and try again.");
        setPdfState("error");
      }
    } catch {
      setPdfState("generating");
      if (attempt < 5) {
        setTimeout(() => poll(attempt + 1), 3000);
      } else {
        setErrorMsg("Could not connect to server.");
        setPdfState("error");
      }
    }
  }, []);

  useEffect(() => { poll(0); }, [poll]);

  const busy = pdfState === "generating" || pdfState === "checking" || pdfState === "downloading";

  const handlePdfDownload = useCallback(async () => {
    if (pdfState === "generating" || pdfState === "checking" || pdfState === "downloading") return;
    setErrorMsg("");
    try {
      const statusRes = await fetch("/api/vocab-pdf/status");
      const status: { status: string } = await statusRes.json();
      if (status.status === "ready") {
        setPdfState("downloading");
        const a = document.createElement("a");
        a.href = "/api/vocab-pdf";
        a.download = "IELTS-Vocabulary-3000-Words-EN-AR.pdf";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setTimeout(() => setPdfState("ready"), 3000);
      } else {
        setPdfState("generating");
        fetch("/api/vocab-pdf").catch(() => {});
        poll(0);
      }
    } catch {
      setErrorMsg("Could not connect to server. Please try again.");
      setPdfState("error");
    }
  }, [pdfState, poll]);

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
            Download the full bilingual vocabulary list — all 3,000 IELTS words across 5 CEFR levels (A1–C1), with Arabic translations for every word and example sentence. Print-ready and formatted for study.
          </p>
          <p className="text-sm text-teal-700 dark:text-teal-400 font-medium" dir="rtl" lang="ar">
            قائمة المفردات الكاملة ثنائية اللغة · 3000 كلمة · 5 مستويات · ترجمة عربية لكل كلمة وجملة
          </p>
          {errorMsg && (
            <p className="text-sm text-red-600 dark:text-red-400 mt-2">{errorMsg}</p>
          )}
          {pdfState === "generating" && (
            <p className="text-sm text-teal-700 dark:text-teal-400 mt-2 flex items-center gap-2">
              <Loader2 className="w-3 h-3 animate-spin" />
              Generating your PDF — please wait up to 90 seconds…
            </p>
          )}
          {pdfState === "ready" && (
            <p className="text-sm text-green-600 dark:text-green-400 mt-2 flex items-center gap-2">
              <CheckCircle2 className="w-3 h-3" />
              PDF ready — click to download
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2 shrink-0">
          <button
            onClick={handlePdfDownload}
            disabled={busy}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-teal-600 hover:bg-teal-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold transition-colors shadow-md text-sm"
          >
            {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
            {pdfState === "generating" ? "Generating PDF…"
              : pdfState === "checking" ? "Checking…"
              : pdfState === "downloading" ? "Downloading…"
              : "Download PDF"}
          </button>
          <a
            href="/vocabulary-bilingual.html"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-2 rounded-full border border-teal-600 text-teal-700 dark:text-teal-400 hover:bg-teal-50 dark:hover:bg-teal-900/20 font-medium transition-colors text-sm"
          >
            <FileText className="w-4 h-4" />
            View as HTML
          </a>
        </div>
      </div>
    </section>
  );
}

const features = [
  {
    icon: Layers,
    title: "5 CEFR Levels",
    desc: "A1 · A2 · B1 · B2 · C1 — structured vocabulary from beginner to advanced.",
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
    title: "3000 Flashcards",
    desc: "3000 carefully selected IELTS words with bilingual example sentences in every card.",
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
              Master English Vocabulary<br/>the Smart Way
            </h1>
            <p className="text-primary-foreground/80 text-lg mb-8 leading-relaxed">
              3000 flashcards across A1–C1 levels, with Arabic translations, audio
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

      </div>
    </Layout>
  );
}
