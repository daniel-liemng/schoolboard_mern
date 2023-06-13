const User = require('../models/user');
const CustomError = require('../utils/CustomError');

const isInstructor = async (req, res, next) => {
  const { email } = req.user;

  const user = await User.findOne({ email });

  if (user.role !== 'instructor' || user.role !== 'admin') {
    return next(
      new CustomError('Not an instructor or admin. Unauthorized', 401)
    );
  }
  next();
};

module.exports = isInstructor;
