const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = require('../models/user');
const CustomError = require('../utils/CustomError');
const Course = require('../models/course');

const signup = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    return next(new CustomError('User already exist', 400));
  }

  const newUser = await User.create({ name, email, password });

  const token = newUser.generateToken();

  res.cookie('token', token, { httpOnly: true, maxAge: 3600 * 10000 });
  res.status(201).json(newUser);
});

const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    return next(new CustomError('No user found. Please login', 404));
  }

  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    return next(new CustomError('Invalid credentials', 400));
  }

  const token = user.generateToken();

  res.cookie('token', token, { httpOnly: true, maxAge: 3600 * 10000 });
  res.status(200).json(user);
});

const getCurrentUser = asyncHandler(async (req, res, next) => {
  const { email } = req.user;

  const user = await User.findOne({ email });

  if (!user) {
    return next(new CustomError('User Not Found', 404));
  }

  res.status(200).json(user);
});

const updateProfile = asyncHandler(async (req, res, next) => {
  const { name, email, phone, gender, dob } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return next(new CustomError('User Not Found', 404));
  }

  user.name = name;
  user.phone = phone;
  user.gender = gender;
  user.dob = dob;

  const updatedUser = await user.save();

  res.status(200).json(updatedUser);
});

const changePassword = asyncHandler(async (req, res, next) => {
  const { currentPassword, password } = req.body;

  const { email } = req.user;

  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    return next(new CustomError('User Not Found', 404));
  }

  const isPasswordCorrect = await user.comparePassword(currentPassword);

  if (!isPasswordCorrect) {
    return next(new CustomError('Current password is incorrect'));
  }

  user.password = password;

  await user.save();

  res.status(200).json({ message: 'New password updated' });
});

const getCurrentUserCourses = asyncHandler(async (req, res, next) => {
  const { _id: userId } = req.user;

  const userCourses = await Course.find({
    registeredUserIds: {
      $in: userId,
    },
  })
    .populate('instructor')
    .populate('category');

  res.status(200).json(userCourses);
});

module.exports = {
  signup,
  login,
  getCurrentUser,
  updateProfile,
  changePassword,
  getCurrentUserCourses,
};
