const mongoose = require('mongoose');

const timetableSchema = new mongoose.Schema(
  {
    batch: {
      type: String,
      required: [true, 'Batch is required'],
    },
    department: {
      type: String,
      required: [true, 'Department is required'],
    },
    semester: {
      type: Number,
      required: [true, 'Semester is required'],
    },
    schedule: [
      {
        day: {
          type: String,
          enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
          required: true,
        },
        sessions: [
          {
            sessionNumber: Number,
            startTime: String, // Format: HH:MM
            endTime: String, // Format: HH:MM
            subject: String,
            teacherId: {
              type: mongoose.Schema.Types.ObjectId,
              ref: 'User',
            },
            classroom: String,
          },
        ],
      },
    ],
    academicYear: {
      type: String,
      required: true, // e.g., "2025-26"
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

// Index for faster queries
timetableSchema.index({ batch: 1, semester: 1 });
timetableSchema.index({ department: 1 });

module.exports = mongoose.model('Timetable', timetableSchema);