const asyncHandler = require('express-async-handler');
const Category = require('../models/category');
const CustomError = require('../utils/CustomError');

const addCategory = asyncHandler(async (req, res, next) => {
  const { title } = req.body;

  const category = await Category.create({ title });

  res.status(201).json(category);
});

const getAllCategories = asyncHandler(async (req, res, next) => {
  const allCategories = await Category.find();

  res.status(200).json(allCategories);
});

const getCategory = asyncHandler(async (req, res, next) => {
  const { catId } = req.params;

  const category = await Category.findById(catId);

  res.status(200).json(category);
});

const updateCategory = asyncHandler(async (req, res, next) => {
  const { catId } = req.params;
  const { title } = req.body;

  const category = await Category.findByIdAndUpdate(
    catId,
    { title },
    { new: true }
  );

  res.status(200).json(category);
});

const deleteCategory = asyncHandler(async (req, res, next) => {
  const { catId } = req.params;

  await Category.findByIdAndDelete(catId);

  res.status(200).json({ message: 'Category Deleted' });
});

module.exports = {
  addCategory,
  getAllCategories,
  getCategory,
  updateCategory,
  deleteCategory,
};
