const express = require('express');

const isAuthenticated = require('../middlewares/isAuth');
const isInstructor = require('../middlewares/isInstructor');
const {
  createSesstion,
  getAllSessionsByCourseId,
  updateStudents,
} = require('../controllers/session');

const router = express.Router();

router.post('/', isAuthenticated, isInstructor, createSesstion);
router.get(
  '/:courseId',
  isAuthenticated,
  isInstructor,
  getAllSessionsByCourseId
);

router.put('/:sessionId', isAuthenticated, isInstructor, updateStudents);

module.exports = router;
