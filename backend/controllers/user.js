const asyncHandler = require('express-async-handler');
const User = require('../models/user');

const signup = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    res.status(400);
    throw new Error('User already exists');
  }

  const newUser = await User.create({ name, email, password });

  const token = newUser.generateToken();

  res.cookie('token', token, { httpOnly: true, maxAge: 3600 * 24 });
  res.status(201).json(newUser);
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    res.status(404);
    throw new Error('No user found. Please login');
  }

  const token = user.generateToken();

  res.cookie('token', token, { httpOnly: true, maxAge: 3600 * 24 });
  res.status(201).json(user);
});

module.exports = { signup, login };
