// frontend/components/ExerciseGuide.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { analyzePose } from '../utils/PoseAnalysis';

export default function ExerciseGuide({ exercise, poses }) {
  const feedback = analyzePose(poses, exercise);

  return (
    <View style={styles.container}>
      <Text style={styles.exerciseName}>{exercise?.name}</Text>
      <Text style={styles.feedback}>{feedback}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  exerciseName: {
    color: 'white',
    fontSize: 20,
    marginBottom: 10,
  },
  feedback: {
    color: 'white',
    fontSize: 16,
  },
});