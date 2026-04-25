import Link from 'next/link'
import { getGivingBackTotal } from '@/lib/content'

export default function Footer() {
  const givingBack = getGivingBackTotal()

  return (
    <footer>
      <div>
        <div style={{ height: 2, background: '#567257' }} />
        <div style={{ height: 1, background: '#ACAB9E' }} />
      </div>

      <div style={{ background: '#2A2420' }} className="px-6 md:px-12 py-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div
              style={{
                fontFamily: 'var(--font-josefin)',
                fontSize: 8,
                fontWeight: 600,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#567257',
                marginBottom: 8,
              }}
            >
              Giving Back
            </div>
            <div
              style={{
                fontFamily: 'var(--font-cormorant)',
                fontSize: 'clamp(1.4rem,3vw,2rem)',
                fontWeight: 300,
                color: '#D9D8D5',
              }}
            >
              ${givingBack.total.toLocaleString()} {givingBack.currency} given back so far
            </div>
          </div>
          <Link
            href="/giving-back"
            style={{
              fontFamily: 'var(--font-josefin)',
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: '#567257',
              textDecoration: 'none',
            }}
          >
            Learn More →
          </Link>
        </div>
      </div>

      <div
        style={{ background: '#2A2420', borderTop: '1px solid rgba(255,255,255,0.05)' }}
        className="px-6 md:px-12 py-12"
      >
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          <div className="col-span-2 md:col-span-1">
            <div
              style={{
                fontFamily: 'var(--font-cormorant)',
                fontSize: 20,
                fontWeight: 400,
                color: '#D9D8D5',
                marginBottom: 4,
                lineHeight: 1.1,
              }}
            >
              Long Lost Yogi
            </div>
            <div
              style={{
                fontFamily: 'var(--font-josefin)',
                fontSize: 9,
                fontWeight: 600,
                letterSpacing: '0.24em',
                textTransform: 'uppercase',
                color: '#896A58',
                marginBottom: 16,
              }}
            >
              Found at the source
            </div>
            <p
              style={{
                fontFamily: 'var(--font-josefin)',
                fontSize: 11,
                color: 'rgba(217,216,213,0.5)',
                lineHeight: 1.7,
              }}
            >
              Curating the long-lost art of knowing where your things come from.
            </p>
            <div className="mt-6" style={{ width: 28 }}>
              <div style={{ height: 2, background: '#ACAB9E', opacity: 0.8, marginBottom: 3 }} />
              <div style={{ height: 1, background: '#896A58', opacity: 0.45 }} />
            </div>
          </div>

          <div>
            <div
              style={{
                fontFamily: 'var(--font-josefin)',
                fontSize: 9,
                fontWeight: 600,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#896A58',
                marginBottom: 20,
              }}
            >
              Explore
            </div>
            <div className="flex flex-col gap-3">
              {[
                { label: 'The Collection', href: '/shop' },
                { label: 'The Stories', href: '/storyboard' },
                { label: 'Giving Back', href: '/giving-back' },
                { label: 'About', href: '/about' },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    fontFamily: 'var(--font-josefin)',
                    fontSize: 11,
                    color: 'rgba(217,216,213,0.5)',
                    textDecoration: 'none',
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <div
              style={{
                fontFamily: 'var(--font-josefin)',
                fontSize: 9,
                fontWeight: 600,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#896A58',
                marginBottom: 20,
              }}
            >
              Connect
            </div>
            <div className="flex flex-col gap-3">
              {[
                { label: 'Become a Curator', href: '/curators/apply' },
                { label: 'Curators', href: '/curators' },
                { label: 'Dashboard', href: '/dashboard' },
                { label: 'Contact', href: '/about' },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    fontFamily: 'var(--font-josefin)',
                    fontSize: 11,
                    color: 'rgba(217,216,213,0.5)',
                    textDecoration: 'none',
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <div
              style={{
                fontFamily: 'var(--font-josefin)',
                fontSize: 9,
                fontWeight: 600,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#896A58',
                marginBottom: 20,
              }}
            >
              Follow
            </div>
            <div className="flex flex-col gap-3">
              {['Instagram', 'Pinterest', 'Newsletter'].map((label) => (
                <span
                  key={label}
                  style={{
                    fontFamily: 'var(--font-josefin)',
                    fontSize: 11,
                    color: 'rgba(217,216,213,0.5)',
                    cursor: 'default',
                  }}
                >
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div
        style={{ background: '#2A2420', borderTop: '1px solid rgba(217,216,213,0.08)' }}
        className="px-6 md:px-12 py-4"
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
          <p style={{ fontFamily: 'var(--font-josefin)', fontSize: 10, color: 'rgba(217,216,213,0.3)' }}>
            © {new Date().getFullYear()} Long Lost Yogi. All rights reserved.
          </p>
          <p style={{ fontFamily: 'var(--font-josefin)', fontSize: 10, color: 'rgba(217,216,213,0.3)' }}>
            Store opening soon.
          </p>
        </div>
      </div>
    </footer>
  )
}
