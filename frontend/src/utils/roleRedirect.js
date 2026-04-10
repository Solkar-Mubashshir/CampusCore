export const ROLES = {
  STUDENT: 'student',
  TEACHER: 'teacher',
  HR_TEACHER: 'hrteacher',
  HOD: 'hod',
}

export const getRoleBasedNavItems = (role) => {
  const navItems = {
    [ROLES.STUDENT]: [
      { label: 'Dashboard', path: '/student/dashboard', icon: 'LayoutDashboard' },
      { label: 'Attendance', path: '/student/attendance', icon: 'Check' },
      { label: 'Results', path: '/student/results', icon: 'BarChart3' },
      { label: 'Storage', path: '/student/storage', icon: 'FolderOpen' },
      { label: 'Announcements', path: '/student/announcements', icon: 'Bell' },
      { label: 'Timetable', path: '/student/timetable', icon: 'Calendar' },
      { label: 'Virtual ID', path: '/student/virtual-id', icon: 'CreditCard' },
      { label: 'Credits', path: '/student/credits', icon: 'Star' },
      { label: 'Achievements', path: '/student/achievements', icon: 'Trophy' },
    ],
    [ROLES.TEACHER]: [
      { label: 'Announcements', path: '/teacher/announcements', icon: 'Bell' },
      { label: 'My Classes', path: '/teacher/my-classes', icon: 'Users' },
    ],
    [ROLES.HR_TEACHER]: [
      { label: 'Dashboard', path: '/hr/dashboard', icon: 'LayoutDashboard' },
      { label: 'Attendance', path: '/hr/attendance', icon: 'Check' },
      { label: 'Performance', path: '/hr/performance', icon: 'BarChart3' },
      { label: 'Students', path: '/hr/students', icon: 'Users' },
      { label: 'Analytics', path: '/hr/analytics', icon: 'TrendingUp' },
    ],
    [ROLES.HOD]: [
      { label: 'Dashboard', path: '/hod/dashboard', icon: 'LayoutDashboard' },
      { label: 'Timetable', path: '/hod/timetable', icon: 'Calendar' },
      { label: 'Batches', path: '/hod/batches', icon: 'Users' },
      { label: 'Analytics', path: '/hod/analytics', icon: 'TrendingUp' },
      { label: 'Announcements', path: '/hod/announcements', icon: 'Bell' },
    ],
  }
  return navItems[role] || []
}