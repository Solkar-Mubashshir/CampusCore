import Sidebar from '../../components/shared/Sidebar'
import Navbar from '../../components/shared/Navbar'

export default function Credits() {
  const subjects = [
    { name: 'Data Structures', credits: 4, grade: 'A', points: 9 },
    { name: 'Computer Networks', credits: 3, grade: 'B+', points: 8 },
    { name: 'DBMS', credits: 4, grade: 'A+', points: 10 },
    { name: 'Operating Systems', credits: 3, grade: 'B', points: 7 },
    { name: 'Software Engineering', credits: 3, grade: 'A', points: 9 },
  ]
  const totalCredits = subjects.reduce((a, s) => a + s.credits, 0)
  const gpa = (subjects.reduce((a, s) => a + s.credits * s.points, 0) / totalCredits).toFixed(2)

  return (
    <div className="page-layout">
      <Sidebar />
      <div className="main-content">
        <Navbar title="Credits & GPA" />
        <div className="page-body">
          <div className="grid-3" style={{ marginBottom: 24 }}>
            {[
              { label: 'CGPA', value: gpa, color: '#4f80ff' },
              { label: 'Total Credits', value: totalCredits, color: '#22c55e' },
              { label: 'Activity Points', value: 28, color: '#f59e0b' },
            ].map(s => (
              <div key={s.label} className="card" style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 30, fontWeight: 700, color: s.color }}>{s.value}</div>
                <div style={{ color: 'var(--text2)', fontSize: 13, marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </div>
          <div className="card">
            <h3 className="section-title">Credit Details</h3>
            <div className="table-wrap">
              <table>
                <thead><tr><th>Subject</th><th>Credits</th><th>Grade</th><th>Grade Points</th><th>Weighted</th></tr></thead>
                <tbody>
                  {subjects.map(s => (
                    <tr key={s.name}>
                      <td style={{ fontWeight: 500 }}>{s.name}</td>
                      <td>{s.credits}</td>
                      <td><span className="badge badge-blue">{s.grade}</span></td>
                      <td>{s.points}</td>
                      <td>{s.credits * s.points}</td>
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