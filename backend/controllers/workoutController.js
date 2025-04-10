const Workout = require('../models/Workout');
const asyncHandler = require('express-async-handler');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Get all workouts
// @route   GET /api/workouts
// @access  Private
exports.getWorkouts = asyncHandler(async (req, res, next) => {
  if (req.params.userId) {
    const workouts = await Workout.find({ user: req.params.userId });
    
    return res.status(200).json({
      success: true,
      count: workouts.length,
      data: workouts
    });
  } else {
    res.status(200).json(res.advancedResults);
  }
});

// @desc    Get single workout
// @route   GET /api/workouts/:id
// @access  Private
exports.getWorkout = asyncHandler(async (req, res, next) => {
  const workout = await Workout.findById(req.params.id).populate({
    path: 'exercises.exercise',
    select: 'name description muscleGroups difficulty instructions imageUrl'
  });

  if (!workout) {
    return next(new ErrorResponse(`Workout not found with id of ${req.params.id}`, 404));
  }

  // Make sure user owns the workout or workout is public
  if (!workout.isPublic && workout.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(new ErrorResponse(`Not authorized to access this workout`, 401));
  }

  res.status(200).json({
    success: true,
    data: workout
  });
});

// @desc    Create new workout
// @route   POST /api/workouts
// @access  Private
exports.createWorkout = asyncHandler(async (req, res, next) => {
  // Add user to req.body
  req.body.user = req.user.id;

  const workout = await Workout.create(req.body);

  res.status(201).json({
    success: true,
    data: workout
  });
});

// @desc    Update workout
// @route   PUT /api/workouts/:id
// @access  Private
exports.updateWorkout = asyncHandler(async (req, res, next) => {
  let workout = await Workout.findById(req.params.id);

  if (!workout) {
    return next(new ErrorResponse(`Workout not found with id of ${req.params.id}`, 404));
  }

  // Make sure user owns the workout
  if (workout.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(new ErrorResponse(`Not authorized to update this workout`, 401));
  }

  workout = await Workout.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: workout
  });
});

// @desc    Delete workout
// @route   DELETE /api/workouts/:id
// @access  Private
exports.deleteWorkout = asyncHandler(async (req, res, next) => {
  const workout = await Workout.findById(req.params.id);

  if (!workout) {
    return next(new ErrorResponse(`Workout not found with id of ${req.params.id}`, 404));
  }

  // Make sure user owns the workout
  if (workout.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(new ErrorResponse(`Not authorized to delete this workout`, 401));
  }

  await workout.remove();

  res.status(200).json({
    success: true,
    data: {}
  });
});

// @desc    Add workout completion
// @route   POST /api/workouts/:id/complete
// @access  Private
exports.completeWorkout = asyncHandler(async (req, res, next) => {
  const { duration, feedback, rating } = req.body;
  
  const workout = await Workout.findById(req.params.id);

  if (!workout) {
    return next(new ErrorResponse(`Workout not found with id of ${req.params.id}`, 404));
  }

  // Make sure user owns the workout
  if (workout.user.toString() !== req.user.id) {
    return next(new ErrorResponse(`Not authorized to complete this workout`, 401));
  }

  workout.completions.unshift({
    date: Date.now(),
    duration,
    feedback,
    rating
  });

  await workout.save();

  res.status(200).json({
    success: true,
    data: workout
  });
});

// @desc    Get public workouts
// @route   GET /api/workouts/public
// @access  Public
exports.getPublicWorkouts = asyncHandler(async (req, res, next) => {
  const workouts = await Workout.find({ isPublic: true })
    .populate({
      path: 'user',
      select: 'name'
    })
    .populate({
      path: 'exercises.exercise',
      select: 'name muscleGroups difficulty'
    });

  res.status(200).json({
    success: true,
    count: workouts.length,
    data: workouts
  });
});