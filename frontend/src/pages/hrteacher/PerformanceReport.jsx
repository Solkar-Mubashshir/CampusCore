import Sidebar from '../../components/shared/Sidebar'
import Navbar from '../../components/shared/Navbar'

const subjects = ['DS', 'CN', 'DBMS', 'OS', 'SE']
const data = [
  { name: 'Aarav Shah', scores: [88, 82, 95, 79, 90] },
  { name: 'Priya Nair', scores: [72, 68, 75, 65, 70] },
  { name: 'Rohan Desai', scores: [65, 60, 70, 58, 62] },
  { name: 'Sneha Kulkarni', scores: [91, 88, 92, 85, 89] },
]

export default function PerformanceReport() {
  return (
    <div className="page-layout">
      <Sidebar />
      <div className="main-content">
        <Navbar title="Performance Reports" />
        <div className="page-body">
          <div className="card">
            <h3 className="section-title">Subject-wise Performance</h3>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Student</th>
                    {subjects.map(s => <th key={s}>{s}</th>)}
                    <th>Avg</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map(d => {
                    const avg = Math.round(d.scores.reduce((a, b) => a + b, 0) / d.scores.length)
                    return (
                      <tr key={d.name}>
                        <td style={{ fontWeight: 500 }}>{d.name}</td>
                        {d.scores.map((score, i) => (
                          <td key={i} style={{ color: score >= 80 ? '#22c55e' : score >= 65 ? '#f59e0b' : '#ef4444', fontWeight: 600 }}>{score}</td>
                        ))}
                        <td><span className="badge badge-blue">{avg}%</span></td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}