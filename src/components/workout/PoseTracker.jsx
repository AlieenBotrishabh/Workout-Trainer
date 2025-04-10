import React, { useState, useEffect, useRef } from 'react';

const PoseTracker = ({ targetPose, isActive, onFeedback }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [poseDetection, setPoseDetection] = useState({
    isDetecting: false,
    hasPermission: false,
    errorMessage: null
  });
  
  // Simulated pose detection scores
  const poseScores = {
    jumping_jack: 0.85,
    pushup: 0.72,
    squat: 0.9
  };
  
  const feedbackMessages = {
    jumping_jack: [
      "Keep your arms straight when they go above your head",
      "Try to jump wider with your legs",
      "Great form! Keep going!"
    ],
    pushup: [
      "Lower your body until your elbows are at 90 degrees",
      "Keep your core tight throughout the movement",
      "Try to maintain a straight back"
    ],
    squat: [
      "Push your knees outward as you descend",
      "Go deeper if you can",
      "Good depth! Keep your chest up"
    ]
  };

  useEffect(() => {
    if (isActive && !poseDetection.isDetecting) {
      startPoseDetection();
    } else if (!isActive && poseDetection.isDetecting) {
      stopPoseDetection();
    }
  }, [isActive]);

  const startPoseDetection = async () => {
    try {
      // In a real implementation, this would use a pose detection library
      // like TensorFlow.js PoseNet or MoveNet
      // Here we'll simulate the camera access and detection
      
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        // Request camera access
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: 'user' } 
        });
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setPoseDetection({
            isDetecting: true,
            hasPermission: true,
            errorMessage: null
          });
          
          // Simulate sending feedback periodically
          const feedbackInterval = setInterval(() => {
            if (isActive && onFeedback && targetPose) {
              const messages = feedbackMessages[targetPose] || [];
              const randomMessage = messages[Math.floor(Math.random() * messages.length)];
              onFeedback(randomMessage);
            }
          }, 5000);
          
          return () => {
            clearInterval(feedbackInterval);
          };
        }
      } else {
        setPoseDetection({
          isDetecting: false,
          hasPermission: false,
          errorMessage: "Camera access not supported in this browser"
        });
      }
    } catch (err) {
      setPoseDetection({
        isDetecting: false,
        hasPermission: false,
        errorMessage: "Failed to access camera. Please grant permission."
      });
      console.error("Error starting pose detection:", err);
    }
  };

  const stopPoseDetection = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    
    setPoseDetection({
      ...poseDetection,
      isDetecting: false
    });
  };

  // Draw pose keypoints on canvas
  const drawPoseKeypoints = () => {
    if (!canvasRef.current || !isActive) return;
    
    const ctx = canvasRef.current.getContext('2d');
    const canvas = canvasRef.current;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // In a real application, we would get actual keypoints
    // from a pose detection model. Here we'll draw dummy points
    
    // Example skeleton keypoints (in a real app, these would come from the model)
    const keypoints = [
      { x: canvas.width * 0.5, y: canvas.height * 0.2 }, // head
      { x: canvas.width * 0.5, y: canvas.height * 0.3 }, // neck
      { x: canvas.width * 0.5, y: canvas.height * 0.45 }, // torso
      { x: canvas.width * 0.4, y: canvas.height * 0.3 }, // left shoulder
      { x: canvas.width * 0.6, y: canvas.height * 0.3 }, // right shoulder
      { x: canvas.width * 0.3, y: canvas.height * 0.4 }, // left elbow
      { x: canvas.width * 0.7, y: canvas.height * 0.4 }, // right elbow
      { x: canvas.width * 0.25, y: canvas.height * 0.5 }, // left wrist
      { x: canvas.width * 0.75, y: canvas.height * 0.5 }, // right wrist
      { x: canvas.width * 0.45, y: canvas.height * 0.6 }, // left hip
      { x: canvas.width * 0.55, y: canvas.height * 0.6 }, // right hip
      { x: canvas.width * 0.4, y: canvas.height * 0.75 }, // left knee
      { x: canvas.width * 0.6, y: canvas.height * 0.75 }, // right knee
      { x: canvas.width * 0.4, y: canvas.height * 0.9 }, // left ankle
      { x: canvas.width * 0.6, y: canvas.height * 0.9 }, // right ankle
    ];
    
    // Draw keypoints
    keypoints.forEach((point) => {
      ctx.beginPath();
      ctx.arc(point.x, point.y, 5, 0, 2 * Math.PI);
      ctx.fillStyle = 'red';
      ctx.fill();
    });
    
    // Draw connections (skeleton)
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 2;
    
    // Head to neck
    ctx.beginPath();
    ctx.moveTo(keypoints[0].x, keypoints[0].y);
    ctx.lineTo(keypoints[1].x, keypoints[1].y);
    ctx.stroke();
    
    // Neck to torso
    ctx.beginPath();
    ctx.moveTo(keypoints[1].x, keypoints[1].y);
    ctx.lineTo(keypoints[2].x, keypoints[2].y);
    ctx.stroke();
    
    // Shoulders
    ctx.beginPath();
    ctx.moveTo(keypoints[3].x, keypoints[3].y);
    ctx.lineTo(keypoints[1].x, keypoints[1].y);
    ctx.lineTo(keypoints[4].x, keypoints[4].y);
    ctx.stroke();
    
    // Left arm
    ctx.beginPath();
    ctx.moveTo(keypoints[3].x, keypoints[3].y);
    ctx.lineTo(keypoints[5].x, keypoints[5].y);
    ctx.lineTo(keypoints[7].x, keypoints[7].y);
    ctx.stroke();
    
    // Right arm
    ctx.beginPath();
    ctx.moveTo(keypoints[4].x, keypoints[4].y);
    ctx.lineTo(keypoints[6].x, keypoints[6].y);
    ctx.lineTo(keypoints[8].x, keypoints[8].y);
    ctx.stroke();
    
    // Hips
    ctx.beginPath();
    ctx.moveTo(keypoints[9].x, keypoints[9].y);
    ctx.lineTo(keypoints[2].x, keypoints[2].y);
    ctx.lineTo(keypoints[10].x, keypoints[10].y);
    ctx.stroke();
    
    // Left leg
    ctx.beginPath();
    ctx.moveTo(keypoints[9].x, keypoints[9].y);
    ctx.lineTo(keypoints[11].x, keypoints[11].y);
    ctx.lineTo(keypoints[13].x, keypoints[13].y);
    ctx.stroke();
    
    // Right leg
    ctx.beginPath();
    ctx.moveTo(keypoints[10].x, keypoints[10].y);
    ctx.lineTo(keypoints[12].x, keypoints[12].y);
    ctx.lineTo(keypoints[14].x, keypoints[14].y);
    ctx.stroke();
    
    // Display score if target pose is set
    if (targetPose && poseScores[targetPose]) {
      const score = poseScores[targetPose];
      ctx.fillStyle = score > 0.8 ? 'green' : score > 0.6 ? 'orange' : 'red';
      ctx.font = '16px Arial';
      ctx.fillText(`Form Score: ${Math.round(score * 100)}%`, 10, 30);
    }
  };

  // Animation loop for drawing
  useEffect(() => {
    let animationFrameId;
    
    if (isActive && poseDetection.isDetecting) {
      const animate = () => {
        drawPoseKeypoints();
        animationFrameId = requestAnimationFrame(animate);
      };
      
      animationFrameId = requestAnimationFrame(animate);
    }
    
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isActive, poseDetection.isDetecting]);

  return (
    <div className="relative w-full h-full">
      {/* Hidden video element for camera feed */}
      <video
        ref={videoRef}
        className="hidden"
        autoPlay
        playsInline
      />
      
      {/* Canvas overlay for drawing pose */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        width={640}
        height={480}
      />
      
      {/* Status messages */}
      {!poseDetection.hasPermission && (
        <div className="absolute top-0 left-0 right-0 bg-red-500 text-white p-2 text-center text-sm">
          {poseDetection.errorMessage || "Camera access required for pose detection"}
        </div>
      )}
      
      {isActive && poseDetection.isDetecting && (
        <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
          Tracking {targetPose ? targetPose.replace('_', ' ') : 'pose'}
        </div>
      )}
    </div>
  );
};

export default PoseTracker;