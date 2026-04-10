export const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

export const ENDPOINTS = {
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  ATTENDANCE: '/student/attendance',
  RESULTS: '/student/results',
  ANNOUNCEMENTS: '/student/announcements',
  TIMETABLE: '/student/timetable',
  FILES: '/student/files',
  MARK_ATTENDANCE: '/teacher/attendance',
  UPLOAD_NOTES: '/teacher/upload',
  HR_STUDENTS: '/hrteacher/students',
  HR_ATTENDANCE: '/hrteacher/attendance',
  HOD_BATCHES: '/hod/batches',
  HOD_TIMETABLE: '/hod/timetable',
}