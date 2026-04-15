import { useState } from "react";
import { useGetProgressSummary, useGetFlashcardLevelStats, customFetch } from "@workspace/api-client-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Layout } from "@/components/layout";
import { Progress } from "@/components/ui/progress";
import { LevelBadge } from "@/components/level-badge";
import { Trophy, Zap, BookMarked, TrendingUp, RotateCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ProgressPage() {
  const { data: summary, isLoading: summaryLoading } = useGetProgressSummary();
  const { data: levelStats, isLoading: statsLoading } = useGetFlashcardLevelStats();
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const { toast } = useToast();
  const qc = useQueryClient();

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

  return (
    <Layout>
      <div className="space-y-8 animate-in fade-in duration-500">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Your Learning Journey</h1>
          <p className="text-muted-foreground mt-2">Track your vocabulary mastery across all levels.</p>
        </div>

        {isLoading ? (
          <div className="space-y-6">
            <div className="h-48 bg-muted animate-pulse rounded-3xl" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2, 3, 4].map(i => <div key={i} className="h-32 bg-muted animate-pulse rounded-2xl" />)}
            </div>
          </div>
        ) : summary && levelStats ? (
          <>
            <div className="bg-primary/5 border border-primary/20 p-8 rounded-3xl flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
              <div className="w-32 h-32 bg-primary text-primary-foreground rounded-full flex items-center justify-center shrink-0 shadow-lg relative z-10">
                <Trophy className="w-16 h-16" />
              </div>
              <div className="flex-1 relative z-10 text-center md:text-left">
                <h2 className="text-2xl font-bold mb-2">Overall Mastery</h2>
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {levelStats.map((stat, i) => {
                const percent = stat.total > 0 ? Math.round((stat.known / stat.total) * 100) : 0;
                return (
                  <div 
                    key={stat.level} 
                    className="bg-card border border-border p-6 rounded-2xl shadow-sm hover:shadow-md transition-all animate-in fade-in slide-in-from-bottom-4"
                    style={{ animationDelay: `${i * 100}ms` }}
                  >
                    <div className="flex justify-between items-start mb-6">
                      <div className="flex items-center gap-3">
                        <LevelBadge level={stat.level} className="text-sm px-3 py-1" />
                        <h3 className="font-bold text-lg">Vocabulary</h3>
                      </div>
                      <div className="w-12 h-12 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-bold text-lg">
                        {percent}%
                      </div>
                    </div>
                    
                    <Progress value={percent} className="h-2 mb-4" />
                    
                    <div className="grid grid-cols-2 gap-4 mt-6">
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
          </>
        ) : null}

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

import { CheckCircle2 } from "lucide-react";