'use client'

import { useState, useRef, useCallback } from 'react'
import DecoDoubleRule from '@/components/DecoDoubleRule'

const TABS = ['Orders', 'Applications', 'Giving Back', 'Content', 'Images'] as const
type Tab = (typeof TABS)[number]

export default function AdminPage() {
  const [authed, setAuthed] = useState(false)
  const [pwInput, setPwInput] = useState('')
  const [pwError, setPwError] = useState(false)
  const [activeTab, setActiveTab] = useState<Tab>('Orders')

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (pwInput === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      setAuthed(true)
    } else {
      setPwError(true)
    }
  }

  if (!authed) {
    return (
      <main
        style={{
          background: 'var(--bg)',
          minHeight: '80vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div style={{ maxWidth: 360, width: '100%', padding: '0 24px' }}>
          <DecoDoubleRule />
          <h1
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontWeight: 300,
              fontSize: '2rem',
              color: 'var(--dp)',
              marginBottom: 24,
            }}
          >
            Admin
          </h1>
          <form onSubmit={handleLogin} className="flex flex-col gap-6">
            <input
              type="password"
              value={pwInput}
              onChange={(e) => { setPwInput(e.target.value); setPwError(false) }}
              placeholder="Password"
              style={{
                width: '100%',
                background: 'transparent',
                border: 'none',
                borderBottom: `1px solid ${pwError ? 'var(--taupe)' : 'rgba(42,36,32,0.22)'}`,
                padding: '10px 0',
                fontFamily: 'var(--font-josefin)',
                fontSize: 13,
                color: 'var(--dp)',
                outline: 'none',
              }}
            />
            {pwError && (
              <p style={{ fontFamily: 'var(--font-josefin)', fontSize: 11, color: 'var(--taupe)', marginTop: -12 }}>
                Incorrect password.
              </p>
            )}
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
                padding: '12px',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Enter
            </button>
          </form>
        </div>
      </main>
    )
  }

  return (
    <main style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <section style={{ background: 'var(--dp)', padding: '3rem 0 2.5rem' }}>
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <DecoDoubleRule />
          <h1
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontWeight: 300,
              fontSize: 'clamp(1.5rem,3vw,2.2rem)',
              color: 'var(--bg)',
            }}
          >
            Admin Panel
          </h1>
        </div>
      </section>

      {/* TABS */}
      <div
        style={{
          background: 'var(--bg)',
          borderBottom: '1px solid rgba(42,36,32,0.12)',
          position: 'sticky',
          top: 0,
          zIndex: 40,
        }}
      >
        <div className="max-w-6xl mx-auto px-6 md:px-12 flex overflow-x-auto">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                fontFamily: 'var(--font-josefin)',
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                padding: '14px 20px',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                color: activeTab === tab ? 'var(--dp)' : 'rgba(42,36,32,0.38)',
                borderBottom: activeTab === tab ? '2px solid var(--green)' : '2px solid transparent',
                whiteSpace: 'nowrap',
              }}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-12 py-12">
        {activeTab === 'Orders' && <OrdersTab />}
        {activeTab === 'Applications' && <ApplicationsTab />}
        {activeTab === 'Giving Back' && <GivingBackTab />}
        {activeTab === 'Content' && <ContentTab />}
        {activeTab === 'Images' && <ImagesTab />}
      </div>
    </main>
  )
}

function OrdersTab() {
  return (
    <div>
      <SectionHeader eyebrow="Orders" heading="All Orders" />
      <p style={{ fontFamily: 'var(--font-josefin)', fontSize: 12, color: 'rgba(42,36,32,0.4)', marginTop: 16 }}>
        No orders yet. Orders will appear here when the store opens.
      </p>
    </div>
  )
}

function ApplicationsTab() {
  return (
    <div>
      <SectionHeader eyebrow="Applications" heading="Curator Applications" />
      <p style={{ fontFamily: 'var(--font-josefin)', fontSize: 12, color: 'rgba(42,36,32,0.4)', marginTop: 16 }}>
        No applications yet.
      </p>
    </div>
  )
}

