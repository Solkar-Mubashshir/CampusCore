const Attendance = require('../models/Attendance.model');
const Result = require('../models/Result.model');
const Announcement = require('../models/Announcement.model');
const File = require('../models/File.model');
const User = require('../models/User.model');

// Get Student Attendance
exports.getAttendance = async (req, res) => {
  try {
    const attendanceRecords = await Attendance.find({
      studentId: req.userId,
    }).populate('teacherId', 'firstName lastName');

    const totalClasses = attendanceRecords.length;
    const presentCount = attendanceRecords.filter(a => a.status === 'present').length;
    const absentCount = attendanceRecords.filter(a => a.status === 'absent').length;
    const lateCount = attendanceRecords.filter(a => a.status === 'late').length;

    const attendancePercentage = totalClasses ? (presentCount / totalClasses) * 100 : 0;

    res.status(200).json({
      attendancePercentage: attendancePercentage.toFixed(2),
      totalClasses,
      presentCount,
      absentCount,
      lateCount,
      records: attendanceRecords,
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch attendance', error: error.message });
  }
};

// Sync Offline Attendance
exports.syncOfflineAttendance = async (req, res) => {
  try {
    const { offlineRecords } = req.body;

    if (!offlineRecords || !Array.isArray(offlineRecords)) {
      return res.status(400).json({ message: 'Invalid offline records' });
    }

    const syncedRecords = [];

    for (const record of offlineRecords) {
      const attendance = new Attendance({
        studentId: req.userId,
        teacherId: record.teacherId,
        date: record.date,
        status: record.status,
        subject: record.subject,
        batch: record.batch,
        syncedFromOffline: true,
        timestamp: new Date(record.timestamp),
      });

      const saved = await attendance.save();
      syncedRecords.push(saved);
    }

    res.status(201).json({
      message: `${syncedRecords.length} records synced successfully`,
      synced: syncedRecords,
    });
  } catch (error) {
    res.status(500).json({ message: 'Sync failed', error: error.message });
  }
};

// Get Student Results
exports.getResults = async (req, res) => {
  try {
    const results = await Result.find({ studentId: req.userId });

    const resultsBySemester = {};
    results.forEach(result => {
      if (!resultsBySemester[result.semester]) {
        resultsBySemester[result.semester] = [];
      }
      resultsBySemester[result.semester].push(result);
    });

    res.status(200).json({
      results,
      resultsBySemester,
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch results', error: error.message });
  }
};

// Get Student Storage (Notes & Assignments)
exports.getStorage = async (req, res) => {
  try {
    const student = await User.findById(req.userId);
    const studentFolder = `notes/${student._id}`;

    const files = await File.find({
      folderPath: { $regex: studentFolder },
    }).populate('uploadedBy', 'firstName lastName');

    const folderStructure = {};
    files.forEach(file => {
      if (!folderStructure[file.folderPath]) {
        folderStructure[file.folderPath] = [];
      }
      folderStructure[file.folderPath].push(file);
    });

    res.status(200).json({
      files,
      folderStructure,
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch storage', error: error.message });
  }
};

// Get Announcements
exports.getAnnouncements = async (req, res) => {
  try {
    const student = await User.findById(req.userId);

    const announcements = await Announcement.find({
      $and: [
        {
          $or: [
            { isGlobal: true },
            { batch: student.batch },
            { targetRole: 'student' },
          ],
        },
        {
          $or: [
            { expiresAt: { $gt: new Date() } },
            { expiresAt: { $exists: false } },
            { expiresAt: null },
          ],
        },
      ],
    })
      .populate('createdBy', 'firstName lastName')
      .sort({ publishedAt: -1 });

    res.status(200).json({ announcements });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch announcements', error: error.message });
  }
};

// Get Timetable
exports.getTimetable = async (req, res) => {
  try {
    const Timetable = require('../models/Timetable.model');
    const student = await User.findById(req.userId);

    const timetable = await Timetable.findOne({
      batch: student.batch,
      isActive: true,
    }).populate('schedule.sessions.teacherId', 'firstName lastName');

    if (!timetable) {
      return res.status(404).json({ message: 'Timetable not found' });
    }

    res.status(200).json({ timetable });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch timetable', error: error.message });
  }
};

// Get Student Profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch profile', error: error.message });
  }
};

// Get Virtual ID (QR Code)
exports.getVirtualID = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    const qrData = JSON.stringify({
      id: user._id,
      name: `${user.firstName} ${user.lastName}`,
      email: user.email,
      enrollmentNumber: user.enrollmentNumber,
      batch: user.batch,
    });

    res.status(200).json({
      qrData,
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        enrollmentNumber: user.enrollmentNumber,
        batch: user.batch,
        profilePicture: user.profilePicture,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to generate virtual ID', error: error.message });
  }
};

// Get Credits (GPA & Activity Points)
exports.getCredits = async (req, res) => {
  try {
    const results = await Result.find({ studentId: req.userId });

    const totalCredits = results.length;
    const passedCredits = results.filter(r => r.status === 'pass').length;
    const avgGPA = results.length ? (
      results.reduce((acc, r) => acc + (r.totalMarks / 100) * 4, 0) / results.length
    ).toFixed(2) : '0.00';

    res.status(200).json({
      totalCredits,
      passedCredits,
      avgGPA,
      activityPoints: 0,
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch credits', error: error.message });
  }
};