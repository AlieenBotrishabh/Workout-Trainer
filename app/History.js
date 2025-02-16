import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function History() {
  const [workoutHistory, setWorkoutHistory] = useState([]);

  useEffect(() => {
    loadWorkoutHistory();
  }, []);

  const loadWorkoutHistory = async () => {
    try {
      const history = await AsyncStorage.getItem('workoutHistory');
      if (history) {
        setWorkoutHistory(JSON.parse(history));
      }
    } catch (error) {
      console.error('Failed to load workout history:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Workout History</Text>
      {workoutHistory.length === 0 ? (
        <Text style={styles.emptyMessage}>No workouts logged yet.</Text>
      ) : (
        <FlatList
          data={workoutHistory}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.historyItem}>
              <Text style={styles.workoutName}>{item.name}</Text>
              <Text>Duration: {item.duration} min</Text>
              <Text>Calories Burned: {item.calories} kcal</Text>
              <Text>Date: {item.date}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  emptyMessage: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#777',
  },
  historyItem: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  workoutName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
