import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./HomeScreen";
import WorkoutScreen from "./WorkoutScreen";
import HistoryScreen from "./History";
import ProfileScreen from "./Profile";
import { useEffect } from 'react';
import * as tf from '@tensorflow/tfjs';

const Tab = createBottomTabNavigator();

export default function Layout() {

  useEffect(() => {
    tf.ready().then(() => {
      console.log('TensorFlow.js is ready');
    });
  }, []);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false, // Hides the top header if needed
        tabBarShowLabel: true, // Keep labels
        tabBarStyle: { height: 60 }, // Adjust height if needed
      }}
    >
      <Tab.Screen name="HomeScreen" component={HomeScreen} />
      <Tab.Screen name="Workout" component={WorkoutScreen} />
      <Tab.Screen name="History" component={HistoryScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
