const asyncHandler = require('express-async-handler');
const Session = require('../models/session');
const CustomError = require('../utils/CustomError');
const Course = require('../models/course');

const createSesstion = asyncHandler(async (req, res, next) => {
  const { date, courseId } = req.body;

  if (!date || !courseId) {
    return next(new CustomError('Please provide date and courseID', 400));
  }

  const session = await Session.create({ date, courseId });

  // Meantime, add sessionId to Course
  const course = await Course.findById(courseId);
  course.sessionIds.push(session._id);
  await course.save();

  res.status(201).json(session);
});

const getAllSessionsByCourseId = asyncHandler(async (req, res, next) => {
  const { courseId } = req.params;

  const sessions = await Session.find({ courseId }).populate('courseId');

  res.status(200).json(sessions);
});

module.exports = { createSesstion, getAllSessionsByCourseId };
