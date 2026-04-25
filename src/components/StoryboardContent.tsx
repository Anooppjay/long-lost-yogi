'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import type { Story } from '@/lib/content'
import DecoDoubleRule from './DecoDoubleRule'

const QUOTES = [
  'Nothing here was mass manufactured. No factory, no bulk order, no middleman.',
  'You are the last chapter of a story that started in someone\'s hands.',
  'Nepal. Goa. Kashmir. Every place had them. People making the same things the same way for generations.',
]

export default function StoryboardContent({ stories }: { stories: Story[] }) {
  const [activeOrigin, setActiveOrigin] = useState('All')
  const [activeCategory, setActiveCategory] = useState('All')

  const origins = ['All', ...Array.from(new Set(stories.map((s) => s.origin)))]
  const categories = ['All', ...Array.from(new Set(stories.map((s) => s.category)))]

  const filtered = stories.filter((s) => {
    const byOrigin = activeOrigin === 'All' || s.origin === activeOrigin
    const byCategory = activeCategory === 'All' || s.category === activeCategory
    return byOrigin && byCategory
  })

  const filterBtnStyle = (active: boolean): React.CSSProperties => ({
    fontFamily: 'var(--font-josefin)',
    fontSize: 10,
    fontWeight: 600,
    letterSpacing: '0.14em',
    textTransform: 'uppercase',
    padding: '14px 16px',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    color: active ? '#2A2420' : 'rgba(42,36,32,0.38)',
    borderBottom: active ? '2px solid #567257' : '2px solid transparent',
    whiteSpace: 'nowrap',
  })

  return (
    <>
      {/* FILTER BAR */}
      <div
        className="sticky z-40 overflow-x-auto"
        style={{ top: 0, background: '#D9D8D5', borderBottom: '1px solid rgba(42,36,32,0.12)' }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between min-w-max">
          <div className="flex items-center">
            {categories.map((cat) => (
              <button key={cat} onClick={() => setActiveCategory(cat)} style={filterBtnStyle(activeCategory === cat)}>
                {cat}
              </button>
            ))}
          </div>
          <div className="flex items-center">
            {origins.map((origin) => (
              <button key={origin} onClick={() => setActiveOrigin(origin)} style={filterBtnStyle(activeOrigin === origin)}>
                {origin}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* STORY BANDS */}
      {filtered.map((story, index) => (
        <div key={story.slug}>
          <StoryBand story={story} index={index} />
          {index < filtered.length - 1 && (
            <TaupeQuoteBand quote={QUOTES[index % QUOTES.length]} />
          )}
        </div>
      ))}

      {filtered.length === 0 && (
        <div className="py-32 text-center" style={{ background: '#D9D8D5' }}>
          <p style={{ fontFamily: 'var(--font-josefin)', fontSize: 12, color: 'rgba(42,36,32,0.4)' }}>
            No stories match this filter.
          </p>
        </div>
      )}

      {/* 3-UP PHOTO GRID */}
      {filtered.length > 0 && (
        <section style={{ background: '#D9D8D5' }} className="py-12">
          <div className="max-w-6xl mx-auto px-6 md:px-12">
            <div className="grid grid-cols-3 gap-[1.5px]">
              {filtered.slice(0, 3).map((story) => (
                <Link key={story.slug} href={`/storyboard/${story.slug}`} style={{ textDecoration: 'none' }}>
                  <div
                    className="photo-grid-item relative overflow-hidden"
                    style={{ aspectRatio: '4/3', background: '#2A2420' }}
                  >
                    <div
                      className="absolute inset-0 flex items-end p-3"
                      style={{
                        background: 'linear-gradient(to top, rgba(42,36,32,0.7), transparent)',
                      }}
                    >
                      <span
                        style={{
                          fontFamily: 'var(--font-josefin)',
                          fontSize: 8,
                          fontWeight: 600,
                          letterSpacing: '0.14em',
                          textTransform: 'uppercase',
                          color: 'rgba(217,216,213,0.6)',
                        }}
                      >
                        {story.origin} · {story.category}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}

function StoryBand({ story, index }: { story: Story; index: number }) {
  const isOdd = index % 2 === 0
  const imageSideRef = useRef<HTMLDivElement>(null)
  const textSideRef = useRef<HTMLDivElement>(null)
  const [parallax, setParallax] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const refs = [imageSideRef, textSideRef]
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('in-view')
        })
      },
      { threshold: 0.15 }
    )
    refs.forEach((r) => { if (r.current) observer.observe(r.current) })
    return () => observer.disconnect()
  }, [])

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setParallax({
      x: ((e.clientX - rect.left) / rect.width - 0.5) * -18,
      y: ((e.clientY - rect.top) / rect.height - 0.5) * -10,
    })
  }, [])

  const handleTouchMove = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0]
    const rect = e.currentTarget.getBoundingClientRect()
    setParallax({
      x: ((touch.clientX - rect.left) / rect.width - 0.5) * -18,
      y: ((touch.clientY - rect.top) / rect.height - 0.5) * -10,
    })
  }, [])

  const leftStripColor = isOdd ? '#ACAB9E' : '#567257'

  return (
    <section className="grid grid-cols-1 md:grid-cols-[55fr_45fr]">
      {/* IMAGE COLUMN */}
      <div
        ref={imageSideRef}
        className="story-band-image-side relative overflow-hidden"
        style={{ minHeight: 440, background: '#2A2420' }}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setParallax({ x: 0, y: 0 })}
        onTouchMove={handleTouchMove}
        onTouchEnd={() => setParallax({ x: 0, y: 0 })}
      >
        <div
          style={{
            position: 'absolute',
            inset: '-12px',
            background: '#2A2420',
            transform: `translate(${parallax.x}px, ${parallax.y}px)`,
            transition: 'transform 0.15s ease-out',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 0, left: 0, bottom: 0,
            width: 4,
            background: leftStripColor,
            opacity: 0.45,
            zIndex: 2,
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 16, left: 20,
            zIndex: 3,
            background: 'rgba(42,36,32,0.5)',
            backdropFilter: 'blur(4px)',
            border: '1px solid rgba(217,216,213,0.3)',
            padding: '4px 10px',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-josefin)',
              fontSize: 8,
              fontWeight: 600,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: '#D9D8D5',
            }}
          >
            {story.origin}
          </span>
        </div>

        <div
          className="hidden md:block"
          style={{
            position: 'absolute',
            bottom: '-1rem',
            left: '-0.5rem',
            fontFamily: 'var(--font-cormorant)',
            fontWeight: 600,
            fontSize: 'clamp(4rem,10vw,7rem)',
            color: 'rgba(255,255,255,0.045)',
            lineHeight: 1,
            pointerEvents: 'none',
            zIndex: 1,
            userSelect: 'none',
          }}
        >
          {story.location_bleed}
        </div>

        <div
          style={{
            position: 'absolute',
            bottom: '1.75rem',
            right: '-22px',
            width: 64, height: 64,
            borderRadius: '50%',
            background: 'rgba(137,106,88,0.25)',
            border: '2.5px solid #D9D8D5',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 4,
            transition: 'transform 0.3s ease',
            cursor: 'default',
          }}
          onMouseEnter={(e) => {
            ;(e.currentTarget as HTMLDivElement).style.transform = 'scale(1.12) translateY(-4px)'
          }}
          onMouseLeave={(e) => {
            ;(e.currentTarget as HTMLDivElement).style.transform = ''
          }}
        >
          <span style={{ fontFamily: 'var(--font-cormorant)', fontSize: 20, color: '#ACAB9E' }}>
            {story.makerInitials}
          </span>
        </div>

        <div
          style={{
            position: 'absolute',
            bottom: '1.5rem',
            left: 20,
            zIndex: 3,
            background: 'rgba(42,36,32,0.5)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '6px 12px',
          }}
        >
          <div
            style={{
              width: 28, height: 28,
              borderRadius: '50%',
              background: '#896A58',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <span style={{ fontFamily: 'var(--font-cormorant)', fontSize: 11, color: '#D9D8D5' }}>
              {story.curator.charAt(0)}
            </span>
          </div>
          <span
            style={{
              fontFamily: 'var(--font-josefin)',
              fontSize: 10,
              fontWeight: 600,
              color: '#D9D8D5',
            }}
          >
            {story.curator}
          </span>
        </div>
      </div>

      {/* TEXT COLUMN */}
      <div
        ref={textSideRef}
        className="story-band-text-side relative"
        style={{
          background: isOdd ? '#D9D8D5' : '#ACAB9E',
          padding: '2.5rem 2rem 2.5rem 3rem',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: -10, right: 16,
            fontFamily: 'var(--font-cormorant)',
            fontSize: '7rem',
            color: '#2A2420',
            opacity: 0.05,
            lineHeight: 1,
            userSelect: 'none',
            pointerEvents: 'none',
          }}
        >
          {String(index + 1).padStart(2, '0')}
        </div>

        <div
          style={{
            fontFamily: 'var(--font-josefin)',
            fontSize: 8,
            fontWeight: 600,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: isOdd ? '#896A58' : '#567257',
            marginBottom: 14,
          }}
        >
          {story.origin} · {story.category}
        </div>

        <h2
          style={{
            fontFamily: 'var(--font-cormorant)',
            fontWeight: 300,
            fontSize: 'clamp(1.4rem,2.2vw,1.85rem)',
            color: '#2A2420',
            lineHeight: 1.2,
            marginBottom: 14,
          }}
        >
          {story.title}
        </h2>

        <p
          style={{
            fontFamily: 'var(--font-josefin)',
            fontWeight: 300,
            fontSize: 12,
            color: 'rgba(42,36,32,0.75)',
            lineHeight: 1.75,
            marginBottom: 20,
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          } as React.CSSProperties}
        >
          {story.excerpt}
        </p>

        <InlineProductImage />

        <div
          style={{
            borderTop: '1px solid rgba(42,36,32,0.12)',
            paddingTop: 16,
            marginTop: 20,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 12,
          }}
        >
          <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.45rem', color: '#2A2420' }}>
            By {story.maker}
          </div>
          <Link
            href={`/storyboard/${story.slug}`}
            style={{
              background: isOdd ? '#567257' : '#2A2420',
              color: '#D9D8D5',
              fontFamily: 'var(--font-josefin)',
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              padding: '10px 18px',
              textDecoration: 'none',
              display: 'inline-block',
              flexShrink: 0,
            }}
          >
            Read Story
          </Link>
        </div>
      </div>
    </section>
  )
}

