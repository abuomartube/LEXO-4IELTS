import { useGetProgressSummary } from "@workspace/api-client-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  BookOpen, Trophy, ArrowRight, Zap, Target,
  Volume2, Globe, Layers, Award, ExternalLink
} from "lucide-react";
import { Layout } from "@/components/layout";

const features = [
  {
    icon: Layers,
    title: "4 CEFR Levels",
    desc: "A1 · A2 · B1 · B2 — structured vocabulary from beginner to upper-intermediate.",
    color: "bg-teal-50 text-teal-600",
  },
  {
    icon: Globe,
    title: "Arabic Translations",
    desc: "Every word comes with a full Arabic translation in clear, readable Cairo font.",
    color: "bg-sky-50 text-sky-600",
  },
  {
    icon: Volume2,
    title: "Pronunciation Audio",
    desc: "Tap Listen on any card to hear the correct English pronunciation instantly.",
    color: "bg-emerald-50 text-emerald-600",
  },
  {
    icon: Award,
    title: "817 Flashcards",
    desc: "Over 800 carefully selected words with bilingual example sentences in every card.",
    color: "bg-amber-50 text-amber-600",
  },
];

export default function Home() {
  const { data: summary, isLoading } = useGetProgressSummary();

  return (
    <Layout>
      <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">

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
              800+ flashcards across A1–B2 levels, with Arabic translations and audio
              pronunciation — built for Arabic-speaking IELTS students.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button
                asChild
                size="lg"
                className="rounded-full bg-white text-primary hover:bg-white/90 font-bold shadow-md"
              >
                <Link href="/study">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Start Studying
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full border-white/40 text-primary-foreground hover:bg-white/10 font-semibold"
              >
                <Link href="/browse">
                  Browse All Cards <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
          <Zap className="absolute -bottom-8 -right-8 w-52 h-52 text-primary-foreground/8 rotate-12" />
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/5 -translate-y-1/3 translate-x-1/3" />
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

        {/* ── Owner / About ── */}
        <section className="bg-card border border-border rounded-3xl overflow-hidden shadow-sm">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-56 shrink-0">
              <img
                src="/owner.png"
                alt="Instructor"
                className="w-full h-64 md:h-full object-cover object-top"
              />
            </div>
            <div className="p-8 flex flex-col justify-center">
              <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-2">
                Meet Your Instructor
              </span>
              <h2 className="text-2xl font-extrabold text-foreground mb-1">
                Abu Omar
              </h2>
              <p className="text-primary font-semibold mb-3">Your Guide to Band 7+</p>
              <p className="text-muted-foreground leading-relaxed mb-5">
                This app was created by the team behind{" "}
                <a
                  href="https://www.4ielts.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary font-semibold hover:underline"
                >
                  4IELTS.com
                </a>
                {" "}— a platform dedicated to helping Arabic-speaking students achieve their
                target IELTS band. Every word in this app has been hand-picked to match the
                vocabulary demands of the IELTS exam, from everyday A1 words all the way to
                advanced B2 academic language.
              </p>
              <a
                href="https://www.4ielts.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
              >
                Visit 4IELTS.com <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </section>

        {/* ── Progress Dashboard ── */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-32 bg-muted animate-pulse rounded-2xl" />
            ))}
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
                  <h3 className="font-semibold text-lg text-foreground">Next Goal</h3>
                </div>
                <p className="text-lg">Review your unknown words to level up your vocabulary.</p>
                <div className="mt-6">
                  <Button asChild variant="outline" className="rounded-full shadow-sm">
                    <Link href="/browse">
                      Browse all words <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {summary.byLevel.map((stat, i) => {
                const percent = stat.total > 0 ? Math.round((stat.known / stat.total) * 100) : 0;
                return (
                  <div
                    key={stat.level}
                    className="bg-card border border-border p-5 rounded-2xl hover:border-primary/30 transition-colors animate-in fade-in slide-in-from-bottom-4"
                    style={{ animationDelay: `${i * 100}ms` }}
                  >
                    <div className="flex justify-between items-center mb-3">
                      <span className="font-bold text-xl">{stat.level}</span>
                      <span className="text-sm font-medium px-2 py-1 bg-muted rounded-md">{percent}%</span>
                    </div>
                    <Progress value={percent} className="h-2 mb-3" />
                    <div className="text-sm text-muted-foreground">
                      {stat.known} of {stat.total} known
                    </div>
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
