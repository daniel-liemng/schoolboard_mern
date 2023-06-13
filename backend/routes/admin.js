const express = require('express');
const isAuthenticated = require('../middlewares/isAuth');
const isAdmin = require('../middlewares/isAdmin');

const { getAllUsers, getAllCourses } = require('../controllers/admin');

const router = express.Router();

router.get('/all-users', isAuthenticated, isAdmin, getAllUsers);
router.get('/all-courses', isAuthenticated, isAdmin, getAllCourses);

module.exports = router;
