import { Medal, Trophy, BarChart3, Award } from 'lucide-react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

const items = [
  {
    Icon: Medal,
    title: '3rd Place — Hackfest 2025',
    sub: 'Problem Statement Track · IIT (ISM) Dhanbad',
  },
  {
    Icon: Trophy,
    title: '2nd Rank — ICPC 2024 Amritapuri Prelims',
    sub: 'Represented BIT Sindri · National coding contest',
  },
  {
    Icon: BarChart3,
    title: '1000+ Problems Solved',
    sub: '400+ Codeforces · 200+ CodeChef · 400+ LeetCode',
  },
  {
    Icon: Award,
    title: 'SIH 2024 Grand Finale Waitlist',
    sub: 'Smart India Hackathon · Ministry of Education track',
  },
]

function AchCard({ item, delay }: { item: typeof items[0]; delay: number }) {
  const ref = useScrollAnimation()
  return (
    <div
      ref={ref}
      className="card flex items-start gap-5 p-7 sm:p-8 hover:bg-bg4 hover:border-border2"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="icon-badge shrink-0">
        <item.Icon size={22} className="text-green" />
      </div>
      <div className="flex flex-col gap-2 min-w-0">
        <p className="font-semibold text-sm sm:text-base text-text leading-snug">{item.title}</p>
        <p className="font-mono text-[0.68rem] text-muted leading-relaxed">{item.sub}</p>
      </div>
    </div>
  )
}

export default function Achievements() {
  return (
    <section id="achievements" className="section bg-bg">
      <div className="wrap">
        <p className="eyebrow">recognition</p>
        <h2 className="section-title">
          Wins &amp; <span className="text-outline">milestones</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
          {items.map((a, i) => <AchCard key={a.title} item={a} delay={i * 70} />)}
        </div>
      </div>
    </section>
  )
}