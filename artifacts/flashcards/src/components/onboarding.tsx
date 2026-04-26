import { useState, useEffect } from "react";
import { customFetch } from "@workspace/api-client-react";
import { Target, Calendar, ChevronRight, BookOpen, Headphones, FileText, Mic, Flame, Star, Trophy, Clock, CheckCircle2, GraduationCap, ClipboardList } from "lucide-react";
import { cn } from "@/lib/utils";
import { PlanDurationPicker } from "@/components/plan-duration-picker";
import { todayISO, type PlanDuration } from "@/lib/daily-plan";

export type CefrLevel = "A1" | "A2" | "B1" | "B2" | "C1";
const LEVEL_OPTIONS: { code: CefrLevel; label: string; blurb: string; blurbAr: string }[] = [
  { code: "A1", label: "A1 — Beginner", blurb: "I know a few words and basic phrases.", blurbAr: "أعرف بعض الكلمات والعبارات الأساسية." },
  { code: "A2", label: "A2 — Elementary", blurb: "I can handle simple everyday conversations.", blurbAr: "يمكنني إجراء محادثات يومية بسيطة." },
  { code: "B1", label: "B1 — Intermediate", blurb: "I can talk about familiar topics and read simple texts.", blurbAr: "يمكنني التحدث عن مواضيع مألوفة وقراءة نصوص بسيطة." },
  { code: "B2", label: "B2 — Upper-Intermediate", blurb: "I can discuss many topics and understand most articles.", blurbAr: "يمكنني مناقشة مواضيع متعددة وفهم معظم المقالات." },
  { code: "C1", label: "C1 — Advanced", blurb: "I express myself fluently and read complex material.", blurbAr: "أعبر عن نفسي بطلاقة وأقرأ مواد معقدة." },
];

const TARGET_BAND_OPTIONS: { band: 6 | 7 | 8; label: string; description: string }[] = [
  { band: 6, label: "Band 6", description: "Competent user — common university requirement" },
  { band: 7, label: "Band 7", description: "Good user — strong career & study opportunities" },
  { band: 8, label: "Band 8", description: "Very good user — top-tier programs & professions" },
];

// Content difficulty is driven by the student's CURRENT level, not their target.
// As the student improves they'll graduate to the next focus level — for now we
// expose two adjacent CEFR bands as the "study zone" (current + one above).
function studyZoneFor(level: CefrLevel): { primary: CefrLevel; stretch: CefrLevel } {
  switch (level) {
    case "A1": return { primary: "A1", stretch: "A2" };
    case "A2": return { primary: "A2", stretch: "B1" };
    case "B1": return { primary: "B1", stretch: "B2" };
    case "B2": return { primary: "B2", stretch: "C1" };
    case "C1": return { primary: "C1", stretch: "C1" };
  }
}

// Estimate how big the gap is between where the student is and where they want
// to land. Used only to set study-plan intensity, never to gate content.
function gapScore(current: CefrLevel, targetBand: 6 | 7 | 8): number {
  const currentIndex: Record<CefrLevel, number> = { A1: 0, A2: 1, B1: 2, B2: 3, C1: 4 };
  const targetIndex = targetBand === 6 ? 2 : targetBand === 7 ? 3 : 4; // approx CEFR equivalent
  return Math.max(0, targetIndex - currentIndex[current]);
}

