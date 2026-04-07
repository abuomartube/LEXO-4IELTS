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
      className={cn("w-full max-w-md mx-auto cursor-pointer", className)}
      style={{ perspective: "1200px", aspectRatio: "4/3" }}
      onClick={onFlip}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          transition: "transform 0.65s cubic-bezier(0.4, 0.2, 0.2, 1)",
          transformStyle: "preserve-3d",
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* FRONT — English word only */}
        <div
          style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
          className="absolute inset-0 bg-card border-2 border-border rounded-2xl p-6 flex flex-col shadow-md"
        >
          <div className="flex justify-between items-center">
            <LevelBadge level={card.level} />
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
              {card.category}
            </span>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <h2 className="text-5xl font-bold text-foreground tracking-tight">{card.english}</h2>
          </div>

          <div className="text-center text-sm text-muted-foreground animate-pulse">
            Tap to see translation
          </div>
        </div>

        {/* BACK — English word + Arabic + example sentences */}
        <div
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
          className="absolute inset-0 bg-primary/5 border-2 border-primary/20 rounded-2xl p-6 flex flex-col shadow-md"
        >
          <div className="flex justify-between items-center">
            <LevelBadge level={card.level} />
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
              {card.category}
            </span>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4">
            {/* English word repeated */}
            <p className="text-lg font-semibold text-muted-foreground">{card.english}</p>

            {/* Arabic translation — big and prominent */}
            <h2
              className="text-4xl font-bold text-foreground leading-snug"
              dir="rtl"
              lang="ar"
              style={{ fontFamily: "'Cairo', 'Amiri', serif" }}
            >
              {card.arabic}
            </h2>

            {/* Divider */}
            {(card.exampleSentence || card.exampleSentenceArabic) && (
              <div className="w-16 h-px bg-primary/20 my-1" />
            )}

            {/* Example in English */}
            {card.exampleSentence && (
              <p className="text-sm text-muted-foreground italic px-2">
                {card.exampleSentence}
              </p>
            )}

            {/* Example in Arabic */}
            {card.exampleSentenceArabic && (
              <p
                className="text-sm text-muted-foreground px-2 leading-relaxed"
                dir="rtl"
                lang="ar"
                style={{ fontFamily: "'Cairo', 'Amiri', serif" }}
              >
                {card.exampleSentenceArabic}
              </p>
            )}
          </div>

          <div className="text-center text-sm text-primary/50">
            Tap to flip back
          </div>
        </div>
      </div>
    </div>
  );
}
