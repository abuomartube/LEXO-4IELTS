import { pgTable, text, serial, timestamp, boolean, integer, real, unique, primaryKey } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const flashcardsTable = pgTable("flashcards", {
  id: serial("id").primaryKey(),
  english: text("english").notNull(),
  arabic: text("arabic").notNull(),
  level: text("level").notNull(),
  category: text("category").notNull(),
  exampleSentence: text("example_sentence"),
  exampleSentenceArabic: text("example_sentence_arabic"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertFlashcardSchema = createInsertSchema(flashcardsTable).omit({ id: true, createdAt: true });
export type InsertFlashcard = z.infer<typeof insertFlashcardSchema>;
export type Flashcard = typeof flashcardsTable.$inferSelect;

export const progressTable = pgTable("progress", {
  id: serial("id").primaryKey(),
  flashcardId: integer("flashcard_id").notNull().references(() => flashcardsTable.id, { onDelete: "cascade" }),
  known: boolean("known").notNull().default(false),
  reviewedAt: timestamp("reviewed_at", { withTimezone: true }).notNull().defaultNow(),
  email: text("email").notNull().default(""),
});

export const insertProgressSchema = createInsertSchema(progressTable).omit({ id: true, reviewedAt: true });
export type InsertProgress = z.infer<typeof insertProgressSchema>;
export type Progress = typeof progressTable.$inferSelect;

export const bookmarksTable = pgTable("bookmarks", {
  id: serial("id").primaryKey(),
  flashcardId: integer("flashcard_id").notNull().references(() => flashcardsTable.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  email: text("email").notNull().default(""),
}, (t) => [unique().on(t.flashcardId, t.email)]);

export type Bookmark = typeof bookmarksTable.$inferSelect;

export const cardSrsTable = pgTable("card_srs", {
  id: serial("id").primaryKey(),
  flashcardId: integer("flashcard_id").notNull().references(() => flashcardsTable.id, { onDelete: "cascade" }),
  nextReviewAt: timestamp("next_review_at", { withTimezone: true }).notNull().defaultNow(),
  intervalDays: real("interval_days").notNull().default(1),
  easeFactor: real("ease_factor").notNull().default(2.5),
  reviewCount: integer("review_count").notNull().default(0),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  email: text("email").notNull().default(""),
}, (t) => [unique().on(t.flashcardId, t.email)]);

export type CardSrs = typeof cardSrsTable.$inferSelect;

export const settingsTable = pgTable("settings", {
  key: text("key").primaryKey(),
  value: text("value").notNull(),
});

export const accessRequestsTable = pgTable("access_requests", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  status: text("status").notNull().default("pending"),
  passwordHash: text("password_hash"),
  accessCodeId: integer("access_code_id"),
  requestedAt: timestamp("requested_at", { withTimezone: true }).notNull().defaultNow(),
  reviewedAt: timestamp("reviewed_at", { withTimezone: true }),
  expiresAt: timestamp("expires_at", { withTimezone: true }),
});

// ── Single-use access codes (admin-generated invites) ────────────────────
export const accessCodesTable = pgTable("access_codes", {
  id: serial("id").primaryKey(),
  code: text("code").notNull().unique(),
  note: text("note"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  usedByEmail: text("used_by_email"),
  usedAt: timestamp("used_at", { withTimezone: true }),
});

export type AccessCode = typeof accessCodesTable.$inferSelect;

export const storiesTable = pgTable("stories", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  titleArabic: text("title_arabic").notNull(),
  content: text("content").notNull(),
  contentArabic: text("content_arabic").notNull(),
  level: text("level").notNull(),
  orderIndex: integer("order_index").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export type Story = typeof storiesTable.$inferSelect;

export const reviewsTable = pgTable("reviews", {
  id: serial("id").primaryKey(),
  email: text("email").notNull(),
  name: text("name"),
  comment: text("comment").notNull(),
  rating: integer("rating").notNull().default(5),
  status: text("status").notNull().default("pending"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  reviewedAt: timestamp("reviewed_at", { withTimezone: true }),
});

export type Review = typeof reviewsTable.$inferSelect;

export const activityPositionTable = pgTable("activity_positions", {
  id: serial("id").primaryKey(),
  email: text("email").notNull(),
  activity: text("activity").notNull(),
  position: integer("position").notNull().default(0),
  filters: text("filters").notNull().default("{}"),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
}, (t) => [unique().on(t.email, t.activity)]);

export const quizScoresTable = pgTable("quiz_scores", {
  id: serial("id").primaryKey(),
  email: text("email").notNull(),
  mode: text("mode").notNull(),
  level: text("level").notNull(),
  total: integer("total").notNull(),
  correct: integer("correct").notNull(),
  wrong: integer("wrong").notNull(),
  completedAt: timestamp("completed_at", { withTimezone: true }).notNull().defaultNow(),
});

export const userDataTable = pgTable("user_data", {
  id: serial("id").primaryKey(),
  email: text("email").notNull(),
  key: text("key").notNull(),
  value: text("value").notNull().default(""),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
}, (t) => [unique().on(t.email, t.key)]);

export const xpEventsTable = pgTable("xp_events", {
  id: serial("id").primaryKey(),
  email: text("email").notNull(),
  activity: text("activity").notNull(),
  xp: integer("xp").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export type XpEvent = typeof xpEventsTable.$inferSelect;

export const weakWordsTable = pgTable("weak_words", {
  id: serial("id").primaryKey(),
  email: text("email").notNull(),
  flashcardId: integer("flashcard_id").notNull().references(() => flashcardsTable.id, { onDelete: "cascade" }),
  wrongCount: integer("wrong_count").notNull().default(1),
  lastWrongAt: timestamp("last_wrong_at", { withTimezone: true }).notNull().defaultNow(),
}, (t) => [unique().on(t.email, t.flashcardId)]);

export type WeakWord = typeof weakWordsTable.$inferSelect;

export const pushSubscriptionsTable = pgTable("push_subscriptions", {
  id: serial("id").primaryKey(),
  email: text("email").notNull(),
  endpoint: text("endpoint").notNull(),
  keys: text("keys").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
}, (t) => [unique().on(t.email, t.endpoint)]);

export type PushSubscription = typeof pushSubscriptionsTable.$inferSelect;

export const orwellSubmissionsTable = pgTable("orwell_submissions", {
  id: serial("id").primaryKey(),
  email: text("email").notNull(),
  assignmentId: text("assignment_id").notNull(),
  category: text("category").notNull(),
  status: text("status").notNull().default("submitted"),
  band: real("band"),
  wordCount: integer("word_count"),
  text: text("text"),
  feedback: text("feedback"),
  taskTypeLabel: text("task_type_label"),
  prompt: text("prompt"),
  compareReport: text("compare_report"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
}, (t) => [unique().on(t.email, t.assignmentId)]);

export type OrwellSubmission = typeof orwellSubmissionsTable.$inferSelect;

export const orwellCoachSummariesTable = pgTable("orwell_coach_summaries", {
  id: serial("id").primaryKey(),
  email: text("email").notNull(),
  atSubmissionCount: integer("at_submission_count").notNull(),
  summary: text("summary").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
}, (t) => [unique().on(t.email, t.atSubmissionCount)]);

export type OrwellCoachSummary = typeof orwellCoachSummariesTable.$inferSelect;

// ── Lessons (admin-curated video lessons grouped into 2 courses) ─────────
// course = "intro"     → "المدخل للايلتس" (A1, A2)
// course = "advanced"  → "المتقدمة"        (B1, B2, C1)
export const lessonsTable = pgTable("lessons", {
  id: serial("id").primaryKey(),
  course: text("course").notNull(),
  title: text("title").notNull(),
  vimeoUrl: text("vimeo_url").notNull(),
  orderIndex: integer("order_index").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export type Lesson = typeof lessonsTable.$inferSelect;

export const lessonCompletionsTable = pgTable("lesson_completions", {
  id: serial("id").primaryKey(),
  email: text("email").notNull(),
  lessonId: integer("lesson_id").notNull().references(() => lessonsTable.id, { onDelete: "cascade" }),
  completedAt: timestamp("completed_at", { withTimezone: true }).notNull().defaultNow(),
}, (t) => [unique().on(t.email, t.lessonId)]);

export type LessonCompletion = typeof lessonCompletionsTable.$inferSelect;
