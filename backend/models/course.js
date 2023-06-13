const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
    },
    course_code: {
      type: String,
      required: [true, 'Course code is required'],
    },
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
    },
    desc: {
      type: String,
      required: [true, 'Description is required'],
    },
    start_date: {
      type: String,
      required: [true, 'Start date is required'],
    },
    day: {
      type: String,
      required: [true, 'Day is required'],
    },
    time: {
      type: String,
      required: [true, 'Time is required'],
    },
    period: {
      type: String,
      required: [true, 'Period is required'],
    },
    fee: {
      type: String,
      required: [true, 'Fee is required'],
    },
    total_student: {
      type: Number,
      required: [true, 'Total student is required'],
    },
    status: {
      type: String,
      required: [true, 'Course status is required'],
      enum: ['upcoming', 'active', 'expired'],
    },
    registeredUserIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    sessionIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Session' }],
  },
  { timestamps: true }
);

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
