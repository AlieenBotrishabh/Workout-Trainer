const mongoose = require('mongoose');

const ExerciseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    unique: true,
    trim: true,
    maxlength: [50, 'Name cannot be more than 50 characters']
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  muscleGroups: {
    type: [String],
    required: [true, 'Please specify at least one muscle group'],
    enum: [
      'chest', 'back', 'shoulders', 'biceps', 'triceps', 
      'forearms', 'quadriceps', 'hamstrings', 'calves', 
      'glutes', 'abs', 'obliques', 'lower_back', 'full_body'
    ]
  },
  difficulty: {
    type: String,
    required: [true, 'Please specify difficulty level'],
    enum: ['beginner', 'intermediate', 'advanced', 'expert']
  },
  instructions: {
    type: [String],
    required: [true, 'Please add instructions']
  },
  imageUrl: {
    type: String,
    default: 'no-image.jpg'
  },
  videoUrl: {
    type: String
  },
  equipment: {
    type: [String],
    enum: [
      'none', 'dumbbell', 'barbell', 'kettlebell', 'resistance_band',
      'machine', 'cable', 'bodyweight', 'medicine_ball', 'bench', 'pull_up_bar'
    ]
  },
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Create index for search functionality
ExerciseSchema.index({ 
  name: 'text', 
  description: 'text',
  muscleGroups: 1,
  difficulty: 1,
  equipment: 1
});

module.exports = mongoose.model('Exercise', ExerciseSchema);