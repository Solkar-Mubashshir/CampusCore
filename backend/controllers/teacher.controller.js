import Attendance from '../models/Attendance.model';
import Announcement from '../models/Announcement.model';
import File from '../models/File.model';
import User from '../models/User.model';
import {upload} from '../utils/cloudinary';

// Mark Attendance
exports.markAttendance = async (req, res) => {
  try {
    const { students, date, subject, batch, status } = req.body;

    if (!students || !Array.isArray(students) || students.length === 0) {
      return res.status(400).json({ message: 'Students array is required' });
    }

    const attendanceRecords = [];

    for (const studentId of students) {
      const attendance = new Attendance({
        studentId,
        teacherId: req.userId,
        date: new Date(date),
        status: status || 'present',
        subject,
        batch,
        timestamp: new Date(), // Current timestamp
      });

      const saved = await attendance.save();
      attendanceRecords.push(saved);
    }

    res.status(201).json({
      message: `Attendance marked for ${attendanceRecords.length} students`,
      records: attendanceRecords,
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to mark attendance', error: error.message });
  }
};

// Get Attendance Summary
exports.getAttendanceSummary = async (req, res) => {
  try {
    const { batch, startDate, endDate } = req.query;

    const query = { teacherId: req.userId };
    if (batch) query.batch = batch;
    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate);
      if (endDate) query.date.$lte = new Date(endDate);
    }

    const records = await Attendance.find(query).populate('studentId', 'firstName lastName enrollmentNumber');

    // Group by student
    const summary = {};
    records.forEach(record => {
      if (!summary[record.studentId._id]) {
        summary[record.studentId._id] = {
          student: record.studentId,
          total: 0,
          present: 0,
          absent: 0,
          late: 0,
        };
      }
      summary[record.studentId._id].total++;
      summary[record.studentId._id][record.status]++;
    });

    res.status(200).json({
      summary: Object.values(summary),
      totalRecords: records.length,
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch attendance summary', error: error.message });
  }
};

// Upload Notes
exports.uploadNotes = async (req, res) => {
  try {
    const { subject, batch, description } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const file = new File({
      fileName: req.file.originalname,
      fileUrl: req.file.path,
      fileType: req.file.mimetype.split('/')[1] || 'other',
      uploadedBy: req.userId,
      uploadedByRole: 'teacher',
      folderPath: `notes/${batch}/${subject}`,
      relatedTo: 'notes',
      subject,
      batch,
      fileSize: req.file.size,
      isShared: true,
    });

    await file.save();

    // Auto-send to students in the batch
    const students = await User.find({ batch, role: 'student' });
    file.recipients = students.map(s => s._id);
    await file.save();

    res.status(201).json({
      message: 'Notes uploaded and shared with students',
      file,
      sharedWith: students.length,
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to upload notes', error: error.message });
  }
};

// Post Announcement
exports.postAnnouncement = async (req, res) => {
  try {
    const { title, content, batch, isGlobal, priority } = req.body;

    const teacher = await User.findById(req.userId);

    const announcement = new Announcement({
      title,
      content,
      createdBy: req.userId,
      role: teacher.role,
      batch: isGlobal ? null : batch,
      isGlobal: isGlobal || false,
      priority: priority || 'medium',
      targetRole: 'student',
      publishedAt: new Date(),
    });

    await announcement.save();

    res.status(201).json({
      message: 'Announcement posted successfully',
      announcement,
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to post announcement', error: error.message });
  }
};

// Get Timetable
exports.getTimetable = async (req, res) => {
  try {
    const Timetable = require('../models/Timetable.model');
    const teacher = await User.findById(req.userId);

    const timetable = await Timetable.find({
      department: teacher.department,
      isActive: true,
    });

    res.status(200).json({ timetable });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch timetable', error: error.message });
  }
};

// Get My Classes
exports.getMyClasses = async (req, res) => {
  try {
    const Timetable = require('../models/Timetable.model');

    const timetables = await Timetable.find({
      'schedule.sessions.teacherId': req.userId,
      isActive: true,
    });

    const classes = [];
    timetables.forEach(tt => {
      tt.schedule.forEach(day => {
        day.sessions.forEach(session => {
          if (session.teacherId.toString() === req.userId) {
            classes.push({
              batch: tt.batch,
              subject: session.subject,
              day: day.day,
              startTime: session.startTime,
              endTime: session.endTime,
              classroom: session.classroom,
            });
          }
        });
      });
    });

    res.status(200).json({ classes });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch classes', error: error.message });
  }
};

// Get Dashboard Stats
exports.getDashboardStats = async (req, res) => {
  try {
    const attendanceCount = await Attendance.countDocuments({ teacherId: req.userId });
    const announcementCount = await Announcement.countDocuments({ createdBy: req.userId });
    const fileCount = await File.countDocuments({ uploadedBy: req.userId });

    const recentAttendance = await Attendance.find({ teacherId: req.userId })
      .sort({ date: -1 })
      .limit(10);

    res.status(200).json({
      stats: {
        totalAttendanceMarked: attendanceCount,
        totalAnnouncements: announcementCount,
        totalFilesUploaded: fileCount,
      },
      recentAttendance,
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch dashboard stats', error: error.message });
  }
};