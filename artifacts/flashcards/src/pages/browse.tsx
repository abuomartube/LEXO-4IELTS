import { useState } from "react";
import { useListFlashcards, useGetProgress, useListCategories } from "@workspace/api-client-react";
import { Layout } from "@/components/layout";
import { LevelBadge } from "@/components/level-badge";
import { Input } from "@/components/ui/input";
import { Search, CheckCircle2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { ListFlashcardsLevel } from "@workspace/api-client-react/src/generated/api.schemas";

export default function Browse() {
  const [search, setSearch] = useState("");
  const [levelFilter, setLevelFilter] = useState<ListFlashcardsLevel | "ALL">("ALL");
  const [categoryFilter, setCategoryFilter] = useState<string>("ALL");

  const { data: cards, isLoading } = useListFlashcards({
    search: search || undefined,
    level: levelFilter === "ALL" ? undefined : levelFilter,
    category: categoryFilter === "ALL" ? undefined : categoryFilter
  });
  
  const { data: progress } = useGetProgress();
  const { data: categories } = useListCategories();

  return (
    <Layout>
      <div className="space-y-6 animate-in fade-in duration-500">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Browse Cards</h1>
          <p className="text-muted-foreground mt-2">Search and filter through all vocabulary words.</p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 bg-card p-4 rounded-2xl shadow-sm border border-border">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search in English or Arabic..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 bg-background"
            />
          </div>
          <Select value={levelFilter} onValueChange={(v) => setLevelFilter(v as any)}>
            <SelectTrigger className="w-full md:w-[150px] bg-background">
              <SelectValue placeholder="Level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All Levels</SelectItem>
              <SelectItem value="A1">A1</SelectItem>
              <SelectItem value="A2">A2</SelectItem>
              <SelectItem value="B1">B1</SelectItem>
              <SelectItem value="B2">B2</SelectItem>
            </SelectContent>
          </Select>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full md:w-[180px] bg-background">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All Categories</SelectItem>
              {categories?.map(c => (
                <SelectItem key={c} value={c}>{c}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="h-40 bg-muted animate-pulse rounded-2xl" />
            ))}
          </div>
        ) : cards?.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground bg-card rounded-2xl border border-dashed">
            No flashcards found matching your filters.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {cards?.map((card, i) => {
              const isKnown = progress?.find(p => p.flashcardId === card.id)?.known;
              
              return (
                <div 
                  key={card.id} 
                  className="bg-card border border-border p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow animate-in fade-in slide-in-from-bottom-4 relative overflow-hidden"
                  style={{ animationDelay: `${i * 50}ms` }}
                >
                  {isKnown && (
                    <div className="absolute top-0 right-0 w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-bl-3xl flex items-start justify-end p-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400" />
                    </div>
                  )}
                  
                  <div className="flex items-center gap-2 mb-4">
                    <LevelBadge level={card.level} />
                    <span className="text-xs font-medium text-muted-foreground uppercase">{card.category}</span>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <h3 className="font-bold text-lg">{card.english}</h3>
                      {card.exampleSentence && (
                        <p className="text-sm text-muted-foreground italic mt-1">{card.exampleSentence}</p>
                      )}
                    </div>
                    
                    <div className="pt-3 border-t border-border/50">
                      <h3 className="font-bold text-xl arabic-text text-primary text-right">{card.arabic}</h3>
                      {card.exampleSentenceArabic && (
                        <p className="text-sm text-muted-foreground arabic-text text-right mt-1">{card.exampleSentenceArabic}</p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </Layout>
  );
}
