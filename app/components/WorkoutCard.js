import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const WorkoutCard = ({ workout = {} }) => {
  const navigation = useNavigation();
  
  // Ensure workout properties have fallback values
  const { 
    name = "Unknown Workout", 
    duration = 0, 
    difficulty = "Beginner", 
    targetMuscles = [], 
    caloriesBurn = 0 
  } = workout;

  const handlePress = () => {
    navigation.navigate('WorkoutDetail', { workout });
  };

  const getDifficultyColor = (level) => {
    switch (level?.toLowerCase()) {
      case 'beginner':
        return '#4CAF50';
      case 'intermediate':
        return '#FFC107';
      case 'advanced':
        return '#F44336';
      default:
        return '#757575';
    }
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress}>
      <View style={styles.content}>
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.title}>{name}</Text>
          <View 
            style={[
              styles.difficultyBadge, 
              { backgroundColor: getDifficultyColor(difficulty) }
            ]}
          >
            <Text style={styles.difficultyText}>{difficulty}</Text>
          </View>
        </View>

        {/* Workout Details */}
        <View style={styles.detailsContainer}>
          <View style={styles.detail}>
            <Text style={styles.detailLabel}>Duration:</Text>
            <Text style={styles.detailValue}>{duration} min</Text>
          </View>

          <View style={styles.detail}>
            <Text style={styles.detailLabel}>Calories:</Text>
            <Text style={styles.detailValue}>{caloriesBurn} kcal</Text>
          </View>
        </View>

        {/* Muscle Groups */}
        {targetMuscles.length > 0 ? (
          <View style={styles.muscleGroupsContainer}>
            {targetMuscles.map((muscle, index) => (
              <View key={index} style={styles.muscleTag}>
                <Text style={styles.muscleText}>{muscle}</Text>
              </View>
            ))}
          </View>
        ) : (
          <Text style={styles.noMusclesText}>No target muscles specified</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  difficultyBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 8,
  },
  difficultyText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  detail: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailLabel: {
    color: '#666',
    marginRight: 4,
  },
  detailValue: {
    color: '#333',
    fontWeight: '600',
  },
  muscleGroupsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  muscleTag: {
    backgroundColor: '#E0E0E0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 8,
  },
  muscleText: {
    color: '#666',
    fontSize: 12,
  },
  noMusclesText: {
    fontSize: 12,
    color: '#999',
    fontStyle: 'italic',
    marginTop: 8,
  },
});

export default WorkoutCard;
