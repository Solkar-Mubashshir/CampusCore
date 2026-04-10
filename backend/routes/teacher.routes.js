import express from "express";
import teacherController from '../controllers/teacher.controller'
import authMiddleware from '../middleware/auth.middleware'
import roleMiddleware from '../middleware/role.middleware'
import { upload } from '../utils/cloudinary'

const router = express.Router();

// All teacher routes are protected
router.use(authMiddleware);
router.use(roleMiddleware('teacher', 'hrteacher', 'hod'));

// Attendance routes
router.post('/attendance/mark', teacherController.markAttendance);
router.get('/attendance/summary', teacherController.getAttendanceSummary);

// File upload routes
router.post('/upload-notes', upload.single('file'), teacherController.uploadNotes);

// Announcement routes
router.post('/announcement', teacherController.postAnnouncement);

// Timetable routes
router.get('/timetable', teacherController.getTimetable);
router.get('/my-classes', teacherController.getMyClasses);

// Dashboard stats
router.get('/dashboard-stats', teacherController.getDashboardStats);

module.exports = router;