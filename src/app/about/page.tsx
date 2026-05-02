import DecoDoubleRule from '@/components/DecoDoubleRule'
import CornerBrackets from '@/components/CornerBrackets'

export const metadata = {
  title: 'About — Long Lost Yogi',
  description: 'How Long Lost Yogi came to be, and why the story behind an object matters.',
}

const sections = [
  {
    eyebrow: 'The Beginning',
    heading: 'We went looking for something real.',
    body: 'It started in a lane in Ubud. Then again in a tannery in Fes. Then in a metalworker\'s courtyard in Patan. Every place we travelled, we found the same thing: people making objects by hand, for reasons that had nothing to do with the market, and everything to do with who they were.',
    quote: 'The craft was always there. We just had to stop moving long enough to see it.',
  },
  {
    eyebrow: 'The Mission',
    heading: 'Nothing here was mass manufactured.',
    body: 'Long Lost Yogi exists to close the distance between the person who made something and the person who owns it. Not as a charity. Not as a brand story. As a factual account of where an object came from, who made it, and what it cost them — in time, in knowledge, in the generations before them.',
    quote: 'No factory, no bulk order, no middleman. Just the object and its history.',
  },
  {
    eyebrow: 'The Founders',
    heading: 'Built by people who were lost, and found.',
    body: 'We are travellers who kept meeting the same problem: we would find something extraordinary in a workshop or market and have no way of bringing it home with the story intact. Long Lost Yogi is the infrastructure we wished had existed. We built it so others wouldn\'t have to leave the story behind.',
    quote: 'Nepal. Goa. Kashmir. Every place had them.',
  },
  {
    eyebrow: 'The Process',
    heading: 'Every piece is verified at the source.',
    body: 'Our curators travel to workshops, not trade shows. They document the maker, the method, the material origin. They photograph the workspace. They ask questions about the craft that only someone standing in the room can ask. Nothing enters the collection without provenance.',
    quote: 'You are the last chapter of a story that started in someone\'s hands.',
  },
  {
    eyebrow: 'The Community',
    heading: 'Ten percent. Every sale. Always.',
    body: 'We give 10% of every purchase directly back to the maker\'s community — verified through our curator network, documented on the giving back counter, and never reset. This is not a marketing commitment. It is a structural one. The number only goes up.',
    quote: 'The giving back counter starts at zero and grows with every purchase.',
  },
]

export default function AboutPage() {
  return (
    <main>
      {/* HERO */}
      <section
        className="relative overflow-hidden"
        style={{ background: 'var(--green)', padding: '6rem 0 5rem' }}
      >
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0 }}>
          <div style={{ height: 2, background: 'var(--green)' }} />
          <div style={{ height: 1, background: 'var(--taupe)', marginTop: 3 }} />
        </div>
        <div
          style={{
            position: 'absolute',
            top: 0, bottom: 0,
            right: '32%',
            width: '0.5px',
            background: 'var(--bg-dark)',
            opacity: 0.15,
          }}
        />
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
            Found at the source.
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-josefin)',
              fontWeight: 300,
              fontSize: 13,
              color: 'rgba(217,216,213,0.7)',
              maxWidth: 520,
              lineHeight: 1.8,
            }}
          >
            The story of Long Lost Yogi — why it exists, who built it, and what it asks of the objects it carries.
          </p>
        </div>
      </section>

      {/* FOUNDER PHOTO */}
      <section style={{ background: 'var(--bg)' }} className="pt-16 pb-0">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <div
            className="relative overflow-hidden"
            style={{ width: '100%', aspectRatio: '16/7', background: 'var(--dp)' }}
          >
            <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: 4, background: 'var(--taupe)', opacity: 0.4 }} />
            <CornerBrackets opacity={0.3} size={20} />
          </div>
        </div>
      </section>

      {/* FIVE SECTIONS */}
      <section style={{ background: 'var(--bg)' }} className="py-16">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <div className="flex flex-col gap-20">
            {sections.map((section, i) => (
              <div key={i}>
                <DecoDoubleRule />
                <div
                  style={{
                    fontFamily: 'var(--font-josefin)',
                    fontSize: 9,
                    fontWeight: 600,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: 'var(--taupe)',
                    marginBottom: 12,
                  }}
                >
                  {section.eyebrow}
                </div>
                <h2
                  style={{
                    fontFamily: 'var(--font-cormorant)',
                    fontWeight: 300,
                    fontSize: 'clamp(1.5rem,2.5vw,2.2rem)',
                    color: 'var(--dp)',
                    lineHeight: 1.2,
                    marginBottom: 16,
                  }}
                >
                  {section.heading}
                </h2>
                <p
                  style={{
                    fontFamily: 'var(--font-josefin)',
                    fontWeight: 300,
                    fontSize: 13,
                    color: 'rgba(42,36,32,0.75)',
                    lineHeight: 1.85,
                    marginBottom: 24,
                    maxWidth: 620,
                  }}
                >
                  {section.body}
                </p>
                <blockquote style={{ borderLeft: '2px solid var(--taupe)', paddingLeft: 16 }}>
                  <p
                    style={{
                      fontFamily: 'var(--font-cormorant)',
                      fontStyle: 'italic',
                      fontSize: '1.15rem',
                      color: 'rgba(42,36,32,0.72)',
                      lineHeight: 1.6,
                    }}
                  >
                    &ldquo;{section.quote}&rdquo;
                  </p>
                </blockquote>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
