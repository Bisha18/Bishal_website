<div align="center">

# ⚡ Bishal Paul — Portfolio

**Full Stack Engineer · Competitive Programmer · BIT Sindri**

[![React](https://img.shields.io/badge/React-19-61dafb?style=flat-square&logo=react&logoColor=white&labelColor=20232a)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178c6?style=flat-square&logo=typescript&logoColor=white)](https://typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06b6d4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.111-009688?style=flat-square&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com)
[![Gemini](https://img.shields.io/badge/Gemini_2.5_Flash-AI-8b5cf6?style=flat-square&logo=google&logoColor=white)](https://aistudio.google.com)
[![MongoDB](https://img.shields.io/badge/MongoDB-Motor-47a248?style=flat-square&logo=mongodb&logoColor=white)](https://mongodb.com)

*A terminal-aesthetic personal portfolio with an AI-powered resume chatbot*

[Live Demo](#) · [Report Bug](https://github.com/bishalpaul/portfolio/issues) · [Get Your Own Key](https://aistudio.google.com/apikey)

</div>

---

## 📸 Overview

A hacker-themed developer portfolio built with **React 19** and **Tailwind CSS v4**, featuring:

- 🤖 **AI Resume Chat** — Ask anything about Bishal; powered by Google Gemini 2.5 Flash
- 💬 **Persistent History** — Conversations stored per-session in MongoDB
- 🎨 **Terminal Aesthetic** — Animated grid, CRT scanlines, JetBrains Mono font, custom cursor
- 📱 **Fully Responsive** — Mobile-first, works on every screen size
- ✨ **Scroll Animations** — IntersectionObserver fade-up on every section
- ⚡ **Tailwind v4** — CSS-first config, zero `tailwind.config.js`

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19 + TypeScript + Vite 6 |
| Styling | **Tailwind CSS v4** (`@tailwindcss/vite` — no PostCSS) |
| Icons | Lucide React |
| Backend | Python FastAPI |
| Database | MongoDB + Motor (async) |
| AI | Google Gemini 2.5 Flash (`google-genai` SDK) |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+
- **Python** 3.10+
- **MongoDB** — [local](https://www.mongodb.com/try/download/community) or [Atlas free tier](https://cloud.mongodb.com)
- **Gemini API key** — free at [aistudio.google.com/apikey](https://aistudio.google.com/apikey) *(no credit card)*

---

### 1. Clone the repo

```bash
git clone https://github.com/bishalpaul/portfolio.git
cd portfolio
```

### 2. Set up the backend

```bash
cd backend
pip install -r requirements.txt
cp .env.example .env
```

Edit `backend/.env`:

```env
GEMINI_API_KEY=AIza...        # from aistudio.google.com/apikey
MONGO_URI=mongodb://localhost:27017
```

Start the server:

```bash
uvicorn main:app --reload --port 8000
```

> API docs available at `http://localhost:8000/docs`

### 3. Set up the frontend

```bash
# from project root
npm install
cp .env.example .env
```

Edit `.env`:

```env
VITE_BACKEND_URL=http://localhost:8000
```

Start dev server:

```bash
npm run dev
# → http://localhost:3000
```

> **Tip:** You can also enter your Gemini API key directly in the chat widget UI — no restart needed, it's saved to `localStorage`.

---

## 📁 Project Structure

```
portfolio/
├── src/
│   ├── components/
│   │   ├── Cursor.tsx          # Custom animated cursor
│   │   ├── Navbar.tsx          # Fixed nav + mobile hamburger
│   │   ├── Hero.tsx            # Terminal card, name, stats
│   │   ├── Skills.tsx          # Skill pill grid
│   │   ├── Experience.tsx      # Education timeline
│   │   ├── Projects.tsx        # TalkM · Spoon · Klimate
│   │   ├── Achievements.tsx    # ICPC · Hackfest · SIH
│   │   ├── Contact.tsx         # Links grid
│   │   ├── ChatWidget.tsx      # Gemini AI chat panel
│   │   └── Footer.tsx
│   ├── hooks/
│   │   └── useScrollAnimation.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css               # Tailwind v4 @theme config
├── backend/
│   ├── main.py                 # FastAPI + Gemini + MongoDB
│   ├── requirements.txt
│   └── .env.example
├── vite.config.ts              # @tailwindcss/vite plugin
├── package.json
└── tsconfig.json
```

---

## 🧠 How the AI Chat Works

1. User types a question in the chat widget
2. Frontend sends `{ message, session_id, gemini_api_key }` to `POST /api/chat`
3. FastAPI fetches the session's message history from MongoDB
4. Sends history + new message to **Gemini 2.5 Flash** with a system prompt containing Bishal's full resume data
5. Response is saved to MongoDB and streamed back to the UI

```
User → ChatWidget → FastAPI → MongoDB (history) → Gemini 2.5 Flash → Response
```

---

## 📡 API Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/` | Health check |
| `POST` | `/api/chat` | Send a message, get AI reply |
| `GET` | `/api/history/{session_id}` | Fetch session history |
| `DELETE` | `/api/history/{session_id}` | Clear a session |
| `GET` | `/api/stats` | Total messages + sessions |

**Example request:**
```bash
curl -X POST http://localhost:8000/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "What projects has Bishal built?",
    "session_id": "demo_123",
    "gemini_api_key": "AIza..."
  }'
```

---

## 🎨 Tailwind v4 — CSS-First Config

This project uses the new Tailwind v4 CSS-first approach. **No `tailwind.config.js` file exists.**

```css
/* src/index.css */
@import "tailwindcss";

@theme {
  --color-green:       #00ff88;   /* → bg-green, text-green, border-green */
  --color-bg2:         #0d1117;   /* → bg-bg2 */
  --font-mono:         "JetBrains Mono"; /* → font-mono */
  --shadow-glow:       0 0 28px rgba(0,255,136,0.25); /* → shadow-glow */
  --animate-blink:     blink 1.1s step-end infinite;  /* → animate-blink */
}
```

```ts
// vite.config.ts — replaces PostCSS setup entirely
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [tailwindcss(), react()],
})
```

---

## ☁️ Free Deployment with Cloudflare Tunnel

Get a public HTTPS URL with zero cost using [cloudflared](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/downloads/):

```bash
# Expose backend
uvicorn main:app --host 0.0.0.0 --port 8000
cloudflared tunnel --url http://localhost:8000
# ↳ https://xxxx.trycloudflare.com

# Update frontend .env
VITE_BACKEND_URL=https://xxxx.trycloudflare.com

# Build and expose frontend
npm run build && npm run preview
cloudflared tunnel --url http://localhost:4173
# ↳ https://yyyy.trycloudflare.com  ← your live URL
```

---

## 📬 Contact

**Bishal Paul**

[![Gmail](https://img.shields.io/badge/d.bishalpaul@gmail.com-EA4335?style=flat-square&logo=gmail&logoColor=white)](mailto:d.bishalpaul@gmail.com)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-bishalpaul-0077b5?style=flat-square&logo=linkedin&logoColor=white)](https://linkedin.com/in/bishalpaul)
[![GitHub](https://img.shields.io/badge/GitHub-bishalpaul-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/bishalpaul)
[![Codeforces](https://img.shields.io/badge/Codeforces-bishalpaul-1f8acb?style=flat-square&logo=codeforces&logoColor=white)](https://codeforces.com/profile/bishalpaul)
[![LeetCode](https://img.shields.io/badge/LeetCode-bishalpaul-ffa116?style=flat-square&logo=leetcode&logoColor=white)](https://leetcode.com/bishalpaul)

---

<div align="center">

Made with 💚 by Bishal Paul · BIT Sindri · 2026

</div>
