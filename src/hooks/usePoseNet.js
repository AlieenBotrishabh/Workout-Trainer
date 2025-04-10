import { useState, useEffect, useRef } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as posenet from '@tensorflow-models/posenet';

export const usePoseNet = (videoRef) => {
  const [model, setModel] = useState(null);
  const [poses, setPoses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const requestRef = useRef();
  const isDetectingRef = useRef(false);

  const poseNetConfig = {
    architecture: 'MobileNetV1',
    outputStride: 16,
    inputResolution: { width: 640, height: 480 },
    multiplier: 0.75,
    quantBytes: 2
  };

  useEffect(() => {
    const loadModel = async () => {
      try {
        setIsLoading(true);
        const loadedModel = await posenet.load(poseNetConfig);
        setModel(loadedModel);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to load PoseNet model');
        setIsLoading(false);
        console.error('Error loading PoseNet model:', err);
      }
    };

    loadModel();

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);

  const calculateAngle = (a, b, c) => {
    const ab = Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2));
    const bc = Math.sqrt(Math.pow(b.x - c.x, 2) + Math.pow(b.y - c.y, 2));
    const ac = Math.sqrt(Math.pow(c.x - a.x, 2) + Math.pow(c.y - a.y, 2));
    return Math.acos((ab * ab + bc * bc - ac * ac) / (2 * ab * bc)) * (180 / Math.PI);
  };

  const startPoseDetection = () => {
    if (!model || !videoRef.current || isDetectingRef.current) return;
    isDetectingRef.current = true;

    const detectPose = async () => {
      if (model && videoRef.current && videoRef.current.readyState === 4) {
        try {
          const pose = await model.estimateSinglePose(videoRef.current, { flipHorizontal: false });
          
          if (pose && pose.keypoints) {
            const keypoints = pose.keypoints;
            const angles = {};
            const joints = [
              ['leftShoulder', 'leftElbow', 'leftWrist'],
              ['rightShoulder', 'rightElbow', 'rightWrist'],
              ['leftHip', 'leftKnee', 'leftAnkle'],
              ['rightHip', 'rightKnee', 'rightAnkle'],
              ['leftShoulder', 'leftHip', 'leftKnee'],
              ['rightShoulder', 'rightHip', 'rightKnee']
            ];
            
            joints.forEach(([a, b, c]) => {
              const pointA = keypoints.find(kp => kp.part === a)?.position;
              const pointB = keypoints.find(kp => kp.part === b)?.position;
              const pointC = keypoints.find(kp => kp.part === c)?.position;
              if (pointA && pointB && pointC) {
                angles[b] = calculateAngle(pointA, pointB, pointC);
              }
            });
            
            pose.angles = angles;
          }
          setPoses([pose]);
        } catch (err) {
          console.error('Error estimating pose:', err);
        }
      }
      requestRef.current = requestAnimationFrame(detectPose);
    };
    detectPose();
  };

  const stopPoseDetection = () => {
    isDetectingRef.current = false;
    if (requestRef.current) cancelAnimationFrame(requestRef.current);
  };

  const drawPose = (ctx, poses, minPartConfidence = 0.5) => {
    if (!ctx || !poses || poses.length === 0) return;
    poses.forEach(pose => {
      pose.keypoints.forEach(keypoint => {
        if (keypoint.score >= minPartConfidence) {
          ctx.beginPath();
          ctx.arc(keypoint.position.x, keypoint.position.y, 5, 0, 2 * Math.PI);
          ctx.fillStyle = 'aqua';
          ctx.fill();
        }
      });
      posenet.getAdjacentKeyPoints(pose.keypoints, minPartConfidence).forEach(([kp1, kp2]) => {
        ctx.beginPath();
        ctx.moveTo(kp1.position.x, kp1.position.y);
        ctx.lineTo(kp2.position.x, kp2.position.y);
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'aqua';
        ctx.stroke();
      });
    });
  };

  const checkPoseMatch = (currentPose, targetPoseConfig, tolerance = 15) => {
    if (!currentPose || !currentPose.angles || !targetPoseConfig) return false;
    return Object.keys(targetPoseConfig).every(
      key => Math.abs(currentPose.angles[key] - targetPoseConfig[key]) <= tolerance
    );
  };

  return {
    model,
    poses,
    isLoading,
    error,
    startPoseDetection,
    stopPoseDetection,
    drawPose,
    checkPoseMatch
  };
};
