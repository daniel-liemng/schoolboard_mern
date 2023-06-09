const asyncHandler = require('express-async-handler');
const User = require('../models/user');

const getAllUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json(users);
});

module.exports = { getAllUsers };
