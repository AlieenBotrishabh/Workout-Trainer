import React, { useState, useEffect } from 'react';
import PoseNet from './PoseNet';

const PoseAnalyzer = () => {
  const [pose, setPose] = useState(null);
  const [poseAnalysis, setPoseAnalysis] = useState({
    isStanding: false,
    posture: 'Unknown',
    armPosition: 'Unknown',
    feedback: 'Waiting for pose detection...'
  });

  // Handle detected poses
  const handlePoseDetected = (detectedPose) => {
    setPose(detectedPose);
  };

  // Analyze the pose whenever it changes
  useEffect(() => {
    if (!pose || !pose.keypoints) return;
    
    analyzePose(pose);
  }, [pose]);

  // Analyze the detected pose
  const analyzePose = (pose) => {
    const keypoints = pose.keypoints;
    const keypointMap = {};
    
    // Create a map for easier access to keypoints
    keypoints.forEach(keypoint => {
      keypointMap[keypoint.part] = keypoint;
    });
    
    // Check if the person is standing
    const isStanding = checkIfStanding(keypointMap);
    
    // Analyze posture
    const posture = analyzePosture(keypointMap);
    
    // Analyze arm position
    const armPosition = analyzeArmPosition(keypointMap);
    
    // Generate feedback
    const feedback = generateFeedback(isStanding, posture, armPosition);
    
    setPoseAnalysis({
      isStanding,
      posture,
      armPosition,
      feedback
    });
  };

  // Check if the person is standing
  const checkIfStanding = (keypointMap) => {
    // Simplified check: if ankles are below knees, and knees are below hips
    const leftAnkle = keypointMap.leftAnkle;
    const rightAnkle = keypointMap.rightAnkle;
    const leftKnee = keypointMap.leftKnee;
    const rightKnee = keypointMap.rightKnee;
    const leftHip = keypointMap.leftHip;
    const rightHip = keypointMap.rightHip;
    
    if (!leftAnkle || !rightAnkle || !leftKnee || !rightKnee || !leftHip || !rightHip) {
      return false;
    }
    
    const leftLegStanding = leftAnkle.position.y > leftKnee.position.y && leftKnee.position.y > leftHip.position.y;
    const rightLegStanding = rightAnkle.position.y > rightKnee.position.y && rightKnee.position.y > rightHip.position.y;
    
    return leftLegStanding && rightLegStanding;
  };

  // Analyze posture based on shoulders and hips alignment
  const analyzePosture = (keypointMap) => {
    const leftShoulder = keypointMap.leftShoulder;
    const rightShoulder = keypointMap.rightShoulder;
    const leftHip = keypointMap.leftHip;
    const rightHip = keypointMap.rightHip;
    const nose = keypointMap.nose;
    
    if (!leftShoulder || !rightShoulder || !leftHip || !rightHip || !nose) {
      return 'Unknown';
    }
    
    // Calculate shoulder slope
    const shoulderSlope = Math.abs(rightShoulder.position.y - leftShoulder.position.y);
    
    // Calculate vertical alignment
    const shoulderMidpointX = (leftShoulder.position.x + rightShoulder.position.x) / 2;
    const hipMidpointX = (leftHip.position.x + rightHip.position.x) / 2;
    const noseToMidpointDiff = Math.abs(nose.position.x - shoulderMidpointX);
    
    // Determine posture
    if (shoulderSlope > 30) {
      return 'Leaning';
    } else if (noseToMidpointDiff > 30) {
      return 'Forward Head';
    } else if (Math.abs(shoulderMidpointX - hipMidpointX) > 30) {
      return 'Misaligned';
    } else {
      return 'Good';
    }
  };

  // Analyze arm position
  const analyzeArmPosition = (keypointMap) => {
    const leftShoulder = keypointMap.leftShoulder;
    const rightShoulder = keypointMap.rightShoulder;
    const leftElbow = keypointMap.leftElbow;
    const rightElbow = keypointMap.rightElbow;
    const leftWrist = keypointMap.leftWrist;
    const rightWrist = keypointMap.rightWrist;
    
    if (!leftShoulder || !rightShoulder || !leftElbow || !rightElbow || !leftWrist || !rightWrist) {
      return 'Unknown';
    }
    
    // Check if arms are raised above shoulders
    const armsRaised = leftWrist.position.y < leftShoulder.position.y || rightWrist.position.y < rightShoulder.position.y;
    
    // Check if arms are extended
    const leftArmExtended = Math.abs(leftWrist.position.x - leftShoulder.position.x) > 100;
    const rightArmExtended = Math.abs(rightWrist.position.x - rightShoulder.position.x) > 100;
    
    if (armsRaised) {
      return 'Raised';
    } else if (leftArmExtended && rightArmExtended) {
      return 'Extended';
    } else {
      return 'Relaxed';
    }
  };

  // Generate feedback based on analysis
  const generateFeedback = (isStanding, posture, armPosition) => {
    let feedback = '';
    
    if (!isStanding) {
      feedback += 'Not in a standing position. ';
    } else {
      feedback += 'Standing detected. ';
    }
    
    switch (posture) {
      case 'Good':
        feedback += 'Good posture! ';
        break;
      case 'Leaning':
        feedback += 'Your shoulders are uneven. Try to balance your weight. ';
        break;
      case 'Forward Head':
        feedback += 'Your head is too far forward. Pull your chin back. ';
        break;
      case 'Misaligned':
        feedback += 'Your upper body is not aligned with your hips. Stand up straight. ';
        break;
      default:
        feedback += 'Unable to analyze posture. ';
    }
    
    switch (armPosition) {
      case 'Raised':
        feedback += 'Your arms are raised.';
        break;
      case 'Extended':
        feedback += 'Your arms are extended.';
        break;
      case 'Relaxed':
        feedback += 'Your arms are in a relaxed position.';
        break;
      default:
        feedback += 'Unable to analyze arm position.';
    }
    
    return feedback;
  };

  return (
    <div className="pose-analyzer">
      <h2>Pose Analyzer</h2>
      <PoseNet onPoseDetected={handlePoseDetected} />
      
      <div className="analysis-results">
        <h3>Analysis Results</h3>
        <p><strong>Posture:</strong> {poseAnalysis.posture}</p>
        <p><strong>Standing:</strong> {poseAnalysis.isStanding ? 'Yes' : 'No'}</p>
        <p><strong>Arms:</strong> {poseAnalysis.armPosition}</p>
        <div className="feedback">
          <h3>Feedback</h3>
          <p>{poseAnalysis.feedback}</p>
        </div>
      </div>
    </div>
  );
};

export default PoseAnalyzer;
