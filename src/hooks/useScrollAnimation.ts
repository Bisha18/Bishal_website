import { useEffect, useRef } from 'react'

export function useScrollAnimation() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.classList.add('fade-up')
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) el.classList.add('visible') },
      { threshold: 0.1 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return ref
}