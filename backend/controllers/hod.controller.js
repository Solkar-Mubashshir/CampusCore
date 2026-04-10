import Timetable from '../models/Timetable.model';
import User from '../models/User.model';
import Attendance from '../models/Attendance.model';
import Result from '../models/Result.model';
import Announcement from '../models/Announcement.model';

// Create Timetable
exports.createTimetable = async (req, res) => {
  try {
    const { batch, department, semester, schedule, academicYear } = req.body;

    if (!batch || !department || !semester || !schedule) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if timetable already exists
    const existingTimetable = await Timetable.findOne({
      batch,
      semester,
      academicYear,
    });

    if (existingTimetable) {
      return res.status(400).json({ message: 'Timetable already exists for this batch and semester' });
    }

    const timetable = new Timetable({
      batch,
      department,
      semester,
      schedule,
      academicYear,
      createdBy: req.userId,
      isActive: true,
    });

    await timetable.save();

    res.status(201).json({
      message: 'Timetable created successfully',
      timetable,
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create timetable', error: error.message });
  }
};

// Update Timetable
exports.updateTimetable = async (req, res) => {
  try {
    const { id } = req.params;
    const { batch, department, semester, schedule, isActive } = req.body;

    const timetable = await Timetable.findByIdAndUpdate(
      id,
      { batch, department, semester, schedule, isActive },
      { new: true }
    );

    if (!timetable) {
      return res.status(404).json({ message: 'Timetable not found' });
    }

    res.status(200).json({
      message: 'Timetable updated successfully',
      timetable,
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update timetable', error: error.message });
  }
};

// Delete Timetable
exports.deleteTimetable = async (req, res) => {
  try {
    const { id } = req.params;

    const timetable = await Timetable.findByIdAndDelete(id);

    if (!timetable) {
      return res.status(404).json({ message: 'Timetable not found' });
    }

    res.status(200).json({
      message: 'Timetable deleted successfully',
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete timetable', error: error.message });
  }
};

// Get All Department Timetables
exports.getDepartmentTimetables = async (req, res) => {
  try {
    const hod = await User.findById(req.userId);

    const timetables = await Timetable.find({
      department: hod.department,
    }).populate('createdBy', 'firstName lastName');

    res.status(200).json({
      totalTimetables: timetables.length,
      timetables,
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch timetables', error: error.message });
  }
};

// Get Batch Overview
exports.getBatchOverview = async (req, res) => {
  try {
    const { batch } = req.query;

    if (!batch) {
      return res.status(400).json({ message: 'Batch is required' });
    }

    const students = await User.find({ role: 'student', batch });
    const studentIds = students.map(s => s._id);

    const attendanceRecords = await Attendance.find({ studentId: { $in: studentIds } });
    const results = await Result.find({ studentId: { $in: studentIds } });

    const studentDetails = await Promise.all(
      students.map(async (student) => {
        const studentAttendance = attendanceRecords.filter(a => a.studentId.toString() === student._id.toString());
        const studentResults = results.filter(r => r.studentId.toString() === student._id.toString());

        const attendancePercentage = studentAttendance.length
          ? (
              (studentAttendance.filter(a => a.status === 'present').length / studentAttendance.length) *
              100
            ).toFixed(2)
          : 0;

        const avgMarks = studentResults.length
          ? (studentResults.reduce((acc, r) => acc + r.totalMarks, 0) / studentResults.length).toFixed(2)
          : 0;

        return {
          id: student._id,
          firstName: student.firstName,
          lastName: student.lastName,
          email: student.email,
          enrollmentNumber: student.enrollmentNumber,
          attendance: {
            total: studentAttendance.length,
            percentage: attendancePercentage,
          },
          academics: {
            subjects: studentResults.length,
            avgMarks,
            passed: studentResults.filter(r => r.status === 'pass').length,
          },
        };
      })
    );

    res.status(200).json({
      batch,
      totalStudents: students.length,
      students: studentDetails,
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch batch overview', error: error.message });
  }
};

// Send Announcement to Batch
exports.sendBatchAnnouncement = async (req, res) => {
  try {
    const { title, content, batch, priority } = req.body;

    const hod = await User.findById(req.userId);

    const announcement = new Announcement({
      title,
      content,
      createdBy: req.userId,
      role: 'hod',
      batch,
      isGlobal: !batch,
      priority: priority || 'medium',
      targetRole: batch ? 'student' : 'all',
      publishedAt: new Date(),
    });

    await announcement.save();

    res.status(201).json({
      message: 'Announcement sent successfully',
      announcement,
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to send announcement', error: error.message });
  }
};

// Get Department Analytics
exports.getDepartmentAnalytics = async (req, res) => {
  try {
    const hod = await User.findById(req.userId);

    const students = await User.find({ role: 'student', department: hod.department });
    const teachers = await User.find({ role: 'teacher', department: hod.department });
    const studentIds = students.map(s => s._id);

    const attendanceRecords = await Attendance.find({ studentId: { $in: studentIds } });
    const results = await Result.find({ studentId: { $in: studentIds } });

    const totalAttendanceRecords = attendanceRecords.length;
    const avgAttendance = totalAttendanceRecords
      ? (
          (attendanceRecords.filter(a => a.status === 'present').length / totalAttendanceRecords) *
          100
        ).toFixed(2)
      : 0;

    const passedStudents = new Set();
    results.forEach(r => {
      if (r.status === 'pass') passedStudents.add(r.studentId.toString());
    });

    res.status(200).json({
      department: hod.department,
      totalStudents: students.length,
      totalTeachers: teachers.length,
      attendance: {
        totalRecords: totalAttendanceRecords,
        avgPercentage: avgAttendance,
      },
      academics: {
        totalResults: results.length,
        passedStudents: passedStudents.size,
        passPercentage: results.length ? ((passedStudents.size / students.length) * 100).toFixed(2) : 0,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch department analytics', error: error.message });
  }
};

// Get Dashboard Stats
exports.getDashboardStats = async (req, res) => {
  try {
    const hod = await User.findById(req.userId);

    const totalBatches = await User.distinct('batch', { role: 'student', department: hod.department });
    const totalStudents = await User.countDocuments({ role: 'student', department: hod.department });
    const totalTeachers = await User.countDocuments({ role: 'teacher', department: hod.department });
    const totalTimetables = await Timetable.countDocuments({ department: hod.department });

    res.status(200).json({
      stats: {
        totalBatches: totalBatches.length,
        totalStudents,
        totalTeachers,
        totalTimetables,
        department: hod.department,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch dashboard stats', error: error.message });
  }
};