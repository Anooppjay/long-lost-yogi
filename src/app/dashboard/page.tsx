import { getOrders } from '@/lib/content'
import DecoDoubleRule from '@/components/DecoDoubleRule'

export const metadata = {
  title: 'Dashboard — Long Lost Yogi',
}

export default function DashboardPage() {
  const orders = getOrders() as Array<{
    id: string
    product: string
    date: string
    status: string
    total: string
  }>

  return (
    <main style={{ background: 'var(--bg)' }}>
      {/* HERO */}
      <section style={{ background: 'var(--dp)', padding: '4rem 0 3rem' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0 }}>
          <div style={{ height: 2, background: 'var(--green)' }} />
          <div style={{ height: 1, background: 'var(--taupe)', marginTop: 3 }} />
        </div>
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <DecoDoubleRule />
          <h1
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontWeight: 300,
              fontSize: 'clamp(1.5rem,3vw,2.5rem)',
              color: 'var(--bg)',
              lineHeight: 1.2,
            }}
          >
            Dashboard
          </h1>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          {/* Buyer: Orders */}
          <div className="mb-16">
            <DecoDoubleRule />
            <div
              style={{
                fontFamily: 'var(--font-josefin)',
                fontSize: 9,
                fontWeight: 600,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--taupe)',
                marginBottom: 20,
              }}
            >
              Your Orders
            </div>
            {orders.length === 0 ? (
              <p
                style={{
                  fontFamily: 'var(--font-josefin)',
                  fontSize: 12,
                  color: 'rgba(42,36,32,0.4)',
                  padding: '3rem 0',
                }}
              >
                No orders yet. The store opens soon.
              </p>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid rgba(42,36,32,0.12)' }}>
                      {['Order', 'Product', 'Date', 'Total', 'Status'].map((h) => (
                        <th
                          key={h}
                          style={{
                            fontFamily: 'var(--font-josefin)',
                            fontSize: 9,
                            fontWeight: 600,
                            letterSpacing: '0.16em',
                            textTransform: 'uppercase',
                            color: 'var(--taupe)',
                            textAlign: 'left',
                            padding: '8px 12px 8px 0',
                          }}
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr
                        key={order.id}
                        style={{ borderBottom: '1px solid rgba(42,36,32,0.08)' }}
                      >
                        <td
                          style={{
                            fontFamily: 'var(--font-josefin)',
                            fontSize: 11,
                            color: 'var(--dp)',
                            padding: '12px 12px 12px 0',
                          }}
                        >
                          {order.id}
                        </td>
                        <td
                          style={{
                            fontFamily: 'var(--font-josefin)',
                            fontSize: 11,
                            color: 'var(--dp)',
                            padding: '12px 12px 12px 0',
                          }}
                        >
                          {order.product}
                        </td>
                        <td
                          style={{
                            fontFamily: 'var(--font-josefin)',
                            fontSize: 11,
                            color: 'rgba(42,36,32,0.6)',
                            padding: '12px 12px 12px 0',
                          }}
                        >
                          {order.date}
                        </td>
                        <td
                          style={{
                            fontFamily: 'var(--font-cormorant)',
                            fontSize: '1rem',
                            color: 'var(--dp)',
                            padding: '12px 12px 12px 0',
                          }}
                        >
                          {order.total}
                        </td>
                        <td style={{ padding: '12px 12px 12px 0' }}>
                          <span
                            style={{
                              fontFamily: 'var(--font-josefin)',
                              fontSize: 9,
                              fontWeight: 600,
                              letterSpacing: '0.12em',
                              textTransform: 'uppercase',
                              padding: '3px 8px',
                              background:
                                order.status === 'shipped'
                                  ? 'rgba(86,114,87,0.12)'
                                  : 'rgba(137,106,88,0.12)',
                              color:
                                order.status === 'shipped' ? 'var(--green)' : 'var(--taupe)',
                            }}
                          >
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Curator Panel */}
          <div>
            <DecoDoubleRule />
            <div
              style={{
                fontFamily: 'var(--font-josefin)',
                fontSize: 9,
                fontWeight: 600,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--taupe)',
                marginBottom: 20,
              }}
            >
              Curator Panel
            </div>
            <p
              style={{
                fontFamily: 'var(--font-josefin)',
                fontSize: 12,
                color: 'rgba(42,36,32,0.4)',
                padding: '3rem 0',
              }}
            >
              No active listings. Curator dashboard available after approval.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
