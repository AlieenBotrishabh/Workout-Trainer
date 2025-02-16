import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Profile() {
  const [user, setUser] = useState({
    name: 'John Doe',
    fitnessLevel: 'Intermediate',
    totalWorkouts: 0,
  });

  useEffect(() => {
    loadUserProfile();
  }, []);

  const loadUserProfile = async () => {
    try {
      const storedUser = await AsyncStorage.getItem('userProfile');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error('Failed to load user profile:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://via.placeholder.com/100' }} // Replace with user's profile picture URL
        style={styles.avatar}
      />
      <Text style={styles.name}>{user.name}</Text>
      <Text style={styles.detail}>Fitness Level: {user.fitnessLevel}</Text>
      <Text style={styles.detail}>Total Workouts: {user.totalWorkouts}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  detail: {
    fontSize: 16,
    marginTop: 8,
  },
});
