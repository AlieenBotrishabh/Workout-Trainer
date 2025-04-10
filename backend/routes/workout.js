const express = require('express');
const router = express.Router();
const { 
  getWorkouts, 
  getWorkout, 
  createWorkout,
  updateWorkout,
  deleteWorkout,
  completeWorkout,
  getPublicWorkouts
} = require('../controllers/workoutController');

const Workout = require('../models/Workout');
const { protect, authorize } = require('../middleware/auth');
const { advancedResults } = require('../middleware/validation');

// Public routes
router.route('/public')
  .get(getPublicWorkouts);

// Protected routes
router.use(protect);

router.route('/')
  .get(advancedResults(
    Workout,
    { path: 'exercises.exercise', select: 'name muscleGroups difficulty' }
  ), getWorkouts)
  .post(createWorkout);

router.route('/:id')
  .get(getWorkout)
  .put(updateWorkout)
  .delete(deleteWorkout);

router.route('/:id/complete')
  .post(completeWorkout);

// Get workouts by user ID
router.route('/user/:userId')
  .get(getWorkouts);

module.exports = router;