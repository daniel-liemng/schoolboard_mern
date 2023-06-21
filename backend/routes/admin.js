const express = require('express');
const isAuthenticated = require('../middlewares/isAuth');
const isAdmin = require('../middlewares/isAdmin');

const {
  getAllUsers,
  getAllCourses,
  resetPassword,
  deleteUser,
  changeUserRole,
  updateUserProfile,
} = require('../controllers/admin');

const router = express.Router();

router.get('/all-users', isAuthenticated, isAdmin, getAllUsers);
router.get('/all-courses', isAuthenticated, isAdmin, getAllCourses);

router.put('/update-user-profile', isAuthenticated, isAdmin, updateUserProfile);
router.post('/reset-password', isAuthenticated, isAdmin, resetPassword);
router.put('/change-role', isAuthenticated, isAdmin, changeUserRole);

router.delete('/users/:userId', isAuthenticated, isAdmin, deleteUser);
module.exports = router;
