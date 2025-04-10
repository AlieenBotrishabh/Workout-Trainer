// server/routes/workouts.js
const express = require('express');
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
const { advancedResults } = require('../middleware/validation');
const { protect, authorize } = require('../middleware/auth');
const { check } = require('express-validator');
const { validate } = require('../middleware/validation');

const router = express.Router({ mergeParams: true });

// Public routes
router.get('/public', getPublicWorkouts);

// Protected routes
router.use(protect);

router
  .route('/')
  .get(
    advancedResults(Workout, { 
      path: 'exercises.exercise',
      select: 'name description muscleGroups difficulty instructions'
    }),
    getWorkouts
  )
  .post(
    [
      check('title', 'Title is required').notEmpty(),
      check('description', 'Description is required').notEmpty(),
      check('exercises', 'Exercises must be an array').isArray().notEmpty(),
      check('exercises.*.exercise', 'Exercise ID is required for each exercise').notEmpty(),
      check('exercises.*.sets', 'Sets must be a number').isNumeric(),
      check('exercises.*.reps', 'Reps must be a number').isNumeric(),
      check('difficulty', 'Difficulty must be beginner, intermediate, or advanced')
        .isIn(['beginner', 'intermediate', 'advanced']),
      check('isPublic', 'isPublic must be a boolean').isBoolean()
    ],
    validate,
    createWorkout
  );

router
  .route('/:id')
  .get(getWorkout)
  .put(
    [
      check('title', 'Title cannot be empty if provided').optional().notEmpty(),
      check('description', 'Description cannot be empty if provided').optional().notEmpty(),
      check('exercises', 'Exercises must be an array if provided').optional().isArray(),
      check('exercises.*.exercise', 'Exercise ID is required for each exercise').optional().notEmpty(),
      check('exercises.*.sets', 'Sets must be a number').optional().isNumeric(),
      check('exercises.*.reps', 'Reps must be a number').optional().isNumeric(),
      check('difficulty', 'Difficulty must be beginner, intermediate, or advanced')
        .optional()
        .isIn(['beginner', 'intermediate', 'advanced']),
      check('isPublic', 'isPublic must be a boolean').optional().isBoolean()
    ],
    validate,
    updateWorkout
  )
  .delete(deleteWorkout);

router.post('/:id/complete', 
  [
    check('duration', 'Duration in minutes is required').isNumeric(),
    check('completedExercises', 'Completed exercises must be an array').isArray(),
    check('completedExercises.*.exercise', 'Exercise ID is required').notEmpty(),
    check('completedExercises.*.setsDone', 'Sets done must be a number').isNumeric(),
    check('completedExercises.*.repsDone', 'Reps done must be a number').isNumeric(),
    check('notes', 'Notes must be a string if provided').optional().isString()
  ],
  validate,
  completeWorkout
);

module.exports = router;