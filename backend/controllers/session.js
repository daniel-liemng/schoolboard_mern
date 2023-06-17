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

  const sessions = await Session.find({ courseId })
    .populate('courseId')
    .populate('attendedStudentIds');

  res.status(200).json(sessions);
});

const getSessionBySessionId = asyncHandler(async (req, res, next) => {
  const { sessionId } = req.params;

  const session = await Session.findById(sessionId).populate(
    'attendedStudentIds'
  );

  res.status(200).json(session);
});

const updateStudents = asyncHandler(async (req, res, next) => {
  const { sessionId } = req.params;
  const { studentIds } = req.body;

  const session = await Session.findOne({ _id: sessionId });

  session.attendedStudentIds = studentIds;

  const updatedSession = await session.save();

  res.status(200).json(updatedSession);
});

const deleteSession = asyncHandler(async (req, res, next) => {
  const { sessionId } = req.params;

  // Meantime, delete it in sessionIds of Course
  const session = await Session.findById(sessionId);
  const course = await Course.findById(session.courseId);
  const newSessionIds = course.sessionIds.filter(
    (sessId) => sessId.toString() !== sessionId
  );
  course.sessionIds = newSessionIds;
  await course.save();

  await Session.findByIdAndDelete(sessionId);

  res.status(200).json({ message: 'Session Deleted' });
});

module.exports = {
  createSesstion,
  getAllSessionsByCourseId,
  updateStudents,
  getSessionBySessionId,
  deleteSession,
};
