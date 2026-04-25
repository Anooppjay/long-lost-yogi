import Link from 'next/link'
import DecoDoubleRule from '@/components/DecoDoubleRule'
import CornerBrackets from '@/components/CornerBrackets'

export const metadata = {
  title: 'Curators — Long Lost Yogi',
  description: 'Join the Long Lost Yogi curator network. Travel. Document. Bring the story home.',
}

const steps = [
  {
    num: '01',
    heading: 'You travel to the source.',
    body: 'You go to where the things are made. Workshops, villages, family ateliers. Not tourist markets. Not trade shows.',
  },
  {
    num: '02',
    heading: 'You document the maker.',
    body: 'You photograph the workspace. You learn the process. You record the provenance — the material origin, the method, the family history behind the craft.',
  },
  {
    num: '03',
    heading: 'You bring us the story.',
    body: 'You write it. We edit it. Together we publish a piece that does justice to the maker and gives the buyer something real to carry home alongside the object.',
  },
  {
    num: '04',
    heading: 'The object follows.',
    body: 'Once the story is live, the object can be purchased. The curator earns a commission. The maker receives direct payment. The community receives the giving back percentage.',
  },
]

const standards = [
  { label: 'Verified provenance', detail: 'Every maker, method and material must be documented on location.' },
  { label: 'Hand-crafted only', detail: 'No machine-assisted production. No factory subcontracting.' },
  { label: 'Direct relationship', detail: 'The curator knows the maker personally. Not through an agent.' },
  { label: 'Honest storytelling', detail: 'No embellishment. No cultural cosplay. Real people, real craft.' },
  { label: 'Fair compensation', detail: 'The maker sets the price. Long Lost Yogi does not negotiate it down.' },
  { label: 'Community benefit', detail: '10% of every sale documented and transferred to the maker\'s community.' },
]

