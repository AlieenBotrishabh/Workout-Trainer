import React, { useRef, useEffect, useState } from 'react';
import * as tf from 'tensorflow';
import * as posenet from '@tensorflow-models/posenet';

const PoseNet = ({ onPoseDetected, videoWidth = 600, videoHeight = 500 }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [model, setModel] = useState(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  // Initialize the PoseNet model
  useEffect(() => {
    const loadPoseNetModel = async () => {
      try {
        // Load the PoseNet model
        const loadedModel = await posenet.load({
          architecture: 'MobileNetV1',
          outputStride: 16,
          inputResolution: { width: videoWidth, height: videoHeight },
          multiplier: 0.75
        });
        
        setModel(loadedModel);
        console.log('PoseNet model loaded successfully');
      } catch (error) {
        console.error('Error loading PoseNet model:', error);
      }
    };

    loadPoseNetModel();
  }, [videoWidth, videoHeight]);

  // Setup camera stream
  useEffect(() => {
    const setupCamera = async () => {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        console.error('Browser API navigator.mediaDevices.getUserMedia not available');
        return;
      }

      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: false,
          video: {
            width: videoWidth,
            height: videoHeight,
          },
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.onloadedmetadata = () => {
            videoRef.current.play();
            setIsVideoPlaying(true);
          };
        }
      } catch (error) {
        console.error('Error accessing the camera:', error);
      }
    };

    setupCamera();
  }, [videoWidth, videoHeight]);

  // Detect poses
  useEffect(() => {
    if (!model || !isVideoPlaying) return;

    const detectPose = async () => {
      const pose = await model.estimateSinglePose(videoRef.current, {
        flipHorizontal: true
      });

      if (onPoseDetected) {
        onPoseDetected(pose);
      }

      drawPose(pose);
      requestAnimationFrame(detectPose);
    };

    detectPose();
  }, [model, isVideoPlaying, onPoseDetected]);

  // Draw the pose keypoints on canvas
  const drawPose = (pose) => {
    const ctx = canvasRef.current.getContext('2d');
    ctx.clearRect(0, 0, videoWidth, videoHeight);

    // Draw keypoints
    if (pose.keypoints) {
      pose.keypoints.forEach(keypoint => {
        if (keypoint.score > 0.5) {
          const { x, y } = keypoint.position;
          
          ctx.beginPath();
          ctx.arc(x, y, 5, 0, 2 * Math.PI);
          ctx.fillStyle = 'red';
          ctx.fill();
        }
      });
    }

    // Draw skeleton
    const adjacentKeyPoints = [
      ['nose', 'leftEye'], ['leftEye', 'leftEar'], ['nose', 'rightEye'],
      ['rightEye', 'rightEar'], ['leftShoulder', 'rightShoulder'],
      ['leftShoulder', 'leftElbow'], ['leftElbow', 'leftWrist'],
      ['rightShoulder', 'rightElbow'], ['rightElbow', 'rightWrist'],
      ['leftShoulder', 'leftHip'], ['rightShoulder', 'rightHip'],
      ['leftHip', 'rightHip'], ['leftHip', 'leftKnee'],
      ['leftKnee', 'leftAnkle'], ['rightHip', 'rightKnee'],
      ['rightKnee', 'rightAnkle']
    ];

    const keypointsByName = {};
    pose.keypoints.forEach(keypoint => {
      keypointsByName[keypoint.part] = keypoint;
    });

    adjacentKeyPoints.forEach(([partA, partB]) => {
      const keypointA = keypointsByName[partA];
      const keypointB = keypointsByName[partB];

      if (keypointA && keypointB && keypointA.score > 0.5 && keypointB.score > 0.5) {
        ctx.beginPath();
        ctx.moveTo(keypointA.position.x, keypointA.position.y);
        ctx.lineTo(keypointB.position.x, keypointB.position.y);
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'blue';
        ctx.stroke();
      }
    });
  };

  return (
    <div className="posenet-container">
      <video
        ref={videoRef}
        width={videoWidth}
        height={videoHeight}
        style={{ display: 'none' }}
      />
      <canvas
        ref={canvasRef}
        width={videoWidth}
        height={videoHeight}
        style={{ border: '1px solid #000' }}
      />
    </div>
  );
};

export default PoseNet;
