import { useState } from 'react'
import Sidebar from '../../components/shared/Sidebar'
import Navbar from '../../components/shared/Navbar'

export default function Announcements() {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [target, setTarget] = useState('all')
  const [posted, setPosted] = useState(false)

  const handlePost = () => {
    if (!title || !body) return
    setPosted(true)
    setTitle(''); setBody('')
    setTimeout(() => setPosted(false), 3000)
  }

  return (
    <div className="page-layout">
      <Sidebar />
      <div className="main-content">
        <Navbar title="Announcements" />
        <div className="page-body">
          <div className="card" style={{ maxWidth: 560 }}>
            <h3 className="section-title">Post Announcement</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <label style={{ fontSize: 13, color: 'var(--text2)', display: 'block', marginBottom: 6 }}>Target</label>
                <select className="input" value={target} onChange={e => setTarget(e.target.value)}>
                  <option value="all">All Students (Global)</option>
                  <option value="SE-A">SE-A</option>
                  <option value="SE-B">SE-B</option>
                  <option value="TE-A">TE-A</option>
                </select>
              </div>
              <div>
                <label style={{ fontSize: 13, color: 'var(--text2)', display: 'block', marginBottom: 6 }}>Title</label>
                <input className="input" placeholder="Announcement title..." value={title} onChange={e => setTitle(e.target.value)} />
              </div>
              <div>
                <label style={{ fontSize: 13, color: 'var(--text2)', display: 'block', marginBottom: 6 }}>Message</label>
                <textarea className="input" rows={4} placeholder="Write your announcement..." value={body} onChange={e => setBody(e.target.value)} />
              </div>
              {posted && <span className="badge badge-green">✅ Announcement posted!</span>}
              <button className="btn btn-primary" onClick={handlePost}>📢 Post Announcement</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}