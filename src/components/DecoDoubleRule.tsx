export default function DecoDoubleRule({ className = '' }: { className?: string }) {
  return (
    <div className={`flex flex-col ${className}`} style={{ width: 28, gap: 3, marginBottom: '1.1rem' }}>
      <div style={{ height: 2, background: 'var(--bg-dark)', opacity: 0.8 }} />
      <div style={{ height: 1, background: 'var(--taupe)', opacity: 0.45 }} />
    </div>
  )
}
