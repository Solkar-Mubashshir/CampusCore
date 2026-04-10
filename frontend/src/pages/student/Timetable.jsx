import Sidebar from '../../components/shared/Sidebar'
import Navbar from '../../components/shared/Navbar'

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
const slots = ['9:00', '10:00', '11:00', '12:00', '1:00', '2:00', '3:00', '4:00']

const timetable = {
  Monday:    ['DS', 'DS', 'CN', '-', 'Lunch', 'DBMS', 'DBMS', '-'],
  Tuesday:   ['CN', 'CN', '-', 'SE', 'Lunch', 'OS', '-', 'Lab'],
  Wednesday: ['DBMS', '-', 'DS', 'DS', 'Lunch', 'CN', 'SE', '-'],
  Thursday:  ['-', 'OS', 'OS', '-', 'Lunch', 'DS', 'DBMS', '-'],
  Friday:    ['SE', 'SE', 'CN', '-', 'Lunch', '-', 'OS', 'OS'],
}
const colors = { DS: '#4f80ff', CN: '#7c5cfc', DBMS: '#06b6d4', OS: '#f59e0b', SE: '#22c55e', Lunch: '#2e3a52', '-': 'transparent' }

export default function Timetable() {
  return (
    <div className="page-layout">
      <Sidebar />
      <div className="main-content">
        <Navbar title="Timetable" />
        <div className="page-body">
          <div className="card" style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 600 }}>
              <thead>
                <tr>
                  <th style={{ padding: '10px 12px', textAlign: 'left', color: 'var(--text3)', fontSize: 12, fontWeight: 600 }}>Day / Time</th>
                  {slots.map(s => <th key={s} style={{ padding: '10px 8px', fontSize: 12, color: 'var(--text3)', fontWeight: 600, textAlign: 'center' }}>{s}</th>)}
                </tr>
              </thead>
              <tbody>
                {days.map(day => (
                  <tr key={day}>
                    <td style={{ padding: '8px 12px', fontWeight: 600, fontSize: 13, color: 'var(--text2)', whiteSpace: 'nowrap' }}>{day}</td>
                    {timetable[day].map((sub, i) => (
                      <td key={i} style={{ padding: '6px 4px', textAlign: 'center' }}>
                        {sub !== '-' && (
                          <div style={{
                            padding: '6px 4px', borderRadius: 6,
                            background: `${colors[sub]}22`,
                            color: colors[sub],
                            fontSize: 12, fontWeight: 600,
                          }}>{sub}</div>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}