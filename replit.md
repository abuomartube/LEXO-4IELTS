# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.

## Artifacts

### English Flashcards App (`artifacts/flashcards`)
- React + Vite frontend at `/` (previewPath)
- **2,198 unique flashcards** across A1 (378), A2 (520), B1 (313), B2 (261), C1 (726) — CEFR-corrected, deduplicated
- Arabic translations with Cairo font, RTL layout; bilingual example sentences
- Branding: 4IELTS teal/navy, Abu Omar photo, logo, 4ielts.com link
- **Access control**: students enter email + access code (`ielts2025` default); admin panel at `/admin`

#### Pages
- **Dashboard** — Hero, streak counter, Word of the Day, feature grid, progress summary, instructor section
- **Study Mode** — 3D flip cards; tabs: All / Due (SRS) / Still Learning / Bookmarked; session summary modal
- **Quiz Mode** — Multiple choice (pick Arabic translation) + Fill-in-the-blank; start screen + score summary
- **Browse Cards** — Grid view with search/filter; bookmark toggle; bookmarks-only view
- **Progress** — Full learning journey dashboard: vocabulary mastery by level, synonyms/antonyms/phrasal verbs session stats (known/unknown), stories completion tracking

#### API Routes
- `GET /api/flashcards` — list/search/filter cards
- `GET /api/flashcards/levels` — level stats
- `GET /api/flashcards/categories` — all categories
- `GET /api/progress` — all progress records
- `POST /api/progress` — record review result
- `GET /api/progress/summary` — totals per level
- `GET /api/bookmarks` — list bookmarked card IDs
- `POST /api/bookmarks/:id` — toggle bookmark
- `GET /api/word-of-day` — deterministic daily word
- `GET /api/streak` — consecutive study day count
- `GET /api/quiz` — multiple-choice questions (4 Arabic options)
- `GET /api/fill-blank` — fill-in-the-blank questions
- `GET /api/srs/due` — cards due for spaced-repetition review
- `POST /api/srs/:id` — update SM-2 SRS record (known/unknown)
- `GET /api/vocab-pdf` — download full 3000-word vocabulary PDF (generates on first request; streams cached file thereafter)
- `GET /api/vocab-pdf/status` — check PDF generation status (not_started | generating | ready | error)
- `GET /api/activity-position/:activity` — get saved card position + filters for an activity
- `PUT /api/activity-position/:activity` — save card position + filters (auto-saves as user navigates)
- `GET /api/weak-words` — list all weak words for the user (joined with flashcard data)
- `POST /api/weak-words/add` — add flashcard IDs to weak-word deck (body: `{ flashcardIds: number[] }`)
- `POST /api/weak-words/:id/master` — mark a weak word as mastered (deletes it from deck)
- `GET /api/quiz-scores` — recent quiz scores for user (last 20)
- `POST /api/quiz-scores` — save a quiz result (mode, level, total, correct, wrong)
- `GET /api/user-data-prefix/:prefix` — get all user data keys matching a prefix (used for story completions)
- `GET /api/user-data/:key` — get a user data value by key (generic key-value store)
- `PUT /api/user-data/:key` — save a user data value by key
- `DELETE /api/progress/reset` — reset all progress, bookmarks, SRS, activity positions, quiz scores, and user data

#### Phrasal Verbs
- **200 IELTS phrasal verbs** — 50 per CEFR level (A2 / B1 / B2 / C1)
- Data file: `artifacts/flashcards/src/data/phrasal-verbs-data.json`
- Page: `artifacts/flashcards/src/pages/phrasal-verbs.tsx`
- Each entry: phrasal verb, English meaning, IELTS example sentence, Arabic verb translation, Arabic meaning, Arabic example
- Level filter dropdown (All Levels / A2 / B1 / B2 / C1)
- Flip-card interface with session stats (known/unknown), progress bar, session-done summary
- Position persistence via `useActivityPosition("phrasal-verbs", levelFilter)`

