import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import CameraComponent from './components/CameraComponent';
import PoseDetection from './components/PoseDetection';
import ExerciseGuide from './components/ExerciseGuide';

export default function WorkoutScreen() {
  const [poses, setPoses] = useState([]);
  const [currentExercise, setCurrentExercise] = useState(null);

  return (
    <View style={styles.container}>
      {/* Camera Component */}
      <CameraComponent style={styles.camera} />

      {/* Pose Detection (Receives poses and updates state) */}
      <PoseDetection
        poses={poses}
        onPosesDetected={setPoses}
        currentExercise={currentExercise}
      />

      {/* Exercise Guide */}
      <ExerciseGuide
        exercise={currentExercise}
        poses={poses}
        onExerciseChange={setCurrentExercise} // Allow updates
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // Dark background for better visibility
  },
  camera: {
    flex: 1,
  },
});
