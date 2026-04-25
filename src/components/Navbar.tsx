'use client'

import Link from 'next/link'
import { useState } from 'react'

const navLinks = [
  { label: 'The Collection', href: '/shop' },
  { label: 'The Stories', href: '/storyboard' },
  { label: 'Giving Back', href: '/giving-back' },
  { label: 'About', href: '/about' },
  { label: 'Curators', href: '/curators' },
]

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <>
      <div style={{ height: 2, background: '#567257', opacity: 0.65 }} />

      <header
        className="relative z-50 flex items-center px-6 md:px-12"
        style={{
          height: 68,
          background: '#D9D8D5',
          borderBottom: '1px solid rgba(42,36,32,0.12)',
        }}
      >
        <style>{`
          @media (max-width: 767px) { .lly-header { height: 60px !important; } }
        `}</style>

        <Link href="/" className="flex flex-col mr-auto" style={{ textDecoration: 'none' }}>
          <span
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontSize: 22,
              fontWeight: 400,
              color: '#2A2420',
              lineHeight: 1.1,
            }}
          >
            Long Lost Yogi
          </span>
          <span
            style={{
              fontFamily: 'var(--font-josefin)',
              fontSize: 9,
              fontWeight: 600,
              letterSpacing: '0.24em',
              textTransform: 'uppercase',
              color: '#896A58',
            }}
          >
            Found at the source
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="nav-link-underline"
              style={{
                fontFamily: 'var(--font-josefin)',
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: '#567257',
                textDecoration: 'none',
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 ml-6 md:ml-8">
          <Link
            href="/login"
            style={{
              width: 34,
              height: 34,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid rgba(42,36,32,0.22)',
              color: '#567257',
            }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </Link>
          <button
            style={{
              width: 34,
              height: 34,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid rgba(42,36,32,0.22)',
              color: '#567257',
              background: 'transparent',
              cursor: 'pointer',
            }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
          </button>

          <button
            className="md:hidden"
            onClick={() => setDrawerOpen(true)}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: '#2A2420',
              marginLeft: 4,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>
      </header>

      {drawerOpen && (
        <div className="fixed inset-0 z-[100] md:hidden">
          <div
            className="absolute inset-0"
            style={{ background: 'rgba(42,36,32,0.5)' }}
            onClick={() => setDrawerOpen(false)}
          />
          <div
            className="absolute top-0 right-0 h-full flex flex-col"
            style={{ width: 280, background: '#D9D8D5' }}
          >
            <div className="flex justify-end p-6">
              <button
                onClick={() => setDrawerOpen(false)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#2A2420',
                }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            <nav className="flex flex-col px-8 gap-8 pt-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setDrawerOpen(false)}
                  style={{
                    fontFamily: 'var(--font-cormorant)',
                    fontSize: 28,
                    fontWeight: 300,
                    color: '#2A2420',
                    textDecoration: 'none',
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  )
}
