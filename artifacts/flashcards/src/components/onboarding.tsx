import { useState, useEffect } from "react";
import { customFetch } from "@workspace/api-client-react";
import { Target, Calendar, ChevronRight, BookOpen, Headphones, FileText, Mic, Flame, Star, Trophy, Clock, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

const BAND_OPTIONS = [5.0, 5.5, 6.0, 6.5, 7.0, 7.5, 8.0, 8.5, 9.0];

interface OnboardingData {
  targetBand: number;
  examDate: string;
}

function generateStudyPlan(targetBand: number, examDate: string) {
  const today = new Date();
  const exam = new Date(examDate);
  const daysLeft = Math.max(1, Math.ceil((exam.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)));
  const weeksLeft = Math.ceil(daysLeft / 7);

  const intensity = daysLeft <= 14 ? "intensive" : daysLeft <= 30 ? "focused" : daysLeft <= 60 ? "balanced" : "steady";

  const dailyHours = intensity === "intensive" ? "3-4" : intensity === "focused" ? "2-3" : intensity === "balanced" ? "1.5-2" : "1-1.5";

  const wordsPerDay = intensity === "intensive" ? 30 : intensity === "focused" ? 20 : intensity === "balanced" ? 15 : 10;

  const vocabTarget = targetBand >= 7.5 ? "C1" : targetBand >= 6.5 ? "B2" : targetBand >= 5.5 ? "B1" : "A2";

  const schedule: { day: string; tasks: string[] }[] = [];

  if (intensity === "intensive") {
    schedule.push(
      { day: "Daily", tasks: [`Learn ${wordsPerDay} new words (focus on ${vocabTarget} level)`, "Review weak words deck", "Complete 1 Reading passage", "Complete 1 Listening section"] },
      { day: "Mon/Wed/Fri", tasks: ["Write 1 full essay (Task 2) — check with Orwell AI", "Practice Speaking Part 2 with Churchill AI"] },
      { day: "Tue/Thu", tasks: ["Write 1 Task 1 report — check with Orwell AI", "Practice Speaking Parts 1 & 3 with Churchill AI"] },
      { day: "Weekend", tasks: ["Take a full Mock Test", "Review all weak words", "Re-read Writing Templates"] },
    );
  } else if (intensity === "focused") {
    schedule.push(
      { day: "Daily", tasks: [`Learn ${wordsPerDay} new words (focus on ${vocabTarget} level)`, "Review weak words deck", "15 min Reading or Listening practice"] },
      { day: "Mon/Wed/Fri", tasks: ["Write 1 essay — check with Orwell AI", "Practice Speaking with Churchill AI"] },
      { day: "Tue/Thu", tasks: ["Complete 1 full Reading test", "Complete 1 full Listening test"] },
      { day: "Weekend", tasks: ["Take a full Mock Test every 2 weeks", "Review Writing Templates & Topic Bank"] },
    );
  } else if (intensity === "balanced") {
    schedule.push(
      { day: "Daily", tasks: [`Learn ${wordsPerDay} new words`, "Review weak words (10 min)"] },
      { day: "Mon/Wed", tasks: ["1 Reading passage + 1 Listening section", "Practice Speaking with Churchill AI"] },
      { day: "Tue/Thu", tasks: ["Write 1 essay — check with Orwell AI", "Study Writing Templates"] },
      { day: "Weekend", tasks: ["Take a Mock Test once a month", "Review synonyms & phrasal verbs", "Read 1 short story"] },
    );
  } else {
    schedule.push(
      { day: "Daily", tasks: [`Learn ${wordsPerDay} new words`, "Quick weak words review"] },
      { day: "Mon/Wed", tasks: ["1 Reading or Listening section", "Browse Topic Bank"] },
      { day: "Tue/Thu", tasks: ["Write 1 paragraph — check with Orwell AI", "Practice 1 Speaking topic"] },
      { day: "Weekend", tasks: ["1 full Reading or Listening test", "Review the week's vocabulary"] },
    );
  }

  const milestones: string[] = [];
  if (weeksLeft >= 8) milestones.push(`Weeks 1–2: Build vocabulary foundation (${vocabTarget} level words)`);
  if (weeksLeft >= 6) milestones.push(`Weeks ${weeksLeft >= 8 ? "3–4" : "1–2"}: Focus on Reading & Listening skills`);
  if (weeksLeft >= 4) milestones.push(`Weeks ${weeksLeft >= 8 ? "5–6" : "3–4"}: Writing & Speaking practice with AI`);
  milestones.push(`Final ${Math.min(weeksLeft, 2)} week(s): Mock tests + review weak areas`);

  return { daysLeft, weeksLeft, intensity, dailyHours, wordsPerDay, vocabTarget, schedule, milestones };
}

export function Onboarding({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [targetBand, setTargetBand] = useState(6.5);
  const [examDate, setExamDate] = useState("");
  const [noExamDate, setNoExamDate] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState(false);

  const minDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];
  const maxDate = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];

  const effectiveExamDate = noExamDate
    ? new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]
    : examDate;
  const canProceed = noExamDate || !!examDate;
  const plan = canProceed ? generateStudyPlan(targetBand, effectiveExamDate) : null;

  async function handleSave() {
    setSaving(true);
    setSaveError(false);
    try {
      await Promise.all([
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
      ]);
      onComplete();
    } catch {
      setSaveError(true);
    } finally {
      setSaving(false);
    }
  }

  if (step === 1) {
    return (
      <div className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
              <Target className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-2xl font-extrabold text-foreground">Welcome to LEXO!</h1>
            <p className="text-muted-foreground text-sm">Let's set up your personalized study plan</p>
            <p className="text-muted-foreground text-xs" dir="rtl" lang="ar">مرحباً! دعنا نضع خطة دراسية مخصصة لك</p>
          </div>

          <div className="bg-card border border-border rounded-2xl p-5 space-y-4">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-amber-500" />
              <h2 className="font-bold text-foreground">What is your target IELTS band score?</h2>
            </div>
            <p className="text-xs text-muted-foreground" dir="rtl" lang="ar">ما هي درجة الآيلتس التي تستهدفها؟</p>

            <div className="grid grid-cols-3 gap-2">
              {BAND_OPTIONS.map((band) => (
                <button key={band} onClick={() => setTargetBand(band)}
                  className={cn("py-3 rounded-xl font-bold text-lg transition-all",
                    targetBand === band
                      ? "bg-primary text-primary-foreground shadow-lg scale-105"
                      : "bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80"
                  )}
                >{band.toFixed(1)}</button>
              ))}
            </div>

            <div className="text-center text-xs text-muted-foreground">
              {targetBand >= 8.0 ? "🎯 Expert level — ambitious goal!" :
                targetBand >= 7.0 ? "🎯 Good user — a common university requirement" :
                  targetBand >= 6.0 ? "🎯 Competent user — achievable with consistent practice" :
                    "🎯 A solid starting point — let's build your skills!"}
            </div>
          </div>

          <button onClick={() => setStep(2)}
            className="w-full bg-primary text-primary-foreground font-bold py-3 rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
          >
            Next <ChevronRight className="w-4 h-4" />
          </button>

          <div className="flex justify-center gap-2">
            <div className="w-8 h-1.5 rounded-full bg-primary" />
            <div className="w-8 h-1.5 rounded-full bg-muted" />
            <div className="w-8 h-1.5 rounded-full bg-muted" />
          </div>
        </div>
      </div>
    );
  }

  if (step === 2) {
    return (
      <div className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
        <div className="w-full max-w-md space-y-6">
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
            <button onClick={() => setStep(1)}
              className="flex-1 bg-muted text-foreground font-bold py-3 rounded-xl hover:opacity-80 transition-opacity"
            >Back</button>
            <button onClick={() => { if (canProceed) setStep(3); }}
              disabled={!canProceed}
              className="flex-1 bg-primary text-primary-foreground font-bold py-3 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-40 flex items-center justify-center gap-2"
            >
              See My Plan <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="flex justify-center gap-2">
            <div className="w-8 h-1.5 rounded-full bg-primary" />
            <div className="w-8 h-1.5 rounded-full bg-primary" />
            <div className="w-8 h-1.5 rounded-full bg-muted" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 overflow-y-auto animate-in fade-in duration-300">
      <div className="max-w-lg mx-auto py-8 px-4 space-y-5">
        <div className="text-center space-y-2">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
            <Trophy className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-2xl font-extrabold text-foreground">Your Study Plan</h1>
          <p className="text-muted-foreground text-sm">
            Target: Band <span className="font-bold text-primary">{targetBand.toFixed(1)}</span>
            {noExamDate
              ? <> — <span className="font-bold text-primary">balanced 3-month plan</span></>
              : <> in <span className="font-bold text-primary">{plan!.daysLeft} days</span></>
            }
          </p>
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
            <Target className="w-5 h-5 text-purple-500 mx-auto mb-1" />
            <div className="text-lg font-bold text-foreground">{plan!.vocabTarget}</div>
            <div className="text-xs text-muted-foreground">Vocab focus</div>
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
          <h3 className="font-bold text-foreground text-sm">💡 Key tools for your Band {targetBand.toFixed(1)} goal:</h3>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center gap-1.5 text-foreground">
              <Headphones className="w-3.5 h-3.5 text-blue-500" /> Listening Tests (4 tests)
            </div>
            <div className="flex items-center gap-1.5 text-foreground">
              <BookOpen className="w-3.5 h-3.5 text-green-500" /> Reading Tests (5 tests)
            </div>
            <div className="flex items-center gap-1.5 text-foreground">
              <FileText className="w-3.5 h-3.5 text-amber-500" /> Orwell AI (Writing)
            </div>
            <div className="flex items-center gap-1.5 text-foreground">
              <Mic className="w-3.5 h-3.5 text-rose-500" /> Churchill AI (Speaking)
            </div>
            <div className="flex items-center gap-1.5 text-foreground">
              <Trophy className="w-3.5 h-3.5 text-purple-500" /> Mock Tests (3 sets)
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
          <button onClick={() => setStep(2)}
            className="flex-1 bg-muted text-foreground font-bold py-3 rounded-xl hover:opacity-80 transition-opacity"
          >Back</button>
          <button onClick={handleSave} disabled={saving}
            className="flex-1 bg-primary text-primary-foreground font-bold py-3 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {saving ? "Saving..." : saveError ? "Retry" : "Start Studying!"} <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="flex justify-center gap-2">
          <div className="w-8 h-1.5 rounded-full bg-primary" />
          <div className="w-8 h-1.5 rounded-full bg-primary" />
          <div className="w-8 h-1.5 rounded-full bg-primary" />
        </div>
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
        const [bandRes, dateRes] = await Promise.all([
          customFetch<{ value: string }>("/api/user-data/target_band"),
          customFetch<{ value: string }>("/api/user-data/exam_date"),
        ]);
        if (!bandRes.value || !dateRes.value) {
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
