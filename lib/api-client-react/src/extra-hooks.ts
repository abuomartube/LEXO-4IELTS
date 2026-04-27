import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { customFetch } from "./custom-fetch";

// ── Types ──────────────────────────────────────────────────────────────────

export interface WordOfDay {
  id: number;
  english: string;
  arabic: string;
  level: string;
  category: string;
  exampleSentence?: string;
  exampleSentenceArabic?: string;
}

export interface StreakInfo {
  streak: number;
  totalDays: number;
}

export interface QuizQuestion {
  flashcard: WordOfDay;
  options: string[];
  correctIndex: number;
}

export interface FillBlankQuestion {
  flashcard: WordOfDay;
  sentence: string;
}

export interface SrsUpdateResult {
  flashcardId: number;
  nextReviewAt: string;
  intervalDays: number;
  reviewCount: number;
}

// ── Bookmarks ──────────────────────────────────────────────────────────────

export const useListBookmarks = () =>
  useQuery<number[]>({
    queryKey: ["/api/bookmarks"],
    queryFn: () => customFetch<number[]>("/api/bookmarks", { method: "GET" }),
  });

export const useToggleBookmark = () => {
  const qc = useQueryClient();
  return useMutation<{ bookmarked: boolean }, unknown, number>({
    mutationFn: (id) => customFetch<{ bookmarked: boolean }>(`/api/bookmarks/${id}`, { method: "POST" }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["/api/bookmarks"] }),
  });
};

// ── Word of the Day ────────────────────────────────────────────────────────

export const useWordOfDay = () =>
  useQuery<WordOfDay | null>({
    queryKey: ["/api/word-of-day"],
    queryFn: () => customFetch<WordOfDay>("/api/word-of-day", { method: "GET" }),
  });

// ── Streak ─────────────────────────────────────────────────────────────────

export const useStreak = () =>
  useQuery<StreakInfo>({
    queryKey: ["/api/streak"],
    queryFn: () => customFetch<StreakInfo>("/api/streak", { method: "GET" }),
  });

// ── XP ─────────────────────────────────────────────────────────────────────

export interface XpInfo {
  total: number;
  todayXp: number;
  level: number;
  levelName: string;
}

export interface AwardXpResult {
  awarded: number;
  total: number;
  level: number;
  levelName: string;
}

export const useXp = () =>
  useQuery<XpInfo>({
    queryKey: ["/api/xp"],
    queryFn: () => customFetch<XpInfo>("/api/xp", { method: "GET" }),
  });

export const useAwardXp = () => {
  const qc = useQueryClient();
  return useMutation<AwardXpResult, unknown, { activity: string; amount: number }>({
    mutationFn: ({ activity, amount }) =>
      customFetch<AwardXpResult>("/api/xp/award", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ activity, amount }),
      }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["/api/xp"] }),
  });
};

// ── Weak Words ─────────────────────────────────────────────────────────────

export interface WeakWordItem {
  id: number;
  flashcardId: number;
  wrongCount: number;
  lastWrongAt: string;
  english: string;
  arabic: string;
  level: string;
  category: string;
  exampleSentence?: string;
  exampleSentenceArabic?: string;
}

export const useWeakWords = () =>
  useQuery<WeakWordItem[]>({
    queryKey: ["/api/weak-words"],
    queryFn: () => customFetch<WeakWordItem[]>("/api/weak-words", { method: "GET" }),
  });

export const useAddWeakWords = () => {
  const qc = useQueryClient();
  return useMutation<{ added: number }, unknown, number[]>({
    mutationFn: (flashcardIds) =>
      customFetch<{ added: number }>("/api/weak-words/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ flashcardIds }),
      }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["/api/weak-words"] }),
  });
};

export const useMasterWeakWord = () => {
  const qc = useQueryClient();
  return useMutation<{ mastered: boolean }, unknown, number>({
    mutationFn: (id) =>
      customFetch<{ mastered: boolean }>(`/api/weak-words/${id}/master`, { method: "POST" }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["/api/weak-words"] }),
  });
};

// Add a weak word by its English word string — for synonym/antonym modes.
export const useAddWeakWordByWord = () => {
  const qc = useQueryClient();
  return useMutation<{ added: number }, unknown, string>({
    mutationFn: (word) =>
      customFetch<{ added: number }>("/api/weak-words/add-by-word", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ word }),
      }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["/api/weak-words"] }),
  });
};

// Phrasal verb weak tracking — toggle individual phrasal verbs by their JSON id.
export const usePhrasalVerbWeak = () => {
  const qc = useQueryClient();
  const query = useQuery<{ ids: number[] }>({
    queryKey: ["/api/phrasal-verbs/weak"],
    queryFn: () => customFetch<{ ids: number[] }>("/api/phrasal-verbs/weak"),
    staleTime: 30_000,
  });
  const toggle = useMutation<{ weak: boolean }, unknown, number>({
    mutationFn: (id) =>
      customFetch<{ weak: boolean }>("/api/phrasal-verbs/weak/toggle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["/api/phrasal-verbs/weak"] }),
  });
  return { weakIds: query.data?.ids ?? [], toggle };
};

// ── Quiz ───────────────────────────────────────────────────────────────────

export const useQuiz = (level?: string, count = 10) =>
  useQuery<QuizQuestion[]>({
    queryKey: ["/api/quiz", level, count],
    queryFn: () => {
      const params = new URLSearchParams();
      if (level && level !== "ALL") params.set("level", level);
      params.set("count", String(count));
      return customFetch<QuizQuestion[]>(`/api/quiz?${params}`, { method: "GET" });
    },
  });

// ── Fill in the Blank ──────────────────────────────────────────────────────

export const useFillBlank = (level?: string, count = 10) =>
  useQuery<FillBlankQuestion[]>({
    queryKey: ["/api/fill-blank", level, count],
    queryFn: () => {
      const params = new URLSearchParams();
      if (level && level !== "ALL") params.set("level", level);
      params.set("count", String(count));
      return customFetch<FillBlankQuestion[]>(`/api/fill-blank?${params}`, { method: "GET" });
    },
  });

// ── SRS ────────────────────────────────────────────────────────────────────

export const useSrsDue = (level?: string) =>
  useQuery<WordOfDay[]>({
    queryKey: ["/api/srs/due", level],
    queryFn: () => {
      const params = level && level !== "ALL" ? `?level=${level}` : "";
      return customFetch<WordOfDay[]>(`/api/srs/due${params}`, { method: "GET" });
    },
  });

export const useUpdateSrs = () => {
  const qc = useQueryClient();
  return useMutation<SrsUpdateResult, unknown, { id: number; known: boolean }>({
    mutationFn: ({ id, known }) =>
      customFetch<SrsUpdateResult>(`/api/srs/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ known }),
      }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["/api/srs/due"] }),
  });
};
