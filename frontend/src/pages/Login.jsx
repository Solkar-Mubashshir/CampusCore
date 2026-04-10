import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async e => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(email, password)
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh', background: 'var(--bg)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 20,
    }}>
      {/* Background grid */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 0,
        backgroundImage: 'radial-gradient(circle at 20% 20%, rgba(79,128,255,0.08) 0%, transparent 60%), radial-gradient(circle at 80% 80%, rgba(124,92,252,0.08) 0%, transparent 60%)',
        pointerEvents: 'none',
      }} />

      <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: 420 }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{
            width: 56, height: 56, borderRadius: 16,
            background: 'linear-gradient(135deg, #4f80ff, #7c5cfc)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 24, fontWeight: 700, color: 'white',
            margin: '0 auto 16px',
            boxShadow: '0 8px 32px rgba(79,128,255,0.3)',
          }}>C</div>
          <h1 style={{ fontSize: 26, fontWeight: 700, fontFamily: 'Space Mono, monospace' }}>CampusCore</h1>
          <p style={{ color: 'var(--text2)', marginTop: 6, fontSize: 14 }}>Sign in to your dashboard</p>
        </div>

        {/* Form card */}
        <div style={{
          background: 'var(--bg2)',
          border: '1px solid var(--border)',
          borderRadius: 16,
          padding: 32,
          boxShadow: '0 8px 40px rgba(0,0,0,0.4)',
        }}>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 500, marginBottom: 6, color: 'var(--text2)' }}>
                Email Address
              </label>
              <input
                className="input"
                type="email"
                placeholder="you@slrtce.edu.in"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>

            <div style={{ marginBottom: 24 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 500, marginBottom: 6, color: 'var(--text2)' }}>
                Password
              </label>
              <input
                className="input"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>

            {error && (
              <div style={{
                background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)',
                borderRadius: 8, padding: '10px 14px', marginBottom: 16,
                fontSize: 13, color: '#ef4444',
              }}>{error}</div>
            )}

            <button className="btn btn-primary" type="submit" disabled={loading} style={{ width: '100%', justifyContent: 'center', padding: '12px' }}>
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div style={{ marginTop: 20, padding: '14px', background: 'var(--bg3)', borderRadius: 8 }}>
            <p style={{ fontSize: 12, color: 'var(--text3)', marginBottom: 8 }}>Demo Accounts:</p>
            {[
              { label: 'Student', email: 'student@cc.com' },
              { label: 'Teacher', email: 'teacher@cc.com' },
              { label: 'HR Teacher', email: 'hr@cc.com' },
              { label: 'HOD', email: 'hod@cc.com' },
            ].map(a => (
              <div key={a.label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--text2)', marginBottom: 3 }}>
                <span>{a.label}</span><span style={{ fontFamily: 'monospace', color: 'var(--accent)' }}>{a.email}</span>
              </div>
            ))}
          </div>
        </div>

        <p style={{ textAlign: 'center', marginTop: 20, fontSize: 12, color: 'var(--text3)' }}>
          NeoFuture Hackathon 2026 · Team Byteriot
        </p>
      </div>
    </div>
  )
}