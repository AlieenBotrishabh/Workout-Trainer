import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, Platform } from 'react-native';
import { Camera } from 'expo-camera';
import * as posenet from '@tensorflow-models/posenet';
import * as tf from '@tensorflow/tfjs';
import { cameraWithTensors } from '@tensorflow/tfjs-react-native';
import * as FileSystem from 'expo-file-system';
import { ExpoWebGLRenderingContext } from 'expo-gl';
import { analyzePose } from './utils/PoseAnalysis';

const TensorCamera = cameraWithTensors(Camera);
const { width, height } = Dimensions.get('window');

// Calculate tensor dimensions based on your needs
const TENSOR_WIDTH = 320;
const TENSOR_HEIGHT = 320;

export default function WorkoutScreen() {
  const [isTfReady, setIsTfReady] = useState(false);
  const [net, setNet] = useState(null);
  const [permission, setPermission] = useState(null);
  const [poses, setPoses] = useState([]);
  const [currentExercise, setCurrentExercise] = useState('squat');
  const [feedback, setFeedback] = useState('');
  const cameraRef = useRef(null);
  const context = useRef(null);
  const rafId = useRef(null);

  useEffect(() => {
    setupTf();
    getPermission();
    return () => {
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  const setupTf = async () => {
    try {
      // Wait for TF to be ready
      await tf.ready();
      
      // Load PoseNet model
      const model = await posenet.load({
        architecture: 'MobileNetV1',
        outputStride: 16,
        inputResolution: { width: TENSOR_WIDTH, height: TENSOR_HEIGHT },
        multiplier: 0.75,
        quantBytes: 2
      });
      
      setNet(model);
      setIsTfReady(true);
      console.log('TF and PoseNet ready');
    } catch (error) {
      console.error('TF setup error:', error);
    }
  };

  const getPermission = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setPermission(status === 'granted');
  };

  const handleCameraStream = (images, updatePreview, gl) => {
    const loop = async () => {
      if (!net) return;

      const nextImageTensor = images.next().value;
      if (!nextImageTensor) return;

      try {
        // Get pose estimation
        const pose = await net.estimateSinglePose(nextImageTensor, {
          flipHorizontal: Platform.OS === 'ios'
        });

        // Update poses state
        setPoses([pose]);

        // Get feedback using the analyzePose utility
        if (pose.score > 0.3) {
          const poseFeedback = analyzePose(pose, currentExercise);
          setFeedback(poseFeedback);
        }

        tf.dispose(nextImageTensor);
      } catch (error) {
        console.error('Error estimating pose:', error);
      }

      rafId.current = requestAnimationFrame(loop);
    };
    loop();
  };

  const renderPose = () => {
    if (!poses.length) return null;

    const scaleX = width / TENSOR_WIDTH;
    const scaleY = height / TENSOR_HEIGHT;

    return poses[0].keypoints.map((keypoint, index) => {
      if (keypoint.score > 0.5) {
        return (
          <View
            key={index}
            style={{
              position: 'absolute',
              left: keypoint.position.x * scaleX - 6,
              top: keypoint.position.y * scaleY - 6,
              width: 12,
              height: 12,
              borderRadius: 6,
              backgroundColor: 'rgba(255, 0, 0, 0.7)',
              borderWidth: 2,
              borderColor: 'white',
            }}
          />
        );
      }
      return null;
    });
  };

  const textureDims = Platform.OS === 'ios' ?
    { height: 1920, width: 1080 } :
    { height: 1200, width: 1600 };

  if (!permission) {
    return (
      <View style={styles.container}>
        <Text>Camera permission not granted</Text>
      </View>
    );
  }

  if (!isTfReady) {
    return (
      <View style={styles.container}>
        <Text>Loading TensorFlow...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TensorCamera
        style={styles.camera}
        type={Camera.Constants.Type.front}
        cameraTextureHeight={textureDims.height}
        cameraTextureWidth={textureDims.width}
        resizeHeight={TENSOR_HEIGHT}
        resizeWidth={TENSOR_WIDTH}
        resizeDepth={3}
        onReady={handleCameraStream}
        autorender={true}
      />
      
      <View style={styles.overlay}>
        {renderPose()}
      </View>

      <View style={styles.feedbackContainer}>
        <Text style={styles.exerciseText}>
          {currentExercise.toUpperCase()}
        </Text>
        <Text style={styles.feedbackText}>
          {feedback || 'Analyzing pose...'}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  camera: {
    flex: 1,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  feedbackContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 20,
  },
  exerciseText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  feedbackText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  }
});