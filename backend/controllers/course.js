const asyncHandler = require('express-async-handler');
const Course = require('../models/course');

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

module.exports = {
  addCourse,
  getAllCourses,
  getCourse,
  updateCourse,
  deleteCourse,
};
