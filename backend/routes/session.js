const express = require('express');

const isAuthenticated = require('../middlewares/isAuth');
const isInstructor = require('../middlewares/isInstructor');
const {
  createSesstion,
  getAllSessionsByCourseId,
  updateStudents,
  getSessionBySessionId,
} = require('../controllers/session');

const router = express.Router();

router.post('/', isAuthenticated, isInstructor, createSesstion);
router.put('/:sessionId', isAuthenticated, isInstructor, updateStudents);
router.get('/:sessionId', isAuthenticated, isInstructor, getSessionBySessionId);
router.get(
  '/all/:courseId',
  isAuthenticated,
  isInstructor,
  getAllSessionsByCourseId
);

module.exports = router;
