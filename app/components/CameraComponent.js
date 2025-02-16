import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Camera } from 'expo-camera';

export default function CameraComponent({ onCameraReady }) {
  const [hasPermission, setHasPermission] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync(); // ✅ Correct function
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) return <View />;
  if (hasPermission === false) return <Text>No camera access</Text>;

  return (
    <Camera
      style={styles.camera}
      type={Camera.Constants.Type.front}
      onCameraReady={onCameraReady}
    />
  );
}

const styles = StyleSheet.create({
  camera: {
    flex: 1,
  },
});
