import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function WorkoutCard({ title, duration, difficulty, workoutData }) {
  const navigation = useNavigation(); // ✅ Get navigation instance

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate("WorkoutDetail", { workout: workoutData })} // ✅ Pass workout data
    >
      <Text style={styles.title}>{title}</Text>
      <Text>Duration: {duration}</Text>
      <Text>Difficulty: {difficulty}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 20,
    backgroundColor: "#f8f8f8",
    marginBottom: 10,
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
