import { getAllProducts, getAllStories, getGivingBackTotal } from '@/lib/content'
import GivingBackCounter from '@/components/GivingBackCounter'
import FeaturedListings from '@/components/FeaturedListings'
import DecoDoubleRule from '@/components/DecoDoubleRule'
import CornerBrackets from '@/components/CornerBrackets'
import Link from 'next/link'

export default function HomePage() {
  const products = getAllProducts()
  const stories = getAllStories().slice(0, 3)
  const givingBack = getGivingBackTotal()

  return (
    <main>
      {/* HERO */}
      <section
        className="relative overflow-hidden"
        style={{ background: 'var(--dp)', minHeight: '88vh', display: 'flex', alignItems: 'center' }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0, right: 0, bottom: 0,
            width: '45%',
            background: 'var(--dp)',
            opacity: 0.5,
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 0, bottom: 0,
            right: '36%',
            width: '0.5px',
            background: 'var(--green)',
            opacity: 0.15,
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: 0, left: 0,
            width: '50%', height: '60%',
            background: 'radial-gradient(ellipse at bottom left, rgba(137,106,88,0.2), transparent)',
            pointerEvents: 'none',
          }}
        />
        <div style={{ position: 'absolute', inset: '2rem' }}>
          <CornerBrackets opacity={0.35} />
        </div>

        <div className="relative max-w-6xl mx-auto px-8 md:px-14 py-28 w-full">
          <DecoDoubleRule />
          <div
            style={{
              fontFamily: 'var(--font-josefin)',
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--bg-dark)',
              opacity: 0.75,
              marginBottom: 18,
            }}
          >
            The Long Lost Collection
          </div>
          <h1
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontWeight: 300,
              fontSize: 'clamp(2.2rem,5.5vw,4rem)',
              color: 'var(--bg)',
              lineHeight: 1.15,
              maxWidth: 640,
              marginBottom: 20,
            }}
          >
            Where every piece carries<br />the hands that made it.
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-josefin)',
              fontWeight: 300,
              fontSize: 12,
              color: 'rgba(217,216,213,0.45)',
              maxWidth: 420,
              marginBottom: 38,
              lineHeight: 1.8,
            }}
          >
            Curated from workshops, villages and family ateliers â€” the long-lost art of knowing where your things come from.
          </p>
          <div className="flex flex-wrap gap-3 mb-12">
            <Link
              href="/shop"
              style={{
                background: 'var(--green)',
                color: 'var(--bg)',
                fontFamily: 'var(--font-josefin)',
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                padding: '14px 28px',
                textDecoration: 'none',
                display: 'inline-block',
              }}
            >
              Explore the Collection
            </Link>
            <Link
              href="/storyboard"
              style={{
                background: 'transparent',
                color: 'rgba(217,216,213,0.55)',
                border: '1px solid rgba(217,216,213,0.2)',
                fontFamily: 'var(--font-josefin)',
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                padding: '14px 28px',
                textDecoration: 'none',
                display: 'inline-block',
              }}
            >
              Read the Stories
            </Link>
          </div>
          <div className="flex flex-wrap gap-4">
            {['Morocco', 'Bali', 'Nepal', 'Kashmir', 'Goa', 'Rajasthan'].map((tag, i) => (
              <span
                key={tag}
                style={{
                  fontFamily: 'var(--font-josefin)',
                  fontSize: 9,
                  fontWeight: 600,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: i % 2 === 0 ? 'var(--bg-dark)' : 'var(--taupe)',
                  opacity: 0.55,
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* GIVING BACK COUNTER */}
      <GivingBackCounter total={givingBack.total} currency={givingBack.currency} />

      {/* ORIGIN TEASER */}
      <section style={{ background: 'var(--bg)' }} className="py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-[5fr_7fr] gap-10 md:gap-16 items-center">
            <div
              className="relative overflow-hidden"
              style={{ aspectRatio: '4/5', background: 'var(--dp)' }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: 0, left: 0, bottom: 0,
                  width: 4,
                  background: 'var(--taupe)',
                  opacity: 0.45,
                }}
              />
              <CornerBrackets opacity={0.4} size={24} />
            </div>
            <div>
              <DecoDoubleRule />
              <div
                style={{
                  fontFamily: 'var(--font-josefin)',
                  fontSize: 9,
                  fontWeight: 600,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'var(--taupe)',
                  marginBottom: 12,
                }}
              >
                At the Source
              </div>
              <h2
                style={{
                  fontFamily: 'var(--font-cormorant)',
                  fontWeight: 300,
                  fontSize: 'clamp(1.8rem,3.5vw,2.8rem)',
                  color: 'var(--dp)',
                  lineHeight: 1.15,
                  marginBottom: 20,
                }}
              >
                Made at the source.<br />Carried by hand.
              </h2>
              <p
                style={{
                  fontFamily: 'var(--font-josefin)',
                  fontWeight: 300,
                  fontSize: 13,
                  color: 'rgba(42,36,32,0.75)',
                  lineHeight: 1.8,
                  marginBottom: 24,
                }}
              >
                Nepal. Goa. Kashmir. Every place had them. People making the same things the same way for generations. Not for export. Because it was in them.
              </p>
              <blockquote
                style={{ borderLeft: '2px solid var(--taupe)', paddingLeft: 16, marginBottom: 24 }}
              >
                <p
                  style={{
                    fontFamily: 'var(--font-cormorant)',
                    fontStyle: 'italic',
                    fontSize: '1.15rem',
                    color: 'rgba(42,36,32,0.78)',
                    lineHeight: 1.6,
                  }}
                >
                  "Nothing here was mass manufactured. No factory, no bulk order, no middleman."
                </p>
              </blockquote>
              <p
                style={{
                  fontFamily: 'var(--font-josefin)',
                  fontWeight: 300,
                  fontSize: 13,
                  color: 'rgba(42,36,32,0.75)',
                  lineHeight: 1.8,
                }}
              >
                You are the last chapter of a story that started in someone&apos;s hands.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED LISTINGS */}
      <FeaturedListings products={products} />

      {/* STORYBOARD PREVIEW */}
      <section style={{ background: 'var(--bg-dark)' }} className="py-20">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="mb-10">
            <DecoDoubleRule />
            <div
              style={{
                fontFamily: 'var(--font-josefin)',
                fontSize: 9,
                fontWeight: 600,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--green)',
                marginBottom: 10,
              }}
            >
              The Stories
            </div>
            <h2
              style={{
                fontFamily: 'var(--font-cormorant)',
                fontWeight: 300,
                fontSize: 'clamp(1.6rem,3vw,2.4rem)',
                color: 'var(--dp)',
              }}
            >
              Every piece has a before.
            </h2>
          </div>

          <div className="flex flex-col gap-[1.5px]">
            {stories.map((story) => (
              <Link
                key={story.slug}
                href={`/storyboard/${story.slug}`}
                style={{ textDecoration: 'none' }}
              >
                <div
                  className="grid grid-cols-1 md:grid-cols-2"
                  style={{ border: '1px solid rgba(42,36,32,0.12)' }}
                >
                  <div
                    className="relative overflow-hidden"
                    style={{ minHeight: 220, background: 'var(--dp)' }}
                  >
                    <div
                      style={{
                        position: 'absolute',
                        top: 0, left: 0, bottom: 0,
                        width: 4,
                        background: 'var(--green)',
                        opacity: 0.45,
                      }}
                    />
                  </div>
                  <div style={{ background: 'var(--bg)', padding: '1.5rem 2rem' }}>
                    <div
                      style={{
                        fontFamily: 'var(--font-josefin)',
                        fontSize: 8,
                        fontWeight: 600,
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                        color: 'var(--bg-dark)',
                        marginBottom: 10,
                      }}
                    >
                      {story.origin} Â· {story.category}
                    </div>
                    <h3
                      style={{
                        fontFamily: 'var(--font-cormorant)',
                        fontWeight: 300,
                        fontSize: 'clamp(1.2rem,2vw,1.6rem)',
                        color: 'var(--dp)',
                        marginBottom: 10,
                        lineHeight: 1.2,
                      }}
                    >
                      {story.title}
                    </h3>
                    <p
                      style={{
                        fontFamily: 'var(--font-josefin)',
                        fontWeight: 300,
                        fontSize: 12,
                        color: 'rgba(42,36,32,0.75)',
                        lineHeight: 1.7,
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        marginBottom: 16,
                      } as React.CSSProperties}
                    >
                      {story.excerpt}
                    </p>
                    <DecoDoubleRule />
                    <div style={{ fontFamily: 'var(--font-josefin)', fontSize: 9, color: 'rgba(42,36,32,0.5)' }}>
                      {story.curator} Â·{' '}
                      {new Date(story.date).toLocaleDateString('en-AU', {
                        month: 'long',
                        year: 'numeric',
                      })}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <Link
              href="/storyboard"
              style={{
                background: 'var(--green)',
                color: 'var(--bg)',
                fontFamily: 'var(--font-josefin)',
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                padding: '14px 28px',
                textDecoration: 'none',
                display: 'inline-block',
              }}
            >
              Read All Stories
            </Link>
          </div>
        </div>
      </section>

      {/* CURATOR CTA */}
      <section className="relative overflow-hidden" style={{ background: 'var(--green)' }}>
        <div className="mx-6 md:mx-12 pt-10">
          <div style={{ height: 2, background: 'var(--bg-dark)', opacity: 0.4 }} />
          <div style={{ height: 1, background: 'var(--taupe)', opacity: 0.3, marginTop: 3 }} />
        </div>

        <div style={{ position: 'absolute', inset: '1.5rem' }}>
          <CornerBrackets opacity={0.2} size={24} />
        </div>

        <div className="relative max-w-6xl mx-auto px-6 md:px-12 py-16 text-center">
          <div
            style={{
              fontFamily: 'var(--font-josefin)',
              fontSize: 9,
              fontWeight: 600,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'rgba(217,216,213,0.65)',
              marginBottom: 16,
            }}
          >
            Curators
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontWeight: 300,
              fontSize: 'clamp(1.8rem,3.5vw,2.8rem)',
              color: 'var(--bg)',
              lineHeight: 1.2,
              maxWidth: 600,
              margin: '0 auto 16px',
            }}
          >
            Become a Long Lost Curator
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-josefin)',
              fontWeight: 300,
              fontSize: 13,
              color: 'rgba(217,216,213,0.7)',
              maxWidth: 520,
              margin: '0 auto 36px',
              lineHeight: 1.8,
            }}
          >
            Do you travel? Do you know a maker? Do you understand the difference between a thing
            made by a machine and a thing made by a person who has spent their life making it?
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/curators/apply"
              style={{
                background: 'var(--dp)',
                color: 'var(--bg)',
                fontFamily: 'var(--font-josefin)',
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                padding: '14px 28px',
                textDecoration: 'none',
                display: 'inline-block',
              }}
            >
              Apply to Curate
            </Link>
            <Link
              href="/curators"
              style={{
                background: 'transparent',
                color: 'rgba(217,216,213,0.7)',
                border: '1px solid rgba(217,216,213,0.3)',
                fontFamily: 'var(--font-josefin)',
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                padding: '14px 28px',
                textDecoration: 'none',
                display: 'inline-block',
              }}
            >
              Learn More
            </Link>
          </div>
        </div>

        <div className="mx-6 md:mx-12 pb-10">
          <div style={{ height: 2, background: 'var(--bg-dark)', opacity: 0.4 }} />
          <div style={{ height: 1, background: 'var(--taupe)', opacity: 0.3, marginTop: 3 }} />
        </div>
      </section>
    </main>
  )
}
