import { useMemo } from "react";
import { cn } from "@/lib/utils";
import type { Flashcard } from "@workspace/api-client-react/src/generated/api.schemas";
import { LevelBadge } from "./level-badge";
import { PronounceButton } from "./pronounce-button";
import synonymsRaw from "@/data/synonyms-data.json";
import antonymsRaw from "@/data/antonyms-data.json";

// Module-level lookup maps — built once
const synonymMap = new Map(
  (synonymsRaw as { word: string; synonym: string }[]).map(s => [s.word.toLowerCase(), s])
);
const antonymMap = new Map(
  (antonymsRaw as { word: string; antonym: string; antonymTranslation?: string }[]).map(a => [
    a.word.toLowerCase(),
    a,
  ])
);

interface FlashcardViewProps {
  card: Flashcard;
  isFlipped: boolean;
  onFlip: () => void;
  className?: string;
}

export function FlashcardView({ card, isFlipped, onFlip, className }: FlashcardViewProps) {
  const wordKey = card.english.toLowerCase();
  const synonym = useMemo(() => synonymMap.get(wordKey), [wordKey]);
  const antonym = useMemo(() => antonymMap.get(wordKey), [wordKey]);

  return (
    <div
      className={cn("w-full max-w-md mx-auto cursor-pointer", className)}
      style={{ perspective: "1200px", minHeight: 360 }}
      onClick={onFlip}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          minHeight: 360,
          transition: "transform 0.65s cubic-bezier(0.4, 0.2, 0.2, 1)",
          transformStyle: "preserve-3d",
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* ── FRONT — English word + native-speaker pronunciation ── */}
        <div
          style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden", minHeight: 360 }}
          className="absolute inset-0 bg-card border-2 border-border rounded-2xl p-6 flex flex-col shadow-md"
        >
          <div className="flex justify-between items-center">
            <LevelBadge level={card.level} />
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
              {card.category}
            </span>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center text-center gap-5">
            <h2 className="text-5xl font-bold text-foreground tracking-tight">{card.english}</h2>

            <PronounceButton word={card.english} />
          </div>

          <div className="text-center text-sm text-muted-foreground animate-pulse">
            Tap card to see translation
          </div>
        </div>

        {/* ── BACK — translation + example + synonym + antonym ── */}
        <div
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            minHeight: 360,
          }}
          className="absolute inset-0 bg-primary/5 border-2 border-primary/20 rounded-2xl p-5 flex flex-col shadow-md overflow-y-auto"
        >
          <div className="flex justify-between items-center">
            <LevelBadge level={card.level} />
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
              {card.category}
            </span>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center text-center space-y-2.5 py-2">
            {/* English word + listen-to-word button */}
            <div className="flex items-center gap-2">
              <p className="text-lg font-semibold text-muted-foreground">{card.english}</p>
              <PronounceButton word={card.english} variant="ghost" />
            </div>

            {/* Arabic translation — big and prominent */}
            <h2
              className="text-3xl font-bold text-foreground leading-snug"
              dir="rtl"
              lang="ar"
              style={{ fontFamily: "'Cairo', 'Amiri', serif" }}
            >
              {card.arabic}
            </h2>

            {/* Divider + examples */}
            {(card.exampleSentence || card.exampleSentenceArabic) && (
              <div className="w-16 h-px bg-primary/20" />
            )}
            {card.exampleSentence && (
              <div className="flex items-center justify-center gap-2 px-2">
                <p className="text-xs text-muted-foreground italic">{card.exampleSentence}</p>
                <PronounceButton word={card.exampleSentence} variant="ghost" />
              </div>
            )}
            {card.exampleSentenceArabic && (
              <p
                className="text-xs text-muted-foreground px-2 leading-relaxed"
                dir="rtl"
                lang="ar"
                style={{ fontFamily: "'Cairo', 'Amiri', serif" }}
              >
                {card.exampleSentenceArabic}
              </p>
            )}

            {/* ── Synonym + Antonym ── */}
            {(synonym || antonym) && (
              <div className="w-full border-t border-primary/15 pt-2.5 flex flex-col gap-1.5 text-left">
                {synonym && (
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-bold text-primary/70 w-14 shrink-0">Synonym</span>
                    <span className="text-sm font-semibold text-foreground">{synonym.synonym}</span>
                    <PronounceButton word={synonym.synonym} variant="ghost" />
                  </div>
                )}
                {antonym && (
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-bold text-orange-500/80 w-14 shrink-0">Antonym</span>
                    <span className="text-sm font-semibold text-foreground">{antonym.antonym}</span>
                    <PronounceButton word={antonym.antonym} variant="ghost" />
                    {antonym.antonymTranslation && (
                      <span
                        className="text-xs text-muted-foreground"
                        dir="rtl"
                        lang="ar"
                        style={{ fontFamily: "'Cairo', 'Amiri', serif" }}
                      >
                        {antonym.antonymTranslation}
                      </span>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="text-center text-xs text-primary/50 pt-1">
            Tap to flip back
          </div>
        </div>
      </div>
    </div>
  );
}
