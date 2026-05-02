import { getAllProducts } from '@/lib/content'
import ShopContent from '@/components/ShopContent'
import DecoDoubleRule from '@/components/DecoDoubleRule'

export const metadata = {
  title: 'The Collection — Long Lost Yogi',
  description: 'Handmade objects with documented provenance from makers across Asia.',
}

export default function ShopPage() {
  const products = getAllProducts()

  return (
    <main>
      {/* PAGE HEADER */}
      <section
        className="relative overflow-hidden"
        style={{ background: 'var(--green)', padding: '5rem 0 4rem' }}
      >
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0 }}>
          <div style={{ height: 2, background: 'var(--green)' }} />
          <div style={{ height: 1, background: 'var(--taupe)', marginTop: 3 }} />
        </div>
        <div
          style={{
            position: 'absolute',
            top: 0, bottom: 0,
            right: '30%',
            width: '0.5px',
            background: 'var(--bg-dark)',
            opacity: 0.15,
          }}
        />
        <div className="max-w-6xl mx-auto px-6 md:px-12 pt-6">
          <DecoDoubleRule />
          <h1
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontWeight: 300,
              fontSize: 'clamp(1.8rem,4.5vw,3.2rem)',
              color: 'var(--bg)',
              lineHeight: 1.2,
              marginBottom: 14,
            }}
          >
            The Collection
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-josefin)',
              fontWeight: 300,
              fontSize: 12,
              color: 'rgba(217,216,213,0.7)',
              maxWidth: 480,
              lineHeight: 1.8,
            }}
          >
            Every piece has a story. Every story has a place. Every place has a person who made it the same way their family always has.
          </p>
        </div>
      </section>

      <ShopContent products={products} />
    </main>
  )
}
