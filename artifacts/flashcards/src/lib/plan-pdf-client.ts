// Client-side helper that builds the PDF payload from the user's stored plan
// data and triggers a browser download from /api/plan-pdf.

import { customFetch } from "@workspace/api-client-react";
import {
  addDays,
  ensurePlanStartDate,
  getPlanCoverage,
  getPlanSchedule,
  levelLabel,
  normalizePlanDuration,
  parsePlanISO,
  shortDate,
} from "@/lib/daily-plan";
import { LIBRARY_SIZES } from "@/lib/plan-content";

const WEEKDAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const WEEKDAYS_AR = ["الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"];

// Bilingual labels and details for each coverage row.
function buildCoverageRows(
  coverage: ReturnType<typeof getPlanCoverage>,
): Array<{
  emoji: string;
  label: string;
  labelAr: string;
  detail: string;
  detailAr: string;
  pct: number;
}> {
  const orwellUnique =
    (coverage.orwellTask1?.uniqueCovered ?? 0) +
    (coverage.orwellTask2?.uniqueCovered ?? 0) +
    (coverage.paragraph?.uniqueCovered ?? 0);

  const speakingUnique = Math.max(
    coverage.topicBank?.uniqueCovered ?? 0,
    coverage.churchillP1?.uniqueCovered ?? 0,
    coverage.churchillP2?.uniqueCovered ?? 0,
    coverage.churchillP3?.uniqueCovered ?? 0,
  );

  const readingSkillsUnique =
    (coverage.readingSkills?.uniqueCovered ?? 0) + (coverage.readingSkillsEasy?.uniqueCovered ?? 0);

  const listeningSkillsUnique =
    (coverage.listeningS1?.uniqueCovered ?? 0) +
    (coverage.listeningS2?.uniqueCovered ?? 0) +
    (coverage.listeningS3?.uniqueCovered ?? 0) +
    (coverage.listeningS4?.uniqueCovered ?? 0);

  const pct = (a: number, b: number) => (b > 0 ? Math.round((a / b) * 100) : 0);

  return [
    {
      emoji: "✨",
      label: "Vocabulary deck",
      labelAr: "بطاقات المفردات",
      detail: `Continuous review · ${LIBRARY_SIZES.vocabWords.toLocaleString()} words`,
      detailAr: `مراجعة مستمرة · ${LIBRARY_SIZES.vocabWords.toLocaleString()} كلمة`,
      pct: 100,
    },
    {
      emoji: "✍️",
      label: "Writing — Orwell prompts",
      labelAr: "الكتابة — مهام أورويل",
      detail: `${orwellUnique} of ${LIBRARY_SIZES.orwellTotal} essays scheduled`,
      detailAr: `${orwellUnique} من ${LIBRARY_SIZES.orwellTotal} مقالة مجدولة`,
      pct: pct(orwellUnique, LIBRARY_SIZES.orwellTotal),
    },
    {
      emoji: "🎤",
      label: "Speaking — Churchill themes",
      labelAr: "المحادثة — مواضيع تشرشل",
      detail: `${speakingUnique} of ${LIBRARY_SIZES.speakingThemes} themes touched`,
      detailAr: `${speakingUnique} من ${LIBRARY_SIZES.speakingThemes} موضوع مغطى`,
      pct: pct(speakingUnique, LIBRARY_SIZES.speakingThemes),
    },
    {
      emoji: "📖",
      label: "Reading — skill passages",
      labelAr: "القراءة — تمارين المهارات",
      detail: `${readingSkillsUnique} of ${LIBRARY_SIZES.readingSkillsTotal} passages scheduled`,
      detailAr: `${readingSkillsUnique} من ${LIBRARY_SIZES.readingSkillsTotal} مقطع مجدول`,
      pct: pct(readingSkillsUnique, LIBRARY_SIZES.readingSkillsTotal),
    },
    {
      emoji: "🎧",
      label: "Listening — skill sections",
      labelAr: "الاستماع — أقسام المهارات",
      detail: `${listeningSkillsUnique} of ${LIBRARY_SIZES.listeningSkillsTotal} practices scheduled`,
      detailAr: `${listeningSkillsUnique} من ${LIBRARY_SIZES.listeningSkillsTotal} تمرين مجدول`,
      pct: pct(listeningSkillsUnique, LIBRARY_SIZES.listeningSkillsTotal),
    },
    {
      emoji: "📝",
      label: "Reading mock tests",
      labelAr: "اختبارات قراءة كاملة",
      detail: `${coverage.readingMock?.uniqueCovered ?? 0} of ${LIBRARY_SIZES.readingMockTests} mocks scheduled`,
      detailAr: `${coverage.readingMock?.uniqueCovered ?? 0} من ${LIBRARY_SIZES.readingMockTests} اختبار مجدول`,
      pct: pct(coverage.readingMock?.uniqueCovered ?? 0, LIBRARY_SIZES.readingMockTests),
    },
    {
      emoji: "🎬",
      label: "Listening mock tests",
      labelAr: "اختبارات استماع كاملة",
      detail: `${coverage.listeningMock?.uniqueCovered ?? 0} of ${LIBRARY_SIZES.listeningMockTests} mocks scheduled`,
      detailAr: `${coverage.listeningMock?.uniqueCovered ?? 0} من ${LIBRARY_SIZES.listeningMockTests} اختبار مجدول`,
      pct: pct(coverage.listeningMock?.uniqueCovered ?? 0, LIBRARY_SIZES.listeningMockTests),
    },
  ];
}

