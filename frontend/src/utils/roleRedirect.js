import { ROLES } from './roles';

export const getRoleRedirectPath = (role) => {
  const paths = {
    [ROLES.STUDENT]: '/student/dashboard',
    [ROLES.TEACHER]: '/teacher/dashboard',
    [ROLES.HR_TEACHER]: '/hr/dashboard',
    [ROLES.HOD]: '/hod/dashboard',
  };

  return paths[role] || '/login';
};

export const isValidRole = (role) => {
  return Object.values(ROLES).includes(role);
};

export const canAccessRoute = (userRole, requiredRoles) => {
  if (typeof requiredRoles === 'string') {
    return userRole === requiredRoles;
  }
  return requiredRoles.includes(userRole);
};

export const getRoleBasedNavItems = (role) => {
  const navItems = {
    [ROLES.STUDENT]: [
      { label: 'Dashboard', path: '/student/dashboard', icon: 'LayoutDashboard' },
      { label: 'Attendance', path: '/student/attendance', icon: 'Check' },
      { label: 'Results', path: '/student/results', icon: 'BarChart3' },
      { label: 'Storage', path: '/student/storage', icon: 'HardDrive' },
      { label: 'Announcements', path: '/student/announcements', icon: 'Bell' },
      { label: 'Timetable', path: '/student/timetable', icon: 'Calendar' },
      { label: 'Virtual ID', path: '/student/virtual-id', icon: 'FileText' },
      { label: 'Credits', path: '/student/credits', icon: 'Trophy' },
    ],
    [ROLES.TEACHER]: [
      { label: 'Dashboard', path: '/teacher/dashboard', icon: 'LayoutDashboard' },
      { label: 'Mark Attendance', path: '/teacher/mark-attendance', icon: 'Check' },
      { label: 'Upload Notes', path: '/teacher/upload-notes', icon: 'Upload' },
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
  };

  return navItems[role] || [];
};