import Sidebar from '../../components/shared/Sidebar'
import Navbar from '../../components/shared/Navbar'

const subjects = [
  { name: 'Data Structures', present: 38, total: 44, color: '#4f80ff' },
  { name: 'Computer Networks', present: 30, total: 40, color: '#7c5cfc' },
  { name: 'DBMS', present: 35, total: 38, color: '#06b6d4' },
  { name: 'Operating Systems', present: 28, total: 42, color: '#f59e0b' },
  { name: 'Software Engineering', present: 36, total: 40, color: '#22c55e' },
]

export default function Attendance() {
  const overall = Math.round(subjects.reduce((a, s) => a + s.present / s.total, 0) / subjects.length * 100)

  return (
    <div className="page-layout">
      <Sidebar />
      <div className="main-content">
        <Navbar title="Attendance" />
        <div className="page-body">
          <div className="grid-2" style={{ marginBottom: 24 }}>
            <div className="card" style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
              <div style={{
                width: 80, height: 80, borderRadius: '50%',
                background: `conic-gradient(#22c55e ${overall}%, var(--border) 0)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative',
              }}>
                <div style={{
                  width: 60, height: 60, borderRadius: '50%', background: 'var(--bg2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 16, fontWeight: 700,
                }}>{overall}%</div>
              </div>
              <div>
                <div style={{ fontSize: 22, fontWeight: 700, color: overall >= 75 ? '#22c55e' : '#ef4444' }}>{overall}%</div>
                <div style={{ color: 'var(--text2)', fontSize: 14 }}>Overall Attendance</div>
                <span className={`badge ${overall >= 75 ? 'badge-green' : 'badge-red'}`} style={{ marginTop: 6 }}>
                  {overall >= 75 ? 'Good Standing' : 'Below Threshold'}
                </span>
              </div>
            </div>

            <div className="card">
              <div className="grid-2" style={{ gap: 12 }}>
                {[
                  { label: 'Classes Present', value: subjects.reduce((a, s) => a + s.present, 0), color: '#22c55e' },
                  { label: 'Classes Absent', value: subjects.reduce((a, s) => a + (s.total - s.present), 0), color: '#ef4444' },
                  { label: 'Total Classes', value: subjects.reduce((a, s) => a + s.total, 0), color: '#4f80ff' },
                  { label: 'Subjects', value: subjects.length, color: '#7c5cfc' },
                ].map(s => (
                  <div key={s.label} style={{ textAlign: 'center', padding: '12px', background: 'var(--bg3)', borderRadius: 8 }}>
                    <div style={{ fontSize: 24, fontWeight: 700, color: s.color }}>{s.value}</div>
                    <div style={{ fontSize: 12, color: 'var(--text2)', marginTop: 3 }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="card">
            <h3 className="section-title">Subject-wise Attendance</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {subjects.map(s => {
                const pct = Math.round(s.present / s.total * 100)
                return (
                  <div key={s.name}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                      <span style={{ fontSize: 14, fontWeight: 500 }}>{s.name}</span>
                      <span style={{ fontSize: 13, color: pct >= 75 ? '#22c55e' : '#ef4444', fontWeight: 600 }}>
                        {s.present}/{s.total} ({pct}%)
                      </span>
                    </div>
                    <div style={{ height: 8, background: 'var(--border)', borderRadius: 4, overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${pct}%`, background: pct >= 75 ? s.color : '#ef4444', borderRadius: 4, transition: 'width 0.6s ease' }} />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}