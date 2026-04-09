import { useState } from "react";
import { Layout } from "@/components/layout";
import { BookOpen, ChevronLeft, Globe, Languages, Loader2, BookMarked } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

interface Story {
  id: number;
  title: string;
  titleArabic: string;
  content: string;
  contentArabic: string;
  level: string;
  orderIndex: number;
}

const LEVELS = ["All", "A2", "B1", "B2", "C1"] as const;
type LevelFilter = typeof LEVELS[number];

const levelColors: Record<string, string> = {
  A2: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
  B1: "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300",
  B2: "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300",
  C1: "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300",
};

const levelBorder: Record<string, string> = {
  A2: "border-blue-200 dark:border-blue-800",
  B1: "border-orange-200 dark:border-orange-800",
  B2: "border-purple-200 dark:border-purple-800",
  C1: "border-rose-200 dark:border-rose-800",
};

function LevelBadge({ level }: { level: string }) {
  return (
    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${levelColors[level] ?? "bg-muted text-muted-foreground"}`}>
      {level}
    </span>
  );
}

function StoryReader({ story, onBack }: { story: Story; onBack: () => void }) {
  const [lang, setLang] = useState<"en" | "ar">("en");

  return (
    <div className="animate-in fade-in duration-300">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
      >
        <ChevronLeft className="w-4 h-4" />
        Back to Stories
      </button>

      <div className={`bg-card border-2 rounded-3xl p-6 md:p-8 ${levelBorder[story.level]}`}>
        <div className="flex items-start justify-between gap-4 mb-6 flex-wrap">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <LevelBadge level={story.level} />
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-foreground leading-tight">
              {story.title}
            </h1>
            <p className="text-lg text-muted-foreground mt-1 font-medium" dir="rtl" lang="ar">
              {story.titleArabic}
            </p>
          </div>

          <div className="flex gap-2 shrink-0">
            <button
              onClick={() => setLang("en")}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-colors border ${
                lang === "en"
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-border text-muted-foreground hover:bg-accent"
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              English
            </button>
            <button
              onClick={() => setLang("ar")}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-colors border ${
                lang === "ar"
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-border text-muted-foreground hover:bg-accent"
              }`}
            >
              <Languages className="w-3.5 h-3.5" />
              العربية
            </button>
          </div>
        </div>

        <div
          className={`text-base leading-[2] text-foreground whitespace-pre-wrap ${lang === "ar" ? "font-cairo text-right" : ""}`}
          dir={lang === "ar" ? "rtl" : "ltr"}
          lang={lang === "ar" ? "ar" : "en"}
        >
          {lang === "en" ? story.content : story.contentArabic}
        </div>

        <div className="mt-8 pt-6 border-t border-border flex justify-center">
          <button
            onClick={() => setLang(lang === "en" ? "ar" : "en")}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-border text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
          >
            <Languages className="w-4 h-4" />
            {lang === "en" ? "اقرأ بالعربية" : "Read in English"}
          </button>
        </div>
      </div>
    </div>
  );
}

function StoryCard({ story, onClick }: { story: Story; onClick: () => void }) {
  const preview = story.content.slice(0, 120).trim() + "…";

  return (
    <button
      onClick={onClick}
      className={`text-left bg-card border-2 rounded-2xl p-5 transition-all hover:shadow-md hover:-translate-y-0.5 hover:border-primary/40 active:scale-[0.99] ${levelBorder[story.level]}`}
    >
      <div className="flex items-center justify-between gap-2 mb-3">
        <LevelBadge level={story.level} />
        <BookOpen className="w-4 h-4 text-muted-foreground" />
      </div>
      <h3 className="font-bold text-foreground text-base leading-snug mb-1">{story.title}</h3>
      <p className="text-xs text-muted-foreground font-medium mb-3" dir="rtl" lang="ar">
        {story.titleArabic}
      </p>
      <p className="text-xs text-muted-foreground leading-relaxed">{preview}</p>
    </button>
  );
}

export default function StoriesPage() {
  const [levelFilter, setLevelFilter] = useState<LevelFilter>("All");
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);

  const { data: stories = [], isLoading } = useQuery<Story[]>({
    queryKey: ["stories", levelFilter],
    queryFn: async () => {
      const url = levelFilter === "All"
        ? "/api/stories"
        : `/api/stories?level=${levelFilter}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to load stories");
      return res.json();
    },
  });

  if (selectedStory) {
    return (
      <Layout>
        <div className="max-w-3xl mx-auto">
          <StoryReader story={selectedStory} onBack={() => setSelectedStory(null)} />
        </div>
      </Layout>
    );
  }

  const levelCounts = stories.reduce<Record<string, number>>((acc, s) => {
    acc[s.level] = (acc[s.level] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <Layout>
      <div className="max-w-5xl mx-auto animate-in fade-in duration-500">

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shrink-0">
            <BookMarked className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-foreground">IELTS Short Stories</h1>
            <p className="text-sm text-muted-foreground">
              Read and practise with stories built from your 3,000-word IELTS vocabulary
            </p>
          </div>
        </div>

        {/* Level filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          {LEVELS.map((lvl) => {
            const count = lvl === "All" ? stories.length : (levelCounts[lvl] ?? 0);
            const isActive = levelFilter === lvl;
            return (
              <button
                key={lvl}
                onClick={() => setLevelFilter(lvl)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border transition-colors ${
                  isActive
                    ? "bg-primary text-primary-foreground border-primary shadow-sm"
                    : "bg-card border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
                }`}
              >
                {lvl}
                {!isLoading && (
                  <span className={`text-xs px-1.5 py-0.5 rounded-full font-bold ${
                    isActive ? "bg-primary-foreground/20 text-primary-foreground" : "bg-muted"
                  }`}>
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : stories.length === 0 ? (
          <div className="text-center py-24">
            <BookOpen className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-muted-foreground">No stories found for this level.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {stories.map((story) => (
              <StoryCard
                key={story.id}
                story={story}
                onClick={() => setSelectedStory(story)}
              />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
