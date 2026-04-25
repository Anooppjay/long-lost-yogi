export default function DecoDoubleRule({ className = '' }: { className?: string }) {
  return (
    <div className={`flex flex-col ${className}`} style={{ width: 28, gap: 3, marginBottom: '1.1rem' }}>
      <div style={{ height: 2, background: '#ACAB9E', opacity: 0.8 }} />
      <div style={{ height: 1, background: '#896A58', opacity: 0.45 }} />
    </div>
  )
}
