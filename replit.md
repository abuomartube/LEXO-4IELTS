# Overview

This pnpm workspace monorepo is an English Flashcards App designed to prepare students for the IELTS exam. It provides a comprehensive learning platform with flashcards, quizzes, spaced repetition, AI-powered writing feedback, and mock tests. The application aims to offer a personalized and effective learning experience, focusing on vocabulary, grammar, and exam-specific skills for a global audience, particularly those seeking bilingual English-Arabic resources.

Key capabilities include:
-   **Extensive Flashcard System**: 2,198 CEFR-corrected flashcards with Arabic translations and bilingual example sentences.
-   **Interactive Study Modes**: Study, Quiz, Browse, Spell It (timed game with TTS), and Spaced Repetition (SM-2 algorithm).
-   **AI-Powered Tools**: Orwell AI for IELTS essay checking and LEXO AI Chat Assistant for IELTS-specific queries.
-   **Comprehensive Testing**: Full IELTS Listening, Reading, and Mock Tests with auto-grading and feedback.
-   **Personalized Learning**: Daily streaks, weak-word decks, progress tracking, and onboarding for customized study plans.
-   **Teacher Dashboard**: Admin interface for monitoring student progress, activity, and in-app/web push notification management.
-   **Public Reviews with Admin Replies**: Approved student reviews displayed on the landing page, with admin reply functionality.
-   **Rich Content**: Phrasal verbs, grammar topics, writing templates, speaking topic banks, and AI story exercises.
-   **Full-Mode Plan Content Scheduling**: Structured daily learning plans covering various content types.
-   **PDF Plan Download**: Server-rendered, bilingual EN+AR plan PDF for students.

# User Preferences

I prefer iterative development, with a focus on delivering small, testable increments.
When making significant changes, please ask for confirmation before proceeding.
I like to see clear, well-structured code with good comments where necessary.
I prefer detailed explanations for complex logic or architectural decisions.
Do not make changes to the folder `artifacts/flashcards/public`.
Do not make changes to the file `artifacts/flashcards/src/data/phrasal-verbs-data.json`.

# System Architecture

The project is a pnpm workspace monorepo, organizing multiple packages (API server, UI, shared libraries).

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
-   **Monorepo Structure**: Facilitates package management and consistent tooling.
-   **Type Safety**: End-to-end type safety enforced by TypeScript and Zod.
-   **API Codegen**: Orval generates API hooks and Zod schemas from an OpenAPI specification for client-server consistency.
-   **Data Persistence**: PostgreSQL with Drizzle ORM for all application data (user progress, flashcards, SRS, quizzes).
-   **Frontend Design**: Clean, educational-focused design with 4IELTS branding (teal/navy), persistent login, dark mode, and responsiveness.
-   **Spaced Repetition System (SRS)**: Implements the SM-2 algorithm for optimal flashcard review intervals.
-   **User Authentication/Authorization**: Email and access code-based authentication, with `requireAdmin` middleware for admin panel.
-   **Activity Position Persistence**: Saves user's last-viewed position and filters for seamless session resumption.
-   **AI Integration**: Seamless integration with external AI services for writing evaluation and conversational assistance.
-   **Background Processes**: On-demand PDF generation, VAPID-based web push notifications, and scheduled cron jobs.
-   **UI/UX Features**: 3D flip cards, interactive quizzes, guided onboarding, Arabic translations, RTL layout support, and browser TTS.
-   **PDF Generation**: Uses puppeteer-core and system Chromium for bilingual PDF generation with caching.
-   **Idle Session Timeout**: Automatic user logout after inactivity with a warning modal.
-   **AI Usage Tracking & Admin Alerts**: Logs successful AI calls, summarizes usage, and sends admin email alerts for high usage/cost.
-   **Profile Page**: Allows avatar upload, name editing, and password changes.

**Database Schema Highlights**:
-   `flashcards`, `progress`, `bookmarks`, `card_srs`, `activity_positions`, `quiz_scores`, `user_data`, `weak_words`, `xp_events`, `push_subscriptions`, `ai_usage_events`, `admin_alerts_sent`, `reviews`.

# External Dependencies

-   **Database**: PostgreSQL
-   **ORM**: Drizzle ORM
-   **API Codegen**: Orval
-   **AI Services**:
    -   Anthropic Claude (e.g., `claude-sonnet-4-6`)
    -   Custom AI integration for Orwell AI
    -   OpenAI TTS (voice="onyx", model="tts-1-hd")
-   **PDF Generation**: Puppeteer-core
-   **Web Push Notifications**: `web-push` library
-   **Scheduling**: `node-cron`
-   **Frontend Libraries**: React, Vite
-   **Validation**: Zod
-   **Email Service**: SendGrid REST API (for admin alerts)