function generateStudyPlan(currentLevel: CefrLevel, targetBand: 6 | 7 | 8, examDate: string) {
  const today = new Date();
  const exam = new Date(examDate);
  const daysLeft = Math.max(1, Math.ceil((exam.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)));
  const weeksLeft = Math.ceil(daysLeft / 7);

  const intensity = daysLeft <= 14 ? "intensive" : daysLeft <= 30 ? "focused" : daysLeft <= 60 ? "balanced" : "steady";
  const dailyHours = intensity === "intensive" ? "3-4" : intensity === "focused" ? "2-3" : intensity === "balanced" ? "1.5-2" : "1-1.5";

  // Words/day scales with both intensity AND the gap between current and target.
  const gap = gapScore(currentLevel, targetBand);
  const baseWords = intensity === "intensive" ? 30 : intensity === "focused" ? 20 : intensity === "balanced" ? 15 : 10;
  const wordsPerDay = baseWords + gap * 5;

  const zone = studyZoneFor(currentLevel);
  const vocabFocus = zone.primary === zone.stretch ? zone.primary : `${zone.primary} → ${zone.stretch}`;

  const schedule: { day: string; tasks: string[] }[] = [];

  if (intensity === "intensive") {
    schedule.push(
      { day: "Daily", tasks: [`Learn ${wordsPerDay} new words at your level (${vocabFocus})`, "Review weak words deck", "Complete 1 Reading passage", "Complete 1 Listening section"] },
      { day: "Mon/Wed/Fri", tasks: ["Write 1 full essay (Task 2) — check with Orwell AI", "Practice Speaking Part 2 with Churchill AI"] },
      { day: "Tue/Thu", tasks: ["Write 1 Task 1 report — check with Orwell AI", "Practice Speaking Parts 1 & 3 with Churchill AI"] },
      { day: "Weekend", tasks: ["Take a full Mock Test", "Review all weak words", "Re-read Writing Templates"] },
    );
  } else if (intensity === "focused") {
    schedule.push(
      { day: "Daily", tasks: [`Learn ${wordsPerDay} new words at your level (${vocabFocus})`, "Review weak words deck", "15 min Reading or Listening practice"] },
      { day: "Mon/Wed/Fri", tasks: ["Write 1 essay — check with Orwell AI", "Practice Speaking with Churchill AI"] },
      { day: "Tue/Thu", tasks: ["Complete 1 full Reading test", "Complete 1 full Listening test"] },
      { day: "Weekend", tasks: ["Take a full Mock Test every 2 weeks", "Review Writing Templates & Topic Bank"] },
    );
  } else if (intensity === "balanced") {
    schedule.push(
      { day: "Daily", tasks: [`Learn ${wordsPerDay} new words (${vocabFocus})`, "Review weak words (10 min)"] },
      { day: "Mon/Wed", tasks: ["1 Reading passage + 1 Listening section", "Practice Speaking with Churchill AI"] },
      { day: "Tue/Thu", tasks: ["Write 1 essay — check with Orwell AI", "Study Writing Templates"] },
      { day: "Weekend", tasks: ["Take a Mock Test once a month", "Review synonyms & phrasal verbs", "Read 1 short story"] },
    );
  } else {
    schedule.push(
      { day: "Daily", tasks: [`Learn ${wordsPerDay} new words (${vocabFocus})`, "Quick weak words review"] },
      { day: "Mon/Wed", tasks: ["1 Reading or Listening section", "Browse Topic Bank"] },
      { day: "Tue/Thu", tasks: ["Write 1 paragraph — check with Orwell AI", "Practice 1 Speaking topic"] },
      { day: "Weekend", tasks: ["1 full Reading or Listening test", "Review the week's vocabulary"] },
    );
  }

  const milestones: string[] = [];
  if (weeksLeft >= 8) milestones.push(`Weeks 1–2: Master ${zone.primary} vocabulary foundation`);
  if (weeksLeft >= 6) milestones.push(`Weeks ${weeksLeft >= 8 ? "3–4" : "1–2"}: Reading & Listening at ${zone.primary} level, stretch into ${zone.stretch}`);
  if (weeksLeft >= 4) milestones.push(`Weeks ${weeksLeft >= 8 ? "5–6" : "3–4"}: Writing & Speaking practice with AI feedback`);
  milestones.push(`Final ${Math.min(weeksLeft, 2)} week(s): Mock tests + push toward Band ${targetBand}`);

  return { daysLeft, weeksLeft, intensity, dailyHours, wordsPerDay, vocabFocus, zone, schedule, milestones };
}

type Step = 1 | 2 | 3 | 4 | 5;

