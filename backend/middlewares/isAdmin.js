const User = require('../models/user');
const CustomError = require('../utils/CustomError');

const isAdmin = async (req, res, next) => {
  const { email } = req.user;

  const user = await User.findOne({ email });

  if (user.role !== 'admin') {
    return next(new CustomError('Not an Admin. Unauthorized', 401));
  }
  next();
};

module.exports = isAdmin;
