import Sidebar from '../../components/shared/Sidebar'
import Navbar from '../../components/shared/Navbar'
import { useAuth } from '../../context/AuthContext'

export default function VirtualID() {
  const { user } = useAuth()

  return (
    <div className="page-layout">
      <Sidebar />
      <div className="main-content">
        <Navbar title="Virtual ID" />
        <div className="page-body" style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: 40 }}>
          <div style={{
            width: 360, background: 'linear-gradient(135deg, #1e2535, #161b27)',
            border: '1px solid var(--border)', borderRadius: 20,
            padding: '28px 24px', boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <div>
                <div style={{ fontFamily: 'Space Mono, monospace', fontWeight: 700, fontSize: 14, color: 'var(--accent)' }}>CAMPUSCORE</div>
                <div style={{ fontSize: 11, color: 'var(--text3)', marginTop: 2 }}>Student Identity Card</div>
              </div>
              <div style={{
                width: 40, height: 40, borderRadius: 10,
                background: 'linear-gradient(135deg, #4f80ff, #7c5cfc)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 18, fontWeight: 700, color: 'white',
              }}>C</div>
            </div>

            <div style={{ display: 'flex', gap: 16, marginBottom: 20, alignItems: 'center' }}>
              <div style={{
                width: 70, height: 70, borderRadius: '50%',
                background: 'linear-gradient(135deg, rgba(79,128,255,0.3), rgba(124,92,252,0.3))',
                border: '2px solid rgba(79,128,255,0.4)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 28, fontWeight: 700, color: 'var(--accent)', flexShrink: 0,
              }}>{user?.name?.[0]?.toUpperCase() || 'S'}</div>
              <div>
                <div style={{ fontSize: 18, fontWeight: 700 }}>{user?.name || 'Student Name'}</div>
                <div style={{ fontSize: 12, color: 'var(--text2)', marginTop: 4 }}>{user?.email || 'student@cc.com'}</div>
                <span className="badge badge-blue" style={{ marginTop: 6, fontSize: 10 }}>B.E. Computer Sci.</span>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 20 }}>
              {[
                { label: 'Roll No.', value: user?.rollNo || 'CS2021045' },
                { label: 'Semester', value: '6th' },
                { label: 'Batch', value: '2021-2025' },
                { label: 'Division', value: 'A' },
              ].map(f => (
                <div key={f.label} style={{ background: 'var(--bg3)', borderRadius: 8, padding: '8px 12px' }}>
                  <div style={{ fontSize: 10, color: 'var(--text3)', marginBottom: 2 }}>{f.label}</div>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{f.value}</div>
                </div>
              ))}
            </div>

            {/* QR placeholder */}
            <div style={{
              display: 'flex', justifyContent: 'center', alignItems: 'center',
              background: 'white', borderRadius: 10, padding: 16, marginBottom: 16,
            }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,16px)', gap: 2 }}>
                {Array.from({ length: 49 }, (_, i) => (
                  <div key={i} style={{
                    width: 14, height: 14, borderRadius: 2,
                    background: Math.random() > 0.5 ? '#000' : '#fff',
                  }} />
                ))}
              </div>
            </div>

            <div style={{ textAlign: 'center', fontSize: 11, color: 'var(--text3)', borderTop: '1px solid var(--border)', paddingTop: 12 }}>
              SLRTCE · Mira Road · Valid till May 2025
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}