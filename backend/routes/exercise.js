const express = require('express');
const router = express.Router();
const { 
  getExercises, 
  getExercise, 
  createExercise,
  updateExercise,
  deleteExercise,
  searchExercises
} = require('../controllers/exerciseController');

const Exercise = require('../models/Exercise');
const { protect, authorize } = require('../middleware/auth');
const { advancedResults } = require('../middleware/validation');

// Search route
router.route('/search')
  .get(searchExercises);

// Public routes
router.route('/')
  .get(advancedResults(Exercise), getExercises);

router.route('/:id')
  .get(getExercise);

// Protected routes
router.use(protect);
router.use(authorize('admin'));

router.route('/')
  .post(createExercise);

router.route('/:id')
  .put(updateExercise)
  .delete(deleteExercise);

module.exports = router;