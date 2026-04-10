import Sidebar from '../../components/shared/Sidebar'
import Navbar from '../../components/shared/Navbar'

export default function HRDashboard() {
  return (
    <div className="page-layout">
      <Sidebar />
      <div className="main-content">
        <Navbar title="HR Dashboard" />
        <div className="page-body">
          <div className="grid-4" style={{ marginBottom: 24 }}>
            {[
              { label: 'Total Students', value: 180, color: '#4f80ff', bg: 'rgba(79,128,255,.1)', icon: '👥' },
              { label: 'Avg Attendance', value: '82%', color: '#22c55e', bg: 'rgba(34,197,94,.1)', icon: '✅' },
              { label: 'Below 75%', value: 14, color: '#ef4444', bg: 'rgba(239,68,68,.1)', icon: '⚠️' },
              { label: 'Avg CGPA', value: '7.9', color: '#7c5cfc', bg: 'rgba(124,92,252,.1)', icon: '📊' },
            ].map(s => (
              <div key={s.label} className="stat-card">
                <div className="stat-icon" style={{ background: s.bg }}>{s.icon}</div>
                <div>
                  <div className="stat-value" style={{ color: s.color }}>{s.value}</div>
                  <div className="stat-label">{s.label}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="grid-2">
            <div className="card">
              <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 14 }}>Attendance Alerts</h3>
              {['Rohan Desai — 64%', 'Priya Nair — 68%', 'Amit Wagh — 71%'].map((s, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '9px 0', borderBottom: i < 2 ? '1px solid var(--border)' : 'none' }}>
                  <span style={{ fontSize: 13 }}>{s.split('—')[0]}</span>
                  <span className="badge badge-red">{s.split('—')[1].trim()}</span>
                </div>
              ))}
            </div>
            <div className="card">
              <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 14 }}>Top Performers</h3>
              {['Aarav Shah — 9.4 CGPA', 'Sneha Kulkarni — 9.1 CGPA', 'Vikram Joshi — 8.9 CGPA'].map((s, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '9px 0', borderBottom: i < 2 ? '1px solid var(--border)' : 'none' }}>
                  <span style={{ fontSize: 13 }}>{s.split('—')[0]}</span>
                  <span className="badge badge-green">{s.split('—')[1].trim()}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}