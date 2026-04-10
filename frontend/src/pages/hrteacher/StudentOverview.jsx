import Sidebar from '../../components/shared/Sidebar'
import Navbar from '../../components/shared/Navbar'

const students = [
  { name: 'Aarav Shah', roll: 'CS21001', attendance: 94, cgpa: 9.4, status: 'Good' },
  { name: 'Priya Nair', roll: 'CS21002', attendance: 68, cgpa: 7.2, status: 'Low' },
  { name: 'Rohan Desai', roll: 'CS21003', attendance: 64, cgpa: 6.8, status: 'Critical' },
  { name: 'Sneha Kulkarni', roll: 'CS21004', attendance: 91, cgpa: 9.1, status: 'Good' },
  { name: 'Vikram Joshi', roll: 'CS21005', attendance: 85, cgpa: 8.9, status: 'Good' },
  { name: 'Amit Wagh', roll: 'CS21006', attendance: 71, cgpa: 7.5, status: 'Low' },
]

const statusBadge = { Good: 'badge-green', Low: 'badge-orange', Critical: 'badge-red' }

export default function StudentOverview() {
  return (
    <div className="page-layout">
      <Sidebar />
      <div className="main-content">
        <Navbar title="Student Overview" />
        <div className="page-body">
          <div className="card">
            <h3 className="section-title">All Students</h3>
            <div className="table-wrap">
              <table>
                <thead><tr><th>Name</th><th>Roll No.</th><th>Attendance</th><th>CGPA</th><th>Status</th></tr></thead>
                <tbody>
                  {students.map(s => (
                    <tr key={s.roll}>
                      <td style={{ fontWeight: 500 }}>{s.name}</td>
                      <td style={{ fontFamily: 'monospace', color: 'var(--text2)' }}>{s.roll}</td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <div style={{ flex: 1, height: 6, background: 'var(--border)', borderRadius: 3, minWidth: 60 }}>
                            <div style={{ height: '100%', width: `${s.attendance}%`, background: s.attendance >= 75 ? '#22c55e' : '#ef4444', borderRadius: 3 }} />
                          </div>
                          <span style={{ fontSize: 13, color: s.attendance >= 75 ? '#22c55e' : '#ef4444', fontWeight: 600 }}>{s.attendance}%</span>
                        </div>
                      </td>
                      <td style={{ fontWeight: 600 }}>{s.cgpa}</td>
                      <td><span className={`badge ${statusBadge[s.status]}`}>{s.status}</span></td>
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