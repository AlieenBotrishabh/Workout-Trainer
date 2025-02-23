const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  exercises: [{
    name: String,
    description: String,
    duration: Number,
    reps: Number,
    sets: Number,
    correctForm: {
      keyPoints: [String],
      angles: [{
        joint: String,
        minAngle: Number,
        maxAngle: Number,
      }],
    },
  }],
  difficulty: String,
  targetMuscles: [String],
});

module.exports = mongoose.model('Workout', workoutSchema);