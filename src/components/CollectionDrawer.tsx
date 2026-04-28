'use client'

import { useEffect } from 'react'
import type { Product } from '@/lib/content'
import DecoDoubleRule from './DecoDoubleRule'

interface CollectionDrawerProps {
  product: Product | null
  onClose: () => void
}

export default function CollectionDrawer({ product, onClose }: CollectionDrawerProps) {
  useEffect(() => {
    if (product) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [product])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [onClose])

  if (!product) return null

  return (
    <div className="fixed inset-0 z-[200] flex justify-end">
      <div
        className="absolute inset-0"
        style={{ background: 'rgba(42,36,32,0.65)' }}
        onClick={onClose}
      />

      <div
        className="relative flex flex-col h-full overflow-y-auto"
        style={{
          width: '100%',
          maxWidth: 860,
          background: '#D9D8D5',
          animation: 'drawerSlideIn 0.28s cubic-bezier(0.16,1,0.3,1) forwards',
        }}
      >
        <style>{`
          @keyframes drawerSlideIn {
            from { transform: translateX(40px); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
          }
        `}</style>

        {/* Sticky header */}
        <div
          className="sticky top-0 z-10 flex items-center justify-between px-6 py-4"
          style={{ background: '#D9D8D5', borderBottom: '1px solid rgba(42,36,32,0.12)' }}
        >
          <DecoDoubleRule className="mb-0" />
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: '1px solid rgba(42,36,32,0.22)',
              width: 34,
              height: 34,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#2A2420',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* TOP HALF */}
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Images */}
          <div className="flex flex-col gap-[1.5px]">
            <div
              className="relative overflow-hidden"
              style={{ aspectRatio: '3/4', background: '#2A2420' }}
            >
              <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: 3, background: '#896A58', opacity: 0.4 }} />
            </div>
            <div
              className="relative overflow-hidden"
              style={{ aspectRatio: '4/3', background: '#2A2420' }}
            >
              <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: 3, background: '#896A58', opacity: 0.4 }} />
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-col px-8 py-8 gap-5">
            <div className="flex flex-wrap gap-2">
              <span
                style={{
                  fontFamily: 'var(--font-josefin)',
                  fontSize: 9,
                  fontWeight: 600,
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color: '#567257',
                  border: '1px solid rgba(86,114,87,0.5)',
                  padding: '3px 8px',
                }}
              >
                {product.origin}
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-josefin)',
                  fontSize: 9,
                  fontWeight: 600,
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color: '#896A58',
                  border: '1px solid rgba(137,106,88,0.4)',
                  padding: '3px 8px',
                }}
              >
                {product.category}
              </span>
            </div>

            <h2
              style={{
                fontFamily: 'var(--font-cormorant)',
                fontSize: 'clamp(1.4rem,2.5vw,2rem)',
                fontWeight: 300,
                color: '#2A2420',
                lineHeight: 1.2,
              }}
            >
              {product.title}
            </h2>

            <div
              style={{
                fontFamily: 'var(--font-cormorant)',
                fontSize: '1.65rem',
                fontWeight: 400,
                color: '#2A2420',
              }}
            >
              {product.price}
            </div>

            <div className="flex items-center gap-3">
              <div
                style={{
                  width: 46,
                  height: 46,
                  background: '#ACAB9E',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderBottom: '2px solid #896A58',
                  flexShrink: 0,
                }}
              >
                <span style={{ fontFamily: 'var(--font-cormorant)', fontSize: 15, color: '#2A2420' }}>
                  {product.makerInitials}
                </span>
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: 15, color: '#2A2420' }}>
                  {product.maker}
                </div>
                <div style={{ fontFamily: 'var(--font-josefin)', fontSize: 9, color: '#896A58', opacity: 0.7 }}>
                  {product.makerLocation}
                </div>
              </div>
            </div>

            <div style={{ background: '#ACAB9E', padding: '10px 14px' }}>
              <p style={{ fontFamily: 'var(--font-josefin)', fontSize: 11, color: '#2A2420', opacity: 0.8 }}>
                {product.shipping}
              </p>
            </div>

            <div style={{ borderLeft: '2px solid #567257', paddingLeft: 12 }}>
              <p style={{ fontFamily: 'var(--font-josefin)', fontSize: 11, color: '#2A2420', opacity: 0.8 }}>
                {product.giving_back}
              </p>
            </div>

            <button
              disabled
              style={{
                background: 'rgba(42,36,32,0.15)',
                color: 'rgba(42,36,32,0.35)',
                fontFamily: 'var(--font-josefin)',
                fontSize: 11,
                fontWeight: 600,
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
          </div>
        </div>

        {/* BOTTOM HALF â€” Story */}
        <div style={{ borderTop: '1px solid rgba(42,36,32,0.12)' }} className="px-8 py-10">
          <div
            style={{
              fontFamily: 'var(--font-josefin)',
              fontSize: 8,
              fontWeight: 600,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#896A58',
              marginBottom: 8,
            }}
          >
            The Story
          </div>
          <h3
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontSize: 'clamp(1.2rem,2vw,1.6rem)',
              fontWeight: 300,
              color: '#2A2420',
              marginBottom: 24,
            }}
          >
            {product.title} â€” Made by {product.maker}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <p
                style={{
                  fontFamily: 'var(--font-cormorant)',
                  fontStyle: 'italic',
                  fontSize: '1.1rem',
                  color: '#2A2420',
                  lineHeight: 1.7,
                  marginBottom: 16,
                }}
              >
                {product.excerpt}
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-josefin)',
                  fontWeight: 300,
                  fontSize: 12,
                  color: 'rgba(42,36,32,0.75)',
                  lineHeight: 1.8,
                }}
              >
                {product.content}
              </p>
            </div>
            <div>
              <div
                style={{
                  aspectRatio: '4/3',
                  background: '#2A2420',
                  position: 'relative',
                  marginBottom: 14,
                }}
              >
                <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: 3, background: '#896A58', opacity: 0.4 }} />
              </div>
              <div
                style={{
                  background: '#ACAB9E',
                  padding: '12px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                }}
              >
                <div
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: '50%',
                    background: '#896A58',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <span style={{ fontFamily: 'var(--font-cormorant)', fontSize: 12, color: '#D9D8D5' }}>
                    {product.makerInitials}
                  </span>
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-josefin)', fontSize: 10, fontWeight: 600, color: '#2A2420' }}>
                    {product.maker}
                  </div>
                  <div style={{ fontFamily: 'var(--font-josefin)', fontSize: 9, color: 'rgba(42,36,32,0.6)' }}>
                    {product.origin}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
