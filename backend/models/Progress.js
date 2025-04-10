const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  workoutId: { type: mongoose.Schema.Types.ObjectId, ref: 'Workout' },
  date: { type: Date, default: Date.now },
  exercises: [{
    name: String,
    reps: Number,
    sets: Number,
    formAccuracy: Number,
  }],
  totalDuration: Number,
  caloriesBurned: Number,
});

module.exports = mongoose.model('Progress', progressSchema);