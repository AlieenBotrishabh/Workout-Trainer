// frontend/components/Statistics.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { LineChart, BarChart } from 'react-native-chart-kit';
import { progressAPI } from '../utils/Api';

const Statistics = () => {
  const [stats, setStats] = useState({
    workoutHistory: [],
    weeklyProgress: [],
    monthlyProgress: [],
    totalWorkouts: 0,
    totalCalories: 0,
    averageAccuracy: 0
  });

  useEffect(() => {
    fetchStatistics();
  }, []);

  const fetchStatistics = async () => {
    try {
      const statsData = await progressAPI.getProgressStats();
      setStats(statsData);
    } catch (error) {
      console.error('Error fetching statistics:', error);
    }
  };

  const formatWeeklyData = () => {
    return stats.weeklyProgress.map(day => ({
      name: day.date,
      workouts: day.count,
      calories: day.calories,
    }));
  };

  const calculateAverages = () => {
    const totalWorkouts = stats.workoutHistory.length;
    const avgCaloriesPerWorkout = totalWorkouts 
      ? (stats.totalCalories / totalWorkouts).toFixed(0) 
      : 0;
    return { avgCaloriesPerWorkout };
  };

  const { avgCaloriesPerWorkout } = calculateAverages();

  return (
    <ScrollView style={styles.container}>
      {/* Summary Cards */}
      <View style={styles.summaryContainer}>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Total Workouts</Text>
          <Text style={styles.summaryValue}>{stats.totalWorkouts}</Text>
        </View>
        
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Total Calories</Text>
          <Text style={styles.summaryValue}>{stats.totalCalories}</Text>
        </View>
        
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Avg. Accuracy</Text>
          <Text style={styles.summaryValue}>{stats.averageAccuracy}%</Text>
        </View>
      </View>

      {/* Weekly Progress Chart */}
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Weekly Progress</Text>
        <LineChart
          width={Dimensions.get('window').width - 40}
          height={220}
          data={formatWeeklyData()}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <XAxis dataKey="name" />
          <YAxis />
          <Line type="monotone" dataKey="workouts" stroke="#8884d8" />
          <Line type="monotone" dataKey="calories" stroke="#82ca9d" />
        </LineChart>
      </View>

      {/* Performance Metrics */}
      <View style={styles.metricsContainer}>
        <Text style={styles.metricsTitle}>Performance Metrics</Text>
        
        <View style={styles.metricRow}>
          <Text style={styles.metricLabel}>Average Calories/Workout:</Text>
          <Text style={styles.metricValue}>{avgCaloriesPerWorkout}</Text>
        </View>
        
        <View style={styles.metricRow}>
          <Text style={styles.metricLabel}>Best Workout Accuracy:</Text>
          <Text style={styles.metricValue}>
            {Math.max(...stats.workoutHistory.map(w => w.accuracy))}%
          </Text>
        </View>
        
        <View style={styles.metricRow}>
          <Text style={styles.metricLabel}>Workout Streak:</Text>
          <Text style={styles.metricValue}>
            {calculateStreak(stats.workoutHistory)} days
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const calculateStreak = (history) => {
  if (!history.length) return 0;
  
  let streak = 1;
  let currentDate = new Date(history[0].date);
  
  for (let i = 1; i < history.length; i++) {
    const workoutDate = new Date(history[i].date);
    const diffDays = Math.floor((currentDate - workoutDate) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) {
      streak++;
      currentDate = workoutDate;
    } else {
      break;
    }
  }
  
  return streak;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  summaryTitle: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  chartContainer: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  metricsContainer: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  metricsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  metricRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  metricLabel: {
    color: '#666',
    flex: 1,
  },
  metricValue: {
    fontWeight: 'bold',
    color: '#333',
  },
});

export default Statistics;