'use client'

import { useState } from 'react'
import type { Product } from '@/lib/content'
import CollectionDrawer from './CollectionDrawer'
import DecoDoubleRule from './DecoDoubleRule'

export default function FeaturedListings({ products }: { products: Product[] }) {
  const [activeProduct, setActiveProduct] = useState<Product | null>(null)

  return (
    <section style={{ background: '#D9D8D5' }} className="py-20">
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
              color: '#896A58',
              marginBottom: 10,
            }}
          >
            The Collection
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontWeight: 300,
              fontSize: 'clamp(1.5rem,3vw,2.2rem)',
              color: '#2A2420',
            }}
          >
            Featured Pieces
          </h2>
        </div>

        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
          style={{ gap: '1.5px', background: 'rgba(42,36,32,0.12)' }}
        >
          {products.map((product) => (
            <ProductCard
              key={product.slug}
              product={product}
              onClick={() => setActiveProduct(product)}
            />
          ))}
        </div>
      </div>

      <CollectionDrawer product={activeProduct} onClose={() => setActiveProduct(null)} />
    </section>
  )
}

function ProductCard({ product, onClick }: { product: Product; onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      className="group"
      style={{
        background: '#D9D8D5',
        border: '1px solid rgba(42,36,32,0.12)',
        cursor: 'pointer',
        transition: 'border-color 0.2s',
      }}
      onMouseEnter={(e) => {
        ;(e.currentTarget as HTMLDivElement).style.borderColor = '#567257'
      }}
      onMouseLeave={(e) => {
        ;(e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(42,36,32,0.12)'
      }}
    >
      <div
        className="relative overflow-hidden"
        style={{ aspectRatio: '3/4', background: '#2A2420' }}
      >
        <div
          style={{
            position: 'absolute',
            top: 8,
            left: 8,
            width: 18,
            height: 18,
            borderTop: '1px solid #ACAB9E',
            borderLeft: '1px solid #ACAB9E',
            zIndex: 1,
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 10,
            right: 10,
            zIndex: 1,
            background: '#D9D8D5',
            color: '#567257',
            fontFamily: 'var(--font-josefin)',
            fontSize: 8,
            fontWeight: 600,
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
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            width: 3,
            background: '#896A58',
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
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: '#D9D8D5',
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
            fontSize: 8,
            fontWeight: 600,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: '#896A58',
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
              width: 26,
              height: 26,
              borderRadius: '50%',
              background: '#ACAB9E',
              border: '1px solid rgba(42,36,32,0.22)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <span style={{ fontFamily: 'var(--font-cormorant)', fontSize: 10, color: '#2A2420' }}>
              {product.makerInitials}
            </span>
          </div>
          <div>
            <div
              style={{
                fontFamily: 'var(--font-josefin)',
                fontSize: 10,
                fontWeight: 600,
                color: '#2A2420',
              }}
            >
              {product.maker}
            </div>
            <div
              style={{
                fontFamily: 'var(--font-josefin)',
                fontSize: 8,
                fontWeight: 300,
                color: 'rgba(42,36,32,0.5)',
              }}
            >
              {product.origin}
            </div>
          </div>
        </div>
        <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.25rem', color: '#2A2420' }}>
          {product.price}
        </div>
      </div>
    </div>
  )
}
