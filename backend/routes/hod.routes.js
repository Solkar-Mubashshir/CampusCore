const express = require('express');
const hodController = require('../controllers/hod.controller');
const authMiddleware = require('../middleware/auth.middleware');
const roleMiddleware = require('../middleware/role.middleware');

const router = express.Router();

// All HOD routes are protected
router.use(authMiddleware);
router.use(roleMiddleware('hod'));

// Timetable routes
router.post('/timetable', hodController.createTimetable);
router.put('/timetable/:id', hodController.updateTimetable);
router.delete('/timetable/:id', hodController.deleteTimetable);
router.get('/timetables', hodController.getDepartmentTimetables);

// Batch overview routes
router.get('/batch-overview', hodController.getBatchOverview);

// Announcement routes
router.post('/announcement', hodController.sendBatchAnnouncement);

// Department analytics
router.get('/department-analytics', hodController.getDepartmentAnalytics);

// Dashboard stats
router.get('/dashboard-stats', hodController.getDashboardStats);

module.exports = router;