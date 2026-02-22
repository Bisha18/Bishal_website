from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from motor.motor_asyncio import AsyncIOMotorClient
from google import genai
from google.genai import types
import os
from datetime import datetime
from typing import Optional
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="Bishal Paul — Portfolio API", version="2.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── MongoDB ───────────────────────────────────────────────────────────────
MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017")
mongo_client = AsyncIOMotorClient(MONGO_URI)
db = mongo_client["bishal_portfolio"]
chat_collection = db["chat_messages"]

# ── System Prompt ─────────────────────────────────────────────────────────
SYSTEM_PROMPT = """You are an AI assistant embedded in Bishal Paul's personal portfolio website.
Answer questions accurately and enthusiastically based on the resume data below.
Keep answers concise, friendly, and professional. Use bullet points for lists where helpful.
If asked something not in the resume, say you don't have that info but offer to help with what you know.

=== PERSONAL INFO ===
Name: Bishal Paul
Email: d.bishalpaul@gmail.com
Phone: +91-9123206127
GitHub: github.com/bishalpaul
LinkedIn: linkedin.com/in/bishalpaul
Competitive Programming: Codeforces, CodeChef, LeetCode

=== PROFESSIONAL SUMMARY ===
Full Stack Software Engineer with hands-on MERN stack experience building scalable and secure web applications.
Proficient in cross-platform mobile apps with React Native and Expo.
Strong expertise in REST API design, real-time systems (WebSockets/Socket.IO), JWT auth, and database management
with both PostgreSQL (SQL) and MongoDB (NoSQL).
1000+ competitive programming problems solved across multiple platforms.

=== EDUCATION ===
Institution: Birsa Institute of Technology (BIT), Sindri, Jharkhand
Degree: B.Tech in Electronics and Communication Engineering
CGPA: 7.5 / 10.0
Duration: November 2022 – May 2026  (final year, graduating May 2026)

=== TECHNICAL SKILLS ===
Languages : C++, JavaScript, TypeScript, HTML, CSS
Frontend  : React.js, React Native, Redux Toolkit, Tailwind CSS, Vite, Expo
Backend   : Node.js, Express.js, REST APIs, JWT, Socket.IO
Databases : MongoDB, PostgreSQL, SQL, Mongoose
Tools     : Git, GitHub, Postman, Vercel, Clerk, Linux, Windows

=== PROJECTS ===

1. TalkM — Real-Time Chat App  |  GitHub + Live Demo
   Stack: React.js, Node.js, Socket.IO
   • Full-stack chat with online presence tracking
   • Room-based group & private chats, secure auth, session management
   • Typing indicators, message acknowledgments, offline notifications
   • Responsive UI with persistent message history

2. Spoon — Cross-Platform Recipe Engine  |  GitHub
   Stack: React Native, Expo, Node.js, PostgreSQL, Clerk
   • iOS & Android recipe-discovery app
   • HD video tutorials + nutritional breakdowns via third-party APIs
   • Clerk auth with social login and MFA
   • Offline-first architecture with recipe caching

3. Klimate — Real-Time Weather App  |  GitHub + Live Demo
   Stack: TypeScript, TanStack Query, Recharts, shadcn/ui
   • Real-time + cached weather data
   • 5-day forecast charts, city search, geolocation auto-detect
   • Dark mode support, fully responsive

=== ACHIEVEMENTS ===
• 3rd place — Hackfest 2025, Problem Statement Track, IIT (ISM) Dhanbad (certificate awarded)
• 2nd rank  — ICPC 2024 Amritapuri Prelims, representing BIT Sindri
• 1000+ problems: 400+ Codeforces, 200+ CodeChef, 400+ LeetCode
• SIH 2024 Grand Finale waitlist — Ministry of Education track

=== CURRENT STATUS ===
Final year student, graduating May 2026.
Actively seeking full-time SWE roles or internships (Full Stack / Backend / Mobile).
Open to product companies and startups. Location: Jharkhand, India — open to relocation.
"""

