import Sidebar from '../../components/shared/Sidebar'
import Navbar from '../../components/shared/Navbar'

const batches = [
  { name: 'BE-A', students: 65, teacher: 'Prof. Sharma', attendance: 88, cgpa: 8.2 },
  { name: 'BE-B', students: 62, teacher: 'Prof. Desai', attendance: 79, cgpa: 7.8 },
  { name: 'TE-A', students: 68, teacher: 'Prof. Mehta', attendance: 91, cgpa: 8.5 },
  { name: 'TE-B', students: 60, teacher: 'Prof. Joshi', attendance: 75, cgpa: 7.6 },
  { name: 'SE-A', students: 70, teacher: 'Prof. Nair', attendance: 84, cgpa: 8.0 },
  { name: 'SE-B', students: 66, teacher: 'Prof. Rao', attendance: 82, cgpa: 7.9 },
]

export default function BatchOverview() {
  return (
    <div className="page-layout">
      <Sidebar />
      <div className="main-content">
        <Navbar title="Batch Overview" />
        <div className="page-body">
          <div className="grid-2">
            {batches.map(b => (
              <div key={b.name} className="card" style={{ borderTop: `3px solid ${b.attendance >= 80 ? '#22c55e' : '#f59e0b'}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
                  <div>
                    <h3 style={{ fontSize: 18, fontWeight: 700 }}>Batch {b.name}</h3>
                    <p style={{ fontSize: 12, color: 'var(--text3)', marginTop: 2 }}>{b.teacher}</p>
                  </div>
                  <span className={`badge ${b.attendance >= 80 ? 'badge-green' : 'badge-orange'}`}>{b.attendance}%</span>
                </div>
                <div className="grid-2" style={{ gap: 10 }}>
                  {[
                    { label: 'Students', value: b.students, color: '#4f80ff' },
                    { label: 'Avg CGPA', value: b.cgpa, color: '#7c5cfc' },
                  ].map(s => (
                    <div key={s.label} style={{ background: 'var(--bg3)', borderRadius: 8, padding: '10px 12px' }}>
                      <div style={{ fontSize: 20, fontWeight: 700, color: s.color }}>{s.value}</div>
                      <div style={{ fontSize: 12, color: 'var(--text2)', marginTop: 2 }}>{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}