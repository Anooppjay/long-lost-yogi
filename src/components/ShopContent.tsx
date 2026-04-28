'use client'

import { useState } from 'react'
import type { Product } from '@/lib/content'
import CollectionDrawer from './CollectionDrawer'
import DecoDoubleRule from './DecoDoubleRule'

export default function ShopContent({ products }: { products: Product[] }) {
  const [activeOrigin, setActiveOrigin] = useState('All')
  const [activeCategory, setActiveCategory] = useState('All')
  const [activeProduct, setActiveProduct] = useState<Product | null>(null)

  const origins = ['All', ...Array.from(new Set(products.map((p) => p.origin)))]
  const categories = ['All', ...Array.from(new Set(products.map((p) => p.category)))]

  const filtered = products.filter((p) => {
    const byOrigin = activeOrigin === 'All' || p.origin === activeOrigin
    const byCategory = activeCategory === 'All' || p.category === activeCategory
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
    color: active ? 'var(--dp)' : 'rgba(42,36,32,0.38)',
    borderBottom: active ? '2px solid var(--green)' : '2px solid transparent',
    whiteSpace: 'nowrap',
  })

  return (
    <>
      {/* FILTER BAR */}
      <div
        className="sticky z-40 overflow-x-auto"
        style={{ top: 0, background: 'var(--bg)', borderBottom: '1px solid rgba(42,36,32,0.12)' }}
      >
        <div className="max-w-6xl mx-auto px-6 md:px-12 flex items-center justify-between min-w-max">
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

      {/* PRODUCT GRID */}
      <section style={{ background: 'var(--bg)' }} className="py-16">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          {filtered.length === 0 ? (
            <p style={{ fontFamily: 'var(--font-josefin)', fontSize: 12, color: 'rgba(42,36,32,0.4)', textAlign: 'center', padding: '4rem 0' }}>
              No pieces match this filter.
            </p>
          ) : (
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
              style={{ gap: '1.5px', background: 'rgba(42,36,32,0.12)' }}
            >
              {filtered.map((product) => (
                <ProductCard
                  key={product.slug}
                  product={product}
                  onClick={() => setActiveProduct(product)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <CollectionDrawer product={activeProduct} onClose={() => setActiveProduct(null)} />
    </>
  )
}

function ProductCard({ product, onClick }: { product: Product; onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      className="group"
      style={{
        background: 'var(--bg)',
        border: '1px solid rgba(42,36,32,0.12)',
        cursor: 'pointer',
        transition: 'border-color 0.2s',
      }}
      onMouseEnter={(e) => {
        ;(e.currentTarget as HTMLDivElement).style.borderColor = 'var(--green)'
      }}
      onMouseLeave={(e) => {
        ;(e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(42,36,32,0.12)'
      }}
    >
      <div
        className="relative overflow-hidden"
        style={{ aspectRatio: '3/4', background: 'var(--dp)' }}
      >
        <div
          style={{
            position: 'absolute', top: 8, left: 8,
            width: 18, height: 18,
            borderTop: '1px solid var(--bg-dark)',
            borderLeft: '1px solid var(--bg-dark)',
            zIndex: 1,
          }}
        />
        <div
          style={{
            position: 'absolute', top: 10, right: 10,
            zIndex: 1,
            background: 'var(--bg)',
            color: 'var(--green)',
            fontFamily: 'var(--font-josefin)',
            fontSize: 8, fontWeight: 600,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            padding: '3px 7px',
            border: '1px solid rgba(86,114,87,0.4)',
          }}
        >
          {product.category}
        </div>
        <div
          style={{
            position: 'absolute', top: 0, left: 0, bottom: 0,
            width: 3,
            background: 'var(--taupe)',
            opacity: 0.4,
          }}
        />
        <div
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: 'rgba(42,36,32,0.45)' }}
        >
          <span
            style={{
              fontFamily: 'var(--font-josefin)',
              fontSize: 10, fontWeight: 600,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: 'var(--bg)',
            }}
          >
            View &amp; Read
          </span>
        </div>
      </div>

      <div style={{ borderBottom: '1px solid rgba(42,36,32,0.12)', padding: '12px 16px' }}>
        <div
          style={{
            fontFamily: 'var(--font-josefin)',
            fontSize: 8, fontWeight: 600,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'var(--taupe)',
            marginBottom: 6,
          }}
        >
          {product.story_slug.replace(/-/g, ' ')}
        </div>
        <p
          style={{
            fontFamily: 'var(--font-cormorant)',
            fontStyle: 'italic',
            fontSize: '0.875rem',
            color: 'rgba(42,36,32,0.78)',
            lineHeight: 1.5,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          } as React.CSSProperties}
        >
          {product.excerpt}
        </p>
      </div>

      <div style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div className="flex items-center gap-2">
          <div
            style={{
              width: 26, height: 26,
              borderRadius: '50%',
              background: 'var(--bg-dark)',
              border: '1px solid rgba(42,36,32,0.22)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <span style={{ fontFamily: 'var(--font-cormorant)', fontSize: 10, color: 'var(--dp)' }}>
              {product.makerInitials}
            </span>
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-josefin)', fontSize: 10, fontWeight: 600, color: 'var(--dp)' }}>
              {product.maker}
            </div>
            <div style={{ fontFamily: 'var(--font-josefin)', fontSize: 8, fontWeight: 300, color: 'rgba(42,36,32,0.5)' }}>
              {product.origin}
            </div>
          </div>
        </div>
        <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.25rem', color: 'var(--dp)' }}>
          {product.price}
        </div>
      </div>
    </div>
  )
}
