import { useAuth } from '../../context/AuthContext'

export default function Navbar({ title }) {
  const { user } = useAuth()

  return (
    <header style={{
      height: 60,
      background: 'var(--bg2)',
      borderBottom: '1px solid var(--border)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 24px',
      flexShrink: 0,
    }}>
      <h1 style={{ fontSize: 17, fontWeight: 600 }}>{title}</h1>
      <div style={{ fontSize: 13, color: 'var(--text2)' }}>
        {new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
      </div>
    </header>
  )
}