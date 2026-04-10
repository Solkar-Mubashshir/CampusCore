const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema(
  {
    fileName: {
      type: String,
      required: [true, 'File name is required'],
    },
    fileUrl: {
      type: String,
      required: [true, 'File URL is required'],
    },
    fileType: {
      type: String,
      enum: ['pdf', 'doc', 'docx', 'ppt', 'pptx', 'xls', 'xlsx', 'image', 'video', 'other'],
      default: 'other',
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    uploadedByRole: {
      type: String,
      enum: ['teacher', 'student'],
      required: true,
    },
    folderPath: {
      type: String,
      required: true,
    },
    relatedTo: {
      type: String,
      enum: ['notes', 'assignment', 'resource', 'other'],
      default: 'other',
    },
    subject: {
      type: String,
      default: null,
    },
    batch: {
      type: String,
      default: null,
    },
    recipients: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'User',
      default: [],
    },
    fileSize: {
      type: Number,
      default: 0,
    },
    downloads: {
      type: Number,
      default: 0,
    },
    isShared: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Index for faster queries
fileSchema.index({ uploadedBy: 1, createdAt: -1 });
fileSchema.index({ folderPath: 1 });
fileSchema.index({ batch: 1, subject: 1 });

module.exports = mongoose.model('File', fileSchema);