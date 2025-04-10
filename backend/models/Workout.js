const mongoose = require('mongoose');

// Schema for workout completions
const CompletionSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now
  },
  duration: {
    type: Number,
    required: [true, 'Please add a duration in minutes']
  },
  feedback: {
    type: String,
    maxlength: [500, 'Feedback cannot be more than 500 characters']
  },
  rating: {
    type: Number,
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating cannot be more than 5']
  }
});

const WorkoutSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a workout name'],
    trim: true,
    maxlength: [50, 'Name cannot be more than 50 characters']
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  exercises: [
    {
      exercise: {
        type: mongoose.Schema.ObjectId,
        ref: 'Exercise',
        required: true
      },
      sets: {
        type: Number,
        required: [true, 'Please specify number of sets'],
        min: [1, 'Sets must be at least 1']
      },
      reps: {
        type: String,
        required: [true, 'Please specify reps']
      },
      rest: {
        type: Number,
        required: [true, 'Please specify rest period in seconds']
      },
      notes: String
    }
  ],
  duration: {
    type: Number,
    required: [true, 'Please add an estimated duration in minutes']
  },
  difficulty: {
    type: String,
    required: [true, 'Please specify difficulty level'],
    enum: ['beginner', 'intermediate', 'advanced', 'expert']
  },
  category: {
    type: String,
    required: [true, 'Please specify workout category'],
    enum: [
      'strength', 'cardio', 'hiit', 'flexibility', 'endurance', 
      'powerlifting', 'bodybuilding', 'calisthenics', 'crossfit', 'custom'
    ]
  },
  targetMuscleGroups: {
    type: [String],
    required: [true, 'Please specify target muscle groups'],
    enum: [
      'chest', 'back', 'shoulders', 'biceps', 'triceps', 
      'forearms', 'quadriceps', 'hamstrings', 'calves', 
      'glutes', 'abs', 'obliques', 'lower_back', 'full_body'
    ]
  },
  isPublic: {
    type: Boolean,
    default: false
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  completions: [CompletionSchema],
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Calculate average rating from completions
WorkoutSchema.virtual('averageRating').get(function() {
  if (this.completions.length === 0) {
    return 0;
  }
  
  const sum = this.completions.reduce((total, completion) => {
    return total + (completion.rating || 0);
  }, 0);
  
  return (sum / this.completions.length).toFixed(1);
});

// Calculate total number of completions
WorkoutSchema.virtual('completionCount').get(function() {
  return this.completions.length;
});

// Get last completion date
WorkoutSchema.virtual('lastCompleted').get(function() {
  if (this.completions.length === 0) {
    return null;
  }
  
  // Return the most recent completion date
  return this.completions.sort((a, b) => b.date - a.date)[0].date;
});

// Create indexes for searching workouts
WorkoutSchema.index({ 
  name: 'text', 
  description: 'text',
  targetMuscleGroups: 1,
  difficulty: 1,
  category: 1,
  isPublic: 1,
  user: 1
});

// Cascade delete completions when a workout is deleted
WorkoutSchema.pre('remove', async function(next) {
  console.log(`Workout completions being removed from workout ${this._id}`);
  next();
});

module.exports = mongoose.model('Workout', WorkoutSchema);