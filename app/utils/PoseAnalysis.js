// frontend/utils/poseAnalysis.js

/**
 * Analyzes exercise form based on pose keypoints and provides feedback
 * @param {Object} pose - The pose detection result containing keypoints
 * @param {string} exercise - The type of exercise being performed
 * @returns {string} Feedback on exercise form
 */
export const analyzePose = (pose, exercise) => {
    if (!pose || !exercise) return '';
    
    const keypoints = pose.keypoints;
    let feedback = [];
  
    // Helper function to find keypoint by name
    const findKeypoint = (name) => {
      return keypoints.find(kp => kp.name === name);
    };
  
    // Calculate angle between three points
    const calculateAngle = (p1, p2, p3) => {
      const radians = Math.atan2(p3.y - p2.y, p3.x - p2.x) - 
                     Math.atan2(p1.y - p2.y, p1.x - p2.x);
      let angle = Math.abs(radians * 180.0 / Math.PI);
      if (angle > 180.0) angle = 360.0 - angle;
      return angle;
    };
  
    // Check if keypoints are detected with sufficient confidence
    const validatePose = () => {
      const requiredKeypoints = {
        'squat': ['left_hip', 'left_knee', 'left_ankle', 'right_hip', 'right_knee', 'right_ankle'],
        'pushup': ['left_shoulder', 'left_elbow', 'left_wrist', 'right_shoulder', 'right_elbow', 'right_wrist'],
        'plank': ['left_shoulder', 'left_hip', 'left_ankle', 'right_shoulder', 'right_hip', 'right_ankle']
      };
  
      const required = requiredKeypoints[exercise] || [];
      const missingPoints = required.filter(name => {
        const point = findKeypoint(name);
        return !point || point.score < 0.5;
      });
  
      if (missingPoints.length > 0) {
        return `Cannot analyze pose - missing keypoints: ${missingPoints.join(', ')}`;
      }
      return '';
    };
  
    // Check if body is aligned properly
    const checkAlignment = () => {
      const shoulders = {
        left: findKeypoint('left_shoulder'),
        right: findKeypoint('right_shoulder')
      };
      const hips = {
        left: findKeypoint('left_hip'),
        right: findKeypoint('right_hip')
      };
  
      if (shoulders.left && shoulders.right && hips.left && hips.right) {
        const shoulderAngle = Math.abs(shoulders.left.y - shoulders.right.y);
        const hipAngle = Math.abs(hips.left.y - hips.right.y);
  
        if (shoulderAngle > 20) feedback.push('Keep shoulders level');
        if (hipAngle > 20) feedback.push('Keep hips level');
      }
    };
  
    // Exercise-specific form checks
    const checkSquatForm = () => {
      const hip = findKeypoint('left_hip');
      const knee = findKeypoint('left_knee');
      const ankle = findKeypoint('left_ankle');
  
      if (hip && knee && ankle) {
        const kneeAngle = calculateAngle(hip, knee, ankle);
        
        if (kneeAngle < 90) feedback.push('Squat depth good');
        else if (kneeAngle < 110) feedback.push('Try to squat a bit deeper');
        else feedback.push('Squat depth insufficient');
  
        // Check knee position relative to toes
        if (knee.x < ankle.x) feedback.push('Keep knees behind toes');
      }
    };
  
    const checkPushupForm = () => {
      const shoulder = findKeypoint('left_shoulder');
      const elbow = findKeypoint('left_elbow');
      const wrist = findKeypoint('left_wrist');
  
      if (shoulder && elbow && wrist) {
        const elbowAngle = calculateAngle(shoulder, elbow, wrist);
        
        if (elbowAngle < 90) feedback.push('Push back up');
        else if (elbowAngle > 160) feedback.push('Lower your body');
        
        // Check elbow position
        if (elbow.y > shoulder.y) feedback.push('Keep elbows closer to body');
      }
    };
  
    const checkPlankForm = () => {
      const shoulder = findKeypoint('left_shoulder');
      const hip = findKeypoint('left_hip');
      const ankle = findKeypoint('left_ankle');
  
      if (shoulder && hip && ankle) {
        const bodyLineAngle = calculateAngle(shoulder, hip, ankle);
        
        if (Math.abs(180 - bodyLineAngle) > 15) {
          feedback.push('Keep body in straight line');
        }
        
        if (hip.y > shoulder.y + 20) feedback.push('Lift hips to maintain straight line');
        if (hip.y < shoulder.y - 20) feedback.push('Lower hips to maintain straight line');
      }
    };
  
    // Run validation first
    const validationError = validatePose();
    if (validationError) return validationError;
  
    // Run general alignment check
    checkAlignment();
  
    // Run exercise-specific checks
    switch (exercise.toLowerCase()) {
      case 'squat':
        checkSquatForm();
        break;
      case 'pushup':
        checkPushupForm();
        break;
      case 'plank':
        checkPlankForm();
        break;
      default:
        return 'Unsupported exercise type';
    }
  
    return feedback.join('. ') || 'Form looks good!';
  };
  
  // Example usage:
  /*
  const pose = {
    keypoints: [
      { name: 'left_shoulder', x: 100, y: 100, score: 0.9 },
      { name: 'left_elbow', x: 150, y: 150, score: 0.8 },
      // ... more keypoints
    ]
  };
  
  const feedback = analyzePose(pose, 'pushup');
  console.log(feedback);
  */