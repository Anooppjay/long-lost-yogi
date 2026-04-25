interface CornerBracketsProps {
  opacity?: number
  size?: number
}

export default function CornerBrackets({ opacity = 1, size = 28 }: CornerBracketsProps) {
  const outer: React.CSSProperties = { position: 'absolute', width: size, height: size }

  return (
    <>
      <div style={{ ...outer, top: 0, left: 0, opacity }}>
        <div style={{ position: 'absolute', inset: 0, borderTop: '1.5px solid #ACAB9E', borderLeft: '1.5px solid #ACAB9E' }} />
        <div style={{ position: 'absolute', top: 5, left: 5, right: 0, bottom: 0, borderTop: '0.5px solid #896A58', borderLeft: '0.5px solid #896A58', opacity: 0.55 }} />
      </div>
      <div style={{ ...outer, top: 0, right: 0, opacity }}>
        <div style={{ position: 'absolute', inset: 0, borderTop: '1.5px solid #ACAB9E', borderRight: '1.5px solid #ACAB9E' }} />
        <div style={{ position: 'absolute', top: 5, left: 0, right: 5, bottom: 0, borderTop: '0.5px solid #896A58', borderRight: '0.5px solid #896A58', opacity: 0.55 }} />
      </div>
      <div style={{ ...outer, bottom: 0, left: 0, opacity }}>
        <div style={{ position: 'absolute', inset: 0, borderBottom: '1.5px solid #ACAB9E', borderLeft: '1.5px solid #ACAB9E' }} />
        <div style={{ position: 'absolute', top: 0, left: 5, right: 0, bottom: 5, borderBottom: '0.5px solid #896A58', borderLeft: '0.5px solid #896A58', opacity: 0.55 }} />
      </div>
      <div style={{ ...outer, bottom: 0, right: 0, opacity }}>
        <div style={{ position: 'absolute', inset: 0, borderBottom: '1.5px solid #ACAB9E', borderRight: '1.5px solid #ACAB9E' }} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 5, bottom: 5, borderBottom: '0.5px solid #896A58', borderRight: '0.5px solid #896A58', opacity: 0.55 }} />
      </div>
    </>
  )
}
