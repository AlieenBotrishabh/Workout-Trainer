const express = require('express');
const auth = require('../middleware/authMiddleware');
const { getWorkoutData } = require('../controllers/workoutController');

const router = express.Router();

router.get('/', auth, getWorkoutData);

module.exports = router;
