'use client'

import { useEffect, useRef, useState } from 'react'
import DecoDoubleRule from './DecoDoubleRule'

interface GivingBackCounterProps {
  total: number
  currency: string
}

export default function GivingBackCounter({ total, currency }: GivingBackCounterProps) {
  const [displayed, setDisplayed] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          if (total === 0) return
          const start = performance.now()
          const duration = 2200
          const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t))
          const tick = (now: number) => {
            const elapsed = now - start
            const progress = Math.min(elapsed / duration, 1)
            setDisplayed(Math.floor(easeOutExpo(progress) * total))
            if (progress < 1) requestAnimationFrame(tick)
          }
          requestAnimationFrame(tick)
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [total, hasAnimated])

  const isZero = total === 0

  return (
    <section
      style={{
        background: 'var(--bg-dark)',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
        position: 'relative',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          width: 4,
          background: 'var(--taupe)',
          opacity: 0.5,
        }}
      />
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-14" ref={ref}>
        <div
          style={{
            fontFamily: 'var(--font-josefin)',
            fontSize: 9,
            fontWeight: 600,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--green)',
            marginBottom: 12,
          }}
        >
          Giving Back
        </div>
        <div
          style={{
            fontFamily: 'var(--font-cormorant)',
            fontWeight: 300,
            fontSize: 'clamp(3rem,7vw,4.5rem)',
            color: 'var(--dp)',
            lineHeight: 1,
            opacity: isZero ? 0.3 : 1,
            transition: 'opacity 0.4s',
          }}
        >
          ${isZero ? '0' : displayed.toLocaleString()} {currency}
        </div>
        {isZero && (
          <p
            style={{
              fontFamily: 'var(--font-josefin)',
              fontWeight: 300,
              fontSize: 12,
              color: 'var(--dp)',
              marginTop: 8,
              opacity: 0.6,
            }}
          >
            The giving back counter starts at zero and grows with every purchase.
          </p>
        )}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
          {[
            {
              eyebrow: 'Every Sale',
              body: '10% of every purchase goes directly to the maker\'s community.',
            },
            {
              eyebrow: 'Documented',
              body: 'Verified through our curator network on the ground.',
            },
            {
              eyebrow: 'Cumulative',
              body: 'This number grows permanently — it never resets.',
            },
          ].map((item) => (
            <div key={item.eyebrow}>
              <DecoDoubleRule />
              <div
                style={{
                  fontFamily: 'var(--font-josefin)',
                  fontSize: 8,
                  fontWeight: 600,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'var(--taupe)',
                  marginBottom: 8,
                }}
              >
                {item.eyebrow}
              </div>
              <p
                style={{
                  fontFamily: 'var(--font-josefin)',
                  fontWeight: 300,
                  fontSize: 12,
                  color: 'var(--dp)',
                  lineHeight: 1.7,
                  opacity: 0.8,
                }}
              >
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
