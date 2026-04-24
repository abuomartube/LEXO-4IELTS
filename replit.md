# Overview

This is a pnpm workspace monorepo using TypeScript, designed to build a comprehensive English Flashcards App. The primary purpose is to provide an educational platform for students preparing for the IELTS exam, offering a rich set of learning tools including flashcards, quizzes, spaced repetition, AI-powered writing feedback, and mock tests. The application aims to deliver a personalized and effective learning experience, focusing on vocabulary, grammar, and exam-specific skills.

The project utilizes a modern web stack, emphasizing a performant and scalable architecture. It targets a global audience of IELTS aspirants, particularly those seeking bilingual English-Arabic learning resources. Key capabilities include:

-   **Extensive Flashcard System**: 2,198 unique CEFR-corrected flashcards with Arabic translations and bilingual example sentences.
-   **Interactive Study Modes**: Study, Quiz, Browse, Spell It (timed spelling game with TTS clue audio preloaded for the current word + 2 ahead so playback is instant), and Spaced Repetition (SM-2 algorithm) for effective vocabulary acquisition.
-   **AI-Powered Tools**: Orwell AI for IELTS essay checking with Band 7 grading anchors and LEXO AI Chat Assistant for IELTS-specific queries.
-   **Comprehensive Testing**: Full IELTS Listening, Reading, and Mock Tests with auto-grading and detailed feedback.
-   **Personalized Learning**: Daily streaks, weak-word decks, progress tracking, and an onboarding flow for customized study plans.
-   **Teacher Dashboard**: Admin interface to monitor student progress and activity.
-   **Rich Content**: Phrasal verbs, grammar topics, writing templates, and speaking topic banks.

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