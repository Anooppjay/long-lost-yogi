'use client'

import { useState } from 'react'
import DecoDoubleRule from '@/components/DecoDoubleRule'

export default function CuratorApplyPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    location: '',
    story: '',
    social: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/curator-apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Submission failed')
      setSubmitted(true)
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

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
    <main style={{ background: 'var(--bg)' }}>
      <section style={{ background: 'var(--dp)', padding: '5rem 0 4rem' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0 }}>
          <div style={{ height: 2, background: 'var(--green)' }} />
          <div style={{ height: 1, background: 'var(--taupe)', marginTop: 3 }} />
        </div>
        <div className="max-w-3xl mx-auto px-6 md:px-12">
          <DecoDoubleRule />
          <h1
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontWeight: 300,
              fontSize: 'clamp(1.8rem,4vw,3rem)',
              color: 'var(--bg)',
              lineHeight: 1.2,
              marginBottom: 14,
            }}
          >
            Apply to Curate
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-josefin)',
              fontWeight: 300,
              fontSize: 12,
              color: 'rgba(217,216,213,0.42)',
              lineHeight: 1.8,
            }}
          >
            Tell us about a maker you know. We read every application personally.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-3xl mx-auto px-6 md:px-12">
          {submitted ? (
            <div className="py-16 text-center">
              <DecoDoubleRule className="mx-auto" />
              <h2
                style={{
                  fontFamily: 'var(--font-cormorant)',
                  fontWeight: 300,
                  fontSize: '2rem',
                  color: 'var(--dp)',
                  marginBottom: 16,
                }}
              >
                Thank you.
              </h2>
              <p
                style={{
                  fontFamily: 'var(--font-josefin)',
                  fontWeight: 300,
                  fontSize: 13,
                  color: 'rgba(42,36,32,0.6)',
                  lineHeight: 1.8,
                }}
              >
                We read every application. We will be in touch.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label htmlFor="name" style={labelStyle}>Full Name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label htmlFor="email" style={labelStyle}>Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    style={inputStyle}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="location" style={labelStyle}>Where do you travel?</label>
                <input
                  id="location"
                  name="location"
                  type="text"
                  required
                  value={form.location}
                  onChange={handleChange}
                  placeholder="e.g. Nepal, Bali, Morocco"
                  style={inputStyle}
                />
              </div>

              <div>
                <label htmlFor="story" style={labelStyle}>
                  Tell us about a maker you know
                </label>
                <textarea
                  id="story"
                  name="story"
                  required
                  value={form.story}
                  onChange={handleChange}
                  rows={6}
                  placeholder="Who are they? What do they make? Why does the craft matter? Where did you find them?"
                  style={{
                    ...inputStyle,
                    borderBottom: 'none',
                    border: '1px solid rgba(42,36,32,0.22)',
                    padding: '12px',
                    resize: 'vertical',
                    lineHeight: 1.7,
                  }}
                />
              </div>

              <div>
                <label style={labelStyle}>Photos</label>
                <p
                  style={{
                    fontFamily: 'var(--font-josefin)',
                    fontWeight: 300,
                    fontSize: 11,
                    color: 'rgba(42,36,32,0.55)',
                    lineHeight: 1.7,
                  }}
                >
                  You can send photos separately to hello@longllostyogi.com once we&apos;ve been
                  in touch. We accept JPG, PNG, and RAW files. Minimum 1200px wide.
                </p>
              </div>

              <div>
                <label htmlFor="social" style={labelStyle}>Instagram or Website (optional)</label>
                <input
                  id="social"
                  name="social"
                  type="text"
                  value={form.social}
                  onChange={handleChange}
                  placeholder="@handle or https://"
                  style={inputStyle}
                />
              </div>

              {error && (
                <p
                  style={{
                    fontFamily: 'var(--font-josefin)',
                    fontSize: 11,
                    color: 'var(--taupe)',
                  }}
                >
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                style={{
                  background: loading ? 'rgba(86,114,87,0.5)' : 'var(--green)',
                  color: 'var(--bg)',
                  fontFamily: 'var(--font-josefin)',
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  padding: '14px 32px',
                  border: 'none',
                  cursor: loading ? 'wait' : 'pointer',
                  alignSelf: 'flex-start',
                }}
              >
                {loading ? 'Sending...' : 'Submit Application'}
              </button>
            </form>
          )}
        </div>
      </section>
    </main>
  )
}
