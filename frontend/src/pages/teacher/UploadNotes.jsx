import { useState } from 'react'
import Sidebar from '../../components/shared/Sidebar'
import Navbar from '../../components/shared/Navbar'

export default function UploadNotes() {
  const [file, setFile] = useState(null)
  const [subject, setSubject] = useState('')
  const [batch, setBatch] = useState('')
  const [uploading, setUploading] = useState(false)
  const [done, setDone] = useState(false)

  const handleUpload = async () => {
    if (!file || !subject || !batch) return
    setUploading(true)
    await new Promise(r => setTimeout(r, 1500))
    setUploading(false)
    setDone(true)
    setTimeout(() => setDone(false), 3000)
  }

  return (
    <div className="page-layout">
      <Sidebar />
      <div className="main-content">
        <Navbar title="Upload Notes" />
        <div className="page-body">
          <div className="card" style={{ maxWidth: 520 }}>
            <h3 className="section-title">Auto-Send Notes to Students</h3>
            <p style={{ fontSize: 13, color: 'var(--text2)', marginBottom: 20 }}>
              Select a class and upload notes — they'll be automatically delivered to all students' storage folders.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <label style={{ fontSize: 13, color: 'var(--text2)', display: 'block', marginBottom: 6 }}>Subject</label>
                <select className="input" value={subject} onChange={e => setSubject(e.target.value)}>
                  <option value="">Select subject</option>
                  {['Data Structures', 'Computer Networks', 'DBMS', 'Operating Systems'].map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label style={{ fontSize: 13, color: 'var(--text2)', display: 'block', marginBottom: 6 }}>Batch</label>
                <select className="input" value={batch} onChange={e => setBatch(e.target.value)}>
                  <option value="">Select batch</option>
                  {['SE-A', 'SE-B', 'TE-A', 'TE-B', 'BE-A'].map(b => <option key={b}>{b}</option>)}
                </select>
              </div>
              <div>
                <label style={{ fontSize: 13, color: 'var(--text2)', display: 'block', marginBottom: 6 }}>File</label>
                <input type="file" onChange={e => setFile(e.target.files[0])} style={{ fontSize: 13, color: 'var(--text2)' }} />
              </div>
              {done && <div className="badge badge-green" style={{ width: 'fit-content' }}>✅ Notes sent to all students!</div>}
              <button className="btn btn-primary" onClick={handleUpload} disabled={uploading || !file || !subject || !batch}>
                {uploading ? 'Uploading...' : '📤 Upload & Auto-Send'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}