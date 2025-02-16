import { Tabs } from "expo-router";

export default function Layout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ title: "Home" }} />
      <Tabs.Screen name="WorkoutScreen" options={{ title: "Workout" }} />
      {/* Add more screens like history.js, profile.js when needed */}
    </Tabs>
  );
}
