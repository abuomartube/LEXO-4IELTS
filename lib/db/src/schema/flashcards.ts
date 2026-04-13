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
});

export const insertProgressSchema = createInsertSchema(progressTable).omit({ id: true, reviewedAt: true });
export type InsertProgress = z.infer<typeof insertProgressSchema>;
export type Progress = typeof progressTable.$inferSelect;

export const bookmarksTable = pgTable("bookmarks", {
  id: serial("id").primaryKey(),
  flashcardId: integer("flashcard_id").notNull().unique().references(() => flashcardsTable.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export type Bookmark = typeof bookmarksTable.$inferSelect;

export const cardSrsTable = pgTable("card_srs", {
  id: serial("id").primaryKey(),
  flashcardId: integer("flashcard_id").notNull().unique().references(() => flashcardsTable.id, { onDelete: "cascade" }),
  nextReviewAt: timestamp("next_review_at", { withTimezone: true }).notNull().defaultNow(),
  intervalDays: real("interval_days").notNull().default(1),
  easeFactor: real("ease_factor").notNull().default(2.5),
  reviewCount: integer("review_count").notNull().default(0),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export type CardSrs = typeof cardSrsTable.$inferSelect;

export const settingsTable = pgTable("settings", {
  key: text("key").primaryKey(),
  value: text("value").notNull(),
});

export const accessRequestsTable = pgTable("access_requests", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  status: text("status").notNull().default("pending"),
  requestedAt: timestamp("requested_at", { withTimezone: true }).notNull().defaultNow(),
  reviewedAt: timestamp("reviewed_at", { withTimezone: true }),
  expiresAt: timestamp("expires_at", { withTimezone: true }),
});

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