export default function CuratorsPage() {
  return (
    <main>
      {/* HERO */}
      <section
        className="relative overflow-hidden"
        style={{ background: '#2A2420', padding: '6rem 0 5rem' }}
      >
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0 }}>
          <div style={{ height: 2, background: '#567257' }} />
          <div style={{ height: 1, background: '#896A58', marginTop: 3 }} />
        </div>
        <div style={{ position: 'absolute', inset: '2rem' }}>
          <CornerBrackets opacity={0.2} size={22} />
        </div>
        <div className="max-w-4xl mx-auto px-6 md:px-12 pt-6">
          <DecoDoubleRule />
          <h1
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontWeight: 300,
              fontSize: 'clamp(2rem,5vw,3.5rem)',
              color: '#D9D8D5',
              lineHeight: 1.15,
              marginBottom: 16,
            }}
          >
            The people who<br />bring the story home.
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-josefin)',
              fontWeight: 300,
              fontSize: 13,
              color: 'rgba(217,216,213,0.45)',
              maxWidth: 480,
              lineHeight: 1.8,
            }}
          >
            Long Lost Yogi is only as good as its curators. They are the ones who travel, who sit in the workshops, who earn the trust.
          </p>
        </div>
      </section>

      {/* NUMBERED STEPS */}
      <section style={{ background: '#D9D8D5' }} className="py-20">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <div className="mb-12">
            <DecoDoubleRule />
            <div
              style={{
                fontFamily: 'var(--font-josefin)',
                fontSize: 9, fontWeight: 600,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#896A58',
                marginBottom: 10,
              }}
            >
              How It Works
            </div>
            <h2
              style={{
                fontFamily: 'var(--font-cormorant)',
                fontWeight: 300,
                fontSize: 'clamp(1.5rem,2.5vw,2.2rem)',
                color: '#2A2420',
              }}
            >
              The four steps of curation.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {steps.map((step) => (
              <div key={step.num} className="flex gap-6 items-start">
                <div
                  style={{
                    fontFamily: 'var(--font-cormorant)',
                    fontSize: '2.5rem',
                    fontWeight: 300,
                    color: '#896A58',
                    opacity: 0.45,
                    lineHeight: 1,
                    flexShrink: 0,
                    minWidth: 52,
                  }}
                >
                  {step.num}
                </div>
                <div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-cormorant)',
                      fontWeight: 400,
                      fontSize: '1.2rem',
                      color: '#2A2420',
                      marginBottom: 8,
                    }}
                  >
                    {step.heading}
                  </h3>
                  <p
                    style={{
                      fontFamily: 'var(--font-josefin)',
                      fontWeight: 300,
                      fontSize: 12,
                      color: 'rgba(42,36,32,0.7)',
                      lineHeight: 1.8,
                    }}
                  >
                    {step.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* QUALITY STANDARDS */}
      <section style={{ background: '#ACAB9E' }} className="py-20">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <div className="mb-12">
            <DecoDoubleRule />
            <div
              style={{
                fontFamily: 'var(--font-josefin)',
                fontSize: 9, fontWeight: 600,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#567257',
                marginBottom: 10,
              }}
            >
              Our Standards
            </div>
            <h2
              style={{
                fontFamily: 'var(--font-cormorant)',
                fontWeight: 300,
                fontSize: 'clamp(1.5rem,2.5vw,2.2rem)',
                color: '#2A2420',
              }}
            >
              What every curator commits to.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {standards.map((s) => (
              <div
                key={s.label}
                style={{ borderTop: '1px solid rgba(42,36,32,0.2)', paddingTop: 16 }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-josefin)',
                    fontSize: 10, fontWeight: 600,
                    letterSpacing: '0.12em',
                    color: '#2A2420',
                    marginBottom: 6,
                  }}
                >
                  {s.label}
                </div>
                <p
                  style={{
                    fontFamily: 'var(--font-josefin)',
                    fontWeight: 300,
                    fontSize: 11,
                    color: 'rgba(42,36,32,0.65)',
                    lineHeight: 1.7,
                  }}
                >
                  {s.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GREEN CTA */}
      <section className="relative overflow-hidden" style={{ background: '#567257' }}>
        <div className="mx-6 md:mx-12 pt-10">
          <div style={{ height: 2, background: '#ACAB9E', opacity: 0.4 }} />
          <div style={{ height: 1, background: '#896A58', opacity: 0.3, marginTop: 3 }} />
        </div>
        <div className="relative max-w-4xl mx-auto px-6 md:px-12 py-16 text-center">
          <div
            style={{
              fontFamily: 'var(--font-josefin)',
              fontSize: 9, fontWeight: 600,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'rgba(217,216,213,0.65)',
              marginBottom: 16,
            }}
          >
            Apply Now
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontWeight: 300,
              fontSize: 'clamp(1.8rem,3.5vw,2.8rem)',
              color: '#D9D8D5',
              lineHeight: 1.2,
              maxWidth: 560,
              margin: '0 auto 16px',
            }}
          >
            Do you know a maker no one else has found yet?
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-josefin)',
              fontWeight: 300,
              fontSize: 13,
              color: 'rgba(217,216,213,0.7)',
              maxWidth: 480,
              margin: '0 auto 36px',
              lineHeight: 1.8,
            }}
          >
            Applications are reviewed personally. We respond to every one.
          </p>
          <Link
            href="/curators/apply"
            style={{
              background: '#2A2420',
              color: '#D9D8D5',
              fontFamily: 'var(--font-josefin)',
              fontSize: 11, fontWeight: 600,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              padding: '14px 32px',
              textDecoration: 'none',
              display: 'inline-block',
            }}
          >
            Apply to Curate
          </Link>
        </div>
        <div className="mx-6 md:mx-12 pb-10">
          <div style={{ height: 2, background: '#ACAB9E', opacity: 0.4 }} />
          <div style={{ height: 1, background: '#896A58', opacity: 0.3, marginTop: 3 }} />
        </div>
      </section>
    </main>
  )
}