#### Features
- **Persistent Login** — Session saved to DB on login; returning students skip login and go straight to dashboard; logout clears DB session via sendBeacon; session respects expiry dates
- **Dark mode** — ThemeContext, persists in localStorage, toggle in sidebar/mobile nav
- **Spaced Repetition (SRS)** — SM-2 algorithm stored in `card_srs` table
- **Bookmarks** — Toggle per card; filter study/browse to bookmarked only
- **Daily Streak** — Derived from progress records, shown on homepage
- **Word of the Day** — Deterministic date-based pick, shown on homepage with audio
- **Session Summary** — Modal after completing a study session
- **Toast Notifications** — "Got it!" / "Keep learning!" toasts on card mark in study, synonyms, antonyms, and phrasal verbs
- **Session Stats Persistence** — Known/unknown counts saved/restored in activity_position filters JSON for all flip-card features
- **Story Completion Tracking** — "Mark as Read" button in story reader; completed stories show green checkmark on story cards; tracked via user_data API
- **Quiz Mode** — Multiple choice + fill-in-the-blank with score tracking; quiz scores persisted to DB with history display; wrong answers automatically added to weak-word deck
- **Weak-Word Deck** — Words missed in quizzes collected into a review deck; flashcard review with mastering flow; XP awarded on mastery; accessible via sidebar nav
- **Listening IELTS Tests** — 4 full listening tests (Tests 1–4), each with 4 parts and 40 questions; question types: fill-in-the-blank, multiple choice, multi-select; audio playback per part; auto-grading with IELTS band score; bilingual feedback; audio files: `/listeningX-partY.mp3`
- **Reading IELTS Tests** — 5 full reading tests (Tests 1–5), each with 3 academic passages and 40 questions; question types: fill-in-the-blank, TRUE/FALSE/NOT GIVEN, YES/NO/NOT GIVEN, paragraph matching, person/researcher matching, multi-select, summary completion; 60-minute countdown timer; auto-grading with IELTS band score (2–9); per-passage breakdown; English + Arabic recommendations; full answer review with correct/incorrect indicators
- **Welcome Back Dialog** — Study page shows resume prompt when returning with saved position
- **Orwell AI (Writing)** — IELTS essay checker with calibrated Band 7 grading anchors (4 reference essays: Task 2 Opinion, Task 2 Advantages/Disadvantages, Task 1 Line Graph, Band 5 contrast); Arabic-specific error detection (articles, SVA, literal translations); bilingual feedback with Arabic tips; grammar rule explanations; Task 1 & Task 2 + paragraph/email mode
- **Teacher Dashboard** — Admin-protected dashboard at `/teacher` showing all approved students' progress in a sortable table; columns: email, level, XP, streak, words known, weak words count, quizzes taken, last active date; summary stat cards (total students, avg XP, avg streak, active today); search by email; session-persisted admin login; API endpoint `GET /api/teacher/students` behind `requireAdmin`
- **Writing Templates Library** — 6 essay templates (Opinion, Discussion, Problem-Solution, Advantages/Disadvantages, Line/Bar Graph, Process Diagram) covering Task 1 and Task 2; each template has step-by-step structure with sentence starters and Band 7-8 sample paragraphs with highlighted phrases and commentary; Do's & Don'ts checklists; 7 linking phrase categories (50+ phrases) with usage notes and example sentences; search, copy-to-clipboard; accessible via sidebar "Writing Templates" nav item
- **Speaking Topic Bank** — 10 themed topics (Hometown, Education, Technology, Health, Travel, Work, Environment, Food, Family, Media, Culture, Hobbies) with 50+ questions covering IELTS Speaking Parts 1, 2, and 3; Band 7-8 model answers, key vocabulary with definitions, and examiner tips; search functionality; browser TTS "Listen" button; accessible via sidebar "Topic Bank" nav item
- **Full Mock IELTS Test** — Complete mock test at `/mock-test` combining all 4 skills with official timing: Listening (30 min, random test from bank), Reading (60 min, random test from bank), Writing (60 min, Task 1 + Task 2 with AI grading via Orwell API), Speaking (14 min, Parts 1-3 with self-assessment); auto-submits when timer expires; 3 mock test sets with different Writing prompts and Speaking questions; break screens between sections; results page with individual band scores + overall band (average rounded to nearest 0.5)
- **Onboarding Flow** — 3-step onboarding for new students after first login: (1) target IELTS band score selection (5.0–9.0), (2) exam date picker, (3) personalized study plan with weekly schedule, milestones, daily hours, words/day, and vocab focus level; data saved to `user_data` table (`target_band`, `exam_date`); skipped for returning users; intensity adapts based on days until exam (intensive/focused/balanced/steady)
- **Speaking Topics** — Used topics stored in DB per user (with localStorage fallback for migration)
- **PDF Download** — `GET /api/vocab-pdf` generates and serves a PDF of all 2,198 words; uses puppeteer-core + system chromium; cached in `.local/pdf-cache/`; `/api/vocab-pdf/status` for polling

#### Vocabulary PDF
- **Source**: `artifacts/flashcards/public/vocabulary-bilingual.html` — 2,198-word bilingual HTML (A1×378, A2×520, B1×313, B2×261, C1×726)
- **PDF generation**: puppeteer-core renders the HTML; chromium discovered via `which chromium`
- **Caching**: PDF cached at `.local/pdf-cache/ielts-vocabulary-2198.pdf`; on-demand generation with async polling

## Database Schema

- `flashcards` — id, english, arabic, level (A1/A2/B1/B2), category, example_sentence, example_sentence_arabic
- `progress` — id, flashcard_id (FK), known, reviewed_at, **email** (per-user isolation)
- `bookmarks` — id, flashcard_id (FK), created_at, **email** (unique on flashcard_id+email)
- `card_srs` — id, flashcard_id (FK), next_review_at, interval_days, ease_factor, review_count, updated_at, **email** (unique on flashcard_id+email)
- `activity_positions` — id, email, activity, position (int), filters (JSON string), updated_at (unique on email+activity) — stores last card index per activity per user for resume-where-you-left-off
- `quiz_scores` — id, email, mode, level, total, correct, wrong, completed_at — persisted quiz results
- `user_data` — id, email, key, value, updated_at (unique on email+key) — generic per-user key-value store (e.g. speaking used topics)
- `weak_words` — id, email, flashcard_id (FK), wrong_count, last_wrong_at — tracks words answered incorrectly in quizzes for targeted review
- `xp_events` — id, email, activity, amount, awarded_at — XP event log for gamification (daily caps per activity)

## API Client Architecture
- `lib/api-zod` — Zod validators (generated by orval from openapi.yaml; custom extras via manual edits)
- `lib/api-client-react` — React Query hooks (generated); extra hooks in `src/extra-hooks.ts`
- New endpoints added manually to `extra-hooks.ts` (bookmarks, SRS, word-of-day, streak, quiz, fill-blank)
