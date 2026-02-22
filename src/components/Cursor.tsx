import { useEffect, useRef } from 'react'

export default function Cursor() {
  const dot  = useRef<HTMLDivElement>(null)
  const ring = useRef<HTMLDivElement>(null)
  const mx = useRef(0), my = useRef(0)
  const rx = useRef(0), ry = useRef(0)

  useEffect(() => {
    const move = (e: MouseEvent) => { mx.current = e.clientX; my.current = e.clientY }
    document.addEventListener('mousemove', move)

    let raf: number
    const tick = () => {
      rx.current += (mx.current - rx.current) * 0.18
      ry.current += (my.current - ry.current) * 0.18
      if (dot.current)  { dot.current.style.left  = mx.current - 4  + 'px'; dot.current.style.top  = my.current - 4  + 'px' }
      if (ring.current) { ring.current.style.left = rx.current - 14 + 'px'; ring.current.style.top = ry.current - 14 + 'px' }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    const big   = () => { if (ring.current) { ring.current.style.width = '44px'; ring.current.style.height = '44px'; ring.current.style.borderColor = 'rgba(0,255,136,0.7)' } }
    const small = () => { if (ring.current) { ring.current.style.width = '28px'; ring.current.style.height = '28px'; ring.current.style.borderColor = 'rgba(0,255,136,0.4)' } }
    const els = document.querySelectorAll('a,button,.sugg-btn')
    els.forEach(el => { el.addEventListener('mouseenter', big); el.addEventListener('mouseleave', small) })

    return () => {
      document.removeEventListener('mousemove', move)
      cancelAnimationFrame(raf)
      els.forEach(el => { el.removeEventListener('mouseenter', big); el.removeEventListener('mouseleave', small) })
    }
  }, [])

  return (
    <>
      <div ref={dot}  className="fixed size-2 bg-green rounded-full pointer-events-none z-[9999] mix-blend-screen" />
      <div ref={ring} className="fixed size-7 rounded-full pointer-events-none z-[9998] border border-[rgba(0,255,136,0.4)] transition-[width,height,border-color] duration-200" style={{ left: '-14px', top: '-14px' }} />
    </>
  )
}