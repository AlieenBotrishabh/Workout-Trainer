// server/controllers/authController.js
const User = require('../models/User');
const asyncHandler = require('express-async-handler');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  // Create user
  const user = await User.create({
    name,
    email,
    password,
    role: role || 'user'
  });

  sendTokenResponse(user, 201, res);
});

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // Validate email & password
  if (!email || !password) {
    return next(new ErrorResponse('Please provide an email and password', 400));
  }

  // Check for user
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  // Check if password matches
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  sendTokenResponse(user, 200, res);
});

// @desc    Log user out / clear cookie
// @route   GET /api/auth/logout
// @access  Private
exports.logout = asyncHandler(async (req, res, next) => {
  res.status(200).json({
    success: true,
    data: {}
  });
});

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
exports.getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    data: user
  });
});

// Helper function to get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  // Create token
  const token = user.getSignedJwtToken();

  res.status(statusCode).json({
    success: true,
    token
  });
};

// server/controllers/userController.js
const User = require('../models/User');
const asyncHandler = require('express-async-handler');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
exports.getUsers = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc    Get single user
// @route   GET /api/users/:id
// @access  Private/Admin
exports.getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new ErrorResponse(`User not found with id of ${req.params.id}`, 404));
  }

  res.status(200).json({
    success: true,
    data: user
  });
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
exports.updateProfile = asyncHandler(async (req, res, next) => {
  const fieldsToUpdate = {
    name: req.body.name,
    height: req.body.height,
    weight: req.body.weight,
    fitnessGoals: req.body.fitnessGoals,
    workoutPreferences: req.body.workoutPreferences
  };

  // Remove undefined fields
  Object.keys(fieldsToUpdate).forEach(key => 
    fieldsToUpdate[key] === undefined && delete fieldsToUpdate[key]
  );

  const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: user
  });
});

// @desc    Change password
// @route   PUT /api/users/changepassword
// @access  Private
exports.changePassword = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).select('+password');

  // Check current password
  if (!(await user.matchPassword(req.body.currentPassword))) {
    return next(new ErrorResponse('Password is incorrect', 401));
  }

  user.password = req.body.newPassword;
  await user.save();

  res.status(200).json({
    success: true,
    message: 'Password updated successfully'
  });
});

// server/controllers/exerciseController.js
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

// server/controllers/workoutController.js
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