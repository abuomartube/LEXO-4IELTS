import { AlertTriangle, Sparkles, Check, Library } from "lucide-react";
import { cn } from "@/lib/utils";
import { PLAN_DURATION_OPTIONS, type PlanDuration } from "@/lib/daily-plan";
import { LIBRARY_SIZES } from "@/lib/plan-content";

// Per-duration scope hints — hand-tuned based on the catalog rotation in
// plan-content.ts so students can see at a glance how much they'll cover.
const SCOPE_HINTS: Record<PlanDuration, string> = {
  30:  `Hits ~30 of ${LIBRARY_SIZES.orwellTotal} Orwell prompts, all ${LIBRARY_SIZES.speakingThemes} speaking themes once`,
  60:  `Covers ~50 of ${LIBRARY_SIZES.orwellTotal} essays, every speaking theme + most reading skills`,
  90:  `Full library: all ${LIBRARY_SIZES.orwellTotal} essays, ${LIBRARY_SIZES.speakingThemes} themes, ${LIBRARY_SIZES.readingSkillsTotal} reading + ${LIBRARY_SIZES.listeningSkillsTotal} listening passages`,
  120: `Full library twice over with extra revision and review days`,
};

interface PlanDurationPickerProps {
  value: PlanDuration | null;
  onSelect: (days: PlanDuration) => void;
  className?: string;
}

/**
 * Plan-length picker — shared between onboarding (step 4) and the
 * "Reset Plan" flow inside the My Plan slide-over. The 30-day option
 * carries an amber warning; the 90-day option is highlighted as the
 * recommended pace for most students.
 */
export function PlanDurationPicker({ value, onSelect, className }: PlanDurationPickerProps) {
  return (
    <div className={cn("space-y-2", className)}>
      {PLAN_DURATION_OPTIONS.map((opt) => {
        const isSelected = value === opt.days;
        return (
          <button
            key={opt.days}
            type="button"
            onClick={() => onSelect(opt.days)}
            className={cn(
              "w-full text-left p-4 rounded-2xl border-2 transition-all relative",
              isSelected
                ? opt.recommended
                  ? "border-emerald-500 bg-emerald-500/5 shadow-md"
                  : opt.warning
                  ? "border-amber-500 bg-amber-500/5 shadow-md"
                  : "border-primary bg-primary/5 shadow-md"
                : "border-border bg-background hover:border-primary/40",
            )}
            aria-pressed={isSelected}
          >
            <div className="flex items-start gap-3">
              {/* Day count badge */}
              <div
                className={cn(
                  "shrink-0 w-14 h-14 rounded-xl flex flex-col items-center justify-center font-extrabold leading-none",
                  isSelected
                    ? opt.recommended
                      ? "bg-emerald-500 text-white"
                      : opt.warning
                      ? "bg-amber-500 text-white"
                      : "bg-primary text-primary-foreground"
                    : "bg-muted text-foreground",
                )}
              >
                <span className="text-xl">{opt.days}</span>
                <span className="text-[10px] font-bold uppercase tracking-wider opacity-90 mt-0.5">days</span>
              </div>

              <div className="flex-1 min-w-0 pt-0.5">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="font-extrabold text-foreground">{opt.days}-Day Plan</span>

                  {opt.recommended && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500 text-white shadow-sm">
                      <Sparkles className="w-3 h-3" /> Recommended
                    </span>
                  )}

                  {opt.warning && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500 text-white shadow-sm">
                      <AlertTriangle className="w-3 h-3" /> Intensive
                    </span>
                  )}

                  {isSelected && (
                    <span className="ml-auto inline-flex items-center justify-center w-5 h-5 rounded-full bg-foreground text-background">
                      <Check className="w-3 h-3" />
                    </span>
                  )}
                </div>

                <p className="text-xs text-muted-foreground mt-1">{opt.tagline}</p>
                <p className="text-[11px] text-muted-foreground/80 mt-0.5" dir="rtl" lang="ar">
                  {opt.taglineAr}
                </p>

                <p className="mt-1.5 text-[11px] font-semibold text-muted-foreground/90 flex items-start gap-1">
                  <Library className="w-3 h-3 shrink-0 mt-0.5 text-primary/70" />
                  <span>{SCOPE_HINTS[opt.days]}</span>
                </p>

                {opt.warning && (
                  <p className="mt-2 text-xs text-amber-700 dark:text-amber-400 font-medium flex items-start gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                    <span>{opt.warning}</span>
                  </p>
                )}
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