export interface DownloadPlanPdfOptions {
  /** When set, used directly instead of fetching from /api/user-data. */
  level?: string | null;
  targetBand?: string | null;
  examDate?: string | null;
  startISO?: string | null;
  duration?: number | null;
  name?: string | null;
}

export async function downloadPlanPdf(opts: DownloadPlanPdfOptions = {}): Promise<void> {
  // 1. Resolve all the user data we need (network calls only for missing fields).
  const tasks: Promise<unknown>[] = [];
  let levelVal = opts.level ?? null;
  let bandVal = opts.targetBand ?? null;
  let examVal = opts.examDate ?? null;
  let startVal = opts.startISO ?? null;
  let durVal = opts.duration ?? null;
  let nameVal = opts.name ?? null;

  if (levelVal === null) tasks.push(customFetch<{ value: string }>("/api/user-data/current_level").then((r) => { levelVal = r.value; }).catch(() => undefined));
  if (bandVal === null) tasks.push(customFetch<{ value: string }>("/api/user-data/target_band").then((r) => { bandVal = r.value; }).catch(() => undefined));
  if (examVal === null) tasks.push(customFetch<{ value: string }>("/api/user-data/exam_date").then((r) => { examVal = r.value; }).catch(() => undefined));
  if (startVal === null) tasks.push(customFetch<{ value: string }>("/api/user-data/plan_start_date").then((r) => { startVal = r.value; }).catch(() => undefined));
  if (durVal === null) tasks.push(customFetch<{ value: string }>("/api/user-data/plan_duration_days").then((r) => { durVal = Number(r.value); }).catch(() => undefined));
  if (nameVal === null) tasks.push(customFetch<{ value: string }>("/api/user-data/name").then((r) => { nameVal = r.value; }).catch(() => undefined));
  if (tasks.length) await Promise.all(tasks);

  if (!levelVal) throw new Error("Your study level isn't set yet. Finish onboarding first.");

  const startISO = ensurePlanStartDate(startVal ?? undefined);
  const duration = normalizePlanDuration(durVal ?? undefined);
  const start = parsePlanISO(startISO);
  const end = addDays(start, duration - 1);

  // 2. Build days array.
  const schedule = getPlanSchedule(levelVal, startISO, duration);
  const days = schedule.map((dayTasks, idx) => {
    const date = addDays(start, idx);
    return {
      dayIndex: idx + 1,
      weekday: `${WEEKDAYS[date.getDay()]} · ${WEEKDAYS_AR[date.getDay()]}`,
      dateLabel: shortDate(date),
      tasks: dayTasks.map((t) => ({
        label: t.label,
        labelAr: t.arabicLabel,
        emoji: t.emoji,
        minutes: t.estimatedMinutes,
        scheduledTitle: t.scheduled?.title ?? null,
      })),
    };
  });

  // 3. Build coverage rows.
  const coverage = buildCoverageRows(getPlanCoverage(levelVal, startISO, duration));

  const payload = {
    name: (nameVal || "Student").toString(),
    level: levelVal,
    levelLabel: levelLabel(levelVal),
    targetBand: bandVal || null,
    examDate: examVal || null,
    duration,
    startISO,
    startLabel: shortDate(start),
    endLabel: shortDate(end),
    generatedAt: new Date().toLocaleString("en-GB", {
      day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit",
    }),
    coverage,
    days,
  };

  // 4. POST via customFetch so the student auth headers are attached.
  let blob: Blob;
  try {
    blob = await customFetch<Blob>("/api/plan-pdf", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      responseType: "blob",
    });
  } catch (err) {
    let msg = "Could not generate PDF.";
    // ApiError from @workspace/api-client-react isn't re-exported from the
    // package barrel, so duck-type instead of `instanceof`.
    const errObj = err as { data?: { error?: string }; message?: string } | null;
    if (errObj?.data?.error) {
      msg = errObj.data.error;
    } else if (errObj?.message) {
      msg = errObj.message;
    }
    throw new Error(msg);
  }
  const url = URL.createObjectURL(blob);
  const safe = (payload.name || "Student").replace(/[^A-Za-z0-9]+/g, "-").slice(0, 40) || "Student";
  const a = document.createElement("a");
  a.href = url;
  a.download = `LEXO-Study-Plan-${safe}.pdf`;
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    a.remove();
    URL.revokeObjectURL(url);
  }, 0);
}
