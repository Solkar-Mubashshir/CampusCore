const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    semester: {
      type: Number,
      required: true,
    },
    internalMarks: {
      type: Number,
      default: 0,
      min: 0,
      max: 40,
    },
    externalMarks: {
      type: Number,
      default: 0,
      min: 0,
      max: 60,
    },
    totalMarks: {
      type: Number,
      default: 0,
    },
    percentage: {
      type: Number,
      default: 0,
    },
    grade: {
      type: String,
      enum: ['A+', 'A', 'B+', 'B', 'C', 'D', 'F'],
      default: 'F',
    },
    status: {
      type: String,
      enum: ['pass', 'fail'],
      default: 'fail',
    },
    publishedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

// Auto-calculate total marks and grade
resultSchema.pre('save', function (next) {
  this.totalMarks = this.internalMarks + this.externalMarks;
  this.percentage = (this.totalMarks / 100) * 100;

  if (this.percentage >= 90) this.grade = 'A+';
  else if (this.percentage >= 80) this.grade = 'A';
  else if (this.percentage >= 70) this.grade = 'B+';
  else if (this.percentage >= 60) this.grade = 'B';
  else if (this.percentage >= 50) this.grade = 'C';
  else if (this.percentage >= 40) this.grade = 'D';
  else this.grade = 'F';

  this.status = this.percentage >= 40 ? 'pass' : 'fail';
  next();
});

// Index for faster queries
resultSchema.index({ studentId: 1, semester: 1 });

module.exports = mongoose.model('Result', resultSchema);