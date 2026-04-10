import Sidebar from '../../components/shared/Sidebar'
import Navbar from '../../components/shared/Navbar'

const badges = [
  { icon: '🏆', title: 'Hackathon Finalist', desc: 'Top 10 at TechFest 2025', color: '#f59e0b', earned: true },
  { icon: '📚', title: 'Academic Excellence', desc: 'CGPA above 8.5 for 2 semesters', color: '#4f80ff', earned: true },
  { icon: '✅', title: 'Perfect Attendance', desc: '100% attendance in one month', color: '#22c55e', earned: true },
  { icon: '💡', title: 'Project Innovator', desc: 'Best project award', color: '#7c5cfc', earned: true },
  { icon: '🤝', title: 'Team Player', desc: 'Led 3+ group projects', color: '#06b6d4', earned: false },
  { icon: '🎯', title: 'Consistent Performer', desc: 'A grade in 5 consecutive subjects', color: '#ef4444', earned: false },
]

export default function Achievements() {
  return (
    <div className="page-layout">
      <Sidebar />
      <div className="main-content">
        <Navbar title="Achievements" />
        <div className="page-body">
          <div className="grid-3">
            {badges.map((b, i) => (
              <div key={i} className="card" style={{ textAlign: 'center', opacity: b.earned ? 1 : 0.4, transition: 'all 0.2s' }}>
                <div style={{ fontSize: 36, marginBottom: 10 }}>{b.icon}</div>
                <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 6 }}>{b.title}</div>
                <div style={{ fontSize: 12, color: 'var(--text2)', marginBottom: 12 }}>{b.desc}</div>
                <span className="badge" style={{ background: `${b.color}20`, color: b.color }}>
                  {b.earned ? 'Earned' : 'Locked'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}