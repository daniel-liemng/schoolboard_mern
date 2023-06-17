const express = require('express');

const isAuthenticated = require('../middlewares/isAuth');
const {
  addCategory,
  getAllCategories,
  getCategory,
  updateCategory,
  deleteCategory,
} = require('../controllers/category');
const isInstructor = require('../middlewares/isInstructor');

const router = express.Router();

router.post('/', isAuthenticated, isInstructor, addCategory);
router.get('/', getAllCategories);
router.get('/:catId', getCategory);
router.put('/:catId', isAuthenticated, isInstructor, updateCategory);
router.delete('/:catId', isAuthenticated, isInstructor, deleteCategory);

module.exports = router;
