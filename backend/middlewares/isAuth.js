const jwt = require('jsonwebtoken');

const CustomError = require('../utils/CustomError');
const User = require('../models/user');

const isAuthenticated = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new CustomError('No token. Please login', 401));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  if (!decoded) {
    return next(new CustomError('Invalid token. Please login', 401));
  }

  req.user = await User.findById(decoded.id).select('-password');
  next();
};

module.exports = isAuthenticated;
