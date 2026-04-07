import { useGetProgressSummary } from "@workspace/api-client-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Trophy, ArrowRight, Zap, Target } from "lucide-react";
import { Layout } from "@/components/layout";

export default function Home() {
  const { data: summary, isLoading } = useGetProgressSummary();

  return (
    <Layout>
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">Welcome back!</h1>
            <p className="text-muted-foreground mt-2 text-lg">Ready to master more English vocabulary today?</p>
          </div>
          <Button asChild size="lg" className="rounded-full shadow-md font-semibold shrink-0">
            <Link href="/study">
              <BookOpen className="w-5 h-5 mr-2" />
              Start Studying
            </Link>
          </Button>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-32 bg-muted animate-pulse rounded-2xl" />
            ))}
          </div>
        ) : summary ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-primary text-primary-foreground p-6 rounded-3xl shadow-lg relative overflow-hidden">
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-4 opacity-90">
                    <Trophy className="w-5 h-5" />
                    <h2 className="font-semibold text-lg">Total Progress</h2>
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

              <div className="bg-card border border-border p-6 rounded-3xl shadow-sm relative overflow-hidden flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-4 text-muted-foreground">
                  <Target className="w-5 h-5 text-primary" />
                  <h2 className="font-semibold text-lg text-foreground">Next Goal</h2>
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

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                Progress by Level
              </h2>
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
            </div>
          </>
        ) : null}
      </div>
    </Layout>
  );
}
