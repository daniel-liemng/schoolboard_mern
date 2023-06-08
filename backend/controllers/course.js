const asyncHandler = require('express-async-handler');
const Course = require('../models/course');
const CustomError = require('../utils/CustomError');
const User = require('../models/user');
const { default: mongoose } = require('mongoose');

const addCourse = asyncHandler(async (req, res, next) => {
  const course = await Course.create(req.body);

  res.status(201).json(course);
});

const getAllCourses = asyncHandler(async (req, res, next) => {
  const allCourses = await Course.find()
    .populate('instructor', ['name', 'email', 'phone'])
    .populate('category', 'title');

  res.status(200).json(allCourses);
});

const getCourse = asyncHandler(async (req, res, next) => {
  const { courseId } = req.params;

  const course = await Course.findById(courseId)
    .populate('instructor', ['name', 'email', 'phone'])
    .populate('category', 'title');

  res.status(200).json(course);
});

const updateCourse = asyncHandler(async (req, res, next) => {
  const { courseId } = req.params;

  const course = await Course.findByIdAndUpdate(courseId, req.body, {
    new: true,
  });

  res.status(200).json(course);
});

const deleteCourse = asyncHandler(async (req, res, next) => {
  const { courseId } = req.params;

  await Course.findByIdAndDelete(courseId);

  res.status(200).json({ message: 'Course Deleted' });
});

const registerCourse = asyncHandler(async (req, res, next) => {
  const { _id: userId } = req.user;
  const { courseId } = req.body;

  const course = await Course.findById(courseId);
  const user = await User.findById(userId);

  if (!course) {
    return next(new CustomError('Course Not Found', 404));
  }

  const checkRegistered = course.registeredUserIds.includes(userId);

  if (checkRegistered) {
    return next(new CustomError('You registered this course already', 400));
  }

  course.registeredUserIds.push(userId.toString());
  user.registeredCourseIds.push(courseId);

  const updatedCourses = await course.save();
  await user.save();

  res.status(200).json(updatedCourses);
});

// const getUserCourses = asyncHandler(async (req, res, next) => {
//   const { _id: userId } = req.user;

//   const userCourses = await Course.find({
//     registeredUserIds: {
//       $in: userId,
//     },
//   })
//     .populate('instructor')
//     .populate('category');

//   res.status(200).json(userCourses);
// });

module.exports = {
  addCourse,
  getAllCourses,
  getCourse,
  updateCourse,
  deleteCourse,
  registerCourse,
};
