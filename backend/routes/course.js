const express = require('express');

const isAuthenticated = require('../middlewares/isAuth');
const {
  getAllCourses,
  addCourse,
  getCourse,
  updateCourse,
  deleteCourse,
  registerCourse,
  getUserCourses,
} = require('../controllers/course');
const isInstructor = require('../middlewares/isInstructor');

const router = express.Router();

router.post('/', isAuthenticated, isInstructor, addCourse);
router.get('/', getAllCourses);
router.patch('/register-course', isAuthenticated, registerCourse);
router.get('/:courseId', getCourse);
router.put('/:courseId', isAuthenticated, isInstructor, updateCourse);
router.delete('/:courseId', isAuthenticated, isInstructor, deleteCourse);

// router.get('/user/courses', isAuthenticated, getCurrentUserCourses);

module.exports = router;
