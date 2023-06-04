const express = require('express');

const isAuthenticated = require('../middlewares/isAuth');
const {
  getAllCourses,
  addCourse,
  getCourse,
  updateCourse,
  deleteCourse,
} = require('../controllers/course');
const isInstructor = require('../middlewares/isInstructor');

const router = express.Router();

router.post('/', isAuthenticated, isInstructor, addCourse);
router.get('/', isAuthenticated, getAllCourses);
router.get('/:courseId', isAuthenticated, getCourse);
router.put('/:courseId', isAuthenticated, isInstructor, updateCourse);
router.delete('/:courseId', isAuthenticated, isInstructor, deleteCourse);

module.exports = router;
