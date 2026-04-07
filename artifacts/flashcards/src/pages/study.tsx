import { useState, useMemo } from "react";
import { useListFlashcards, useGetProgress, useUpsertProgress, useListCategories } from "@workspace/api-client-react";
import { Layout } from "@/components/layout";
import { FlashcardView } from "@/components/flashcard";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle, ArrowRight, ArrowLeft, RefreshCw, Filter } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import type { ListFlashcardsLevel } from "@workspace/api-client-react/src/generated/api.schemas";

export default function Study() {
  const [levelFilter, setLevelFilter] = useState<ListFlashcardsLevel | "ALL">("ALL");
  const [categoryFilter, setCategoryFilter] = useState<string>("ALL");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  
  const { toast } = useToast();

  const { data: cards, isLoading: cardsLoading } = useListFlashcards(
    { 
      level: levelFilter === "ALL" ? undefined : levelFilter,
      category: categoryFilter === "ALL" ? undefined : categoryFilter
    }
  );
  
  const { data: categories } = useListCategories();
  const { data: progress } = useGetProgress();
  const upsertProgress = useUpsertProgress();

  const handleNext = () => {
    if (cards && currentIndex < cards.length - 1) {
      setIsFlipped(false);
      setTimeout(() => setCurrentIndex(prev => prev + 1), 150);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setIsFlipped(false);
      setTimeout(() => setCurrentIndex(prev => prev - 1), 150);
    }
  };

  const currentCard = cards?.[currentIndex];
  
  const currentProgress = useMemo(() => {
    if (!currentCard || !progress) return null;
    return progress.find(p => p.flashcardId === currentCard.id);
  }, [currentCard, progress]);

  const markCard = (known: boolean) => {
    if (!currentCard) return;
    
    upsertProgress.mutate({
      data: { flashcardId: currentCard.id, known }
    }, {
      onSuccess: () => {
        toast({
          title: known ? "Marked as known! 🎉" : "Still learning! 💪",
          description: "Your progress has been saved.",
          duration: 2000,
        });
        handleNext();
      }
    });
  };

  return (
    <Layout>
      <div className="flex flex-col h-full max-w-2xl mx-auto animate-in fade-in duration-500">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-8">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-primary" />
            Study Mode
          </h1>
          
          <div className="flex gap-2 w-full md:w-auto">
            <Select value={levelFilter} onValueChange={(v) => { setLevelFilter(v as any); setCurrentIndex(0); setIsFlipped(false); }}>
              <SelectTrigger className="w-[120px]">
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
            
            <Select value={categoryFilter} onValueChange={(v) => { setCategoryFilter(v); setCurrentIndex(0); setIsFlipped(false); }}>
              <SelectTrigger className="w-[140px]">
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
        </div>

        {cardsLoading ? (
          <div className="flex-1 flex items-center justify-center min-h-[400px]">
            <RefreshCw className="w-8 h-8 animate-spin text-primary/50" />
          </div>
        ) : !cards || cards.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-8 bg-card rounded-2xl border border-dashed min-h-[400px]">
            <Filter className="w-12 h-12 text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">No cards found</h3>
            <p className="text-muted-foreground">Try adjusting your filters to see more cards.</p>
          </div>
        ) : currentCard ? (
          <div className="flex-1 flex flex-col">
            <div className="mb-6 flex justify-between text-sm font-medium text-muted-foreground px-4">
              <span>Card {currentIndex + 1} of {cards.length}</span>
              {currentProgress && (
                <span className={currentProgress.known ? "text-green-600" : "text-orange-500"}>
                  {currentProgress.known ? "✓ Known" : "⏳ Learning"}
                </span>
              )}
            </div>

            <FlashcardView 
              card={currentCard} 
              isFlipped={isFlipped} 
              onFlip={() => setIsFlipped(!isFlipped)} 
            />
            
            <div className="mt-8 flex justify-center items-center gap-4">
              <Button 
                variant="outline" 
                size="icon" 
                className="rounded-full w-12 h-12" 
                onClick={handlePrev}
                disabled={currentIndex === 0}
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              
              <div className="flex gap-3 px-4">
                <Button 
                  variant="outline"
                  size="lg" 
                  className="rounded-full border-orange-200 hover:bg-orange-50 hover:text-orange-600 text-orange-600 font-semibold"
                  onClick={(e) => { e.stopPropagation(); markCard(false); }}
                  disabled={upsertProgress.isPending}
                >
                  <XCircle className="w-5 h-5 mr-2" />
                  Still Learning
                </Button>
                
                <Button 
                  size="lg" 
                  className="rounded-full bg-green-500 hover:bg-green-600 text-white font-semibold shadow-sm"
                  onClick={(e) => { e.stopPropagation(); markCard(true); }}
                  disabled={upsertProgress.isPending}
                >
                  <CheckCircle2 className="w-5 h-5 mr-2" />
                  Got it
                </Button>
              </div>

              <Button 
                variant="outline" 
                size="icon" 
                className="rounded-full w-12 h-12" 
                onClick={handleNext}
                disabled={currentIndex === cards.length - 1}
              >
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        ) : null}
      </div>
    </Layout>
  );
}

// Ensure icons are imported
import { BookOpen } from "lucide-react";