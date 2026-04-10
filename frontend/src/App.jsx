import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/shared/ProtectedRoute'
import Login from './pages/Login'

import StudentDashboard from './pages/student/StudentDashboard'
import Attendance from './pages/student/Attendance'
import Results from './pages/student/Results'
import Storage from './pages/student/Storage'
import StudentAnnouncements from './pages/student/Announcements'
import Timetable from './pages/student/Timetable'
import VirtualID from './pages/student/VirtualID'
import Credits from './pages/student/Credits'
import Achievements from './pages/student/Achievements'

import TeacherDashboard from './pages/teacher/TeacherDashboard'
import MarkAttendance from './pages/teacher/MarkAttendance'
import UploadNotes from './pages/teacher/UploadNotes'
import TeacherAnnouncements from './pages/teacher/Announcements'

import HRDashboard from './pages/hrteacher/HRDashboard'
import StudentOverview from './pages/hrteacher/StudentOverview'
import PerformanceReport from './pages/hrteacher/PerformanceReport'

import HODDashboard from './pages/hod/HODDashboard'
import TimetableManager from './pages/hod/TimetableManager'
import BatchOverview from './pages/hod/BatchOverview'

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Navigate to="/login" replace />} />

          <Route path="/student/dashboard" element={<ProtectedRoute role="student"><StudentDashboard /></ProtectedRoute>} />
          <Route path="/student/attendance" element={<ProtectedRoute role="student"><Attendance /></ProtectedRoute>} />
          <Route path="/student/results" element={<ProtectedRoute role="student"><Results /></ProtectedRoute>} />
          <Route path="/student/storage" element={<ProtectedRoute role="student"><Storage /></ProtectedRoute>} />
          <Route path="/student/announcements" element={<ProtectedRoute role="student"><StudentAnnouncements /></ProtectedRoute>} />
          <Route path="/student/timetable" element={<ProtectedRoute role="student"><Timetable /></ProtectedRoute>} />
          <Route path="/student/virtual-id" element={<ProtectedRoute role="student"><VirtualID /></ProtectedRoute>} />
          <Route path="/student/credits" element={<ProtectedRoute role="student"><Credits /></ProtectedRoute>} />
          <Route path="/student/achievements" element={<ProtectedRoute role="student"><Achievements /></ProtectedRoute>} />

          <Route path="/teacher/dashboard" element={<ProtectedRoute role="teacher"><TeacherDashboard /></ProtectedRoute>} />
          <Route path="/teacher/announcements" element={<ProtectedRoute role="teacher"><TeacherAnnouncements /></ProtectedRoute>} />
          <Route path="/teacher/my-classes" element={<ProtectedRoute role="teacher"><MarkAttendance /></ProtectedRoute>} />
          <Route path="/teacher/upload-notes" element={<ProtectedRoute role="teacher"><UploadNotes /></ProtectedRoute>} />

          <Route path="/hr/dashboard" element={<ProtectedRoute role="hrteacher"><HRDashboard /></ProtectedRoute>} />
          <Route path="/hr/attendance" element={<ProtectedRoute role="hrteacher"><StudentOverview /></ProtectedRoute>} />
          <Route path="/hr/performance" element={<ProtectedRoute role="hrteacher"><PerformanceReport /></ProtectedRoute>} />
          <Route path="/hr/students" element={<ProtectedRoute role="hrteacher"><StudentOverview /></ProtectedRoute>} />
          <Route path="/hr/analytics" element={<ProtectedRoute role="hrteacher"><PerformanceReport /></ProtectedRoute>} />

          <Route path="/hod/dashboard" element={<ProtectedRoute role="hod"><HODDashboard /></ProtectedRoute>} />
          <Route path="/hod/timetable" element={<ProtectedRoute role="hod"><TimetableManager /></ProtectedRoute>} />
          <Route path="/hod/batches" element={<ProtectedRoute role="hod"><BatchOverview /></ProtectedRoute>} />
          <Route path="/hod/analytics" element={<ProtectedRoute role="hod"><HODDashboard /></ProtectedRoute>} />
          <Route path="/hod/announcements" element={<ProtectedRoute role="hod"><TeacherAnnouncements /></ProtectedRoute>} />

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}