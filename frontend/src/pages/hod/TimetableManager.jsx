import { useState } from 'react'
import Sidebar from '../../components/shared/Sidebar'
import Navbar from '../../components/shared/Navbar'

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
const slots = ['9:00', '10:00', '11:00', '12:00', '2:00', '3:00', '4:00']

export default function TimetableManager() {
  const [selected, setSelected] = useState('BE-A')
  return (
    <div className="page-layout">
      <Sidebar />
      <div className="main-content">
        <Navbar title="Timetable Manager" />
        <div className="page-body">
          <div style={{ display: 'flex', gap: 12, marginBottom: 20, alignItems: 'center' }}>
            <select className="input" value={selected} onChange={e => setSelected(e.target.value)} style={{ maxWidth: 160 }}>
              {['BE-A', 'BE-B', 'TE-A', 'TE-B', 'SE-A', 'SE-B'].map(b => <option key={b}>{b}</option>)}
            </select>
            <button className="btn btn-primary btn-sm">+ Add Slot</button>
            <button className="btn btn-secondary btn-sm">Save Changes</button>
          </div>
          <div className="card" style={{ overflowX: 'auto' }}>
            <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 14 }}>Timetable — Batch {selected}</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 600 }}>
              <thead>
                <tr>
                  <th style={{ padding: '10px 12px', textAlign: 'left', color: 'var(--text3)', fontSize: 12 }}>Day</th>
                  {slots.map(s => <th key={s} style={{ padding: '10px 8px', fontSize: 12, color: 'var(--text3)', textAlign: 'center' }}>{s}</th>)}
                </tr>
              </thead>
              <tbody>
                {days.map(day => (
                  <tr key={day}>
                    <td style={{ padding: '8px 12px', fontWeight: 600, fontSize: 13, color: 'var(--text2)' }}>{day}</td>
                    {slots.map((_, i) => (
                      <td key={i} style={{ padding: '4px' }}>
                        <div style={{
                          height: 36, border: '1px dashed var(--border)', borderRadius: 6,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: 11, color: 'var(--text3)', cursor: 'pointer',
                        }}>+</div>
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