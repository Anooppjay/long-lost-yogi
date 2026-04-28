import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getAllProducts, getProductBySlug, getStoryBySlug } from '@/lib/content'
import DecoDoubleRule from '@/components/DecoDoubleRule'

export async function generateStaticParams() {
  const products = getAllProducts()
  return products.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug)
  if (!product) return {}
  return {
    title: `${product.title} â€” Long Lost Yogi`,
    description: product.excerpt,
  }
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug)
  if (!product) notFound()

  const story = product.story_slug ? getStoryBySlug(product.story_slug) : null

  return (
    <main style={{ background: 'var(--bg)' }}>
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Images left */}
          <div className="flex flex-col gap-[1.5px]">
            <div className="relative overflow-hidden" style={{ aspectRatio: '3/4', background: 'var(--dp)' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: 4, background: 'var(--taupe)', opacity: 0.4 }} />
            </div>
            <div className="relative overflow-hidden" style={{ aspectRatio: '4/3', background: 'var(--dp)' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: 4, background: 'var(--taupe)', opacity: 0.4 }} />
            </div>
          </div>

          {/* Details right â€” sticky */}
          <div className="md:sticky md:top-24 flex flex-col gap-5">
            <div className="flex flex-wrap gap-2">
              <span
                style={{
                  fontFamily: 'var(--font-josefin)',
                  fontSize: 9, fontWeight: 600,
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color: 'var(--green)',
                  border: '1px solid rgba(86,114,87,0.5)',
                  padding: '3px 8px',
                }}
              >
                {product.origin}
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-josefin)',
                  fontSize: 9, fontWeight: 600,
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color: 'var(--taupe)',
                  border: '1px solid rgba(137,106,88,0.4)',
                  padding: '3px 8px',
                }}
              >
                {product.category}
              </span>
            </div>

            <h1
              style={{
                fontFamily: 'var(--font-cormorant)',
                fontWeight: 300,
                fontSize: 'clamp(1.6rem,3vw,2.4rem)',
                color: 'var(--dp)',
                lineHeight: 1.2,
              }}
            >
              {product.title}
            </h1>

            <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.75rem', color: 'var(--dp)' }}>
              {product.price}
            </div>

            <div className="flex items-center gap-3">
              <div
                style={{
                  width: 46, height: 46,
                  background: 'var(--bg-dark)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  borderBottom: '2px solid var(--taupe)',
                  flexShrink: 0,
                }}
              >
                <span style={{ fontFamily: 'var(--font-cormorant)', fontSize: 15, color: 'var(--dp)' }}>
                  {product.makerInitials}
                </span>
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: 15, color: 'var(--dp)' }}>
                  {product.maker}
                </div>
                <div style={{ fontFamily: 'var(--font-josefin)', fontSize: 9, color: 'var(--taupe)', opacity: 0.7 }}>
                  {product.makerLocation}
                </div>
              </div>
            </div>

            <div style={{ background: 'var(--bg-dark)', padding: '10px 14px' }}>
              <p style={{ fontFamily: 'var(--font-josefin)', fontSize: 11, color: 'var(--dp)', opacity: 0.8 }}>
                {product.shipping}
              </p>
            </div>

            <div style={{ borderLeft: '2px solid var(--green)', paddingLeft: 12 }}>
              <p style={{ fontFamily: 'var(--font-josefin)', fontSize: 11, color: 'var(--dp)', opacity: 0.8 }}>
                {product.giving_back}
              </p>
            </div>

            <button
              disabled
              style={{
                background: 'rgba(42,36,32,0.15)',
                color: 'rgba(42,36,32,0.35)',
                fontFamily: 'var(--font-josefin)',
                fontSize: 11, fontWeight: 600,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                padding: '14px 24px',
                border: 'none',
                cursor: 'not-allowed',
              }}
            >
              Store Opening Soon
            </button>

            <p style={{ fontFamily: 'var(--font-josefin)', fontSize: 10, color: 'rgba(42,36,32,0.45)' }}>
              {product.dimensions} Â· {product.material}
            </p>

            {story && (
              <Link
                href={`/storyboard/${story.slug}`}
                style={{
                  fontFamily: 'var(--font-josefin)',
                  fontSize: 10, fontWeight: 600,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'var(--green)',
                  textDecoration: 'none',
                }}
              >
                Read the Story â†’
              </Link>
            )}
          </div>
        </div>

        {/* Story section */}
        {story && (
          <section style={{ background: 'var(--bg-dark)', margin: '4rem -1.5rem -3rem', padding: '3rem 1.5rem' }}>
            <div className="max-w-4xl mx-auto">
              <DecoDoubleRule />
              <div
                style={{
                  fontFamily: 'var(--font-josefin)',
                  fontSize: 8, fontWeight: 600,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'var(--taupe)',
                  marginBottom: 10,
                }}
              >
                The Story Behind This Piece
              </div>
              <h2
                style={{
                  fontFamily: 'var(--font-cormorant)',
                  fontWeight: 300,
                  fontSize: 'clamp(1.4rem,2.5vw,2rem)',
                  color: 'var(--dp)',
                  marginBottom: 24,
                }}
              >
                {story.title}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <p
                  style={{
                    fontFamily: 'var(--font-cormorant)',
                    fontStyle: 'italic',
                    fontSize: '1.1rem',
                    color: 'var(--dp)',
                    lineHeight: 1.7,
                  }}
                >
                  {story.excerpt}
                </p>
                <div className="relative" style={{ aspectRatio: '4/3', background: 'var(--dp)' }}>
                  <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: 3, background: 'var(--taupe)', opacity: 0.4 }} />
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </main>
  )
}
