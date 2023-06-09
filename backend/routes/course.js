const express = require('express');

const isAuthenticated = require('../middlewares/isAuth');
const {
  getAllCourses,
  addCourse,
  getCourse,
  updateCourse,
  deleteCourse,
  registerCourse,
  getInstructorCourses,
} = require('../controllers/course');
const isInstructor = require('../middlewares/isInstructor');

const router = express.Router();

router.post('/', isAuthenticated, isInstructor, addCourse);
router.get('/', getAllCourses);
router.get(
  '/instructor-courses',
  isAuthenticated,
  isInstructor,
  getInstructorCourses
);
router.patch('/register-course', isAuthenticated, registerCourse);
router.get('/:courseId', getCourse);
router.put('/:courseId', isAuthenticated, isInstructor, updateCourse);
router.delete('/:courseId', isAuthenticated, isInstructor, deleteCourse);

module.exports = router;
