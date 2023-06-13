const asyncHandler = require('express-async-handler');
const User = require('../models/user');
const Course = require('../models/course');

const getAllUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json(users);
});

const getAllCourses = asyncHandler(async (req, res, next) => {
  const allCourses = await Course.find()
    .populate('instructor', ['name', 'email', 'phone'])
    .populate('category', 'title');

  res.status(200).json(allCourses);
});

module.exports = { getAllUsers, getAllCourses };