# ── Pydantic models ───────────────────────────────────────────────────────
class ChatRequest(BaseModel):
    message: str
    session_id: str
    gemini_api_key: Optional[str] = None

class ChatResponse(BaseModel):
    response: str
    session_id: str
    timestamp: str

# ── MongoDB helpers ───────────────────────────────────────────────────────
async def save_message(session_id: str, role: str, content: str):
    await chat_collection.insert_one({
        "session_id": session_id,
        "role": role,
        "content": content,
        "timestamp": datetime.utcnow(),
    })

async def get_history(session_id: str, limit: int = 10) -> list[dict]:
    cursor = (
        chat_collection
        .find({"session_id": session_id}, {"_id": 0, "role": 1, "content": 1})
        .sort("timestamp", -1)
        .limit(limit)
    )
    docs = await cursor.to_list(length=limit)
    return [{"role": d["role"], "content": d["content"]} for d in reversed(docs)]

# ── Routes ────────────────────────────────────────────────────────────────
@app.get("/")
async def root():
    return {"status": "Bishal Paul Portfolio API", "engine": "Google Gemini 2.5 Flash", "docs": "/docs"}

@app.get("/health")
async def health():
    try:
        await mongo_client.admin.command("ping")
        mongo_status = "connected"
    except Exception:
        mongo_status = "disconnected"
    return {
        "status": "healthy",
        "mongodb": mongo_status,
        "engine": "gemini-2.5-flash",
        "timestamp": datetime.utcnow().isoformat(),
    }

@app.post("/api/chat", response_model=ChatResponse)
async def chat(req: ChatRequest):
    api_key = req.gemini_api_key or os.getenv("GEMINI_API_KEY", "")
    if not api_key:
        raise HTTPException(
            status_code=400,
            detail="Gemini API key required. Add GEMINI_API_KEY to .env or pass gemini_api_key in the request.",
        )

    history = await get_history(req.session_id)
    await save_message(req.session_id, "user", req.message)

    # Build Gemini contents — roles must be "user" or "model"
    contents: list[types.Content] = []
    for h in history:
        gemini_role = "model" if h["role"] == "assistant" else "user"
        contents.append(
            types.Content(role=gemini_role, parts=[types.Part(text=h["content"])])
        )
    contents.append(
        types.Content(role="user", parts=[types.Part(text=req.message)])
    )

    try:
        client = genai.Client(api_key=api_key)
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=contents,
            config=types.GenerateContentConfig(
                system_instruction=SYSTEM_PROMPT,
                max_output_tokens=600,
                temperature=0.7,
            ),
        )
        ai_reply = response.text
    except Exception as e:
        err = str(e)
        if "API_KEY_INVALID" in err or "API key not valid" in err:
            raise HTTPException(status_code=401, detail="Invalid Gemini API key. Get one free at aistudio.google.com.")
        if "quota" in err.lower():
            raise HTTPException(status_code=429, detail="Gemini quota exceeded. Try again later.")
        raise HTTPException(status_code=500, detail=f"Gemini error: {err}")

    await save_message(req.session_id, "assistant", ai_reply)

    return ChatResponse(
        response=ai_reply,
        session_id=req.session_id,
        timestamp=datetime.utcnow().isoformat(),
    )

@app.get("/api/history/{session_id}")
async def get_chat_history(session_id: str):
    return {"session_id": session_id, "messages": await get_history(session_id, limit=50)}

@app.delete("/api/history/{session_id}")
async def clear_history(session_id: str):
    result = await chat_collection.delete_many({"session_id": session_id})
    return {"message": f"Deleted {result.deleted_count} messages"}

@app.get("/api/stats")
async def stats():
    total = await chat_collection.count_documents({})
    sessions = await chat_collection.distinct("session_id")
    return {"total_messages": total, "unique_sessions": len(sessions)}