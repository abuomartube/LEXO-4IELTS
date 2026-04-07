import { pgTable, text, serial, timestamp, boolean, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const flashcardsTable = pgTable("flashcards", {
  id: serial("id").primaryKey(),
  english: text("english").notNull(),
  arabic: text("arabic").notNull(),
  level: text("level").notNull(), // A1, A2, B1, B2
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