function GivingBackTab() {
  const [amount, setAmount] = useState('')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  const handleSave = async () => {
    const num = parseFloat(amount)
    if (isNaN(num) || num < 0) { setError('Please enter a valid number.'); return }
    setSaving(true)
    setError('')
    try {
      const res = await fetch('/api/giving-back', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-secret': process.env.NEXT_PUBLIC_ADMIN_PASSWORD ?? '',
        },
        body: JSON.stringify({ total: num }),
      })
      if (!res.ok) throw new Error('Failed')
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    } catch {
      setError('Save failed. Check the admin secret.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div>
      <SectionHeader eyebrow="Giving Back" heading="Update Giving Back Total" />
      <div className="mt-8 flex flex-col gap-4" style={{ maxWidth: 360 }}>
        <label
          style={{
            fontFamily: 'var(--font-josefin)',
            fontSize: 9, fontWeight: 600,
            letterSpacing: '0.18em', textTransform: 'uppercase',
            color: 'var(--taupe)',
          }}
        >
          New Total (AUD)
        </label>
        <input
          type="number"
          min="0"
          step="0.01"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="0.00"
          style={{
            background: 'transparent',
            border: 'none',
            borderBottom: '1px solid rgba(42,36,32,0.22)',
            padding: '10px 0',
            fontFamily: 'var(--font-josefin)',
            fontSize: 13,
            color: 'var(--dp)',
            outline: 'none',
          }}
        />
        {error && <p style={{ fontFamily: 'var(--font-josefin)', fontSize: 11, color: 'var(--taupe)' }}>{error}</p>}
        <button
          onClick={handleSave}
          disabled={saving}
          style={{
            background: saved ? 'var(--green)' : 'var(--dp)',
            color: 'var(--bg)',
            fontFamily: 'var(--font-josefin)',
            fontSize: 11, fontWeight: 600,
            letterSpacing: '0.16em', textTransform: 'uppercase',
            padding: '12px 24px',
            border: 'none',
            cursor: saving ? 'wait' : 'pointer',
            alignSelf: 'flex-start',
            transition: 'background 0.3s',
          }}
        >
          {saved ? 'Saved' : saving ? 'Saving...' : 'Save'}
        </button>
      </div>
    </div>
  )
}

function ContentTab() {
  const [slug, setSlug] = useState('')
  const [type, setType] = useState('story')
  const [field, setField] = useState('')
  const [value, setValue] = useState('')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const handleSave = async () => {
    if (!slug || !field || !value) return
    setSaving(true)
    try {
      await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug, type, field, value }),
      })
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    } finally {
      setSaving(false)
    }
  }

  const fieldStyle: React.CSSProperties = {
    background: 'transparent',
    border: 'none',
    borderBottom: '1px solid rgba(42,36,32,0.22)',
    padding: '10px 0',
    fontFamily: 'var(--font-josefin)',
    fontSize: 13,
    color: 'var(--dp)',
    outline: 'none',
    width: '100%',
  }

  const labelStyle: React.CSSProperties = {
    fontFamily: 'var(--font-josefin)',
    fontSize: 9, fontWeight: 600,
    letterSpacing: '0.18em', textTransform: 'uppercase',
    color: 'var(--taupe)', display: 'block', marginBottom: 6,
  }

  return (
    <div>
      <SectionHeader eyebrow="Content" heading="Edit Content Fields" />
      <div className="mt-8 flex flex-col gap-6" style={{ maxWidth: 480 }}>
        <div>
          <label style={labelStyle}>Type</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            style={{ ...fieldStyle, cursor: 'pointer' }}
          >
            <option value="story">Story</option>
            <option value="product">Product</option>
          </select>
        </div>
        <div>
          <label style={labelStyle}>Slug</label>
          <input type="text" value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="e.g. marrakech-leather" style={fieldStyle} />
        </div>
        <div>
          <label style={labelStyle}>Field</label>
          <input type="text" value={field} onChange={(e) => setField(e.target.value)} placeholder="e.g. title, excerpt" style={fieldStyle} />
        </div>
        <div>
          <label style={labelStyle}>Value</label>
          <textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            rows={4}
            style={{ ...fieldStyle, borderBottom: 'none', border: '1px solid rgba(42,36,32,0.22)', padding: '10px', resize: 'vertical' }}
          />
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          style={{
            background: saved ? 'var(--green)' : 'var(--dp)',
            color: 'var(--bg)',
            fontFamily: 'var(--font-josefin)',
            fontSize: 11, fontWeight: 600,
            letterSpacing: '0.16em', textTransform: 'uppercase',
            padding: '12px 24px',
            border: 'none',
            cursor: saving ? 'wait' : 'pointer',
            alignSelf: 'flex-start',
          }}
        >
          {saved ? 'Saved' : saving ? 'Saving...' : 'Save Field'}
        </button>
      </div>
    </div>
  )
}

