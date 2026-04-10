const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    teacherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ['present', 'absent', 'late'],
      default: 'absent',
    },
    timestamp: {
      type: Date,
      default: Date.now,
      // Locked timestamp - prevents backdating
      immutable: true,
    },
    subject: {
      type: String,
      required: true,
    },
    batch: {
      type: String,
      required: true,
    },
    syncedFromOffline: {
      type: Boolean,
      default: false,
    },
    remarks: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

// Index for faster queries
attendanceSchema.index({ studentId: 1, date: 1 });
attendanceSchema.index({ teacherId: 1, date: 1 });
attendanceSchema.index({ batch: 1, date: 1 });

module.exports = mongoose.model('Attendance', attendanceSchema);