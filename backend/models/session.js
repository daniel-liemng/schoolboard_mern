const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema(
  {
    date: {
      type: String,
      required: [true, 'Date is required'],
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
    },
    attendedStudentIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true }
);

const Session = mongoose.model('Session', sessionSchema);

module.exports = Session;
