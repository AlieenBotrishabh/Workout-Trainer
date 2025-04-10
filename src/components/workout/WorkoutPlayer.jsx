import React, { useState, useEffect, useRef } from 'react';
import PoseTracker from './PoseTracker';
import FeedbackDisplay from './FeedbackDisplay';

const WorkoutPlayer = ({ workoutId, onComplete }) => {
  const [workout, setWorkout] = useState(null);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [exerciseComplete, setExerciseComplete] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const timerRef = useRef(null);
  
  // Fetch workout data
  useEffect(() => {
    const fetchWorkout = async () => {
      try {
        // Replace with actual API call
        setTimeout(() => {
          // Sample workout data
          const workoutData = {
            id: workoutId || '1',
            name: 'Full Body HIIT',
            description: 'High intensity interval training',
            duration: '25 mins',
            exercises: [
              {
                id: 1,
                name: 'Jumping Jacks',
                duration: 60,
                description: 'Stand with feet together, arms at sides, then jump while spreading legs and raising arms',
                videoUrl: '/videos/jumping-jacks.mp4',
                targetPose: 'jumping_jack'
              },
              {
                id: 2,
                name: 'Push-ups',
                duration: 45,
                description: 'Start in plank position, lower body until chest nearly touches floor, then push back up',
                videoUrl: '/videos/pushups.mp4',
                targetPose: 'pushup'
              },
              {
                id: 3,
                name: 'Squats',
                duration: 60, 
                description: 'Stand with feet shoulder-width apart, lower body by bending knees, then return to standing',
                videoUrl: '/videos/squats.mp4',
                targetPose: 'squat'
              }
            ]
          };
          
          setWorkout(workoutData);
          setTimeRemaining(workoutData.exercises[0].duration);
          setLoading(false);
        }, 1000);
      } catch (err) {
        setError('Failed to load workout data');
        setLoading(false);
        console.error('Error fetching workout:', err);
      }
    };
    
    fetchWorkout();
    
    // Cleanup function
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [workoutId]);
  
  // Timer management
  useEffect(() => {
    if (isPlaying && timeRemaining > 0) {
      timerRef.current = setInterval(() => {
        setTimeRemaining(prev => prev - 1);
      }, 1000);
    } else if (timeRemaining === 0 && isPlaying) {
      handleExerciseComplete();
    }
    
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isPlaying, timeRemaining]);
  
  const handleExerciseComplete = () => {
    setIsPlaying(false);
    setExerciseComplete(true);
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    // Generate random feedback (in a real app, this would be from pose detection)
    const feedbackOptions = ['Good form!', 'Try to keep your back straight', 'Great job!', 'Remember to breathe'];
    setFeedback(feedbackOptions[Math.floor(Math.random() * feedbackOptions.length)]);
  };
  
  const handleNext = () => {
    if (currentExerciseIndex < workout.exercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
      setTimeRemaining(workout.exercises[currentExerciseIndex + 1].duration);
      setExerciseComplete(false);
      setFeedback(null);
    } else {
      // Workout is complete
      if (onComplete) {
        onComplete();
      }
    }
  };
  
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };
  
  const handlePoseFeedback = (poseFeedback) => {
    setFeedback(poseFeedback);
  };
  
  if (loading) {
    return <div className="p-4 text-center">Loading workout...</div>;
  }
  
  if (error) {
    return <div className="p-4 text-center text-red-500">{error}</div>;
  }
  
  if (!workout) {
    return <div className="p-4 text-center">No workout found</div>;
  }
  
  const currentExercise = workout.exercises[currentExerciseIndex];
  const progress = ((currentExerciseIndex) / workout.exercises.length) * 100;
  
  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">{workout.name}</h1>
        <p className="text-gray-600">{workout.description}</p>
        
        <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4">
          <div 
            className="bg-blue-600 h-2.5 rounded-full" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-500 mt-1">
          Exercise {currentExerciseIndex + 1} of {workout.exercises.length}
        </p>
      </div>
      
      <div className="mb-6">
        <div className="aspect-w-16 aspect-h-9 bg-black rounded-lg overflow-hidden relative">
          {/* This would be a video player in a real app */}
          <div className="absolute inset-0 flex items-center justify-center bg-gray-800 text-white">
            <p>Video Player: {currentExercise.name}</p>
          </div>
          
          {/* Pose tracking overlay */}
          <PoseTracker 
            targetPose={currentExercise.targetPose}
            isActive={isPlaying}
            onFeedback={handlePoseFeedback}
          />
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{currentExercise.name}</h2>
          <div className="text-3xl font-bold">
            {Math.floor(timeRemaining / 60)}:{String(timeRemaining % 60).padStart(2, '0')}
          </div>
        </div>
        
        <p className="text-gray-600 mb-6">{currentExercise.description}</p>
        
        {feedback && (
          <FeedbackDisplay message={feedback} />
        )}
        
        <div className="flex justify-center space-x-4 mt-6">
          {!exerciseComplete ? (
            <button
              onClick={togglePlay}
              className={`px-6 py-2 rounded-full font-medium ${isPlaying 
                ? 'bg-red-500 text-white hover:bg-red-600' 
                : 'bg-green-500 text-white hover:bg-green-600'}`}
            >
              {isPlaying ? 'Pause' : 'Start'}
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="px-6 py-2 bg-blue-500 text-white rounded-full font-medium hover:bg-blue-600"
            >
              {currentExerciseIndex < workout.exercises.length - 1 ? 'Next Exercise' : 'Complete Workout'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkoutPlayer;