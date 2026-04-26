# Overview

This is a pnpm workspace monorepo using TypeScript, designed to build a comprehensive English Flashcards App. The primary purpose is to provide an educational platform for students preparing for the IELTS exam, offering a rich set of learning tools including flashcards, quizzes, spaced repetition, AI-powered writing feedback, and mock tests. The application aims to deliver a personalized and effective learning experience, focusing on vocabulary, grammar, and exam-specific skills.

The project utilizes a modern web stack, emphasizing a performant and scalable architecture. It targets a global audience of IELTS aspirants, particularly those seeking bilingual English-Arabic learning resources. Key capabilities include:

-   **Extensive Flashcard System**: 2,198 unique CEFR-corrected flashcards with Arabic translations and bilingual example sentences.
-   **Interactive Study Modes**: Study, Quiz, Browse, Spell It (timed spelling game with TTS clue audio preloaded for the current word + 2 ahead so playback is instant), and Spaced Repetition (SM-2 algorithm) for effective vocabulary acquisition.
-   **AI-Powered Tools**: Orwell AI for IELTS essay checking with Band 7 grading anchors and LEXO AI Chat Assistant for IELTS-specific queries.
-   **Comprehensive Testing**: Full IELTS Listening, Reading, and Mock Tests with auto-grading and detailed feedback.
-   **Personalized Learning**: Daily streaks, weak-word decks, progress tracking, and an onboarding flow for customized study plans.
-   **Teacher Dashboard**: Admin interface to monitor student progress and activity, plus an in-app Notifications composer (type, audience, send-now or schedule).
-   **In-App Notifications**: Bell icon in the student sidebar with a red unread badge and a dropdown panel; targets All Students or a specific level (A1–C1); types (Reminder/Feature/Announcement/Motivational) are color-coded; admin sees per-notification open counts.
-   **Web Push Notifications (OS-level)**: Admin-composed notifications are also delivered as real OS push notifications via VAPID/Web Push. Students get a slide-in prompt on first visit asking permission; on accept, the browser subscribes via the service worker (`/sw.js`) and the subscription is persisted in `push_subscriptions`. When admin sends or schedules a notification, the API fan-outs the payload (Title="LEXO", body=admin message, icon=LEXO logo, tap opens app) to all targeted subscriptions and auto-prunes any that return 404/410. Works on Android Chrome and most desktop browsers; iOS Safari requires the user to install LEXO as a Home Screen app on iOS 16.4+ (a yellow info banner in the teacher dashboard Notifications section communicates this).
-   **Idle Session Timeout**: Students are auto-logged out after 30 minutes of inactivity, admins after 60 minutes. A 2-minute warning modal ("Stay logged in?") appears before logout — only an explicit click on the button resets the timer; activity during the warning does NOT extend the session. After timeout, the user is redirected to the login screen with an amber "logged out due to inactivity" banner. Implemented via `useIdleTimeout` hook (`artifacts/flashcards/src/hooks/use-idle-timeout.ts`) and `IdleWarningModal` component, wired into both `PasswordGateUnlocked` (student) and `TeacherDashboard` (admin).
-   **AI Usage Tracking & Admin Alerts**: Every successful AI call to Churchill (speaking) and Orwell (writing) is logged in `ai_usage_events` (email, route, endpoint, costUsd, createdAt). The teacher dashboard shows an "AI Usage Today" summary card (total calls, estimated cost, students over threshold), a heads-up banner listing heavy users, and a per-row "Today's AI" badge with a Speaking/Writing/cost tooltip. Admin email alerts (via SendGrid REST, gracefully no-op without `SENDGRID_API_KEY`) fire when any student exceeds 20 calls/day or when total daily cost exceeds $10, deduped through the `admin_alerts_sent` table (`onConflictDoNothing` on a unique alert key). Configurable via env: `STUDENT_DAILY_CALL_THRESHOLD`, `DAILY_COST_ALERT_USD`, `ADMIN_ALERT_EMAIL`, `SENDGRID_FROM`. Tracking is informational — no calls are blocked.
-   **Public Reviews with Admin Replies**: Approved student reviews appear on the public landing page. The admin can publish a public reply to any approved review from the Admin Panel → Reviews tab (Reply / Edit / Delete). Replies are signed "Abu Omar" with a blue verified checkmark and a circular profile photo (uploaded once from Admin Panel → Settings → Reply Profile Photo; auto-cropped and resized to 256×256 JPEG, persisted as a data URL in the `settings` table under the `admin_avatar` key). The reply block is visually distinct from the comment (teal-tinted, indented, left-border accent). Reply data lives in `reviews.admin_reply` + `reviews.admin_reply_at`; replies are only allowed on `approved` reviews.
-   **Rich Content**: Phrasal verbs, grammar topics, writing templates, and speaking topic banks.
-   **Full-Mode Plan Content Scheduling**: Every plan task that draws from a finite catalog (Orwell prompts, Churchill speaking themes, reading skill passages, listening skill sections, full reading mocks, full listening mocks) is mapped to a specific catalog item per day via `src/lib/plan-content.ts` (`PLAN_CONTENT_CATALOGS`) and `src/lib/daily-plan.ts` (`getPlanSchedule`, `getScheduledDayTasks`, `getPlanCoverage`). Daily-plan tiles in `daily-plan-section.tsx`, the My Plan drawer, and the expanded day list on `/plan` show the scheduled item title (English) as subtitle and link to a deep-link href. Destination pages (`essay-checker?id=`, `speaking-topics?topic=&part=`, `reading-test?test=`, `listening-test?test=`) parse the param on mount, apply state, and strip the query via `history.replaceState`. The `/plan` page renders a "What you'll cover" coverage panel (`CoveragePanel`) showing per-section coverage (vocab, writing, speaking, reading skills, listening skills, reading mocks, listening mocks) using `getPlanCoverage` and `LIBRARY_SIZES`. The plan-duration picker shows a `SCOPE_HINTS` micro-summary under each duration tagline. Mock tests are scheduled only at B1/B2/C1 levels.
-   **Onboarding Name Step + Existing-User Prompt**: Onboarding (`onboarding.tsx`) opens with a Step 1 "What's your first name?" field validated by an English-only regex (`/^[A-Za-z][A-Za-z\s'\-.]{1,39}$/`); the value is persisted to `user_data` under key `name` alongside the rest of the onboarding payload. Existing users who have already completed onboarding but never set a name receive a one-time `NamePromptModal` (also exported from `onboarding.tsx`) wired into `PasswordGateUnlocked` (`password-gate.tsx`); the modal blocks the Guided Tour, LEXO AI Chat, and Exit Comment popup until a name is saved.
-   **Profile Page (`/profile`, sidebar nav #2)**: New profile page (`pages/profile.tsx`) lets students upload an avatar, edit their first name, view their locked email, and see their level + target band as read-only. Avatars are resized client-side to a 256×256 JPEG data URL (max ~380KB) and stored in `user_data` under key `avatar`; the API enforces a 420KB cap. The sidebar header (`components/layout.tsx`) shows the avatar (or a coloured initial chip) as a circular link to `/profile`, and refreshes when the page dispatches a `lexo:profile-updated` event. The page also includes a Change Password card that POSTs to `/api/access/change-password` with `x-student-email` + `x-student-token` headers (the same HMAC scheme used for student APIs); the backend verifies the current password via bcrypt, returns 401 on bad current and 400 on weak/short new (min 6 chars).
-   **PDF Plan Download**: Server-rendered, A4 portrait, bilingual EN+AR plan PDF via `POST /api/plan-pdf` (`artifacts/api-server/src/routes/plan-pdf.ts`). The endpoint accepts a payload built on the client by `lib/plan-pdf-client.ts` (which calls `getPlanSchedule` + `getPlanCoverage`) and uses puppeteer-core + system Chromium to render an HTML template with the 4IELTS logo, student block, bilingual coverage panel, and a two-column day-by-day schedule. Download buttons are exposed on the `/plan` page header and inside the My Plan drawer (`components/my-plan-button.tsx`); both reuse `downloadPlanPdf()` from `lib/plan-pdf-client.ts` to POST and stream the resulting blob.

## User Preferences

I prefer iterative development, with a focus on delivering small, testable increments.
When making significant changes, please ask for confirmation before proceeding.
I like to see clear, well-structured code with good comments where necessary.
I prefer detailed explanations for complex logic or architectural decisions.
Do not make changes to the folder `artifacts/flashcards/public`.
Do not make changes to the file `artifacts/flashcards/src/data/phrasal-verbs-data.json`.

## System Architecture

The project is structured as a pnpm workspace monorepo, facilitating the management of multiple packages (e.g., API server, UI, shared libraries) within a single repository.

**Core Technologies**:
-   **Node.js**: v24
-   **TypeScript**: v5.9
-   **Package Manager**: pnpm
-   **API Framework**: Express 5
-   **Database**: PostgreSQL with Drizzle ORM
-   **Validation**: Zod (v4)
-   **UI Framework**: React with Vite
-   **Build Tool**: esbuild

**Key Architectural Decisions**:
-   **Monorepo Structure**: Uses pnpm workspaces for managing inter-dependent packages and consistent tooling.
-   **Type Safety**: End-to-end type safety enforced by TypeScript and Zod for API schemas.
-   **API Codegen**: Orval is used to generate API hooks and Zod schemas from an OpenAPI specification, ensuring client-server contract consistency.
-   **Data Persistence**: PostgreSQL with Drizzle ORM manages all application data, including user progress, flashcards, SRS data, and quiz scores.
-   **Frontend Design**: The UI features a clean, educational-focused design with branding elements (4IELTS teal/navy). It includes persistent login, dark mode, and a responsive layout.
-   **Spaced Repetition System (SRS)**: Implements the SM-2 algorithm for optimizing flashcard review intervals, stored in the `card_srs` table.
-   **User Authentication/Authorization**: Access control based on email and access codes, with an admin panel protected by `requireAdmin` middleware. Persistent login sessions are stored in the database.
-   **Activity Position Persistence**: User's last-viewed card position and filters are saved for each activity, allowing seamless resumption of study sessions.
-   **AI Integration**: Seamlessly integrates with external AI services for writing evaluation (Orwell AI) and conversational assistance (LEXO AI), using dedicated API routes and environment variables for configuration.
-   **Background Processes**: PDF generation is handled on-demand with caching. Web push notifications are managed via VAPID and a cron scheduler for daily reminders.
-   **UI/UX Features**:
    -   **Branding**: 4IELTS teal/navy color scheme, specific logo, and footer link.
    -   **Theming**: Dark mode support with persistence.
    -   **Notifications**: Toast notifications for user feedback.
    -   **Interactivity**: 3D flip cards, interactive quizzes, and guided onboarding tours.
    -   **Accessibility**: Arabic translations, RTL layout where appropriate, and browser TTS for speaking topics.
-   **PDF Generation**: Utilizes puppeteer-core and a system Chromium instance to generate bilingual vocabulary PDFs, with caching for performance.

**Database Schema Highlights**:
-   `flashcards`: Stores core flashcard data.
-   `progress`: Tracks individual card mastery for each user.
-   `bookmarks`: User-specific bookmarked flashcards.
-   `card_srs`: Stores SM-2 algorithm state for each user's cards.
-   `activity_positions`: Saves user's progress within various activities.
-   `quiz_scores`: Records results of quizzes.
-   `user_data`: Generic key-value store for diverse user preferences and states (e.g., target IELTS band, exam date).
-   `weak_words`: Manages a personalized deck of words missed in quizzes.
-   `xp_events`: Logs experience points for gamification.
-   `push_subscriptions`: Stores web push notification subscription details.

## External Dependencies

-   **Database**: PostgreSQL
-   **ORM**: Drizzle ORM
-   **API Codegen**: Orval (generates from OpenAPI spec)
-   **AI Services**:
    -   Anthropic Claude (`claude-sonnet-4-6`) for LEXO AI Chat Assistant.
    -   Custom AI integration for Orwell AI (IELTS essay checker).
-   **PDF Generation**: Puppeteer-core (requires system Chromium)
-   **Web Push Notifications**: `web-push` library for VAPID-based push, `node-cron` for scheduling.
-   **Frontend Libraries**: React, Vite
-   **Validation**: Zod