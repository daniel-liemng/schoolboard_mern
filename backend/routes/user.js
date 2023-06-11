const express = require('express');
const {
  signup,
  login,
  logout,
  getCurrentUser,
  updateProfile,
  changePassword,
  getCurrentUserCourses,
} = require('../controllers/user');
const isAuthenticated = require('../middlewares/isAuth');
const isInstructor = require('../middlewares/isInstructor');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);

router.get('/get-current-user', isAuthenticated, getCurrentUser);

router.put('/update-profile', isAuthenticated, updateProfile);
router.patch('/change-password', isAuthenticated, changePassword);

router.get('/courses', isAuthenticated, getCurrentUserCourses);

module.exports = router;
