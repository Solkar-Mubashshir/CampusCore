import express from "express";
import hodController from '../controllers/hod.controller';
import authMiddleware from '../middleware/auth.middleware';
import roleMiddleware from '../middleware/role.middleware';

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