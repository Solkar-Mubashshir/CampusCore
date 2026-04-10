import Sidebar from '../../components/shared/Sidebar'
import Navbar from '../../components/shared/Navbar'

const results = [
  { subject: 'Data Structures', internal: 38, external: 72, total: 110, max: 150, grade: 'A' },
  { subject: 'Computer Networks', internal: 35, external: 68, total: 103, max: 150, grade: 'B+' },
  { subject: 'DBMS', internal: 40, external: 75, total: 115, max: 150, grade: 'A+' },
  { subject: 'Operating Systems', internal: 32, external: 65, total: 97, max: 150, grade: 'B' },
  { subject: 'Software Engineering', internal: 36, external: 70, total: 106, max: 150, grade: 'A' },
]

const gradeColor = { 'A+': '#22c55e', 'A': '#4f80ff', 'B+': '#7c5cfc', 'B': '#f59e0b', 'C': '#ef4444' }

export default function Results() {
  return (
    <div className="page-layout">
      <Sidebar />
      <div className="main-content">
        <Navbar title="Results" />
        <div className="page-body">
          <div className="grid-3" style={{ marginBottom: 24 }}>
            {[
              { label: 'CGPA', value: '8.40', color: '#4f80ff' },
              { label: 'Total Marks', value: `${results.reduce((a, r) => a + r.total, 0)}/${results.reduce((a, r) => a + r.max, 0)}`, color: '#22c55e' },
              { label: 'Best Subject', value: 'DBMS', color: '#7c5cfc' },
            ].map(s => (
              <div key={s.label} className="card" style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 28, fontWeight: 700, color: s.color }}>{s.value}</div>
                <div style={{ fontSize: 13, color: 'var(--text2)', marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </div>

          <div className="card">
            <h3 className="section-title">Semester Marksheet</h3>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Subject</th>
                    <th>Internal (50)</th>
                    <th>External (100)</th>
                    <th>Total (150)</th>
                    <th>%</th>
                    <th>Grade</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map(r => (
                    <tr key={r.subject}>
                      <td style={{ fontWeight: 500 }}>{r.subject}</td>
                      <td>{r.internal}</td>
                      <td>{r.external}</td>
                      <td>{r.total}</td>
                      <td>{Math.round(r.total / r.max * 100)}%</td>
                      <td>
                        <span className="badge" style={{
                          background: `${gradeColor[r.grade]}20`, color: gradeColor[r.grade],
                        }}>{r.grade}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}