function ImagesTab() {
  const [slug, setSlug] = useState('')
  const [type, setType] = useState<'product' | 'story'>('product')
  const [dragOver, setDragOver] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [uploaded, setUploaded] = useState<string | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  const upload = useCallback(async (file: File) => {
    if (!slug) { alert('Enter a slug first.'); return }
    setUploading(true)
    const fd = new FormData()
    fd.append('file', file)
    fd.append('slug', slug)
    fd.append('type', type)
    try {
      const res = await fetch('/api/upload', { method: 'POST', body: fd })
      const data = await res.json()
      setUploaded(data.path)
    } finally {
      setUploading(false)
    }
  }, [slug, type])

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files[0]
    if (file) upload(file)
  }

  const fieldStyle: React.CSSProperties = {
    background: 'transparent', border: 'none',
    borderBottom: '1px solid rgba(42,36,32,0.22)',
    padding: '10px 0',
    fontFamily: 'var(--font-josefin)', fontSize: 13, color: 'var(--dp)', outline: 'none', width: '100%',
  }
  const labelStyle: React.CSSProperties = {
    fontFamily: 'var(--font-josefin)', fontSize: 9, fontWeight: 600,
    letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--taupe)', display: 'block', marginBottom: 6,
  }

  return (
    <div>
      <SectionHeader eyebrow="Images" heading="Upload Images" />
      <div className="mt-8 flex flex-col gap-6" style={{ maxWidth: 480 }}>
        <div>
          <label style={labelStyle}>Type</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value as 'product' | 'story')}
            style={{ ...fieldStyle, cursor: 'pointer' }}
          >
            <option value="product">Product</option>
            <option value="story">Story</option>
          </select>
        </div>
        <div>
          <label style={labelStyle}>Slug</label>
          <input
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="e.g. leather-tote-marrakech"
            style={fieldStyle}
          />
        </div>

        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => fileRef.current?.click()}
          style={{
            border: `1px dashed ${dragOver ? 'var(--green)' : 'rgba(42,36,32,0.22)'}`,
            background: dragOver ? 'rgba(86,114,87,0.04)' : 'transparent',
            padding: '3rem 2rem',
            textAlign: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
        >
          <p style={{ fontFamily: 'var(--font-josefin)', fontSize: 12, color: 'rgba(42,36,32,0.5)' }}>
            {uploading ? 'Uploading...' : 'Drag and drop an image, or click to select'}
          </p>
          <p style={{ fontFamily: 'var(--font-josefin)', fontSize: 10, color: 'rgba(42,36,32,0.35)', marginTop: 6 }}>
            JPG, PNG, WEBP — saves to /public/images/{type}s/
          </p>
        </div>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (file) upload(file)
          }}
        />

        {uploaded && (
          <div style={{ borderLeft: '2px solid var(--green)', paddingLeft: 12 }}>
            <p style={{ fontFamily: 'var(--font-josefin)', fontSize: 11, color: 'var(--green)' }}>
              Uploaded: {uploaded}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

function SectionHeader({ eyebrow, heading }: { eyebrow: string; heading: string }) {
  return (
    <div>
      <DecoDoubleRule />
      <div
        style={{
          fontFamily: 'var(--font-josefin)',
          fontSize: 9, fontWeight: 600,
          letterSpacing: '0.2em', textTransform: 'uppercase',
          color: 'var(--taupe)', marginBottom: 8,
        }}
      >
        {eyebrow}
      </div>
      <h2
        style={{
          fontFamily: 'var(--font-cormorant)',
          fontWeight: 300,
          fontSize: 'clamp(1.3rem,2.2vw,1.8rem)',
          color: 'var(--dp)',
        }}
      >
        {heading}
      </h2>
    </div>
  )
}
