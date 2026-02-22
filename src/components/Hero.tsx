import { MessageSquareCode, FolderGit2, CircleDot } from 'lucide-react'

interface HeroProps { onChatOpen: () => void }

const stats = [
  { num: '400+', label: 'LeetCode' },
  { num: '400+', label: 'Codeforces' },
  { num: '200+', label: 'CodeChef' },
  { num: '2nd',  label: 'ICPC 2024' },
  { num: '3rd',  label: "Hackfest '25" },
]

const termLines = [
  { prompt: true },
  { key: '"role"',            val: '"Full Stack Software Engineer"' },
  { key: '"stack"',           val: '"MERN + React Native + TypeScript"' },
  { key: '"problems_solved"', val: '1000+', comment: '// CF + CC + LC' },
  { key: '"status"',          val: '"open_to_work"', cursor: true },
]

export default function Hero({ onChatOpen }: HeroProps) {
  return (
    <section
      id="hero"
      className="relative bg-bg overflow-x-hidden"
      style={{
        paddingTop: 'calc(64px + 4rem)',  /* navbar (64px) + spacing */
        paddingBottom: '5rem',
      }}
    >
      {/* Animated grid background */}
      <div className="grid-bg" />

      {/* Ambient glow blobs */}
      <div
        className="absolute size-[640px] rounded-full pointer-events-none -top-48 -right-48"
        style={{ background: 'radial-gradient(circle, rgba(0,255,136,0.07) 0%, transparent 65%)' }}
      />
      <div
        className="absolute size-[400px] rounded-full pointer-events-none bottom-0 -left-24"
        style={{ background: 'radial-gradient(circle, rgba(0,229,255,0.05) 0%, transparent 65%)' }}
      />

      <div className="wrap relative z-10">
        <div className="max-w-2xl mx-auto flex flex-col items-center text-center gap-10">

          {/* ── Terminal card ── */}
          <div className="w-full bg-bg2 border border-border2 rounded-2xl overflow-hidden shadow-term">
            {/* Title bar */}
            <div className="flex items-center gap-2 px-5 py-3 bg-bg3 border-b border-border">
              <span className="size-3 rounded-full bg-[#ff5f56]" />
              <span className="size-3 rounded-full bg-[#ffbd2e]" />
              <span className="size-3 rounded-full bg-[#27c93f]" />
              <span className="font-mono text-[0.68rem] text-muted ml-3 truncate">
                bishal@portfolio:~$ whoami
              </span>
            </div>
            {/* Output lines */}
            <div className="p-5 sm:p-7 flex flex-col gap-1 text-left overflow-x-auto">
              {termLines.map((l, i) => (
                <div key={i} className="font-mono text-[0.78rem] sm:text-sm leading-7 whitespace-nowrap">
                  {l.prompt
                    ? <>
                        <span className="text-green">❯ </span>
                        <span className="text-cyan">cat </span>
                        <span className="text-yellow-300">profile.json</span>
                      </>
                    : <>
                        <span className="text-green">{l.key}</span>
                        <span className="text-text">: </span>
                        <span className="text-yellow-300">{l.val}</span>
                        {l.comment && <span className="text-muted"> {l.comment}</span>}
                        {l.cursor  && <span className="cursor-blink" />}
                      </>
                  }
                </div>
              ))}
            </div>
          </div>

          {/* ── Name ── */}
          <div className="flex flex-col items-center gap-3">
            <h1
              className="font-display font-black leading-[0.9] tracking-[-0.04em] text-text"
              style={{ fontSize: 'clamp(2.8rem, 11vw, 7rem)' }}
            >
              BISHAL<br />
              <span className="text-outline">PAUL</span>
            </h1>
            <p className="font-mono text-[0.75rem] sm:text-sm text-muted tracking-wide leading-relaxed">
              <span className="text-green">Full Stack Engineer</span>
              <span className="text-dim mx-2">/</span>MERN
              <span className="text-dim mx-2">/</span>React Native
              <span className="text-dim mx-2">/</span>
              <span className="text-green">Competitive Programmer</span>
            </p>
          </div>

          {/* ── Tagline ── */}
          <p className="text-sm sm:text-base text-muted leading-relaxed max-w-lg">
            Building scalable web &amp; mobile apps with real-time capabilities.
            Final year ECE @ BIT Sindri · 1000+ problems solved · IIT Hackfest podium.
          </p>

          {/* ── CTAs ── */}
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <button onClick={onChatOpen} className="btn-green justify-center">
              <MessageSquareCode size={16} />
              $ chat_with_resume
            </button>
            <a href="#projects" className="btn-ghost justify-center">
              <FolderGit2 size={16} />
              ./see_projects →
            </a>
          </div>

          {/* ── Stats ── */}
          <div className="w-full pt-8 border-t border-border">
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-4 sm:gap-6">
              {stats.map(s => (
                <div key={s.label} className="flex flex-col items-center gap-2">
                  <span
                    className="font-display font-black text-green leading-none"
                    style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)' }}
                  >
                    {s.num}
                  </span>
                  <span className="font-mono text-[0.55rem] sm:text-[0.6rem] text-dim uppercase tracking-[0.1em] flex items-center gap-1 leading-tight">
                    <CircleDot size={7} className="text-green opacity-60 shrink-0" />
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}