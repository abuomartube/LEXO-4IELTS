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
