import { getGivingBackTotal } from '@/lib/content'
import GivingBackCounter from '@/components/GivingBackCounter'
import DecoDoubleRule from '@/components/DecoDoubleRule'
import CornerBrackets from '@/components/CornerBrackets'

export const metadata = {
  title: 'Giving Back — Long Lost Yogi',
  description: 'Ten percent of every purchase goes directly to the maker\'s community. Always.',
}

const steps = [
  {
    number: '01',
    heading: 'The purchase',
    body: 'When you buy a piece from Long Lost Yogi, 10% of the sale price is set aside immediately. This is not a donation prompt. It is automatic.',
  },
  {
    number: '02',
    heading: 'The curator verifies',
    body: 'Our curator in the field confirms the best use of the funds with the maker\'s community — whether that\'s direct payment to the maker, contribution to a cooperative, or investment in tools and materials.',
  },
  {
    number: '03',
    heading: 'The transfer',
    body: 'Funds are transferred directly. No central administration. No overhead percentage. The full 10% reaches the community.',
  },
  {
    number: '04',
    heading: 'The counter grows',
    body: 'The giving back counter on this page updates with each verified transfer. It never resets. It only goes up.',
  },
]

const communityCards = [
  { name: 'Fes Artisan Cooperative', location: 'Morocco', description: 'Supporting leather workers in the Fes el-Bali medina.' },
  { name: 'Ubud Weaving Collective', location: 'Bali', description: 'Sustaining the ceremonial ikat tradition in the Klungkung region.' },
  { name: 'Patan Metalworkers Guild', location: 'Nepal', description: 'Preserving cold-hammer metalwork in Patan\'s Durbar Square.' },
  { name: 'Kashmir Weaver Network', location: 'Kashmir', description: 'Connecting pashmina weavers to documented provenance markets.' },
  { name: 'Rajasthan Block Print Collective', location: 'Rajasthan', description: 'Supporting hand block printing families in Bagru and Sanganer.' },
  { name: 'Goa Brass Guild', location: 'Goa', description: 'Documenting and funding traditional brass casting in coastal Goa.' },
]

export default function GivingBackPage() {
  const givingBack = getGivingBackTotal()

  return (
    <main>
      {/* HERO */}
      <section
        className="relative overflow-hidden"
        style={{ background: 'var(--dp)', padding: '6rem 0 5rem' }}
      >
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0 }}>
          <div style={{ height: 2, background: 'var(--green)' }} />
          <div style={{ height: 1, background: 'var(--taupe)', marginTop: 3 }} />
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
              color: 'var(--bg)',
              lineHeight: 1.15,
              marginBottom: 16,
            }}
          >
            Ten percent.<br />Every sale. Always.
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
            This is not a marketing commitment. It is a structural one. The number only goes up.
          </p>
        </div>
      </section>

      {/* LIVE COUNTER */}
      <GivingBackCounter total={givingBack.total} currency={givingBack.currency} />

      {/* 4-STEP GRID */}
      <section style={{ background: 'var(--bg)' }} className="py-20">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <div className="mb-12">
            <DecoDoubleRule />
            <div
              style={{
                fontFamily: 'var(--font-josefin)',
                fontSize: 9, fontWeight: 600,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--taupe)',
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
                color: 'var(--dp)',
              }}
            >
              From purchase to community.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {steps.map((step) => (
              <div
                key={step.number}
                style={{ borderTop: '2px solid var(--taupe)', paddingTop: 20 }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-cormorant)',
                    fontSize: '2rem',
                    fontWeight: 300,
                    color: 'var(--taupe)',
                    opacity: 0.6,
                    marginBottom: 12,
                  }}
                >
                  {step.number}
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--font-cormorant)',
                    fontWeight: 400,
                    fontSize: '1.2rem',
                    color: 'var(--dp)',
                    marginBottom: 10,
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
            ))}
          </div>
        </div>
      </section>

      {/* COMMUNITY CARDS */}
      <section style={{ background: 'var(--bg-dark)' }} className="py-20">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <div className="mb-12">
            <DecoDoubleRule />
            <div
              style={{
                fontFamily: 'var(--font-josefin)',
                fontSize: 9, fontWeight: 600,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--green)',
                marginBottom: 10,
              }}
            >
              The Communities
            </div>
            <h2
              style={{
                fontFamily: 'var(--font-cormorant)',
                fontWeight: 300,
                fontSize: 'clamp(1.5rem,2.5vw,2.2rem)',
                color: 'var(--dp)',
              }}
            >
              Where the giving back goes.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {communityCards.map((card) => (
              <div
                key={card.name}
                style={{
                  background: 'var(--bg)',
                  borderTop: '2px solid var(--taupe)',
                  padding: '20px',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-josefin)',
                    fontSize: 8, fontWeight: 600,
                    letterSpacing: '0.16em',
                    textTransform: 'uppercase',
                    color: 'var(--taupe)',
                    marginBottom: 8,
                  }}
                >
                  {card.location}
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--font-cormorant)',
                    fontWeight: 400,
                    fontSize: '1.1rem',
                    color: 'var(--dp)',
                    marginBottom: 8,
                  }}
                >
                  {card.name}
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-josefin)',
                    fontWeight: 300,
                    fontSize: 11,
                    color: 'rgba(42,36,32,0.65)',
                    lineHeight: 1.7,
                  }}
                >
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CLOSING QUOTE */}
      <section style={{ background: 'var(--bg)' }} className="py-24">
        <div className="max-w-3xl mx-auto px-6 md:px-12 text-center">
          <DecoDoubleRule className="mx-auto" />
          <p
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontStyle: 'italic',
              fontSize: 'clamp(1.3rem,2.5vw,1.8rem)',
              color: 'var(--dp)',
              lineHeight: 1.6,
              opacity: 0.85,
            }}
          >
            &ldquo;You are the last chapter of a story that started in someone&apos;s hands.
            The giving back counter closes the loop.&rdquo;
          </p>
        </div>
      </section>
    </main>
  )
}
