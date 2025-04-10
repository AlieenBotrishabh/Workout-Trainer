const Exercise = require('../models/Exercise');
const asyncHandler = require('express-async-handler');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Get all exercises
// @route   GET /api/exercises
// @access  Public
exports.getExercises = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc    Get single exercise
// @route   GET /api/exercises/:id
// @access  Public
exports.getExercise = asyncHandler(async (req, res, next) => {
  const exercise = await Exercise.findById(req.params.id);

  if (!exercise) {
    return next(new ErrorResponse(`Exercise not found with id of ${req.params.id}`, 404));
  }

  res.status(200).json({
    success: true,
    data: exercise
  });
});

// @desc    Create new exercise
// @route   POST /api/exercises
// @access  Private/Admin
exports.createExercise = asyncHandler(async (req, res, next) => {
  // Add createdBy field
  req.body.createdBy = req.user.id;

  const exercise = await Exercise.create(req.body);

  res.status(201).json({
    success: true,
    data: exercise
  });
});

// @desc    Update exercise
// @route   PUT /api/exercises/:id
// @access  Private/Admin
exports.updateExercise = asyncHandler(async (req, res, next) => {
  let exercise = await Exercise.findById(req.params.id);

  if (!exercise) {
    return next(new ErrorResponse(`Exercise not found with id of ${req.params.id}`, 404));
  }

  exercise = await Exercise.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: exercise
  });
});

// @desc    Delete exercise
// @route   DELETE /api/exercises/:id
// @access  Private/Admin
exports.deleteExercise = asyncHandler(async (req, res, next) => {
  const exercise = await Exercise.findById(req.params.id);

  if (!exercise) {
    return next(new ErrorResponse(`Exercise not found with id of ${req.params.id}`, 404));
  }

  await exercise.remove();

  res.status(200).json({
    success: true,
    data: {}
  });
});

// @desc    Search exercises
// @route   GET /api/exercises/search
// @access  Public
exports.searchExercises = asyncHandler(async (req, res, next) => {
  const { term, muscleGroups, difficulty } = req.query;
  
  const query = {};
  
  // Search term
  if (term) {
    query.$text = { $search: term };
  }
  
  // Filter by muscle groups
  if (muscleGroups) {
    query.muscleGroups = { $in: muscleGroups.split(',') };
  }
  
  // Filter by difficulty
  if (difficulty) {
    query.difficulty = difficulty;
  }

  const exercises = await Exercise.find(query);

  res.status(200).json({
    success: true,
    count: exercises.length,
    data: exercises
  });
});