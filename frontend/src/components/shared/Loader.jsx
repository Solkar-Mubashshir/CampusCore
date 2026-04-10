export default function Loader({ text = 'Loading...' }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 200, gap: 12 }}>
      <div style={{
        width: 36, height: 36, border: '3px solid var(--border)',
        borderTop: '3px solid var(--accent)', borderRadius: '50%',
        animation: 'spin 0.8s linear infinite'
      }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <p style={{ color: 'var(--text2)', fontSize: 14 }}>{text}</p>
    </div>
  )
}