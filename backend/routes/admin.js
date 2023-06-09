const express = require('express');
const isAuthenticated = require('../middlewares/isAuth');
const isAdmin = require('../middlewares/isAdmin');

const { getAllUsers } = require('../controllers/admin');

const router = express.Router();

router.get('/all-users', isAuthenticated, isAdmin, getAllUsers);

module.exports = router;