export function Onboarding({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState<Step>(1);
  const [currentLevel, setCurrentLevel] = useState<CefrLevel | null>(null);
  const [targetBand, setTargetBand] = useState<6 | 7 | 8>(7);
  const [examDate, setExamDate] = useState("");
  const [noExamDate, setNoExamDate] = useState(false);
  const [planDuration, setPlanDuration] = useState<PlanDuration | null>(90);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState(false);

  const minDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];
  const maxDate = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];

  const effectiveExamDate = noExamDate
    ? new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]
    : examDate;
  const canProceedExam = noExamDate || !!examDate;
  const plan = currentLevel && canProceedExam ? generateStudyPlan(currentLevel, targetBand, effectiveExamDate) : null;

  async function handleSave() {
    if (!currentLevel || !planDuration) return;
    setSaving(true);
    setSaveError(false);
    try {
      await Promise.all([
        customFetch("/api/user-data/current_level", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ value: currentLevel }),
        }),
        customFetch("/api/user-data/target_band", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ value: String(targetBand) }),
        }),
        customFetch("/api/user-data/exam_date", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ value: noExamDate ? "not_set" : examDate }),
        }),
        customFetch("/api/user-data/plan_duration_days", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ value: String(planDuration) }),
        }),
        customFetch("/api/user-data/plan_start_date", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ value: todayISO() }),
        }),
      ]);
      try { window.dispatchEvent(new CustomEvent("lexo:plan-updated")); } catch { /* ignore */ }
      onComplete();
    } catch {
      setSaveError(true);
    } finally {
      setSaving(false);
    }
  }

  const Dots = ({ active }: { active: number }) => (
    <div className="flex justify-center gap-2">
      {[1, 2, 3, 4, 5].map((n) => (
        <div key={n} className={cn("w-8 h-1.5 rounded-full", n <= active ? "bg-primary" : "bg-muted")} />
      ))}
    </div>
  );

  // ── Step 1: Current English level ────────────────────────────────────────
  if (step === 1) {
    return (
      <div className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-300 overflow-y-auto">
        <div className="w-full max-w-md space-y-6 py-8">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
              <GraduationCap className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-2xl font-extrabold text-foreground">Welcome to LEXO!</h1>
            <p className="text-muted-foreground text-sm">Let's set up your personalized study plan</p>
            <p className="text-muted-foreground text-xs" dir="rtl" lang="ar">مرحباً! دعنا نضع خطة دراسية مخصصة لك</p>
          </div>

          <div className="bg-card border border-border rounded-2xl p-5 space-y-4">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-500" />
              <h2 className="font-bold text-foreground">What is your current English level?</h2>
            </div>
            <p className="text-xs text-muted-foreground" dir="rtl" lang="ar">ما هو مستواك الحالي في اللغة الإنجليزية؟</p>

            <div className="space-y-2">
              {LEVEL_OPTIONS.map((opt) => (
                <button
                  key={opt.code}
                  onClick={() => setCurrentLevel(opt.code)}
                  className={cn(
                    "w-full text-left p-3 rounded-xl border-2 transition-all",
                    currentLevel === opt.code
                      ? "border-primary bg-primary/5 shadow-sm"
                      : "border-border bg-background hover:border-primary/40"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <span className={cn(
                      "shrink-0 w-12 h-12 rounded-xl flex items-center justify-center font-extrabold text-base",
                      currentLevel === opt.code
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-foreground"
                    )}>
                      {opt.code}
                    </span>
                    <div className="min-w-0">
                      <div className="font-bold text-foreground text-sm">{opt.label}</div>
                      <div className="text-xs text-muted-foreground">{opt.blurb}</div>
                      <div className="text-[11px] text-muted-foreground/80 mt-0.5" dir="rtl" lang="ar">{opt.blurbAr}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <p className="text-[11px] text-muted-foreground text-center pt-1">
              Your content will start at this level — we'll raise the difficulty as you improve.
            </p>
          </div>

          <button
            onClick={() => currentLevel && setStep(2)}
            disabled={!currentLevel}
            className="w-full bg-primary text-primary-foreground font-bold py-3 rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-40"
          >
            Next <ChevronRight className="w-4 h-4" />
          </button>

          <Dots active={1} />
        </div>
      </div>
    );
  }

  // ── Step 2: Target band ──────────────────────────────────────────────────
  if (step === 2) {
    return (
      <div className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-300 overflow-y-auto">
        <div className="w-full max-w-md space-y-6 py-8">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
              <Target className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-2xl font-extrabold text-foreground">Your Target</h1>
            <p className="text-muted-foreground text-sm">What band score are you aiming for?</p>
            <p className="text-muted-foreground text-xs" dir="rtl" lang="ar">ما هي درجة الآيلتس التي تستهدفها؟</p>
          </div>

          <div className="bg-card border border-border rounded-2xl p-5 space-y-4">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-amber-500" />
              <h2 className="font-bold text-foreground">Pick your target band score</h2>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {TARGET_BAND_OPTIONS.map((opt) => (
                <button
                  key={opt.band}
                  onClick={() => setTargetBand(opt.band)}
                  className={cn(
                    "py-4 rounded-xl font-extrabold text-2xl transition-all",
                    targetBand === opt.band
                      ? "bg-primary text-primary-foreground shadow-lg scale-105"
                      : "bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80"
                  )}
                >
                  {opt.band}
                </button>
              ))}
            </div>

            <div className="text-center text-xs text-muted-foreground">
              {TARGET_BAND_OPTIONS.find((o) => o.band === targetBand)?.description}
            </div>

            <div className="rounded-xl bg-muted/40 border border-border px-3 py-2 text-[11px] text-muted-foreground">
              💡 Your target band is used for motivation & progress tracking. It doesn't change the difficulty of your study material — that's based on your current level ({currentLevel}).
            </div>
          </div>

          <div className="flex gap-3">
            <button onClick={() => setStep(1)} className="flex-1 bg-muted text-foreground font-bold py-3 rounded-xl hover:opacity-80 transition-opacity">Back</button>
            <button onClick={() => setStep(3)} className="flex-1 bg-primary text-primary-foreground font-bold py-3 rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
              Next <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <Dots active={2} />
        </div>
      </div>
    );
  }

  // ── Step 3: Exam date ────────────────────────────────────────────────────
  if (step === 3) {
    return (
      <div className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-300 overflow-y-auto">
        <div className="w-full max-w-md space-y-6 py-8">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
              <Calendar className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-2xl font-extrabold text-foreground">Exam Date</h1>
            <p className="text-muted-foreground text-sm">When are you taking the IELTS exam?</p>
            <p className="text-muted-foreground text-xs" dir="rtl" lang="ar">متى موعد اختبار الآيلتس الخاص بك؟</p>
          </div>

          <div className="bg-card border border-border rounded-2xl p-5 space-y-4">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-500" />
              <h2 className="font-bold text-foreground">Select your exam date</h2>
            </div>

            <input
              type="date"
              value={examDate}
              onChange={(e) => { setExamDate(e.target.value); setNoExamDate(false); }}
              min={minDate}
              max={maxDate}
              disabled={noExamDate}
              className={cn("w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground text-lg font-medium focus:outline-none focus:ring-2 focus:ring-primary/50",
                noExamDate && "opacity-40"
              )}
            />

            <button
              onClick={() => { setNoExamDate(!noExamDate); if (!noExamDate) setExamDate(""); }}
              className={cn("w-full py-2.5 rounded-xl text-sm font-bold border transition-all",
                noExamDate
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-border text-muted-foreground hover:border-primary hover:text-foreground"
              )}
            >
              🤷 Not yet decided
            </button>

            {examDate && !noExamDate && (() => {
              const days = Math.ceil((new Date(examDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
              const weeks = Math.ceil(days / 7);
              return (
                <div className="text-center space-y-1">
                  <p className="text-sm font-medium text-foreground">
                    ⏳ {days} days ({weeks} weeks) until your exam
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {days <= 14 ? "Time is short — we'll create an intensive plan!" :
                      days <= 30 ? "Good timing — a focused study plan awaits!" :
                        days <= 60 ? "Great! Plenty of time for balanced preparation." :
                          "Excellent! You have ample time to prepare thoroughly."}
                  </p>
                </div>
              );
            })()}

            {noExamDate && (
              <p className="text-xs text-muted-foreground text-center">
                No problem! We'll create a balanced 3-month study plan you can adjust later.
              </p>
            )}
          </div>

          <div className="flex gap-3">
            <button onClick={() => setStep(2)} className="flex-1 bg-muted text-foreground font-bold py-3 rounded-xl hover:opacity-80 transition-opacity">Back</button>
            <button onClick={() => { if (canProceedExam) setStep(4); }}
              disabled={!canProceedExam}
              className="flex-1 bg-primary text-primary-foreground font-bold py-3 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-40 flex items-center justify-center gap-2"
            >
              Next <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <Dots active={3} />
        </div>
      </div>
    );
  }

  // ── Step 4: Plan duration ────────────────────────────────────────────────
  if (step === 4) {
    return (
      <div className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-300 overflow-y-auto">
        <div className="w-full max-w-md space-y-6 py-8">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
              <ClipboardList className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-2xl font-extrabold text-foreground">How long is your plan?</h1>
            <p className="text-muted-foreground text-sm">Pick the pace that fits your life.</p>
            <p className="text-muted-foreground text-xs" dir="rtl" lang="ar">اختر مدة الخطة التي تناسب جدولك.</p>
          </div>

          <div className="bg-card border border-border rounded-2xl p-4 space-y-3">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-500" />
              <h2 className="font-bold text-foreground">Choose your study plan duration</h2>
            </div>

            <PlanDurationPicker value={planDuration} onSelect={setPlanDuration} />

            <p className="text-[11px] text-muted-foreground text-center pt-1">
              You can reset to a different length any time from <span className="font-semibold text-foreground">My Plan</span>.
            </p>
          </div>

          <div className="flex gap-3">
            <button onClick={() => setStep(3)} className="flex-1 bg-muted text-foreground font-bold py-3 rounded-xl hover:opacity-80 transition-opacity">Back</button>
            <button
              onClick={() => { if (planDuration) setStep(5); }}
              disabled={!planDuration}
              className="flex-1 bg-primary text-primary-foreground font-bold py-3 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-40 flex items-center justify-center gap-2"
            >
              See My Plan <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <Dots active={4} />
        </div>
      </div>
    );
  }

  // ── Step 5: Plan summary ────────────────────────────────────────────────
  return (
    <div className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 overflow-y-auto animate-in fade-in duration-300">
      <div className="max-w-lg mx-auto py-8 px-4 space-y-5">
        <div className="text-center space-y-2">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
            <Trophy className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-2xl font-extrabold text-foreground">Your Study Plan</h1>
          <p className="text-muted-foreground text-sm">
            Starting at <span className="font-bold text-primary">{currentLevel}</span>
            {" · "}
            Target <span className="font-bold text-primary">Band {targetBand}</span>
            {" · "}
            <span className="font-bold text-primary">{planDuration}-day plan</span>
          </p>
          {!noExamDate && examDate && (
            <p className="text-xs text-muted-foreground">Exam in {plan!.daysLeft} day{plan!.daysLeft === 1 ? "" : "s"}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-card border border-border rounded-2xl p-3 text-center">
            <Flame className="w-5 h-5 text-amber-500 mx-auto mb-1" />
            <div className="text-lg font-bold text-foreground capitalize">{plan!.intensity}</div>
            <div className="text-xs text-muted-foreground">Study mode</div>
          </div>
          <div className="bg-card border border-border rounded-2xl p-3 text-center">
            <Clock className="w-5 h-5 text-blue-500 mx-auto mb-1" />
            <div className="text-lg font-bold text-foreground">{plan!.dailyHours}h</div>
            <div className="text-xs text-muted-foreground">Per day</div>
          </div>
          <div className="bg-card border border-border rounded-2xl p-3 text-center">
            <BookOpen className="w-5 h-5 text-green-500 mx-auto mb-1" />
            <div className="text-lg font-bold text-foreground">{plan!.wordsPerDay}</div>
            <div className="text-xs text-muted-foreground">Words/day</div>
          </div>
          <div className="bg-card border border-border rounded-2xl p-3 text-center">
            <GraduationCap className="w-5 h-5 text-purple-500 mx-auto mb-1" />
            <div className="text-lg font-bold text-foreground">{plan!.vocabFocus}</div>
            <div className="text-xs text-muted-foreground">Your study zone</div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-2xl p-4 space-y-3">
          <h3 className="font-bold text-foreground flex items-center gap-2">
            <Calendar className="w-4 h-4 text-primary" /> Weekly Schedule
          </h3>
          {plan!.schedule.map((block, i) => (
            <div key={i} className="space-y-1">
              <div className="text-xs font-bold text-primary">{block.day}</div>
              {block.tasks.map((task, j) => (
                <div key={j} className="flex items-start gap-2 text-sm text-foreground">
                  <CheckCircle2 className="w-3.5 h-3.5 text-muted-foreground mt-0.5 shrink-0" />
                  <span>{task}</span>
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="bg-card border border-border rounded-2xl p-4 space-y-2">
          <h3 className="font-bold text-foreground flex items-center gap-2">
            <Star className="w-4 h-4 text-amber-500" /> Milestones
          </h3>
          {plan!.milestones.map((m, i) => (
            <div key={i} className="flex items-start gap-2 text-sm text-foreground">
              <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center shrink-0">{i + 1}</span>
              <span>{m}</span>
            </div>
          ))}
        </div>

        <div className="bg-muted/30 border border-border rounded-2xl p-4 space-y-2">
          <h3 className="font-bold text-foreground text-sm">💡 Key tools to reach Band {targetBand}:</h3>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center gap-1.5 text-foreground">
              <Headphones className="w-3.5 h-3.5 text-blue-500" /> Listening Tests
            </div>
            <div className="flex items-center gap-1.5 text-foreground">
              <BookOpen className="w-3.5 h-3.5 text-green-500" /> Reading Tests
            </div>
            <div className="flex items-center gap-1.5 text-foreground">
              <FileText className="w-3.5 h-3.5 text-amber-500" /> Orwell AI (Writing)
            </div>
            <div className="flex items-center gap-1.5 text-foreground">
              <Mic className="w-3.5 h-3.5 text-rose-500" /> Churchill AI (Speaking)
            </div>
            <div className="flex items-center gap-1.5 text-foreground">
              <Trophy className="w-3.5 h-3.5 text-purple-500" /> Mock Tests
            </div>
            <div className="flex items-center gap-1.5 text-foreground">
              <Flame className="w-3.5 h-3.5 text-orange-500" /> Weak Words Deck
            </div>
          </div>
        </div>

        {saveError && (
          <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-xl px-4 py-2 text-sm text-red-700 dark:text-red-400 text-center">
            Failed to save. Please try again.
          </div>
        )}

        <div className="flex gap-3">
          <button onClick={() => setStep(4)} className="flex-1 bg-muted text-foreground font-bold py-3 rounded-xl hover:opacity-80 transition-opacity">Back</button>
          <button onClick={handleSave} disabled={saving}
            className="flex-1 bg-primary text-primary-foreground font-bold py-3 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {saving ? "Saving..." : saveError ? "Retry" : "Start Studying!"} <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <Dots active={5} />
      </div>
    </div>
  );
}

export function useOnboardingCheck() {
  const [needsOnboarding, setNeedsOnboarding] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    async function check() {
      try {
        const [levelRes, bandRes, dateRes] = await Promise.all([
          customFetch<{ value: string }>("/api/user-data/current_level"),
          customFetch<{ value: string }>("/api/user-data/target_band"),
          customFetch<{ value: string }>("/api/user-data/exam_date"),
        ]);
        // Existing users (pre-current-level) won't have current_level set.
        // Only force onboarding if BOTH band and date are missing — otherwise
        // a returning user would be re-onboarded just to capture the new field.
        if (!bandRes.value || !dateRes.value || !levelRes.value) {
          // If they completed the old onboarding (band + date) but lack level,
          // still ask once so we can set their study zone properly.
          setNeedsOnboarding(true);
        }
      } catch {
        // On API error, skip onboarding — don't force it for returning users
      }
      setChecked(true);
    }
    check();
  }, []);

  return { needsOnboarding, checked, setNeedsOnboarding };
}
