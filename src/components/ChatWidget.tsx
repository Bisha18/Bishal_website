import { useState, useRef, useEffect, useCallback } from 'react'
import { Bot, X, Send, ChevronRight, Key, Loader2 } from 'lucide-react'

interface Msg { role: 'user' | 'assistant'; content: string }

const BACKEND = import.meta.env.VITE_BACKEND_URL ?? 'http://localhost:8000'

const SUGGESTIONS = [
  "What are Bishal's skills?",
  "Tell me about TalkM",
  "ICPC achievement?",
  "Is he available?",
  "His education?",
]

function Dots() {
  return (
    <div className="flex gap-1 items-center py-1">
      <span className="typing-dot" />
      <span className="typing-dot" />
      <span className="typing-dot" />
    </div>
  )
}

export default function ChatWidget({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [msgs, setMsgs]         = useState<Msg[]>([{
    role: 'assistant',
    content: "Hey 👋 I'm powered by Gemini 2.5 Flash and know everything about Bishal. What would you like to know?"
  }])
  const [input, setInput]       = useState('')
  const [busy, setBusy]         = useState(false)
  const [apiKey, setApiKey]     = useState(() => localStorage.getItem('bp_gemini_key') ?? '')
  const [draft, setDraft]       = useState(apiKey)
  const [saved, setSaved]       = useState(false)
  const [showSugg, setShowSugg] = useState(true)
  const [sessId]                = useState(() => 'bp_' + Math.random().toString(36).slice(2, 9))
  const msgsRef                 = useRef<HTMLDivElement>(null)
  const inputRef                = useRef<HTMLTextAreaElement>(null)

  useEffect(() => { if (open) setTimeout(() => inputRef.current?.focus(), 300) }, [open])
  useEffect(() => {
    msgsRef.current?.scrollTo({ top: msgsRef.current.scrollHeight, behavior: 'smooth' })
  }, [msgs, busy])

  const saveKey = () => {
    const k = draft.trim()
    setApiKey(k)
    localStorage.setItem('bp_gemini_key', k)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const send = useCallback(async (text: string) => {
    if (!text.trim() || busy) return
    setShowSugg(false)
    setMsgs(m => [...m, { role: 'user', content: text }])
    setInput('')
    setBusy(true)
    try {
      const res = await fetch(`${BACKEND}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, session_id: sessId, gemini_api_key: apiKey || undefined }),
      })
      const data = await res.json()
      setMsgs(m => [...m, {
        role: 'assistant',
        content: res.ok ? data.response : `⚠️ ${data.detail ?? 'Error'}`,
      }])
    } catch {
      setMsgs(m => [...m, {
        role: 'assistant',
        content: '⚠️ Cannot reach backend.\n\nRun: uvicorn main:app --reload\nfrom /backend',
      }])
    }
    setBusy(false)
  }, [busy, sessId, apiKey])

  return (
    <div className={`
      absolute bottom-20 right-0
      w-[min(22rem,calc(100vw-2rem))] sm:w-96
      bg-bg2 border border-border2 rounded-2xl
      flex flex-col overflow-hidden shadow-chat
      transition-all duration-300 origin-bottom-right
      ${open
        ? 'scale-100 opacity-100 pointer-events-auto translate-y-0'
        : 'scale-90 opacity-0 pointer-events-none translate-y-4'
      }
    `}>

      {/* ── Header ── */}
      <div className="flex items-center justify-between px-5 py-4 bg-bg3 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="size-9 rounded-xl bg-gradient-to-br from-green to-cyan flex items-center justify-center shrink-0">
            <Bot size={16} className="text-bg" />
          </div>
          <div>
            <p className="font-mono text-sm font-bold text-green">resume_ai.exe</p>
            <p className="font-mono text-[0.6rem] text-muted flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-green" style={{ animation: 'pulseDot 2s ease-in-out infinite' }} />
              Gemini 2.5 Flash
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-muted hover:text-green transition-colors cursor-pointer bg-transparent border-none p-1"
        >
          <X size={16} />
        </button>
      </div>

      {/* ── API Key ── */}
      <div className="px-4 py-3 bg-bg border-b border-border">
        <p className="font-mono text-[0.58rem] text-muted tracking-wide mb-2 flex items-center gap-1">
          <Key size={9} />
          GEMINI API KEY —{' '}
          <a
            href="https://aistudio.google.com/apikey"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan no-underline hover:underline"
          >
            get free key ↗
          </a>
        </p>
        <div className="flex gap-2">
          <input
            type="password"
            value={draft}
            onChange={e => setDraft(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && saveKey()}
            placeholder="AIza..."
            className="flex-1 bg-bg2 border border-border text-text font-mono text-[0.68rem]
                       px-3 py-2 rounded-xl outline-none focus:border-green2 transition-colors"
          />
          <button
            onClick={saveKey}
            className="font-mono text-[0.65rem] font-bold bg-green text-bg
                       px-3 py-2 rounded-xl hover:bg-[#00ffaa] transition-colors
                       cursor-pointer border-none min-w-[52px]"
          >
            {saved ? '✓ OK' : 'Save'}
          </button>
        </div>
      </div>

      {/* ── Messages ── */}
      <div
        ref={msgsRef}
        className="flex flex-col gap-3 p-4 overflow-y-auto min-h-[260px] max-h-[320px]"
        style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(0,255,136,0.2) transparent' }}
      >
        {msgs.map((m, i) => (
          <div
            key={i}
            className={`flex gap-2 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}
            style={{ animation: 'msgIn 0.3s ease both' }}
          >
            <div className={`size-7 rounded-xl shrink-0 flex items-center justify-center text-[0.65rem]
                             ${m.role === 'assistant'
                               ? 'bg-gradient-to-br from-green to-cyan'
                               : 'bg-bg4 border border-border'}`}>
              {m.role === 'assistant' ? <Bot size={13} className="text-bg" /> : '👤'}
            </div>
            <div className={m.role === 'assistant' ? 'bubble-bot' : 'bubble-user'}>
              {m.content}
            </div>
          </div>
        ))}

        {busy && (
          <div className="flex gap-2" style={{ animation: 'msgIn 0.3s ease both' }}>
            <div className="size-7 rounded-xl shrink-0 flex items-center justify-center bg-gradient-to-br from-green to-cyan">
              <Loader2 size={12} className="text-bg animate-spin" />
            </div>
            <div className="bubble-bot"><Dots /></div>
          </div>
        )}
      </div>

      {/* ── Suggestions ── */}
      {showSugg && (
        <div className="flex flex-wrap gap-2 px-4 pb-3">
          {SUGGESTIONS.map(s => (
            <button
              key={s}
              onClick={() => send(s)}
              className="font-mono text-[0.6rem] text-green border border-border2 bg-green-dim
                         px-2.5 py-1 rounded-lg hover:bg-[rgba(0,255,136,0.18)]
                         transition-all duration-150 whitespace-nowrap cursor-pointer"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* ── Input ── */}
      <div className="flex gap-2 px-4 py-4 border-t border-border">
        <textarea
          ref={inputRef}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(input) } }}
          placeholder="Ask anything about Bishal…"
          rows={1}
          className="flex-1 bg-bg3 border border-border text-text font-mono text-[0.76rem]
                     px-4 py-2.5 rounded-xl resize-none h-10 outline-none
                     focus:border-green2 transition-colors"
        />
        <button
          onClick={() => send(input)}
          disabled={busy || !input.trim()}
          className="size-10 bg-green text-bg rounded-xl flex items-center justify-center
                     hover:bg-[#00ffaa] disabled:opacity-40 disabled:cursor-not-allowed
                     transition-all shrink-0 border-none cursor-pointer"
        >
          <Send size={14} />
        </button>
      </div>

      {/* ── Footer label ── */}
      <p className="text-center font-mono text-[0.55rem] text-dim pb-3 flex items-center justify-center gap-1">
        <ChevronRight size={8} className="text-green opacity-50" />
        Gemini 2.5 Flash · MongoDB history
      </p>
    </div>
  )
}