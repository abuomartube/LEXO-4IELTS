# Churchill AI — Standalone IELTS Speaking Examiner

A fully standalone React + Express app for IELTS Speaking practice. Powered by GPT-4o, Whisper, and OpenAI TTS. Deploys to Netlify in one click.

## Features

- 🎤 Voice Mode — speak & get instant AI feedback (Whisper transcription + GPT-4o)
- ⌨️ Text Mode — type your answers and receive examiner corrections
- 📚 120 IELTS Speaking topics — all parts covered
- 🏆 Full Band Score Report after Part 3 (Fluency, Lexical, Grammar, Pronunciation)
- 📄 Downloadable session transcript
- 🌐 Navy + Gold design (4IELTS brand)
- 💬 WhatsApp floating button

---

## Quick Start (Local Development)

### 1. Install dependencies

```bash
npm install
```

### 2. Set environment variables

```bash
cp .env.example .env
# Then edit .env and add your OPENAI_API_KEY
```

Your `.env` file:
```
OPENAI_API_KEY=sk-...your-openai-api-key...
VITE_WHATSAPP_NUMBER=971500000000
```

> Replace `971500000000` with your WhatsApp number (country code + number, no `+` sign).

### 3. Add Churchill portrait image

Place a portrait image named `churchill.png` inside the `public/` folder. The image should be portrait orientation (e.g. 400×500 px).

### 4. Run the app

```bash
npm run dev
```

This starts:
- **Frontend** (Vite) → `http://localhost:5173`
- **API server** (Express) → `http://localhost:3001`

The Vite dev server proxies `/api/*` calls to the Express server automatically.

---

## Deploy to Netlify

### Option A: Netlify CLI

```bash
npm install -g netlify-cli
netlify login
netlify init
netlify deploy --prod
```

### Option B: GitHub + Netlify Dashboard

1. Push this project to a GitHub repository
2. Go to [netlify.com](https://netlify.com) → **Add new site** → **Import from Git**
3. Select your repo
4. Netlify auto-detects `netlify.toml` — build settings are pre-configured
5. Add environment variables in **Site settings → Environment variables**:
   - `OPENAI_API_KEY` = your OpenAI API key
   - `VITE_WHATSAPP_NUMBER` = your WhatsApp number (e.g. `971500000000`)
6. Deploy!

---

## Project Structure

```
churchill-ai/
├── index.html                  # App entry point
├── netlify.toml                # Netlify build & function config
├── package.json
├── vite.config.ts
├── tailwind.config.js
├── public/
│   └── churchill.png           # ← ADD YOUR PORTRAIT HERE
├── src/
│   ├── main.tsx
│   ├── App.tsx                 # Screen router (landing ↔ speaking)
│   ├── index.css               # Global styles + Tailwind
│   ├── lib/utils.ts
│   └── pages/
│       ├── Landing.tsx         # Welcome / intro page
│       └── Speaking.tsx        # Full IELTS Speaking session
├── server/
│   └── index.ts                # Express API server (all 4 routes)
└── netlify/
    └── functions/
        └── api.ts              # Serverless wrapper for Netlify
```

---

## API Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/message` | GPT-4o examiner response (SSE streaming) |
| POST | `/api/report` | GPT-4o final band score report |
| POST | `/api/transcribe` | Whisper voice transcription |
| POST | `/api/tts` | OpenAI TTS audio (voice: `onyx`) |

---

## Customisation

### WhatsApp number
Set `VITE_WHATSAPP_NUMBER` in your `.env` file (or Netlify env vars):
```
VITE_WHATSAPP_NUMBER=971501234567
```

### Examiner voice
In `server/index.ts`, change the `voice` parameter in the TTS route:
```ts
voice: "onyx"  // options: alloy, echo, fable, onyx, nova, shimmer
```

### Topics
The full topic list is in `src/pages/Speaking.tsx` → `TOPICS` array (120 topics).
Cue cards are in `CUE_CARDS` (same file).

---

## Requirements

- Node.js 18+
- OpenAI account with billing enabled (GPT-4o + Whisper + TTS)
- Netlify account (for deployment)
