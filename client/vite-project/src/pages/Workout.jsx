import React, { useEffect, useRef, useState } from 'react';
import * as posenet from '@tensorflow-models/posenet';
import '@tensorflow/tfjs';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  BarElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  BarElement,
  Tooltip,
  Legend
);

export default function Workout() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const recordedChunksRef = useRef([]);
  const [isRecording, setIsRecording] = useState(false);
  const [videoURL, setVideoURL] = useState('');
  const [postureStatus, setPostureStatus] = useState('');
  const [accuracy, setAccuracy] = useState(0);
  const [workoutData, setWorkoutData] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState('Squats');
  const [repCount, setRepCount] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [lastRepTimestamp, setLastRepTimestamp] = useState(0);
  const [videoPlayback, setVideoPlayback] = useState(false);
  const [cameraStarted, setCameraStarted] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [curlDirection, setCurlDirection] = useState(0); // 0 = down, 1 = up
  const [curlPercentage, setCurlPercentage] = useState(0);
  const [angleData, setAngleData] = useState([]);

  const timestamps = workoutData.map((log) => log.timestamp);
  const postureStatuses = workoutData.map((log) => log.posture === 'Correct Posture' ? 1 : 0);

  const lineChartData = {
    labels: timestamps,
    datasets: [
      {
        label: 'Correct Posture Over Time',
        data: postureStatuses,
        fill: false,
        borderColor: 'green',
        backgroundColor: 'green',
      },
    ],
  };

  const barChartData = {
    labels: ['Correct', 'Incorrect'],
    datasets: [
      {
        label: 'Posture Count',
        data: [correctCount, incorrectCount],
        backgroundColor: ['#22c55e', '#ef4444'],
      },
    ],
  };

  const doughnutChartData = {
    labels: ['Correct Reps', 'Incorrect Reps'],
    datasets: [
      {
        data: [correctCount, incorrectCount],
        backgroundColor: ['#3b82f6', '#f87171'],
      },
    ],
  };

  const angleChartData = {
    labels: angleData.map((_, index) => index),
    datasets: [
      {
        label: 'Joint Angle',
        data: angleData,
        fill: false,
        borderColor: '#10b981',
        backgroundColor: '#10b981',
      },
    ],
  };

  const correctPoses = {
    Squats: {
      leftHip: { x: 0.5, y: 0.6 },
      rightHip: { x: 0.6, y: 0.6 },
      leftKnee: { x: 0.5, y: 0.8 },
      rightKnee: { x: 0.6, y: 0.8 },
      leftAnkle: { x: 0.5, y: 0.9 },
      rightAnkle: { x: 0.6, y: 0.9 },
    },
    Lunges: {
      leftKnee: { x: 0.5, y: 0.8 },
      rightKnee: { x: 0.6, y: 0.8 },
    },
    Plank: {
      leftShoulder: { x: 0.5, y: 0.4 },
      leftHip: { x: 0.5, y: 0.6 },
      leftAnkle: { x: 0.5, y: 0.8 },
    },
    'Push-ups': {
      leftShoulder: { x: 0.5, y: 0.4 },
      leftElbow: { x: 0.5, y: 0.5 },
      leftWrist: { x: 0.5, y: 0.6 },
    },
    Curls: {
      // We'll use dynamic angle calculation instead of fixed positions
      leftShoulder: { x: 0.5, y: 0.3 },
      rightShoulder: { x: 0.6, y: 0.3 },
      leftElbow: { x: 0.5, y: 0.6 },
      rightElbow: { x: 0.6, y: 0.6 },
      leftWrist: { x: 0.5, y: 0.7 },
      rightWrist: { x: 0.6, y: 0.7 },
    },
  };

  useEffect(() => {
    let net;
    let animationFrameId;

    const loadPoseNet = async () => {
      net = await posenet.load();

      const detect = async () => {
        if (
          videoRef.current &&
          videoRef.current.readyState === 4 &&
          canvasRef.current
        ) {
          const pose = await net.estimateSinglePose(videoRef.current, {
            flipHorizontal: false,
          });

          drawPose(pose);

          if (selectedExercise === 'Curls') {
            handleCurlExercise(pose);
          } else {
            const { correct, avgDiff } = isCorrectPosture(pose);
            const status = correct ? 'Correct Posture' : 'Incorrect Posture';
            setPostureStatus(status);
            setAccuracy(((1 - avgDiff) * 100).toFixed(2));

            setFeedbackMessage(
              correct ? '✅ Well done! Keep going!' : '⚠️ Incorrect posture, adjust your form.'
            );

            if (!startTime) setStartTime(Date.now());

            const now = Date.now();
            if (correct && now - lastRepTimestamp > 2000) {
              setRepCount((count) => count + 1);
              setCorrectCount((c) => c + 1);
              setLastRepTimestamp(now);
              playBeep();
            } else if (!correct && now - lastRepTimestamp > 2000) {
              setIncorrectCount((c) => c + 1);
              setLastRepTimestamp(now);
            }

            setWorkoutData((prev) => [
              ...prev,
              {
                timestamp: new Date().toLocaleTimeString(),
                posture: status,
                exercise: selectedExercise,
              },
            ]);
          }
        }
        animationFrameId = requestAnimationFrame(detect);
      };

      detect();
    };

    loadPoseNet();
    return () => cancelAnimationFrame(animationFrameId);
  }, [selectedExercise, isRecording, videoPlayback]);

  // Calculate angle between three points (for curl tracking)
  const calculateAngle = (a, b, c) => {
    if (!a || !b || !c) return 0;
    
    // Calculate angle using the arctan2 method, matching the Python implementation
    const radians = Math.atan2(c.y - b.y, c.x - b.x) - 
                    Math.atan2(a.y - b.y, a.x - b.x);
    
    let angle = Math.abs(radians * 180.0 / Math.PI);
    
    // Ensure angle is within 0-180 range
    if (angle > 180.0) {
      angle = 360.0 - angle;
    }
    
    return angle;
  };

  // Handle curl exercise specifically
  const handleCurlExercise = (pose) => {
    const keypoints = pose.keypoints.reduce(
      (acc, k) => ({ ...acc, [k.part]: k.position }),
      {}
    );
    
    // Get key points for right arm
    const shoulder = keypoints.rightShoulder;
    const elbow = keypoints.rightElbow;
    const wrist = keypoints.rightWrist;
    
    if (shoulder && elbow && wrist) {
      // Calculate arm angle
      const angle = calculateAngle(shoulder, elbow, wrist);
      
      // Calculate percentage of curl completion (similar to Python example)
      const percentage = Math.round(((angle - 30) / (160 - 30)) * 100);
      const boundedPercentage = Math.min(Math.max(percentage, 0), 100);
      setCurlPercentage(boundedPercentage);
      
      // Store angle data for chart
      setAngleData(prev => {
        const newData = [...prev, angle];
        if (newData.length > 30) newData.shift(); // Keep only last 30 measurements
        return newData;
      });
      
      // Set accuracy based on form
      setAccuracy(boundedPercentage);
      
      // Count reps using similar logic to Python example
      if (boundedPercentage >= 95) { // Arm extended
        setPostureStatus('Arm Extended');
        setFeedbackMessage('✅ Arm fully extended');
        
        if (curlDirection === 0) { // If coming from down position
          setRepCount(prev => prev + 0.5);
          setCurlDirection(1);
          setCorrectCount(prev => prev + 0.5);
          playBeep();
        }
      } 
      else if (boundedPercentage <= 5) { // Arm fully bent
        setPostureStatus('Arm Bent');
        setFeedbackMessage('✅ Arm fully bent');
        
        if (curlDirection === 1) { // If coming from up position
          setRepCount(prev => prev + 0.5);
          setCurlDirection(0);
          setCorrectCount(prev => prev + 0.5);
          playBeep();
        }
      }
      else {
        setPostureStatus('In Motion');
        setFeedbackMessage('Keep going!');
      }
      
      // Log workout data
      setWorkoutData(prev => [
        ...prev,
        {
          timestamp: new Date().toLocaleTimeString(),
          posture: `Angle: ${angle.toFixed(1)}°`,
          exercise: 'Curls',
          percentage: boundedPercentage
        }
      ]);
    }
  };

  const isCorrectPosture = (pose) => {
    const refPose = correctPoses[selectedExercise];
    const videoW = videoRef.current.videoWidth;
    const videoH = videoRef.current.videoHeight;
    const kp = pose.keypoints.reduce(
      (acc, k) => ({ ...acc, [k.part]: k.position }),
      {}
    );

    const parts = Object.keys(refPose);
    const diffs = parts.map((part) => {
      if (!kp[part]) return 1;
      const ref = refPose[part];
      const user = kp[part];
      const x = user.x / videoW;
      const y = user.y / videoH;
      
      // More lenient threshold for squats
      if (selectedExercise === 'Squats') {
        return Math.sqrt((ref.x - x) ** 2 + (ref.y - y) ** 2) * 0.7; // Reduce difference by 30%
      }
      return Math.sqrt((ref.x - x) ** 2 + (ref.y - y) ** 2);
    });

    const avgDiff = diffs.reduce((a, b) => a + b, 0) / diffs.length;
    // Adjust threshold for squats
    const threshold = selectedExercise === 'Squats' ? 0.15 : 0.1;
    return { correct: avgDiff < threshold, avgDiff };
  };

  const playBeep = () => {
    const audio = new Audio(
      'https://www.soundjay.com/button/beep-07.wav'
    );
    audio.play();
  };

  const drawPose = (pose) => {
    const ctx = canvasRef.current.getContext('2d');
    canvasRef.current.width = videoRef.current.videoWidth;
    canvasRef.current.height = videoRef.current.videoHeight;
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    drawKeypoints(pose.keypoints, 0.5, ctx);
    drawSkeleton(pose.keypoints, 0.5, ctx);
    drawLabels(pose.keypoints, ctx);
    
    // Draw curl progress bar if doing curls
    if (selectedExercise === 'Curls') {
      drawCurlProgressBar(ctx);
    }
  };

  const drawCurlProgressBar = (ctx) => {
    const width = canvasRef.current.width;
    const height = canvasRef.current.height;
    
    // Draw background rectangle
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(width - 75, 50, 30, 300);
    
    // Draw progress filled rectangle
    const fillHeight = (100 - curlPercentage) / 100 * 300;
    ctx.fillStyle = curlPercentage > 95 || curlPercentage < 5 ? '#22c55e' : '#3b82f6';
    ctx.fillRect(width - 75, 50 + fillHeight, 30, 300 - fillHeight);
    
    // Draw percentage text
    ctx.fillStyle = 'white';
    ctx.font = '16px Arial';
    ctx.fillText(`${curlPercentage}%`, width - 75, 40);
    
    // Draw rep counter
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(width - 100, height - 100, 80, 80);
    ctx.fillStyle = '#22c55e';
    ctx.font = '36px Arial';
    ctx.fillText(Math.floor(repCount), width - 80, height - 40);
  };

  const drawKeypoints = (keypoints, threshold, ctx) => {
    keypoints.forEach((k) => {
      if (k.score > threshold) {
        const { x, y } = k.position;
        ctx.beginPath();
        ctx.arc(x, y, 6, 0, 2 * Math.PI);
        ctx.fillStyle = 'aqua';
        ctx.fill();
      }
    });
  };

  const drawSkeleton = (keypoints, threshold, ctx) => {
    const adjacent = posenet.getAdjacentKeyPoints(keypoints, threshold);
    adjacent.forEach(([from, to]) => {
      ctx.beginPath();
      ctx.moveTo(from.position.x, from.position.y);
      ctx.lineTo(to.position.x, to.position.y);
      ctx.strokeStyle = 'lime';
      ctx.lineWidth = 2;
      ctx.stroke();
    });
  };

  const drawLabels = (keypoints, ctx) => {
    keypoints.forEach((k) => {
      const { x, y } = k.position;
      ctx.fillStyle = 'yellow';
      ctx.font = '12px Arial';
      ctx.fillText(k.part, x + 10, y - 10);
    });
  };

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      if (videoRef.current) {
        setVideoPlayback(true);
        setVideoURL('');
        setRepCount(0);
        setCorrectCount(0);
        setIncorrectCount(0);
        setWorkoutData([]);
        setStartTime(null);
        videoRef.current.srcObject = null;
        videoRef.current.src = url;
        videoRef.current.play();
      }
    }
  };

  const handleCameraStart = async () => {
    if (navigator.mediaDevices && !cameraStarted) {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      setCameraStarted(true);
    }
  };

  const handleStopCamera = () => {
    if (videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setCameraStarted(false);
    }
  };

  const handleRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      mediaRecorderRef.current.stop();
    } else {
      setIsRecording(true);
      recordedChunksRef.current = [];
      const stream = videoRef.current.captureStream();
      mediaRecorderRef.current = new MediaRecorder(stream);
      mediaRecorderRef.current.ondataavailable = (event) => {
        recordedChunksRef.current.push(event.data);
      };
      mediaRecorderRef.current.onstop = () => {
        const videoBlob = new Blob(recordedChunksRef.current, {
          type: 'video/webm',
        });
        setVideoURL(URL.createObjectURL(videoBlob));
      };
      mediaRecorderRef.current.start();
    }
  };

  return (
    <div className="bg-black text-blue-400 p-6 w-screen min-h-screen flex flex-col">
      <h1 className="text-3xl font-bold text-center mb-6">
        🏋️ Workout Posture Trainer
      </h1>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Video Area */}
        <div className="relative w-full max-w-3xl aspect-video border border-blue-800 rounded overflow-hidden shadow">
          <video ref={videoRef} autoPlay muted playsInline className="w-full h-full object-cover" />
          <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />
        </div>

        {/* Controls */}
        <div className="md:w-1/3 space-y-5">
          <div>
            <label className="block font-semibold mb-1">Select Exercise</label>
            <div className="flex flex-wrap gap-2">
              {Object.keys(correctPoses).map((ex) => (
                <button
                  key={ex}
                  onClick={() => {
                    setSelectedExercise(ex);
                    setRepCount(0);
                    setCorrectCount(0);
                    setIncorrectCount(0);
                    setCurlDirection(0);
                    setCurlPercentage(0);
                    setAngleData([]);
                    setWorkoutData([]);
                  }}
                  className={`px-3 py-1 rounded ${
                    selectedExercise === ex
                      ? 'bg-blue-500 text-black'
                      : 'bg-gray-800 border border-blue-600 hover:bg-gray-700'
                  }`}
                >
                  {ex}
                </button>
              ))}
            </div>
          </div>

          <div className="text-lg">
            Posture: <span className={postureStatus === 'Correct Posture' || postureStatus === 'Arm Extended' || postureStatus === 'Arm Bent' ? 'text-green-400' : 'text-red-400'}>{postureStatus}</span>
          </div>
          <div className="text-xl text-yellow-300">{feedbackMessage}</div>
          <div className="text-lg">Rep Count: <span className="text-blue-300">{Math.floor(repCount)}</span></div>
          <div className="text-sm">Accuracy: {accuracy}%</div>

          {/* Buttons */}
          <div className="space-y-3">
            {!cameraStarted ? (
              <>
                <button
                  onClick={handleCameraStart}
                  className="w-full py-2 bg-green-600 rounded text-white hover:bg-green-500"
                >
                  Start Camera
                </button>
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleVideoUpload}
                  className="w-full file:px-4 file:py-2 file:bg-blue-600 file:text-white file:rounded file:cursor-pointer"
                />
              </>
            ) : (
              <>
                <button
                  onClick={handleStopCamera}
                  className="w-full py-2 bg-red-600 rounded text-white hover:bg-red-500"
                >
                  Stop Camera
                </button>
                <button
                  onClick={handleRecording}
                  className={`w-full py-2 rounded text-white ${
                    isRecording ? 'bg-red-600' : 'bg-blue-600 hover:bg-blue-500'
                  }`}
                >
                  {isRecording ? 'Stop Recording' : 'Start Recording'}
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Recorded Video */}
      {videoURL && !isRecording && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold">📹 Recorded Video</h3>
          <video src={videoURL} controls className="w-full mt-2 rounded-lg" />
        </div>
      )}

      {/* Workout Logs */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">📊 Workout Logs</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-64 overflow-y-auto pr-2">
          {workoutData.slice().reverse().map((log, index) => (
            <div key={index} className="p-3 bg-gray-800 border border-blue-700 rounded">
              <div><strong>Time:</strong> {log.timestamp}</div>
              <div><strong>Exercise:</strong> {log.exercise}</div>
              <div><strong>Posture:</strong> {log.posture}</div>
              {log.percentage !== undefined && (
                <div><strong>Completion:</strong> {log.percentage}%</div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4">📈 Visual Analytics</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {selectedExercise === 'Curls' ? (
            <div className="bg-gray-900 p-4 rounded shadow">
              <h3 className="text-lg font-semibold mb-2 text-blue-300">📊 Arm Angle Tracking</h3>
              <Line data={angleChartData} />
            </div>
          ) : (
            <div className="bg-gray-900 p-4 rounded shadow">
              <h3 className="text-lg font-semibold mb-2 text-blue-300">📊 Accuracy Trend</h3>
              <Line data={lineChartData} />
            </div>
          )}

          <div className="bg-gray-900 p-4 rounded shadow">
            <h3 className="text-lg font-semibold mb-2 text-blue-300">🧍‍♂️ Posture Count</h3>
            <Bar data={barChartData} />
          </div>

          <div className="bg-gray-900 p-4 h-full rounded shadow">
            <h3 className="text-lg font-semibold mb-2 text-blue-300">🔄 Reps Distribution</h3>
            <Doughnut data={doughnutChartData} />
          </div>

          {/* Rep Count Over Time */}
          <div className="bg-gray-900 p-4 rounded shadow">
            <h3 className="text-lg font-semibold mb-2 text-blue-300">⏱️ Rep Count Over Time</h3>
            <Line 
              data={{
                labels: timestamps,
                datasets: [
                  {
                    label: 'Rep Count Over Time',
                    data: workoutData.map((log, index) => index + 1),
                    fill: false,
                    borderColor: '#3b82f6',
                    backgroundColor: '#3b82f6',
                  },
                ],
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}