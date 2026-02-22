import { Mail, Phone, Github, Linkedin, Zap, Code2 } from 'lucide-react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

const contacts = [
  { Icon: Mail,     label: 'Email',      val: 'd.bishalpaul@gmail.com',    href: 'mailto:d.bishalpaul@gmail.com' },
  { Icon: Phone,    label: 'Phone',      val: '+91-9123206127',             href: 'tel:+919123206127' },
  { Icon: Github,   label: 'GitHub',     val: 'github.com/bishalpaul',      href: 'https://github.com/Bisha18' },
  { Icon: Linkedin, label: 'LinkedIn',   val: 'linkedin.com/in/bishalpaul', href: 'https://www.linkedin.com/in/bishal-paul-2897a624b/' },
  { Icon: Zap,      label: 'Codeforces', val: 'codeforces.com/bishalpaul', href: 'https://codeforces.com/profile/Bishal_1' },
  { Icon: Code2,    label: 'LeetCode',   val: 'leetcode.com/bishalpaul',   href: 'https://leetcode.com/u/bishal_18_paul/' },
]

function ContactCard({ c, delay }: { c: typeof contacts[0]; delay: number }) {
  const ref = useScrollAnimation()
  return (
    <a
      ref={ref as React.Ref<HTMLAnchorElement>}
      href={c.href}
      target={c.href.startsWith('http') ? '_blank' : undefined}
      rel="noopener noreferrer"
      className="card flex items-center gap-5 p-6 no-underline text-text
                 hover:bg-bg4 hover:border-border2 hover:translate-x-1.5"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="icon-badge shrink-0">
        <c.Icon size={20} className="text-green" />
      </div>
      <div className="min-w-0 flex flex-col gap-0.5">
        <p className="font-mono text-[0.63rem] text-muted uppercase tracking-widest">{c.label}</p>
        <p className="text-sm text-text truncate">{c.val}</p>
      </div>
    </a>
  )
}

export default function Contact() {
  return (
    <section id="contact" className="section bg-bg2">
      <div className="wrap">
        <p className="eyebrow">reach out</p>
        <h2 className="section-title">
          Let's <span className="text-outline">connect</span>
        </h2>

        {/* Intro text — centred */}
        <p className="font-mono text-sm text-muted leading-relaxed max-w-xl mx-auto text-center mb-14">
          Actively looking for full-time SWE roles or internships after May 2026.
          <br className="hidden sm:block" />
          Open to Full Stack, Backend, or Mobile roles. Let's build something great.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {contacts.map((c, i) => <ContactCard key={c.label} c={c} delay={i * 60} />)}
        </div>
      </div>
    </section>
  )
}