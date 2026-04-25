import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getAllStories, getStoryBySlug, getProductBySlug } from '@/lib/content'
import DecoDoubleRule from '@/components/DecoDoubleRule'
import FullbleedInterrupt from '@/components/FullbleedInterrupt'

export async function generateStaticParams() {
  const stories = getAllStories()
  return stories.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const story = getStoryBySlug(params.slug)
  if (!story) return {}
  return {
    title: `${story.title} — Long Lost Yogi`,
    description: story.excerpt,
  }
}

export default function StoryPage({ params }: { params: { slug: string } }) {
  const story = getStoryBySlug(params.slug)
  if (!story) notFound()

  const product = story.product_slug ? getProductBySlug(story.product_slug) : null
  const allStories = getAllStories()
  const related = allStories.filter((s) => s.slug !== story.slug).slice(0, 2)

  const paragraphs = story.content
    .split('\n\n')
    .map((p) => p.trim())
    .filter(Boolean)

  return (
    <main>
      {/* HERO */}
      <section
        className="relative overflow-hidden"
        style={{ minHeight: 480, background: '#2A2420', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(42,36,32,0.85), transparent)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 0, left: 0, bottom: 0,
            width: 4,
            background: '#896A58',
            opacity: 0.4,
          }}
        />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0 }}>
          <div style={{ height: 2, background: '#ACAB9E', opacity: 0.8 }} />
          <div style={{ height: 1, background: '#896A58', opacity: 0.45, marginTop: 3 }} />
        </div>

        <div className="relative max-w-4xl mx-auto px-6 md:px-12 pb-14 pt-32 w-full">
          <div className="mb-4">
            <Link
              href="/storyboard"
              style={{
                fontFamily: 'var(--font-josefin)',
                fontSize: 9,
                color: 'rgba(217,216,213,0.45)',
                textDecoration: 'none',
                letterSpacing: '0.14em',
              }}
            >
              Stories
            </Link>
            <span style={{ color: 'rgba(217,216,213,0.3)', margin: '0 6px' }}>›</span>
            <span
              style={{
                fontFamily: 'var(--font-josefin)',
                fontSize: 9,
                color: 'rgba(217,216,213,0.45)',
                letterSpacing: '0.14em',
              }}
            >
              {story.origin}
            </span>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            <span
              style={{
                fontFamily: 'var(--font-josefin)',
                fontSize: 8,
                fontWeight: 600,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: '#D9D8D5',
                border: '1px solid rgba(217,216,213,0.25)',
                padding: '3px 8px',
              }}
            >
              {story.origin}
            </span>
            <span
              style={{
                fontFamily: 'var(--font-josefin)',
                fontSize: 8,
                fontWeight: 600,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: '#D9D8D5',
                border: '1px solid rgba(217,216,213,0.25)',
                padding: '3px 8px',
              }}
            >
              {story.category}
            </span>
          </div>

          <h1
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontWeight: 300,
              fontSize: 'clamp(1.8rem,4vw,3rem)',
              color: '#D9D8D5',
              lineHeight: 1.2,
              marginBottom: 20,
            }}
          >
            {story.title}
          </h1>

          <div className="flex items-center gap-3">
            <div
              style={{
                width: 30, height: 30,
                borderRadius: '50%',
                background: '#896A58',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span style={{ fontFamily: 'var(--font-cormorant)', fontSize: 12, color: '#D9D8D5' }}>
                {story.curator.charAt(0)}
              </span>
            </div>
            <span style={{ fontFamily: 'var(--font-josefin)', fontSize: 10, color: 'rgba(217,216,213,0.6)' }}>
              {story.curator} · {story.curatorRole} ·{' '}
              {new Date(story.date).toLocaleDateString('en-AU', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </span>
          </div>
        </div>
      </section>

      {/* BODY */}
      <article style={{ background: '#D9D8D5' }} className="py-16">
        <div className="max-w-[780px] mx-auto px-6 md:px-12">
          {/* Opening excerpt */}
          <p
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontStyle: 'italic',
              fontSize: 'clamp(1.2rem,2vw,1.5rem)',
              color: '#2A2420',
              lineHeight: 1.7,
              borderBottom: '1px solid rgba(42,36,32,0.12)',
              paddingBottom: '2.5rem',
              marginBottom: '2.5rem',
            }}
          >
            {story.excerpt}
          </p>

          {/* Paragraphs with full-bleed interrupts */}
          {paragraphs.map((para, i) => (
            <div key={i}>
              <p
                style={{
                  fontFamily: i === 0 ? 'var(--font-cormorant)' : 'var(--font-josefin)',
                  fontWeight: i === 0 ? 300 : 300,
                  fontSize: i === 0 ? '1.1rem' : 13,
                  color: i === 0 ? '#2A2420' : 'rgba(42,36,32,0.82)',
                  lineHeight: 1.85,
                  marginBottom: '1.5rem',
                }}
              >
                {para}
              </p>
              {(i === 1 || i === 3) && <FullbleedInterrupt />}
            </div>
          ))}

          {/* Curator sign-off */}
          <div
            style={{ borderTop: '1px solid rgba(42,36,32,0.12)', paddingTop: 24, marginTop: 32 }}
            className="flex items-center gap-4"
          >
            <div
              style={{
                width: 44, height: 44,
                borderRadius: '50%',
                background: '#ACAB9E',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <span style={{ fontFamily: 'var(--font-cormorant)', fontSize: 17, color: '#2A2420' }}>
                {story.curator.charAt(0)}
              </span>
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-josefin)', fontSize: 11, fontWeight: 600, color: '#2A2420' }}>
                {story.curator}
              </div>
              <div style={{ fontFamily: 'var(--font-josefin)', fontSize: 10, color: 'rgba(42,36,32,0.5)' }}>
                {story.curatorRole} ·{' '}
                {new Date(story.date).toLocaleDateString('en-AU', { month: 'long', year: 'numeric' })}
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* MAKER PROFILE */}
      <section style={{ background: '#D9D8D5', borderTop: '1px solid rgba(42,36,32,0.12)' }} className="py-12">
        <div className="max-w-[780px] mx-auto px-6 md:px-12">
          <DecoDoubleRule />
          <div
            style={{
              fontFamily: 'var(--font-josefin)',
              fontSize: 8,
              fontWeight: 600,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#896A58',
              marginBottom: 20,
            }}
          >
            The Maker
          </div>
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div>
              <div
                style={{
                  width: 120, height: 120,
                  background: '#ACAB9E',
                  position: 'relative',
                  flexShrink: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <span style={{ fontFamily: 'var(--font-cormorant)', fontSize: 36, color: '#2A2420' }}>
                  {story.makerInitials}
                </span>
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0, left: 0, right: 0,
                    height: 2,
                    background: '#896A58',
                  }}
                />
              </div>
            </div>
            <div>
              <h2
                style={{
                  fontFamily: 'var(--font-cormorant)',
                  fontSize: '1.5rem',
                  fontWeight: 400,
                  color: '#2A2420',
                  marginBottom: 8,
                }}
              >
                {story.maker}
              </h2>
              <p
                style={{
                  fontFamily: 'var(--font-josefin)',
                  fontWeight: 300,
                  fontSize: 12,
                  color: 'rgba(42,36,32,0.7)',
                  lineHeight: 1.8,
                }}
              >
                {story.origin} · {story.category}. A craftsperson discovered through our
                curator network — someone making things the same way, for the same reasons,
                as their family before them.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* EMBEDDED PRODUCT CARD */}
      {product && (
        <section style={{ background: '#ACAB9E' }} className="py-0">
          <div className="max-w-[780px] mx-auto px-6 md:px-12 py-12">
            <div
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
              style={{ background: '#ACAB9E' }}
            >
              <div className="relative" style={{ aspectRatio: '4/3', background: '#2A2420' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: 3, background: '#896A58', opacity: 0.4 }} />
              </div>
              <div className="flex flex-col gap-4">
                <div
                  style={{
                    fontFamily: 'var(--font-josefin)',
                    fontSize: 8,
                    fontWeight: 600,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: '#896A58',
                  }}
                >
                  From This Story
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--font-cormorant)',
                    fontSize: '1.4rem',
                    fontWeight: 300,
                    color: '#2A2420',
                  }}
                >
                  {product.title}
                </h3>
                <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.4rem', color: '#2A2420' }}>
                  {product.price}
                </div>
                <div style={{ borderLeft: '2px solid #567257', paddingLeft: 12 }}>
                  <p style={{ fontFamily: 'var(--font-josefin)', fontSize: 11, color: 'rgba(42,36,32,0.75)' }}>
                    {product.giving_back}
                  </p>
                </div>
                <button
                  disabled
                  style={{
                    background: 'rgba(42,36,32,0.2)',
                    color: 'rgba(42,36,32,0.4)',
                    fontFamily: 'var(--font-josefin)',
                    fontSize: 11,
                    fontWeight: 600,
                    letterSpacing: '0.16em',
                    textTransform: 'uppercase',
                    padding: '12px 20px',
                    border: 'none',
                    cursor: 'not-allowed',
                  }}
                >
                  Store Opening Soon
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* RELATED STORIES */}
      {related.length > 0 && (
        <section style={{ background: '#D9D8D5' }} className="py-16">
          <div className="max-w-[780px] mx-auto px-6 md:px-12">
            <DecoDoubleRule />
            <div
              style={{
                fontFamily: 'var(--font-josefin)',
                fontSize: 9,
                fontWeight: 600,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#896A58',
                marginBottom: 24,
              }}
            >
              More Stories
            </div>
            <div className="flex flex-col gap-4">
              {related.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/storyboard/${rel.slug}`}
                  style={{ textDecoration: 'none' }}
                >
                  <div
                    className="grid grid-cols-[1fr_2fr]"
                    style={{ border: '1px solid rgba(42,36,32,0.12)' }}
                  >
                    <div
                      className="relative"
                      style={{ minHeight: 120, background: '#2A2420' }}
                    >
                      <div
                        style={{
                          position: 'absolute',
                          top: 0, left: 0, bottom: 0,
                          width: 3,
                          background: '#567257',
                          opacity: 0.4,
                        }}
                      />
                    </div>
                    <div style={{ padding: '16px 20px' }}>
                      <div
                        style={{
                          fontFamily: 'var(--font-josefin)',
                          fontSize: 8,
                          fontWeight: 600,
                          letterSpacing: '0.16em',
                          textTransform: 'uppercase',
                          color: '#896A58',
                          marginBottom: 6,
                        }}
                      >
                        {rel.origin}
                      </div>
                      <h3
                        style={{
                          fontFamily: 'var(--font-cormorant)',
                          fontWeight: 300,
                          fontSize: '1.15rem',
                          color: '#2A2420',
                          lineHeight: 1.2,
                          marginBottom: 8,
                        }}
                      >
                        {rel.title}
                      </h3>
                      <div
                        style={{
                          fontFamily: 'var(--font-josefin)',
                          fontSize: 9,
                          color: 'rgba(42,36,32,0.5)',
                        }}
                      >
                        {rel.curator} ·{' '}
                        {new Date(rel.date).toLocaleDateString('en-AU', {
                          month: 'long',
                          year: 'numeric',
                        })}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  )
}
