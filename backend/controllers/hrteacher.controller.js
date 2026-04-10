import Attendance from '../models/Attendance.model';
import Result from '../models/Result.model';
import User from '../models/User.model';
import Announcement from '../models/Announcement.model';

// Get Student Attendance Summary
exports.getStudentAttendanceSummary = async (req, res) => {
  try {
    const { studentId, startDate, endDate } = req.query;

    const query = {};
    if (studentId) query.studentId = studentId;
    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate);
      if (endDate) query.date.$lte = new Date(endDate);
    }

    const records = await Attendance.find(query)
      .populate('studentId', 'firstName lastName enrollmentNumber batch')
      .populate('teacherId', 'firstName lastName');

    const summary = {};
    records.forEach(record => {
      const id = record.studentId._id.toString();
      if (!summary[id]) {
        summary[id] = {
          student: record.studentId,
          total: 0,
          present: 0,
          absent: 0,
          late: 0,
          percentage: 0,
        };
      }
      summary[id].total++;
      summary[id][record.status]++;
    });

    // Calculate percentage
    Object.values(summary).forEach(s => {
      s.percentage = s.total ? ((s.present / s.total) * 100).toFixed(2) : 0;
    });

    res.status(200).json({
      summary: Object.values(summary),
      totalRecords: records.length,
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch attendance summary', error: error.message });
  }
};

// Get Performance Report
exports.getPerformanceReport = async (req, res) => {
  try {
    const { studentId, semester } = req.query;

    const query = { studentId };
    if (semester) query.semester = parseInt(semester);

    const results = await Result.find(query)
      .populate('studentId', 'firstName lastName enrollmentNumber batch');

    if (results.length === 0) {
      return res.status(404).json({ message: 'No results found' });
    }

    const student = results[0].studentId;
    const totalSubjects = results.length;
    const passedSubjects = results.filter(r => r.status === 'pass').length;
    const failedSubjects = results.filter(r => r.status === 'fail').length;
    const avgPercentage = (
      results.reduce((acc, r) => acc + r.percentage, 0) / totalSubjects
    ).toFixed(2);
    const avgGPA = (avgPercentage / 100) * 4;

    const subjectPerformance = results.map(r => ({
      subject: r.subject,
      internalMarks: r.internalMarks,
      externalMarks: r.externalMarks,
      totalMarks: r.totalMarks,
      percentage: r.percentage,
      grade: r.grade,
      status: r.status,
    }));

    res.status(200).json({
      student,
      totalSubjects,
      passedSubjects,
      failedSubjects,
      avgPercentage,
      avgGPA: avgGPA.toFixed(2),
      subjectPerformance,
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch performance report', error: error.message });
  }
};

// Get All Students Overview
exports.getAllStudentsOverview = async (req, res) => {
  try {
    const { batch, department } = req.query;

    const query = { role: 'student' };
    if (batch) query.batch = batch;
    if (department) query.department = department;

    const students = await User.find(query);

    const studentOverviews = await Promise.all(
      students.map(async (student) => {
        const attendanceRecords = await Attendance.find({ studentId: student._id });
        const results = await Result.find({ studentId: student._id });

        const totalClasses = attendanceRecords.length;
        const presentCount = attendanceRecords.filter(a => a.status === 'present').length;
        const attendancePercentage = totalClasses ? ((presentCount / totalClasses) * 100).toFixed(2) : 0;

        const avgPercentage = results.length
          ? (results.reduce((acc, r) => acc + r.percentage, 0) / results.length).toFixed(2)
          : 0;

        return {
          student: {
            id: student._id,
            firstName: student.firstName,
            lastName: student.lastName,
            email: student.email,
            enrollmentNumber: student.enrollmentNumber,
            batch: student.batch,
          },
          attendance: {
            total: totalClasses,
            present: presentCount,
            percentage: attendancePercentage,
          },
          academics: {
            totalSubjects: results.length,
            avgPercentage,
            passedCount: results.filter(r => r.status === 'pass').length,
          },
        };
      })
    );

    res.status(200).json({
      totalStudents: students.length,
      students: studentOverviews,
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch students overview', error: error.message });
  }
};

// Get Batch Analytics
exports.getBatchAnalytics = async (req, res) => {
  try {
    const { batch } = req.query;

    const students = await User.find({ role: 'student', batch });
    const studentIds = students.map(s => s._id);

    const attendanceRecords = await Attendance.find({ studentId: { $in: studentIds } });
    const results = await Result.find({ studentId: { $in: studentIds } });

    const totalAttendanceRecords = attendanceRecords.length;
    const presentCount = attendanceRecords.filter(a => a.status === 'present').length;
    const absentCount = attendanceRecords.filter(a => a.status === 'absent').length;
    const lateCount = attendanceRecords.filter(a => a.status === 'late').length;

    const avgAttendance = totalAttendanceRecords
      ? ((presentCount / totalAttendanceRecords) * 100).toFixed(2)
      : 0;

    const passedStudents = new Set();
    const failedStudents = new Set();
    results.forEach(r => {
      if (r.status === 'pass') passedStudents.add(r.studentId.toString());
      else failedStudents.add(r.studentId.toString());
    });

    res.status(200).json({
      batch,
      totalStudents: students.length,
      attendance: {
        total: totalAttendanceRecords,
        present: presentCount,
        absent: absentCount,
        late: lateCount,
        avgPercentage: avgAttendance,
      },
      academics: {
        totalResults: results.length,
        passedStudents: passedStudents.size,
        failedStudents: failedStudents.size,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch batch analytics', error: error.message });
  }
};

// Get All Teacher Timetables
exports.getAllTeacherTimetables = async (req, res) => {
  try {
    const Timetable = require('../models/Timetable.model');

    const timetables = await Timetable.find({ isActive: true })
      .populate('schedule.sessions.teacherId', 'firstName lastName')
      .populate('createdBy', 'firstName lastName');

    res.status(200).json({
      totalTimetables: timetables.length,
      timetables,
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch timetables', error: error.message });
  }
};

// Get Dashboard Stats
exports.getDashboardStats = async (req, res) => {
  try {
    const totalStudents = await User.countDocuments({ role: 'student' });
    const totalTeachers = await User.countDocuments({ role: 'teacher' });
    const totalAttendanceRecords = await Attendance.countDocuments();
    const totalResults = await Result.countDocuments();
    const totalAnnouncements = await Announcement.countDocuments();

    res.status(200).json({
      stats: {
        totalStudents,
        totalTeachers,
        totalAttendanceRecords,
        totalResults,
        totalAnnouncements,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch dashboard stats', error: error.message });
  }
};