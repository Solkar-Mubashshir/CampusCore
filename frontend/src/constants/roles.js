// User Roles
export const ROLES = {
  STUDENT: 'student',
  TEACHER: 'teacher',
  HR_TEACHER: 'hrteacher',
  HOD: 'hod',
};

// Role Display Names
export const ROLE_NAMES = {
  student: 'Student',
  teacher: 'Teacher',
  hrteacher: 'HR Teacher',
  hod: 'HOD',
};

// Role Colors
export const ROLE_COLORS = {
  student: 'bg-blue-500',
  teacher: 'bg-green-500',
  hrteacher: 'bg-purple-500',
  hod: 'bg-red-500',
};

// Permission Map
export const ROLE_PERMISSIONS = {
  student: ['view_attendance', 'view_results', 'view_announcements', 'view_timetable', 'view_storage'],
  teacher: ['mark_attendance', 'upload_notes', 'post_announcements', 'view_timetable'],
  hrteacher: ['view_attendance', 'view_results', 'view_performance', 'view_analytics', 'view_timetable'],
  hod: ['manage_timetable', 'view_batch', 'post_announcements', 'view_analytics', 'view_timetable'],
};