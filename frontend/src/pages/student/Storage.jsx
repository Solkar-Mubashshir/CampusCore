import Sidebar from '../../components/shared/Sidebar'
import Navbar from '../../components/shared/Navbar'

const files = [
  { name: 'DS_Unit1_Notes.pdf', subject: 'Data Structures', size: '2.4 MB', date: '2026-04-01', type: 'pdf' },
  { name: 'CN_Lab_Manual.pdf', subject: 'Computer Networks', size: '5.1 MB', date: '2026-03-28', type: 'pdf' },
  { name: 'DBMS_Slides_Ch3.pptx', subject: 'DBMS', size: '3.7 MB', date: '2026-03-25', type: 'pptx' },
  { name: 'OS_Assignment_Q.docx', subject: 'Operating Systems', size: '0.8 MB', date: '2026-03-20', type: 'docx' },
]

const typeColor = { pdf: '#ef4444', pptx: '#f59e0b', docx: '#4f80ff', default: '#7c5cfc' }

export default function Storage() {
  return (
    <div className="page-layout">
      <Sidebar />
      <div className="main-content">
        <Navbar title="Storage" />
        <div className="page-body">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <h2 className="section-title" style={{ marginBottom: 0 }}>Teacher Notes Folder</h2>
            <span className="badge badge-blue">{files.length} files</span>
          </div>

          <div className="card">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {files.map((f, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: 14, padding: '12px 0',
                  borderBottom: i < files.length - 1 ? '1px solid var(--border)' : 'none',
                }}>
                  <div style={{
                    width: 38, height: 38, borderRadius: 8,
                    background: `${typeColor[f.type] || typeColor.default}20`,
                    color: typeColor[f.type] || typeColor.default,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 11, fontWeight: 700, flexShrink: 0,
                  }}>{f.type.toUpperCase()}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: 14, fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{f.name}</p>
                    <p style={{ fontSize: 12, color: 'var(--text3)', marginTop: 2 }}>{f.subject} · {f.size} · {f.date}</p>
                  </div>
                  <button className="btn btn-secondary btn-sm">Download</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}