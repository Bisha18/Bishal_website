import { GraduationCap, Trophy, Code2, Users } from 'lucide-react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

const bullets = [
  { Icon: GraduationCap, text: 'Final year student — strong DSA, system design, and OOP fundamentals' },
  { Icon: Trophy,        text: 'Represented BIT Sindri in ICPC 2024 Amritapuri Prelims — 2nd rank' },
  { Icon: Code2,         text: '1000+ problems solved across Codeforces, CodeChef, and LeetCode' },
  { Icon: Users,         text: 'Shortlisted for Smart India Hackathon 2024 Grand Finale waitlist' },
  { Icon: Trophy,        text: '3rd position at IIT (ISM) Dhanbad Hackfest 2025' },
]

export default function Experience() {
  const ref = useScrollAnimation()
  return (
    <section id="experience" className="section bg-bg">
      <div className="wrap">
        <p className="eyebrow">education</p>
        <h2 className="section-title">
          Where I've <span className="text-outline">studied</span>
        </h2>

        {/* Timeline — centred, max width */}
        <div className="max-w-2xl mx-auto">
          <div className="relative pl-8 border-l-2 border-border" ref={ref}>

            {/* Glowing dot on the timeline */}
            <div className="absolute -left-[9px] top-3 size-4 rounded-full bg-green
                            shadow-[0_0_16px_rgba(0,255,136,0.5)] ring-4 ring-bg" />

            {/* Card */}
            <div className="card p-8 sm:p-10 flex flex-col gap-8 ml-4">

              {/* Header */}
              <div className="flex flex-col gap-2">
                <span className="font-mono text-[0.68rem] text-cyan tracking-widest uppercase">
                  Nov 2022 — May 2026
                </span>
                <h3 className="font-display font-bold text-xl sm:text-2xl text-text leading-snug">
                  B.Tech — Electronics &amp; Communication Engineering
                </h3>
                <p className="font-mono text-sm text-muted">
                  Birsa Institute of Technology, Sindri, Jharkhand
                  <span className="text-dim mx-2">·</span>
                  CGPA: <span className="text-green font-bold">7.5 / 10.0</span>
                </p>
              </div>

              {/* Bullet points */}
              <ul className="flex flex-col gap-4">
                {bullets.map(({ Icon, text }, i) => (
                  <li key={i} className="flex items-start gap-4 text-sm text-muted leading-relaxed">
                    <div className="icon-badge size-8 rounded-lg shrink-0 mt-0.5">
                      <Icon size={14} className="text-green" />
                    </div>
                    <span className="pt-1">{text}</span>
                  </li>
                ))}
              </ul>

            </div>
          </div>
        </div>

      </div>
    </section>
  )
}