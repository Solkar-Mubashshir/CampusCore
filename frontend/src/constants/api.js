const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const API_ROUTES = {
  // Auth
  AUTH_REGISTER: `${API_BASE_URL}/auth/register`,
  AUTH_LOGIN: `${API_BASE_URL}/auth/login`,
  AUTH_ME: `${API_BASE_URL}/auth/me`,
  AUTH_UPDATE_PROFILE: `${API_BASE_URL}/auth/profile`,

  // Student
  STUDENT_ATTENDANCE: `${API_BASE_URL}/student/attendance`,
  STUDENT_ATTENDANCE_SYNC: `${API_BASE_URL}/student/attendance/sync-offline`,
  STUDENT_RESULTS: `${API_BASE_URL}/student/results`,
  STUDENT_STORAGE: `${API_BASE_URL}/student/storage`,
  STUDENT_ANNOUNCEMENTS: `${API_BASE_URL}/student/announcements`,
  STUDENT_TIMETABLE: `${API_BASE_URL}/student/timetable`,
  STUDENT_PROFILE: `${API_BASE_URL}/student/profile`,
  STUDENT_VIRTUAL_ID: `${API_BASE_URL}/student/virtual-id`,
  STUDENT_CREDITS: `${API_BASE_URL}/student/credits`,

  // Teacher
  TEACHER_MARK_ATTENDANCE: `${API_BASE_URL}/teacher/attendance/mark`,
  TEACHER_ATTENDANCE_SUMMARY: `${API_BASE_URL}/teacher/attendance/summary`,
  TEACHER_UPLOAD_NOTES: `${API_BASE_URL}/teacher/upload-notes`,
  TEACHER_POST_ANNOUNCEMENT: `${API_BASE_URL}/teacher/announcement`,
  TEACHER_TIMETABLE: `${API_BASE_URL}/teacher/timetable`,
  TEACHER_MY_CLASSES: `${API_BASE_URL}/teacher/my-classes`,
  TEACHER_DASHBOARD_STATS: `${API_BASE_URL}/teacher/dashboard-stats`,

  // HR Teacher
  HR_ATTENDANCE_SUMMARY: `${API_BASE_URL}/hr/attendance-summary`,
  HR_PERFORMANCE_REPORT: `${API_BASE_URL}/hr/performance-report`,
  HR_STUDENTS_OVERVIEW: `${API_BASE_URL}/hr/students-overview`,
  HR_BATCH_ANALYTICS: `${API_BASE_URL}/hr/batch-analytics`,
  HR_ALL_TIMETABLES: `${API_BASE_URL}/hr/all-timetables`,
  HR_DASHBOARD_STATS: `${API_BASE_URL}/hr/dashboard-stats`,

  // HOD
  HOD_CREATE_TIMETABLE: `${API_BASE_URL}/hod/timetable`,
  HOD_UPDATE_TIMETABLE: `${API_BASE_URL}/hod/timetable`,
  HOD_DELETE_TIMETABLE: `${API_BASE_URL}/hod/timetable`,
  HOD_GET_TIMETABLES: `${API_BASE_URL}/hod/timetables`,
  HOD_BATCH_OVERVIEW: `${API_BASE_URL}/hod/batch-overview`,
  HOD_POST_ANNOUNCEMENT: `${API_BASE_URL}/hod/announcement`,
  HOD_DEPARTMENT_ANALYTICS: `${API_BASE_URL}/hod/department-analytics`,
  HOD_DASHBOARD_STATS: `${API_BASE_URL}/hod/dashboard-stats`,
};

export default API_ROUTES;