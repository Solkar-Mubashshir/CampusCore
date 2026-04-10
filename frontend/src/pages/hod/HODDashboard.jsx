import Sidebar from '../../components/shared/Sidebar'
import Navbar from '../../components/shared/Navbar'
import { useAuth } from '../../context/AuthContext'

export default function HODDashboard() {
  const { user } = useAuth()
  return (
    <div className="page-layout">
      <Sidebar />
      <div className="main-content">
        <Navbar title="HOD Dashboard" />
        <div className="page-body">
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>Department Overview</h2>
          <p style={{ color: 'var(--text2)', marginBottom: 24, fontSize: 14 }}>Computer Science Department · SLRTCE</p>
          <div className="grid-4" style={{ marginBottom: 24 }}>
            {[
              { label: 'Total Students', value: 720, color: '#4f80ff', icon: '👥' },
              { label: 'Faculty', value: 24, color: '#7c5cfc', icon: '🎓' },
              { label: 'Batches', value: 8, color: '#06b6d4', icon: '📚' },
              { label: 'Dept Avg Attendance', value: '84%', color: '#22c55e', icon: '✅' },
            ].map(s => (
              <div key={s.label} className="card" style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 26, marginBottom: 6 }}>{s.icon}</div>
                <div style={{ fontSize: 26, fontWeight: 700, color: s.color }}>{s.value}</div>
                <div style={{ fontSize: 12, color: 'var(--text2)', marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </div>
          <div className="grid-2">
            <div className="card">
              <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 14 }}>Batch Attendance</h3>
              {[
                { batch: 'BE-A', pct: 88 }, { batch: 'BE-B', pct: 79 },
                { batch: 'TE-A', pct: 91 }, { batch: 'TE-B', pct: 75 },
              ].map(b => (
                <div key={b.batch} style={{ marginBottom: 12 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span style={{ fontSize: 13 }}>{b.batch}</span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: b.pct >= 75 ? '#22c55e' : '#ef4444' }}>{b.pct}%</span>
                  </div>
                  <div style={{ height: 6, background: 'var(--border)', borderRadius: 3 }}>
                    <div style={{ height: '100%', width: `${b.pct}%`, background: b.pct >= 75 ? '#22c55e' : '#ef4444', borderRadius: 3 }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="card">
              <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 14 }}>Quick Actions</h3>
              {[
                { label: 'Manage Timetable', href: '/hod/timetable', color: '#4f80ff' },
                { label: 'View All Batches', href: '/hod/batches', color: '#7c5cfc' },
                { label: 'Post Announcement', href: '/hod/announcements', color: '#06b6d4' },
              ].map(a => (
                <a key={a.label} href={a.href} style={{
                  display: 'block', padding: '11px 14px', marginBottom: 8,
                  background: 'var(--bg3)', borderRadius: 8, borderLeft: `3px solid ${a.color}`,
                  fontSize: 14, fontWeight: 500, color: 'var(--text)', transition: 'background 0.15s',
                }}>{a.label}</a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}