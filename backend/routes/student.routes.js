const express = require('express');
const studentController = require('../controllers/student.controller');
const authMiddleware = require('../middleware/auth.middleware');
const roleMiddleware = require('../middleware/role.middleware');

const router = express.Router();

// All student routes are protected
router.use(authMiddleware);
router.use(roleMiddleware('student'));

// Attendance routes
router.get('/attendance', studentController.getAttendance);
router.post('/attendance/sync-offline', studentController.syncOfflineAttendance);

// Results routes
router.get('/results', studentController.getResults);

// Storage routes
router.get('/storage', studentController.getStorage);

// Announcements routes
router.get('/announcements', studentController.getAnnouncements);

// Timetable routes
router.get('/timetable', studentController.getTimetable);

// Profile routes
router.get('/profile', studentController.getProfile);

// Virtual ID routes
router.get('/virtual-id', studentController.getVirtualID);

// Credits routes
router.get('/credits', studentController.getCredits);

module.exports = router;