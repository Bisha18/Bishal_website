import { useState } from 'react'
import { Bot, X } from 'lucide-react'
import Cursor       from './components/Cursor'
import Navbar       from './components/Navbar'
import Hero         from './components/Hero'
import Skills       from './components/Skills'
import Experience   from './components/Experience'
import Projects     from './components/Projects'
import Achievements from './components/Achievements'
import Contact      from './components/Contact'
import Footer       from './components/Footer'
import ChatWidget   from './components/ChatWidget'

export default function App() {
  const [chatOpen, setChatOpen] = useState(false)

  return (
    <div className="bg-bg text-text font-body">
      <Cursor />
      <Navbar onChatOpen={() => setChatOpen(true)} />

      <main>
        <Hero      onChatOpen={() => setChatOpen(true)} />
        <Skills />
        <Experience />
        <Projects />
        <Achievements />
        <Contact />
      </main>

      <Footer />

      {/* ── Floating chat FAB ── */}
      <div className="fixed bottom-6 right-5 sm:right-7 z-[200]">
        <ChatWidget open={chatOpen} onClose={() => setChatOpen(false)} />
        <button
          onClick={() => setChatOpen(o => !o)}
          title="Ask AI about Bishal"
          className={`
            flex items-center justify-center size-14 rounded-2xl
            border-none cursor-pointer shadow-fab
            transition-all duration-200 hover:scale-110 active:scale-95
            ${chatOpen ? 'bg-[#ff5f56] text-white' : 'bg-green text-bg'}
          `}
        >
          {chatOpen ? <X size={22} /> : <Bot size={22} />}
        </button>
      </div>
    </div>
  )
}