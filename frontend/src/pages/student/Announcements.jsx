import Sidebar from '../../components/shared/Sidebar'
import Navbar from '../../components/shared/Navbar'

const announcements = [
  { title: 'Mid-semester Exam Schedule', body: 'Mid-semester exams will begin from April 20th. Check the notice board for the full timetable.', author: 'Admin', time: '2h ago', tag: 'Exam' },
  { title: 'Hackathon 2026 — Registrations Open', body: 'NeoFuture Hackathon registrations are open until April 15. Register via the portal.', author: 'HOD', time: '1d ago', tag: 'Event' },
  { title: 'Library Closed on Friday', body: 'The central library will remain closed on Friday, April 12 for annual maintenance.', author: 'Library', time: '2d ago', tag: 'General' },
]

const tagColor = { Exam: 'badge-red', Event: 'badge-blue', General: 'badge-orange' }

export default function Announcements() {
  return (
    <div className="page-layout">
      <Sidebar />
      <div className="main-content">
        <Navbar title="Announcements" />
        <div className="page-body">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {announcements.map((a, i) => (
              <div key={i} className="card" style={{ borderLeft: '3px solid var(--accent)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                  <h3 style={{ fontSize: 15, fontWeight: 600 }}>{a.title}</h3>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexShrink: 0, marginLeft: 12 }}>
                    <span className={`badge ${tagColor[a.tag]}`}>{a.tag}</span>
                  </div>
                </div>
                <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.6, marginBottom: 10 }}>{a.body}</p>
                <p style={{ fontSize: 12, color: 'var(--text3)' }}>By {a.author} · {a.time}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}