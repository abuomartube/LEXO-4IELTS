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
- 78 pre-seeded flashcards across A1, A2, B1, B2 levels with Arabic translations
- Pages: Dashboard, Study Mode (3D flip cards), Browse Cards, Progress tracker
- API routes: `/api/flashcards`, `/api/progress`, `/api/progress/summary`
- DB tables: `flashcards`, `progress`

## Database Schema

- `flashcards` — id, english, arabic, level (A1/A2/B1/B2), category, example_sentence, example_sentence_arabic
- `progress` — id, flashcard_id (FK), known, reviewed_at
