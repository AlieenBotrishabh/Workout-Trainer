const express = require('express');
const router = express.Router();
const { 
  getUsers, 
  getUser, 
  updateProfile,
  changePassword
} = require('../controllers/userController');

const User = require('../models/User');
const { protect, authorize } = require('../middleware/auth');
const { advancedResults } = require('../middleware/validation');

// Protect all routes
router.use(protect);

// Routes for logged-in user's profile
router.route('/profile')
  .put(updateProfile);

router.route('/changepassword')
  .put(changePassword);

// Admin only routes
router.use(authorize('admin'));

router.route('/')
  .get(advancedResults(User), getUsers);

router.route('/:id')
  .get(getUser);

module.exports = router;