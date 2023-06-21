const asyncHandler = require('express-async-handler');
const User = require('../models/user');
const Course = require('../models/course');
const Session = require('../models/session');

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

const resetPassword = asyncHandler(async (req, res, next) => {
  const { userId } = req.body;

  const user = await User.findById(userId);
  user.password = 'reset123';
  await user.save();

  res.status(200).json({ message: 'Password reset successfully' });
});

// delete in cascade --> User, course, session
const deleteUser = asyncHandler(async (req, res, next) => {
  const { userId } = req.params;

  // delete in course -> registeredUserIds
  const updatedCourses = await Course.updateMany(
    {},
    { $pull: { registeredUserIds: { $in: userId } } },
    { new: true }
  );

  // delete in session -> attendedStudentIds
  const updatedSessions = await Session.updateMany(
    {},
    { $pull: { attendedStudentIds: { $in: userId } } },
    { new: true }
  );

  await User.findByIdAndDelete(userId);

  res.status(200).json({ message: 'Deleted User and all related data' });
});

const changeUserRole = asyncHandler(async (req, res, next) => {
  const { role, userId } = req.body;

  const updatedUser = await User.findByIdAndUpdate(
    { _id: userId },
    { role },
    { new: true }
  );

  res.status(200).json(updatedUser);
});

module.exports = {
  getAllUsers,
  getAllCourses,
  resetPassword,
  deleteUser,
  changeUserRole,
};
