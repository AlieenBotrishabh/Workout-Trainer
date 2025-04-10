import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { Camera } from "expo-camera";

export default function CameraComponent({ onCameraReady }) {
  const [hasPermission, setHasPermission] = useState(null);
  const videoRef = useRef(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS === "web") {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true });
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        } catch (error) {
          console.error("Camera permission denied:", error);
        }
      } else {
        const { status } = await Camera.requestCameraPermissionsAsync();
        setHasPermission(status === "granted");
      }
    })();
  }, []);

  if (Platform.OS !== "web" && hasPermission === null) return <View />;
  if (Platform.OS !== "web" && hasPermission === false) return <Text>No camera access</Text>;

  return (
    <View style={styles.container}>
      {Platform.OS === "web" ? (
        <video ref={videoRef} autoPlay playsInline style={styles.camera} />
      ) : (
        <Camera style={styles.camera} type={Camera.Constants.Type.front} onCameraReady={onCameraReady} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  camera: {
    width: "100%",
    height: "100%",
  },
});
