const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
    },
    content: {
      type: String,
      required: [true, 'Content is required'],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    role: {
      type: String,
      enum: ['teacher', 'hrteacher', 'hod'],
      required: true,
    },
    targetRole: {
      type: String,
      enum: ['student', 'teacher', 'all'],
      default: 'student',
    },
    batch: {
      type: String,
      default: null,
    },
    department: {
      type: String,
      default: null,
    },
    isGlobal: {
      type: Boolean,
      default: false,
    },
    attachments: {
      type: [String],
      default: [],
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high', 'urgent'],
      default: 'medium',
    },
    views: {
      type: Number,
      default: 0,
    },
    publishedAt: {
      type: Date,
      default: Date.now,
    },
    expiresAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

// Index for faster queries
announcementSchema.index({ createdBy: 1, publishedAt: -1 });
announcementSchema.index({ batch: 1, publishedAt: -1 });
announcementSchema.index({ isGlobal: 1, publishedAt: -1 });

module.exports = mongoose.model('Announcement', announcementSchema);