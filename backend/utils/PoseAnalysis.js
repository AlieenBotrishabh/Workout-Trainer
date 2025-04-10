// backend/utils/poseAnalysis.js
const EXERCISE_CONFIGS = {
    squat: {
      requiredKeypoints: ['leftHip', 'leftKnee', 'leftAnkle', 'rightHip', 'rightKnee', 'rightAnkle'],
      angles: {
        knee: {
          ideal: 90,
          tolerance: 15
        },
        hip: {
          ideal: 110,
          tolerance: 20
        }
      },
      phases: {
        top: {
          kneeAngle: { min: 160, max: 180 }
        },
        bottom: {
          kneeAngle: { min: 75, max: 105 }
        }
      }
    },
    pushup: {
      requiredKeypoints: ['leftShoulder', 'leftElbow', 'leftWrist', 'rightShoulder', 'rightElbow', 'rightWrist'],
      angles: {
        elbow: {
          ideal: 90,
          tolerance: 15
        }
      },
      phases: {
        top: {
          elbowAngle: { min: 160, max: 180 }
        },
        bottom: {
          elbowAngle: { min: 75, max: 105 }
        }
      }
    }
  };
  
  const calculateScore = (actual, ideal, tolerance) => {
    const diff = Math.abs(actual - ideal);
    return Math.max(0, 1 - diff / tolerance);
  };
  