function InlineProductImage() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add('in-view') },
      { threshold: 0.2 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className="story-image-interrupt">
      <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: 4, background: '#896A58', opacity: 0.4 }} />
      <span
        style={{
          position: 'absolute',
          bottom: 6, right: 8,
          fontFamily: 'var(--font-josefin)',
          fontSize: 8,
          color: 'rgba(217,216,213,0.5)',
        }}
      >
        From the workshop
      </span>
    </div>
  )
}

function TaupeQuoteBand({ quote }: { quote: string }) {
  const ref = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add('in-view') },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      style={{
        background: '#896A58',
        minHeight: 145,
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem 3rem',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '50%', left: '10%',
          width: 200, height: 200,
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.07)',
          transform: 'translateY(-50%)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-20%', right: '5%',
          width: 300, height: 300,
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.05)',
        }}
      />
      <p
        ref={ref}
        className="quote-band-text"
        style={{
          fontFamily: 'var(--font-cormorant)',
          fontStyle: 'italic',
          fontSize: 'clamp(1.1rem,2vw,1.45rem)',
          color: 'rgba(217,216,213,0.92)',
          maxWidth: 680,
          textAlign: 'center',
          lineHeight: 1.6,
          transform: 'rotate(-0.5deg) scaleX(0)',
          position: 'relative',
          zIndex: 1,
        }}
      >
        &ldquo;{quote}&rdquo;
      </p>
    </div>
  )
}
