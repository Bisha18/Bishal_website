import { Github, ExternalLink } from 'lucide-react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

interface Project {
  num: string
  title: string
  desc: string
  stack: string[]
  github: string
  live?: string
}

const projects: Project[] = [
  {
    num: '01', title: 'TalkM',
    desc: 'Full-stack real-time chat with online presence tracking, room-based group & private chats, typing indicators, and offline message notifications.',
    stack: ['React.js', 'Node.js', 'Socket.IO', 'JWT'],
    github: 'https://github.com/Bisha18/chatweb_frontend', live: 'https://talksyweb.vercel.app',
  },
  {
    num: '02', title: 'Spoon',
    desc: 'Cross-platform recipe discovery app for iOS & Android. HD video tutorials, nutritional breakdowns, Clerk auth with MFA, offline-first caching.',
    stack: ['React Native', 'Expo', 'Node.js', 'PostgreSQL', 'Clerk'],
    github: 'https://github.com/Bisha18/recipie_spoon',
  },
  {
    num: '03', title: 'Klimate',
    desc: 'Modern weather app with real-time data, 5-day forecast charts, geolocation auto-detect, dark mode, and city search — fully in TypeScript.',
    stack: ['TypeScript', 'TanStack Query', 'Recharts', 'shadcn/ui'],
    github: 'https://github.com/Bisha18/klimate', live: 'https://klimate-sigma.vercel.app/',
  },
]

function Card({ p, delay }: { p: Project; delay: number }) {
  const ref = useScrollAnimation()
  return (
    <div
      ref={ref}
      className="card group relative flex flex-col gap-6 p-7 sm:p-8 overflow-hidden"
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Slide-in top accent on hover */}
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-green to-cyan
                      scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

      {/* Number + Links */}
      <div className="flex items-center justify-between">
        <span className="font-mono text-xs text-dim font-semibold tracking-widest">/ {p.num}</span>
        <div className="flex gap-2">
          {[
            { href: p.github, Icon: Github,       label: 'code' },
            ...(p.live ? [{ href: p.live, Icon: ExternalLink, label: 'live' }] : []),
          ].map(({ href, Icon, label }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer"
               className="flex items-center gap-1.5 font-mono text-[0.63rem] text-muted
                          border border-border px-2.5 py-1 rounded-lg no-underline
                          hover:text-green hover:border-green2 transition-all duration-200">
              <Icon size={11} />{label}
            </a>
          ))}
        </div>
      </div>

      {/* Title + Description */}
      <div className="flex flex-col gap-3">
        <h3 className="font-display font-bold text-xl text-text">{p.title}</h3>
        <p className="text-sm text-muted leading-relaxed">{p.desc}</p>
      </div>

      {/* Stack tags */}
      <div className="flex flex-wrap gap-2 mt-auto pt-2">
        {p.stack.map(s => <span key={s} className="tag">{s}</span>)}
      </div>
    </div>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="section bg-bg2">
      <div className="wrap">
        <p className="eyebrow">work</p>
        <h2 className="section-title">
          Things I've <span className="text-outline">built</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {projects.map((p, i) => <Card key={p.title} p={p} delay={i * 80} />)}
        </div>
      </div>
    </section>
  )
}