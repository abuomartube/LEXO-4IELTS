import { useState } from "react";
import { useGetProgressSummary, useGetFlashcardLevelStats, customFetch } from "@workspace/api-client-react";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { Layout } from "@/components/layout";
import { Progress } from "@/components/ui/progress";
import { LevelBadge } from "@/components/level-badge";
import { Trophy, Zap, BookMarked, TrendingUp, RotateCcw, Sparkles, Shuffle, ArrowUpDown, BookOpen, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import synonymsRaw from "@/data/synonyms-data.json";
import antonymsRaw from "@/data/antonyms-data.json";
import phrasalVerbsRaw from "@/data/phrasal-verbs-data.json";

interface ActivityPosition {
  position: number;
  filters: string;
}

function useActivityStats(activity: string) {
  return useQuery<{ known: number; unknown: number }>({
    queryKey: ["activity-stats", activity],
    queryFn: async () => {
      try {
        const data = await customFetch<ActivityPosition>(`/api/activity-position/${activity}`);
        const f = JSON.parse(data.filters);
        return { known: f.known ?? 0, unknown: f.unknown ?? 0 };
      } catch {
        return { known: 0, unknown: 0 };
      }
    },
  });
}

function useStoryCompletions() {
  return useQuery<Set<number>>({
    queryKey: ["story-completions-progress"],
    queryFn: async () => {
      const res = await customFetch<{ keys: Record<string, string> }>("/api/user-data-prefix/story_completed_");
      const ids = new Set<number>();
      for (const [k, v] of Object.entries(res.keys)) {
        if (v === "1") ids.add(Number(k.replace("story_completed_", "")));
      }
      return ids;
    },
  });
}

function useStoryCount() {
  return useQuery<number>({
    queryKey: ["story-count"],
    queryFn: async () => {
      const res = await fetch("/api/stories");
      if (!res.ok) return 0;
      const stories = await res.json();
      return stories.length;
    },
  });
}

function FlipCardProgressCard({ title, icon, iconColor, totalCards, known, unknown, accentColor }: {
  title: string;
  icon: React.ReactNode;
  iconColor: string;
  totalCards: number;
  known: number;
  unknown: number;
  accentColor: string;
}) {
  const reviewed = known + unknown;
  const pct = reviewed > 0 ? Math.round((known / reviewed) * 100) : 0;

  return (
    <div className="bg-card border border-border rounded-2xl p-6 shadow-sm hover:shadow-md transition-all">
      <div className="flex items-center gap-3 mb-4">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${iconColor}`}>
          {icon}
        </div>
        <div>
          <h3 className="font-bold text-foreground">{title}</h3>
          <p className="text-xs text-muted-foreground">{totalCards} total cards</p>
        </div>
      </div>

      {reviewed > 0 ? (
        <>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-muted-foreground">Accuracy</span>
            <span className={`font-bold ${accentColor}`}>{pct}%</span>
          </div>
          <Progress value={pct} className="h-2 mb-4" />
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-background rounded-xl p-3 border border-border text-center">
              <span className="text-xl font-bold text-green-600 dark:text-green-500">{known}</span>
              <p className="text-[10px] font-medium text-muted-foreground uppercase mt-1 flex items-center justify-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Known
              </p>
            </div>
            <div className="bg-background rounded-xl p-3 border border-border text-center">
              <span className="text-xl font-bold text-orange-500">{unknown}</span>
              <p className="text-[10px] font-medium text-muted-foreground uppercase mt-1 flex items-center justify-center gap-1">
                <BookMarked className="w-3 h-3" /> Learning
              </p>
            </div>
          </div>
        </>
      ) : (
        <div className="text-center py-4">
          <p className="text-sm text-muted-foreground">No cards reviewed yet</p>
          <p className="text-xs text-muted-foreground/60 mt-1">Start studying to track your progress</p>
        </div>
      )}
    </div>
  );
}

export default function ProgressPage() {
  const { data: summary, isLoading: summaryLoading } = useGetProgressSummary();
  const { data: levelStats, isLoading: statsLoading } = useGetFlashcardLevelStats();
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const { toast } = useToast();
  const qc = useQueryClient();

  const { data: synonymStats } = useActivityStats("synonyms");
  const { data: antonymStats } = useActivityStats("antonyms");
  const { data: phrasalStats } = useActivityStats("phrasal-verbs");
  const { data: completedStories } = useStoryCompletions();
  const { data: totalStories } = useStoryCount();

  const resetMutation = useMutation({
    mutationFn: () => customFetch("/api/progress/reset", { method: "DELETE" }),
    onSuccess: () => {
      qc.invalidateQueries();
      setShowResetConfirm(false);
      toast({ title: "Progress Reset", description: "All your progress has been cleared. You can start fresh!" });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to reset progress. Please try again.", variant: "destructive" });
    },
  });

  const isLoading = summaryLoading || statsLoading;

  const storiesCompleted = completedStories?.size ?? 0;
  const storiesTotal = totalStories ?? 0;
  const storiesPct = storiesTotal > 0 ? Math.round((storiesCompleted / storiesTotal) * 100) : 0;

  return (
    <Layout>
      <div className="space-y-8 animate-in fade-in duration-500">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Your Learning Journey</h1>
          <p className="text-muted-foreground mt-2">Track your progress across all IELTS preparation features.</p>
        </div>

        {isLoading ? (
          <div className="space-y-6">
            <div className="h-48 bg-muted animate-pulse rounded-3xl" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2, 3, 4].map(i => <div key={i} className="h-32 bg-muted animate-pulse rounded-2xl" />)}
            </div>
          </div>
        ) : (
          <>
            {/* Overall Mastery — Vocabulary */}
            {summary && (
              <div className="bg-primary/5 border border-primary/20 p-8 rounded-3xl flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
                <div className="w-32 h-32 bg-primary text-primary-foreground rounded-full flex items-center justify-center shrink-0 shadow-lg relative z-10">
                  <Trophy className="w-16 h-16" />
                </div>
                <div className="flex-1 relative z-10 text-center md:text-left">
                  <h2 className="text-2xl font-bold mb-2">Vocabulary Mastery</h2>
                  <div className="flex items-end justify-center md:justify-start gap-2 mb-4">
                    <span className="text-5xl font-extrabold text-primary">{summary.totalKnown}</span>
                    <span className="text-xl text-muted-foreground font-medium mb-1">/ {summary.totalCards} words</span>
                  </div>
                  <Progress
                    value={summary.totalCards > 0 ? (summary.totalKnown / summary.totalCards) * 100 : 0}
                    className="h-3"
                  />
                  <p className="text-sm font-medium text-muted-foreground mt-3">
                    You know {summary.totalCards > 0 ? Math.round((summary.totalKnown / summary.totalCards) * 100) : 0}% of all available vocabulary.
                  </p>
                </div>
                <Zap className="absolute right-0 top-0 w-64 h-64 text-primary/5 -translate-y-1/4 translate-x-1/4" />
              </div>
            )}

            {/* Vocabulary Level Breakdown */}
            {levelStats && levelStats.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <BookMarked className="w-5 h-5 text-primary" />
                  Study Mode — By Level
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {levelStats.map((stat, i) => {
                    const percent = stat.total > 0 ? Math.round((stat.known / stat.total) * 100) : 0;
                    return (
                      <div
                        key={stat.level}
                        className="bg-card border border-border p-5 rounded-2xl shadow-sm hover:shadow-md transition-all animate-in fade-in slide-in-from-bottom-4"
                        style={{ animationDelay: `${i * 100}ms` }}
                      >
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex items-center gap-3">
                            <LevelBadge level={stat.level} className="text-sm px-3 py-1" />
                            <h3 className="font-bold text-lg">Vocabulary</h3>
                          </div>
                          <div className="w-12 h-12 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-bold text-lg">
                            {percent}%
                          </div>
                        </div>

                        <Progress value={percent} className="h-2 mb-4" />

                        <div className="grid grid-cols-2 gap-3">
                          <div className="bg-background rounded-xl p-3 border border-border flex flex-col items-center justify-center">
                            <span className="text-2xl font-bold text-green-600 dark:text-green-500">{stat.known}</span>
                            <span className="text-xs font-medium text-muted-foreground uppercase flex items-center gap-1 mt-1">
                              <CheckCircle2 className="w-3 h-3" /> Known
                            </span>
                          </div>
                          <div className="bg-background rounded-xl p-3 border border-border flex flex-col items-center justify-center">
                            <span className="text-2xl font-bold text-orange-500">{stat.total - stat.known}</span>
                            <span className="text-xs font-medium text-muted-foreground uppercase flex items-center gap-1 mt-1">
                              <BookMarked className="w-3 h-3" /> To Learn
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Flip-Card Features Section */}
            <div>
              <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Flip-Card Features
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FlipCardProgressCard
                  title="Synonyms"
                  icon={<Sparkles className="w-5 h-5 text-white" />}
                  iconColor="bg-violet-500"
                  totalCards={(synonymsRaw as unknown[]).length}
                  known={synonymStats?.known ?? 0}
                  unknown={synonymStats?.unknown ?? 0}
                  accentColor="text-violet-600"
                />
                <FlipCardProgressCard
                  title="Antonyms"
                  icon={<Shuffle className="w-5 h-5 text-white" />}
                  iconColor="bg-amber-500"
                  totalCards={(antonymsRaw as unknown[]).length}
                  known={antonymStats?.known ?? 0}
                  unknown={antonymStats?.unknown ?? 0}
                  accentColor="text-amber-600"
                />
                <FlipCardProgressCard
                  title="Phrasal Verbs"
                  icon={<ArrowUpDown className="w-5 h-5 text-white" />}
                  iconColor="bg-indigo-500"
                  totalCards={(phrasalVerbsRaw as unknown[]).length}
                  known={phrasalStats?.known ?? 0}
                  unknown={phrasalStats?.unknown ?? 0}
                  accentColor="text-indigo-600"
                />
              </div>
            </div>

            {/* Stories Section */}
            <div>
              <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary" />
                Short Stories
              </h2>
              <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-500 flex items-center justify-center shrink-0">
                    <BookOpen className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-end gap-2 mb-1">
                      <span className="text-3xl font-extrabold text-foreground">{storiesCompleted}</span>
                      <span className="text-lg text-muted-foreground font-medium mb-0.5">/ {storiesTotal} stories</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {storiesPct === 100 ? "All stories completed! Amazing work!" :
                       storiesCompleted > 0 ? `You've read ${storiesPct}% of the stories. Keep going!` :
                       "Start reading stories to track your progress."}
                    </p>
                  </div>
                  <div className="w-14 h-14 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-bold text-lg shrink-0">
                    {storiesPct}%
                  </div>
                </div>
                <Progress value={storiesPct} className="h-2" />
              </div>
            </div>
          </>
        )}

        {!isLoading && summary && (
          <div className="border-t border-border pt-8 mt-4">
            {!showResetConfirm ? (
              <button
                onClick={() => setShowResetConfirm(true)}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-destructive transition-colors mx-auto"
              >
                <RotateCcw className="w-4 h-4" />
                Start from the beginning
              </button>
            ) : (
              <div className="bg-destructive/5 border border-destructive/20 rounded-2xl p-6 max-w-md mx-auto text-center space-y-4">
                <p className="font-semibold text-destructive">Are you sure?</p>
                <p className="text-sm text-muted-foreground">
                  This will permanently erase all your progress, bookmarks, and review history. You cannot undo this.
                </p>
                <div className="flex gap-3 justify-center">
                  <button
                    onClick={() => setShowResetConfirm(false)}
                    className="px-4 py-2 text-sm rounded-xl border border-border bg-background hover:bg-accent transition-colors"
                    disabled={resetMutation.isPending}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => resetMutation.mutate()}
                    disabled={resetMutation.isPending}
                    className="px-4 py-2 text-sm rounded-xl bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-colors disabled:opacity-50 flex items-center gap-2"
                  >
                    {resetMutation.isPending ? "Resetting..." : "Yes, reset everything"}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
}
