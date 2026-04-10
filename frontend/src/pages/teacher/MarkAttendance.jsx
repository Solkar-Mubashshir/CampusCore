import { useState } from 'react'
import Sidebar from '../../components/shared/Sidebar'
import Navbar from '../../components/shared/Navbar'
import { useOfflineAttendance } from '../../hooks/useOfflineAttendance'

const students = [
  { id: 1, name: 'Aarav Shah', roll: 'CS21001' },
  { id: 2, name: 'Priya Nair', roll: 'CS21002' },
  { id: 3, name: 'Rohan Desai', roll: 'CS21003' },
  { id: 4, name: 'Sneha Kulkarni', roll: 'CS21004' },
  { id: 5, name: 'Vikram Joshi', roll: 'CS21005' },
]

export default function MarkAttendance() {
  const { isOnline, pendingCount, syncing, markAttendance } = useOfflineAttendance()
  const [attendance, setAttendance] = useState({})
  const [saved, setSaved] = useState(false)
  const [subject, setSubject] = useState('Data Structures')

  const toggle = (id) => setAttendance(a => ({ ...a, [id]: !a[id] }))

  const handleSave = async () => {
    const records = students.map(s => ({
      studentId: s.id,
      roll: s.roll,
      subject,
      present: !!attendance[s.id],
      date: new Date().toISOString(),
    }))
    for (const r of records) await markAttendance(r)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="page-layout">
      <Sidebar />
      <div className="main-content">
        <Navbar title="Mark Attendance" />
        <div className="page-body">
          {/* Online/Offline badge */}
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 20, flexWrap: 'wrap' }}>
            <span className={`badge ${isOnline ? 'badge-green' : 'badge-red'}`}>
              {isOnline ? '🟢 Online' : '🔴 Offline'}
            </span>
            {pendingCount > 0 && (
              <span className="badge badge-orange">⏳ {pendingCount} pending sync</span>
            )}
            {syncing && <span className="badge badge-blue">🔄 Syncing...</span>}
            {saved && <span className="badge badge-green">✅ Saved!</span>}
          </div>

          <div className="card" style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontSize: 13, color: 'var(--text2)', marginBottom: 6 }}>Subject</label>
            <select className="input" value={subject} onChange={e => setSubject(e.target.value)} style={{ maxWidth: 260 }}>
              {['Data Structures', 'Computer Networks', 'DBMS', 'Operating Systems', 'Software Engineering'].map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <h3 style={{ fontSize: 15, fontWeight: 600 }}>Student List — {new Date().toLocaleDateString('en-IN')}</h3>
              <span className="badge badge-blue">{Object.values(attendance).filter(Boolean).length}/{students.length} Present</span>
            </div>
            {students.map(s => (
              <div key={s.id} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '12px 0', borderBottom: '1px solid var(--border)',
              }}>
                <div>
                  <p style={{ fontSize: 14, fontWeight: 500 }}>{s.name}</p>
                  <p style={{ fontSize: 12, color: 'var(--text3)' }}>{s.roll}</p>
                </div>
                <button
                  onClick={() => toggle(s.id)}
                  className="btn btn-sm"
                  style={{
                    background: attendance[s.id] ? 'rgba(34,197,94,0.15)' : 'rgba(239,68,68,0.15)',
                    color: attendance[s.id] ? '#22c55e' : '#ef4444',
                    border: `1px solid ${attendance[s.id] ? 'rgba(34,197,94,0.3)' : 'rgba(239,68,68,0.3)'}`,
                    minWidth: 80,
                  }}
                >{attendance[s.id] ? 'Present' : 'Absent'}</button>
              </div>
            ))}
            <div style={{ marginTop: 16 }}>
              <button className="btn btn-primary" onClick={handleSave}>
                {isOnline ? 'Save Attendance' : 'Save Offline'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}