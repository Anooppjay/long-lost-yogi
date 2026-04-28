'use client'

import { useState } from 'react'
import Link from 'next/link'
import DecoDoubleRule from '@/components/DecoDoubleRule'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const inputStyle: React.CSSProperties = {
    width: '100%',
    background: 'transparent',
    border: 'none',
    borderBottom: '1px solid rgba(42,36,32,0.22)',
    padding: '10px 0',
    fontFamily: 'var(--font-josefin)',
    fontSize: 13,
    color: 'var(--dp)',
    outline: 'none',
  }

  const labelStyle: React.CSSProperties = {
    fontFamily: 'var(--font-josefin)',
    fontSize: 9,
    fontWeight: 600,
    letterSpacing: '0.18em',
    textTransform: 'uppercase',
    color: 'var(--taupe)',
    display: 'block',
    marginBottom: 6,
  }

  return (
    <main
      style={{ background: 'var(--bg)', minHeight: '80vh', display: 'flex', alignItems: 'center' }}
    >
      <div className="max-w-md mx-auto px-6 py-16 w-full">
        <DecoDoubleRule />
        <h1
          style={{
            fontFamily: 'var(--font-cormorant)',
            fontWeight: 300,
            fontSize: 'clamp(1.8rem,4vw,2.8rem)',
            color: 'var(--dp)',
            lineHeight: 1.15,
            marginBottom: 8,
          }}
        >
          Sign In
        </h1>
        <p
          style={{
            fontFamily: 'var(--font-josefin)',
            fontWeight: 300,
            fontSize: 11,
            color: 'rgba(42,36,32,0.5)',
            marginBottom: 36,
          }}
        >
          Long Lost Yogi — store opening soon.
        </p>

        <form className="flex flex-col gap-8">
          <div>
            <label htmlFor="email" style={labelStyle}>Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              style={inputStyle}
            />
          </div>
          <div>
            <label htmlFor="password" style={labelStyle}>Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              style={inputStyle}
            />
          </div>

          <button
            type="submit"
            style={{
              background: 'var(--green)',
              color: 'var(--bg)',
              fontFamily: 'var(--font-josefin)',
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              padding: '14px',
              border: 'none',
              cursor: 'pointer',
              width: '100%',
            }}
          >
            Sign In
          </button>
        </form>

        <p
          style={{
            fontFamily: 'var(--font-josefin)',
            fontSize: 11,
            color: 'rgba(42,36,32,0.45)',
            marginTop: 24,
            textAlign: 'center',
          }}
        >
          Don&apos;t have an account?{' '}
          <Link href="/curators/apply" style={{ color: 'var(--green)', textDecoration: 'none' }}>
            Apply to curate
          </Link>
        </p>
      </div>
    </main>
  )
}
