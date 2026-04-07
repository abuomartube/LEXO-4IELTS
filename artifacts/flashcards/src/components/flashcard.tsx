import { useState } from "react";
import { cn } from "@/lib/utils";
import type { Flashcard } from "@workspace/api-client-react/src/generated/api.schemas";
import { LevelBadge } from "./level-badge";

interface FlashcardViewProps {
  card: Flashcard;
  isFlipped: boolean;
  onFlip: () => void;
  className?: string;
}

export function FlashcardView({ card, isFlipped, onFlip, className }: FlashcardViewProps) {
  return (
    <div 
      className={cn("w-full max-w-md mx-auto aspect-[4/3] perspective-1000 cursor-pointer group", className)}
      onClick={onFlip}
    >
      <div 
        className={cn(
          "relative w-full h-full duration-700 transform-style-3d shadow-lg rounded-2xl",
          isFlipped ? "rotate-y-180" : ""
        )}
      >
        {/* Front (English) */}
        <div className="absolute w-full h-full backface-hidden bg-card border-2 border-border rounded-2xl p-6 flex flex-col">
          <div className="flex justify-between items-center mb-auto">
            <LevelBadge level={card.level} />
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{card.category}</span>
          </div>
          
          <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4 my-4">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">{card.english}</h2>
            {card.exampleSentence && (
              <p className="text-muted-foreground italic text-lg">{card.exampleSentence}</p>
            )}
          </div>
          
          <div className="mt-auto text-center text-sm text-muted-foreground animate-pulse">
            Tap to flip
          </div>
        </div>

        {/* Back (Arabic) */}
        <div className="absolute w-full h-full backface-hidden bg-primary/5 border-2 border-primary/20 rounded-2xl p-6 flex flex-col rotate-y-180">
          <div className="flex justify-between items-center mb-auto">
            <LevelBadge level={card.level} />
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{card.category}</span>
          </div>
          
          <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6 my-4">
            <h2 className="text-5xl md:text-6xl font-bold text-foreground arabic-text leading-tight">{card.arabic}</h2>
            {card.exampleSentenceArabic && (
              <p className="text-muted-foreground text-xl arabic-text leading-relaxed">{card.exampleSentenceArabic}</p>
            )}
          </div>
          
          <div className="mt-auto text-center text-sm text-primary/60">
            Tap to flip back
          </div>
        </div>
      </div>
    </div>
  );
}
