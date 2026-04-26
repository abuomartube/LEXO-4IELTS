import { useState, useMemo, useEffect } from "react";
import { Layout } from "@/components/layout";
import { SPEAKING_TOPICS, type SpeakingTopic, type TopicQuestion } from "@/data/speaking-topics";
import {
  ChevronDown, ChevronRight, BookOpen, Lightbulb, GraduationCap,
  ArrowLeft, Volume2, Star, Mic, Search, X
} from "lucide-react";
import { cn } from "@/lib/utils";

function speak(text: string) {
  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "en-US";
    u.rate = 0.9;
    window.speechSynthesis.speak(u);
  }
}

function VocabChip({ word, meaning }: { word: string; meaning: string }) {
  return (
    <div className="inline-flex items-center gap-1.5 bg-primary/10 text-primary rounded-lg px-2.5 py-1.5 text-xs font-medium">
      <span className="font-bold">{word}</span>
      <span className="text-muted-foreground">— {meaning}</span>
    </div>
  );
}

function TipItem({ tip }: { tip: string }) {
  return (
    <div className="flex items-start gap-2 text-sm text-muted-foreground">
      <Lightbulb className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
      <span>{tip}</span>
    </div>
  );
}

function QuestionCard({ q, index, partLabel }: { q: TopicQuestion; index: number; partLabel: string }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-card border border-border rounded-2xl overflow-hidden transition-all">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center gap-3 px-4 py-3.5 text-left hover:bg-accent/50 transition-colors"
      >
        <div className="w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold shrink-0">
          {index + 1}
        </div>
        <span className="flex-1 font-semibold text-foreground text-sm">{q.question}</span>
        {expanded ? (
          <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0" />
        ) : (
          <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
        )}
      </button>

      {expanded && (
        <div className="px-4 pb-4 space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-bold text-green-600 dark:text-green-400 uppercase tracking-wider">
                <Star className="w-3.5 h-3.5" />
                Band 7-8 Model Answer
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); speak(q.modelAnswer); }}
                className="flex items-center gap-1 text-xs text-primary hover:text-primary/80 font-medium"
              >
                <Volume2 className="w-3.5 h-3.5" />
                Listen
              </button>
            </div>
            <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-xl px-4 py-3 text-sm leading-relaxed text-foreground whitespace-pre-line">
              {q.modelAnswer}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-primary uppercase tracking-wider">
              <GraduationCap className="w-3.5 h-3.5" />
              Key Vocabulary
            </div>
            <div className="flex flex-wrap gap-1.5">
              {q.keyVocabulary.map((v) => (
                <VocabChip key={v.word} word={v.word} meaning={v.meaning} />
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
              <Lightbulb className="w-3.5 h-3.5" />
              Tips
            </div>
            <div className="space-y-1.5">
              {q.tips.map((t, i) => (
                <TipItem key={i} tip={t} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Part2Card({ topic }: { topic: SpeakingTopic }) {
  const [expanded, setExpanded] = useState(false);
  const p2 = topic.part2;

  return (
    <div className="bg-card border border-border rounded-2xl overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center gap-3 px-4 py-3.5 text-left hover:bg-accent/50 transition-colors"
      >
        <div className="w-7 h-7 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
          <BookOpen className="w-3.5 h-3.5" />
        </div>
        <div className="flex-1 min-w-0">
          <span className="font-semibold text-foreground text-sm block truncate">{p2.cueCard}</span>
        </div>
        {expanded ? (
          <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0" />
        ) : (
          <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
        )}
      </button>

      {expanded && (
        <div className="px-4 pb-4 space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-300 dark:border-amber-700 rounded-xl p-4 space-y-2">
            <p className="font-bold text-foreground text-sm">{p2.cueCard}</p>
            <p className="text-xs font-semibold text-foreground uppercase tracking-wider mt-2">You should say:</p>
            {p2.bullets.map((b, i) => (
              <p key={i} className="text-sm text-muted-foreground">• {b}</p>
            ))}
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-bold text-green-600 dark:text-green-400 uppercase tracking-wider">
                <Star className="w-3.5 h-3.5" />
                Band 7-8 Model Answer
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); speak(p2.modelAnswer); }}
                className="flex items-center gap-1 text-xs text-primary hover:text-primary/80 font-medium"
              >
                <Volume2 className="w-3.5 h-3.5" />
                Listen
              </button>
            </div>
            <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-xl px-4 py-3 text-sm leading-relaxed text-foreground whitespace-pre-line">
              {p2.modelAnswer}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-primary uppercase tracking-wider">
              <GraduationCap className="w-3.5 h-3.5" />
              Key Vocabulary
            </div>
            <div className="flex flex-wrap gap-1.5">
              {p2.keyVocabulary.map((v) => (
                <VocabChip key={v.word} word={v.word} meaning={v.meaning} />
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
              <Lightbulb className="w-3.5 h-3.5" />
              Tips
            </div>
            <div className="space-y-1.5">
              {p2.tips.map((t, i) => (
                <TipItem key={i} tip={t} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function TopicDetail({
  topic,
  onBack,
  initialPart = 1,
}: {
  topic: SpeakingTopic;
  onBack: () => void;
  initialPart?: 1 | 2 | 3;
}) {
  const [activeTab, setActiveTab] = useState<1 | 2 | 3>(initialPart);

  const tabs = [
    { n: 1 as const, label: "Part 1", sub: "Introduction", count: topic.part1.length },
    { n: 2 as const, label: "Part 2", sub: "Long Turn", count: 1 },
    { n: 3 as const, label: "Part 3", sub: "Discussion", count: topic.part3.length },
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-5 animate-in fade-in duration-300">
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        All Topics
      </button>

      <div className="bg-card border border-border rounded-3xl p-6 space-y-3">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{topic.icon}</span>
          <div>
            <h1 className="text-2xl font-extrabold text-foreground">{topic.theme}</h1>
            <p className="text-sm text-muted-foreground">
              {topic.part1.length + 1 + topic.part3.length} questions with model answers
            </p>
          </div>
        </div>
      </div>

      <div className="flex gap-1 bg-muted/50 rounded-2xl p-1">
        {tabs.map((t) => (
          <button
            key={t.n}
            onClick={() => setActiveTab(t.n)}
            className={cn(
              "flex-1 rounded-xl px-3 py-2.5 text-center transition-all",
              activeTab === t.n
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <div className="text-xs font-bold">{t.label}</div>
            <div className="text-[10px] opacity-75">{t.sub} · {t.count}Q</div>
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {activeTab === 1 && topic.part1.map((q, i) => (
          <QuestionCard key={i} q={q} index={i} partLabel="Part 1" />
        ))}

        {activeTab === 2 && <Part2Card topic={topic} />}

        {activeTab === 3 && topic.part3.map((q, i) => (
          <QuestionCard key={i} q={q} index={i} partLabel="Part 3" />
        ))}
      </div>

      <p className="text-center text-xs text-muted-foreground pt-2">
        💡 Practice these answers out loud — reading alone isn't enough for Speaking!
      </p>
    </div>
  );
}

export default function SpeakingTopicsPage() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [initialPart, setInitialPart] = useState<1 | 2 | 3>(1);
  const [search, setSearch] = useState("");

  // Deep-link reception: /speaking-topics?topic=hometown[&part=2] opens that theme directly.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const topic = params.get("topic");
    const part = params.get("part");
    if (!topic) return;
    const match = SPEAKING_TOPICS.find((t) => t.id === topic);
    if (match) {
      setSelectedId(match.id);
      const parsed = part ? Number(part) : 1;
      if (parsed === 1 || parsed === 2 || parsed === 3) {
        setInitialPart(parsed);
      }
    }
    try {
      const url = new URL(window.location.href);
      url.searchParams.delete("topic");
      url.searchParams.delete("part");
      window.history.replaceState({}, "", url.toString());
    } catch {}
  }, []);

  const selectedTopic = useMemo(
    () => SPEAKING_TOPICS.find((t) => t.id === selectedId) ?? null,
    [selectedId]
  );

  const filtered = useMemo(() => {
    if (!search.trim()) return SPEAKING_TOPICS;
    const q = search.toLowerCase();
    return SPEAKING_TOPICS.filter(
      (t) =>
        t.theme.toLowerCase().includes(q) ||
        t.part1.some((p) => p.question.toLowerCase().includes(q)) ||
        t.part2.cueCard.toLowerCase().includes(q) ||
        t.part3.some((p) => p.question.toLowerCase().includes(q))
    );
  }, [search]);

  const totalQuestions = SPEAKING_TOPICS.reduce(
    (sum, t) => sum + t.part1.length + 1 + t.part3.length,
    0
  );

  if (selectedTopic) {
    return (
      <Layout>
        <TopicDetail
          topic={selectedTopic}
          onBack={() => setSelectedId(null)}
          initialPart={initialPart}
        />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in duration-300">
        <div className="bg-card border border-border rounded-3xl p-6 text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
            <Mic className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-foreground">Speaking Topic Bank</h1>
            <p className="text-muted-foreground mt-1">
              Band 7-8 model answers, key vocabulary & examiner tips
            </p>
            <p className="text-sm text-muted-foreground mt-0.5" dir="rtl" lang="ar">
              بنك مواضيع المحادثة مع إجابات نموذجية ومفردات أساسية ونصائح
            </p>
          </div>

          <div className="flex justify-center gap-4 text-sm">
            <div className="bg-muted/50 rounded-xl px-4 py-2 text-center">
              <div className="text-2xl font-extrabold text-primary">{SPEAKING_TOPICS.length}</div>
              <div className="text-xs text-muted-foreground">Topics</div>
            </div>
            <div className="bg-muted/50 rounded-xl px-4 py-2 text-center">
              <div className="text-2xl font-extrabold text-primary">{totalQuestions}</div>
              <div className="text-xs text-muted-foreground">Questions</div>
            </div>
            <div className="bg-muted/50 rounded-xl px-4 py-2 text-center">
              <div className="text-2xl font-extrabold text-green-500">3</div>
              <div className="text-xs text-muted-foreground">Parts</div>
            </div>
          </div>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search topics or questions..."
            className="w-full pl-10 pr-10 py-3 bg-card border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {filtered.map((topic) => (
            <button
              key={topic.id}
              onClick={() => {
                setInitialPart(1);
                setSelectedId(topic.id);
              }}
              className="bg-card border border-border rounded-2xl p-4 text-left hover:border-primary/40 hover:shadow-md transition-all group"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{topic.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-foreground group-hover:text-primary transition-colors truncate">
                    {topic.theme}
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    {topic.part1.length + 1 + topic.part3.length} questions · 3 parts
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
              </div>
            </button>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <Search className="w-8 h-8 mx-auto mb-3 opacity-50" />
            <p className="font-medium">No topics match "{search}"</p>
            <p className="text-sm mt-1">Try a different search term</p>
          </div>
        )}
      </div>
    </Layout>
  );
}
