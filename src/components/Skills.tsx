import { useScrollAnimation } from '../hooks/useScrollAnimation'

const groups = [
  { label: '// Languages',    pills: ['C++', 'JavaScript', 'TypeScript', 'HTML', 'CSS'] },
  { label: '// Frontend',     pills: ['React.js', 'React Native', 'Redux Toolkit', 'Tailwind CSS v4', 'Vite', 'Expo'] },
  { label: '// Backend',      pills: ['Node.js', 'Express.js', 'REST APIs', 'JWT', 'Socket.IO'] },
  { label: '// Databases',    pills: ['MongoDB', 'PostgreSQL', 'SQL', 'Mongoose'] },
  { label: '// Tools',        pills: ['Git', 'GitHub', 'Postman', 'Vercel', 'Clerk', 'Linux'] },
  { label: '// CP Platforms', pills: ['Codeforces', 'CodeChef', 'LeetCode', 'ICPC'] },
]

function Block({ label, pills, delay }: { label: string; pills: string[]; delay: number }) {
  const ref = useScrollAnimation()
  return (
    <div
      ref={ref}
      className="card flex flex-col gap-5 p-7 hover:bg-bg4"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <p className="font-mono text-[0.68rem] text-green uppercase tracking-[0.14em]">{label}</p>
      <div className="flex flex-wrap gap-2">
        {pills.map(p => <span key={p} className="pill">{p}</span>)}
      </div>
    </div>
  )
}

export default function Skills() {
  return (
    <section id="skills" className="section bg-bg2">
      <div className="wrap">
        <p className="eyebrow">expertise</p>
        <h2 className="section-title">
          What I <span className="text-outline">build with</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {groups.map((g, i) => (
            <Block key={g.label} label={g.label} pills={g.pills} delay={i * 60} />
          ))}
        </div>
      </div>
    </section>
  )
}