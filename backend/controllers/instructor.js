const asyncHandler = require('express-async-handler');
const User = require('../models/user');
const Course = require('../models/course');

const getInstructorAllStudents = asyncHandler(async (req, res, next) => {
  const { id: instructorId } = req.user;

  const courses = await Course.find({ instructor: instructorId });

  let tempStudentIds = [];

  courses.map((course) => tempStudentIds.push(...course.registeredUserIds));

  tempStudentIds = tempStudentIds.map((stuId) => stuId.toString());

  const uniqueStudentIds = [...new Set(tempStudentIds)];

  // deep populate --> get all students of an instructor, then know all courses the student registered and instructor's name
  const studentList = await User.find({
    _id: { $in: uniqueStudentIds },
  }).populate({
    path: 'registeredCourseIds',
    populate: {
      path: 'instructor',
    },
  });

  res.status(200).json(studentList);
});

module.exports = { getInstructorAllStudents };
