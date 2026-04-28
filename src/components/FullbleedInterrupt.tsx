'use client'

import { useEffect, useRef } from 'react'

export default function FullbleedInterrupt() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add('in-view') },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className="fullbleed-interrupt my-10">
      <div
        style={{
          position: 'absolute',
          top: 0, left: 0, bottom: 0,
          width: 4,
          background: 'var(--taupe)',
          opacity: 0.4,
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 0, right: 0, bottom: 0,
          width: 4,
          background: 'var(--green)',
          opacity: 0.15,
        }}
      />
    </div>
  )
}
