import { useState } from 'react'
import { Terminal, MessageSquareCode, Menu, X } from 'lucide-react'

interface NavProps { onChatOpen: () => void }
const links = ['skills', 'experience', 'projects', 'achievements', 'contact']

export default function Navbar({ onChatOpen }: NavProps) {
  const [open, setOpen] = useState(false)

  return (
    <nav className="fixed top-0 inset-x-0 z-50 backdrop-blur-2xl bg-bg/90 border-b border-border">
      <div className="wrap flex items-center justify-between h-16">

        {/* Logo */}
        <a href="#hero" className="flex items-center gap-2 font-mono text-sm text-green no-underline shrink-0">
          <Terminal size={14} className="text-muted" />
          <span className="text-muted">~/</span>bishal
        </a>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8 list-none">
          {links.map(l => (
            <li key={l}>
              <a href={`#${l}`} className="nav-link">
                <span className="text-dim">./</span>{l}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <button
          onClick={onChatOpen}
          className="hidden md:flex items-center gap-2 font-mono text-xs text-green border border-border2 px-4 py-2 rounded-xl bg-transparent hover:bg-green-dim hover:shadow-glow transition-all duration-200 cursor-pointer shrink-0"
        >
          <MessageSquareCode size={13} />
          $ ask_ai
        </button>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(o => !o)}
          className="md:hidden text-muted hover:text-green transition-colors cursor-pointer bg-transparent border-none p-1"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile drawer */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${open ? 'max-h-96' : 'max-h-0'}`}>
        <div className="bg-bg2 border-t border-border px-5 py-6 flex flex-col gap-5">
          {links.map(l => (
            <a key={l} href={`#${l}`} onClick={() => setOpen(false)} className="nav-link text-base py-1">
              <span className="text-dim">./</span>{l}
            </a>
          ))}
          <button
            onClick={() => { onChatOpen(); setOpen(false) }}
            className="btn-green justify-center mt-1"
          >
            <MessageSquareCode size={15} />
            $ ask_ai --chat
          </button>
        </div>
      </div>
    </nav>
  )
}