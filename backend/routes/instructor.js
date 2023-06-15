const express = require('express');

const isAuthenticated = require('../middlewares/isAuth');
const isInstructor = require('../middlewares/isInstructor');
const { getInstructorAllStudents } = require('../controllers/instructor');

const router = express.Router();

router.get(
  '/students',
  isAuthenticated,
  isInstructor,
  getInstructorAllStudents
);

module.exports = router;
