import Sidebar from '../../components/shared/Sidebar'
import Navbar from '../../components/shared/Navbar'
import { useAuth } from '../../context/AuthContext'

export default function TeacherDashboard() {
  const { user } = useAuth()
  return (
    <div className="page-layout">
      <Sidebar />
      <div className="main-content">
        <Navbar title="Teacher Dashboard" />
        <div className="page-body">
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>Hello, {user?.name?.split(' ')[0]} 👋</h2>
          <p style={{ color: 'var(--text2)', marginBottom: 24, fontSize: 14 }}>Manage your classes and announcements</p>
          <div className="grid-2">
            {[
              { title: 'My Classes', desc: 'Mark attendance & upload notes', icon: '🎓', path: '/teacher/my-classes', color: '#4f80ff' },
              { title: 'Announcements', desc: 'Post to batch or globally', icon: '📢', path: '/teacher/announcements', color: '#7c5cfc' },
            ].map(c => (
              <a key={c.title} href={c.path} className="card" style={{ display: 'block', borderLeft: `3px solid ${c.color}`, transition: 'all 0.2s' }}>
                <div style={{ fontSize: 28, marginBottom: 10 }}>{c.icon}</div>
                <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 6 }}>{c.title}</div>
                <div style={{ fontSize: 13, color: 'var(--text2)' }}>{c.desc}</div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}