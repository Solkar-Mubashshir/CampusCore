const express = require('express');
const hrteacherController = require('../controllers/hrteacher.controller');
const authMiddleware = require('../middleware/auth.middleware');
const roleMiddleware = require('../middleware/role.middleware');

const router = express.Router();

// All HR teacher routes are protected
router.use(authMiddleware);
router.use(roleMiddleware('hrteacher', 'hod'));

// Attendance routes
router.get('/attendance-summary', hrteacherController.getStudentAttendanceSummary);

// Performance report routes
router.get('/performance-report', hrteacherController.getPerformanceReport);

// Student overview routes
router.get('/students-overview', hrteacherController.getAllStudentsOverview);

// Batch analytics routes
router.get('/batch-analytics', hrteacherController.getBatchAnalytics);

// Timetable routes
router.get('/all-timetables', hrteacherController.getAllTeacherTimetables);

// Dashboard stats
router.get('/dashboard-stats', hrteacherController.getDashboardStats);

module.exports = router;