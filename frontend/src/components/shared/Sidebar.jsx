import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { getRoleBasedNavItems } from '../../utils/roleRedirect'

const Icons = {
  LayoutDashboard: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>,
  Check: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20,6 9,17 4,12"/></svg>,
  BarChart3: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
  FolderOpen: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"/></svg>,
  Bell: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>,
  Calendar: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  CreditCard: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>,
  Star: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26 12,2"/></svg>,
  Trophy: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="8,21 12,17 16,21"/><path d="M7 4H2v2a4 4 0 004 4h.5"/><path d="M17 4h5v2a4 4 0 01-4 4h-.5"/><rect x="7" y="2" width="10" height="12" rx="2"/><line x1="12" y1="17" x2="12" y2="14"/></svg>,
  Users: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>,
  TrendingUp: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23,6 13.5,15.5 8.5,10.5 1,18"/><polyline points="17,6 23,6 23,12"/></svg>,
  LogOut: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16,17 21,12 16,7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>,
}

const roleColors = {
  student: '#4f80ff',
  teacher: '#7c5cfc',
  hrteacher: '#06b6d4',
  hod: '#f59e0b',
}

const roleLabels = {
  student: 'Student',
  teacher: 'Teacher',
  hrteacher: 'HR Teacher',
  hod: 'Head of Dept',
}

export default function Sidebar() {
  const { user, logout } = useAuth()
  const navItems = getRoleBasedNavItems(user?.role)
  const accentColor = roleColors[user?.role] || '#4f80ff'

  return (
    <aside style={{
      width: 240,
      background: 'var(--bg2)',
      borderRight: '1px solid var(--border)',
      display: 'flex',
      flexDirection: 'column',
      padding: '0',
      flexShrink: 0,
      minHeight: '100vh',
    }}>
      {/* Brand */}
      <div style={{ padding: '24px 20px 20px', borderBottom: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: `linear-gradient(135deg, ${accentColor}, ${accentColor}88)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 16, fontWeight: 700, color: 'white',
          }}>C</div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 15, fontFamily: 'Space Mono, monospace' }}>CampusCore</div>
            <div style={{ fontSize: 11, color: 'var(--text3)', marginTop: 1 }}>Smart Campus</div>
          </div>
        </div>
      </div>

      {/* User info */}
      <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)' }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          padding: '10px 12px', borderRadius: 10, background: 'var(--bg3)',
        }}>
          <div style={{
            width: 34, height: 34, borderRadius: '50%',
            background: `linear-gradient(135deg, ${accentColor}44, ${accentColor}22)`,
            border: `2px solid ${accentColor}44`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 13, fontWeight: 600, color: accentColor, flexShrink: 0,
          }}>
            {user?.name?.[0]?.toUpperCase() || 'U'}
          </div>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {user?.name || 'User'}
            </div>
            <div style={{ fontSize: 11, color: accentColor, marginTop: 1 }}>
              {roleLabels[user?.role] || user?.role}
            </div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '12px 12px', overflowY: 'auto' }}>
        {navItems.map(item => {
          const IconComp = Icons[item.icon]
          return (
            <NavLink
              key={item.path}
              to={item.path}
              style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '9px 12px',
                borderRadius: 8,
                marginBottom: 2,
                fontSize: 14,
                fontWeight: isActive ? 600 : 400,
                color: isActive ? accentColor : 'var(--text2)',
                background: isActive ? `${accentColor}18` : 'transparent',
                border: isActive ? `1px solid ${accentColor}30` : '1px solid transparent',
                transition: 'all 0.15s',
                textDecoration: 'none',
              })}
            >
              {IconComp && <IconComp />}
              {item.label}
            </NavLink>
          )
        })}
      </nav>

      {/* Logout */}
      <div style={{ padding: '12px', borderTop: '1px solid var(--border)' }}>
        <button onClick={logout} style={{
          display: 'flex', alignItems: 'center', gap: 10,
          padding: '9px 12px', width: '100%', border: 'none',
          borderRadius: 8, background: 'transparent', cursor: 'pointer',
          color: 'var(--text3)', fontSize: 14, transition: 'all 0.15s',
        }}
          onMouseOver={e => { e.currentTarget.style.color = '#ef4444'; e.currentTarget.style.background = 'rgba(239,68,68,0.08)' }}
          onMouseOut={e => { e.currentTarget.style.color = 'var(--text3)'; e.currentTarget.style.background = 'transparent' }}
        >
          <Icons.LogOut /> Logout
        </button>
      </div>
    </aside>
  )
}