<<<<<<< HEAD
// server/models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email'
    ]
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: 6,
    select: false
  },
  role: {
    type: String,
    enum: ['user', 'trainer', 'admin'],
    default: 'user'
  },
  height: {
    type: Number,
    default: null
  },
  weight: {
    type: Number,
    default: null
  },
  fitnessGoals: {
    type: [String],
    default: []
  },
  workoutPreferences: {
    difficulty: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      default: 'beginner'
    },
    focusAreas: {
      type: [String],
      default: []
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual populate workouts
UserSchema.virtual('workouts', {
  ref: 'Workout',
  localField: '_id',
  foreignField: 'user',
  justOne: false
});

// Encrypt password using bcrypt
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    next();
  }
  
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Sign JWT and return
UserSchema.methods.getSignedJwtToken = function() {
  return jwt.sign({ id: this._id }, config.JWT_SECRET, {
    expiresIn: config.JWT_EXPIRE
  });
};

// Match user entered password to hashed password in database
UserSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);

// server/models/Exercise.js
const mongoose = require('mongoose');

const ExerciseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add exercise name'],
    trim: true,
    unique: true
  },
  description: {
    type: String,
    required: [true, 'Please add a description']
  },
  muscleGroups: {
    type: [String],
    required: [true, 'Please specify target muscle groups']
  },
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    required: true
  },
  instructions: {
    type: [String],
    required: [true, 'Please add step-by-step instructions']
  },
  videoUrl: {
    type: String,
    default: null
  },
  imageUrl: {
    type: String,
    default: null
  },
  equipment: {
    type: [String],
    default: []
  },
  poseDetectionEnabled: {
    type: Boolean,
    default: false
  },
  poseDetectionConfig: {
    type: mongoose.Schema.Types.Mixed,
    default: null
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create index for search
ExerciseSchema.index({ name: 'text', description: 'text', muscleGroups: 'text' });

module.exports = mongoose.model('Exercise', ExerciseSchema);

// server/models/Workout.js
const mongoose = require('mongoose');

const WorkoutSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add workout name'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please add a description']
  },
  exercises: [
    {
      exercise: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Exercise',
        required: true
      },
      sets: {
        type: Number,
        required: true,
        default: 3
      },
      reps: {
        type: Number,
        required: true,
        default: 10
      },
      duration: {
        type: Number,
        default: null // In seconds, for timed exercises
      },
      restTime: {
        type: Number,
        default: 60 // Rest time in seconds
      },
      notes: {
        type: String,
        default: ''
      }
    }
  ],
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    required: true
  },
  duration: {
    type: Number, // Estimated duration in minutes
    required: true
  },
  focusAreas: {
    type: [String],
    required: true
  },
  isPublic: {
    type: Boolean,
    default: false
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  completions: [
    {
      date: {
        type: Date,
        default: Date.now
      },
      duration: {
        type: Number, // Actual duration in minutes
        required: true
      },
      feedback: {
        type: String,
        default: ''
      },
      rating: {
        type: Number,
        min: 1,
        max: 5,
        default: null
      }
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Workout', WorkoutSchema);
=======
// backend/models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profile: {
    height: Number,
    weight: Number,
    fitnessLevel: String,
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', userSchema);
>>>>>>> f300f0e9d5f587c6f689f47df3a9556ab286f9e1
