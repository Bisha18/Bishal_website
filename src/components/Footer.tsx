import { Terminal, Heart } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-bg border-t border-border py-10">
      <div className="wrap flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 font-mono text-sm text-green">
          <Terminal size={14} />
          ~/bishal-paul
        </div>
      </div>
    </footer>
  )
}