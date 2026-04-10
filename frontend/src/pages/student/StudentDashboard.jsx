import Sidebar from '../../components/shared/Sidebar'
import Navbar from '../../components/shared/Navbar'
import { useAuth } from '../../context/AuthContext'

export default function StudentDashboard() {
  const { user } = useAuth()

  const stats = [
    { label: 'Attendance', value: '87%', icon: '✅', color: '#22c55e', bg: 'rgba(34,197,94,0.1)' },
    { label: 'CGPA', value: '8.4', icon: '📊', color: '#4f80ff', bg: 'rgba(79,128,255,0.1)' },
    { label: 'Credits', value: '142', icon: '⭐', color: '#f59e0b', bg: 'rgba(245,158,11,0.1)' },
    { label: 'Achievements', value: '6', icon: '🏆', color: '#7c5cfc', bg: 'rgba(124,92,252,0.1)' },
  ]

  return (
    <div className="page-layout">
      <Sidebar />
      <div className="main-content">
        <Navbar title="Dashboard" />
        <div className="page-body">
          <div style={{ marginBottom: 24 }}>
            <h2 style={{ fontSize: 22, fontWeight: 700 }}>Welcome back, {user?.name?.split(' ')[0]} 👋</h2>
            <p style={{ color: 'var(--text2)', marginTop: 4, fontSize: 14 }}>Here's your academic overview</p>
          </div>

          <div className="grid-4" style={{ marginBottom: 24 }}>
            {stats.map(s => (
              <div key={s.label} className="stat-card">
                <div className="stat-icon" style={{ background: s.bg, color: s.color }}>
                  {s.icon}
                </div>
                <div>
                  <div className="stat-value" style={{ color: s.color }}>{s.value}</div>
                  <div className="stat-label">{s.label}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid-2">
            <div className="card">
              <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 14 }}>Recent Announcements</h3>
              {[
                { title: 'Mid-sem exams schedule released', time: '2h ago', tag: 'Academic' },
                { title: 'Library will be closed on Friday', time: '1d ago', tag: 'General' },
                { title: 'Hackathon registrations open', time: '2d ago', tag: 'Event' },
              ].map((a, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '10px 0', borderBottom: i < 2 ? '1px solid var(--border)' : 'none' }}>
                  <div>
                    <p style={{ fontSize: 13, fontWeight: 500 }}>{a.title}</p>
                    <p style={{ fontSize: 11, color: 'var(--text3)', marginTop: 3 }}>{a.time}</p>
                  </div>
                  <span className="badge badge-blue" style={{ fontSize: 11, whiteSpace: 'nowrap' }}>{a.tag}</span>
                </div>
              ))}
            </div>

            <div className="card">
              <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 14 }}>Today's Timetable</h3>
              {[
                { sub: 'Data Structures', time: '9:00 AM', room: 'Lab 3', color: '#4f80ff' },
                { sub: 'Computer Networks', time: '11:00 AM', room: 'Room 204', color: '#7c5cfc' },
                { sub: 'DBMS', time: '2:00 PM', room: 'Room 301', color: '#06b6d4' },
              ].map((c, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '9px 0', borderBottom: i < 2 ? '1px solid var(--border)' : 'none' }}>
                  <div style={{ width: 4, height: 36, borderRadius: 2, background: c.color, flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 13, fontWeight: 500 }}>{c.sub}</p>
                    <p style={{ fontSize: 11, color: 'var(--text3)', marginTop: 2 }}>{c.time} · {c.room}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}