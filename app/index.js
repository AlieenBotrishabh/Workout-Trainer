// frontend/screens/HomeScreen.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import WorkoutCard from './components/WorkoutCard';

export default function index() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>AI Workout Trainer</Text>
      <Text style={styles.subtitle}>Recommended Workouts</Text>
      <WorkoutCard
        title="Full Body Workout"
        duration="45 min"
        difficulty="Intermediate"
      />
      {/* Add more workout cards */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 10,
  },
});