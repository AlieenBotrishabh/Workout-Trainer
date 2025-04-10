import { useState, useEffect, useCallback } from 'react';
import { fetchData, postData } from '../util/api';

/**
 * Custom hook for workout management
 * @param {Object} options - Configuration options
 * @param {Function} options.isPoseDetected - Function to check if a pose is detected
 * @param {number} options.repThreshold - Threshold for counting reps (default: 1.5 seconds)
 * @returns {Object} Workout state and methods
 */
const useWorkout = ({ isPoseDetected, repThreshold = 1500 }) => {
  const [workouts, setWorkouts] = useState([]);
  const [currentWorkout, setCurrentWorkout] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [exerciseHistory, setExerciseHistory] = useState([]);
  
  // Current exercise state
  const [currentExercise, setCurrentExercise] = useState(null);
  const [reps, setReps] = useState(0);
  const [isHolding, setIsHolding] = useState(false);
  const [holdStartTime, setHoldStartTime] = useState(null);
  const [exerciseState, setExerciseState] = useState('inactive'); // inactive, active, resting
  const [timerValue, setTimerValue] = useState(0);
  const [timerActive, setTimerActive] = useState(false);

  /**
   * Fetch available workouts
   */
  const fetchWorkouts = useCallback(async () => {
    try {
      setLoading(true);
      const fetchedWorkouts = await fetchData('/workouts');
      setWorkouts(fetchedWorkouts);
      setError(null);
    } catch (err) {
      setError('Failed to fetch workouts');
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Fetch user's exercise history
   */
  const fetchExerciseHistory = useCallback(async () => {
    try {
      setLoading(true);
      const history = await fetchData('/user/exercise-history');
      setExerciseHistory(history);
      setError(null);
    } catch (err) {
      setError('Failed to fetch exercise history');
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Start a workout
   * @param {string} workoutId - ID of the workout to start
   */
  const startWorkout = useCallback(async (workoutId) => {
    try {
      setLoading(true);
      const workout = await fetchData(`/workouts/${workoutId}`);
      
      setCurrentWorkout({
        ...workout,
        startTime: new Date(),
        completedExercises: [],
        currentExerciseIndex: 0
      });
      
      if (workout.exercises && workout.exercises.length > 0) {
        setCurrentExercise(workout.exercises[0]);
        setReps(0);
        setExerciseState('active');
        setTimerValue(workout.exercises[0].duration || 60);
        setTimerActive(true);
      }
      
      setError(null);
    } catch (err) {
      setError('Failed to start workout');
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Complete current exercise and move to next
   */
  const completeExercise = useCallback(() => {
    if (!currentWorkout || !currentExercise) return;
    
    const completedExercise = {
      ...currentExercise,
      completedReps: reps,
      completedAt: new Date()
    };
    
    const updatedWorkout = {
      ...currentWorkout,
      completedExercises: [...currentWorkout.completedExercises, completedExercise],
      currentExerciseIndex: currentWorkout.currentExerciseIndex + 1
    };
    
    setCurrentWorkout(updatedWorkout);
    
    // Check if there are more exercises
    if (updatedWorkout.currentExerciseIndex < currentWorkout.exercises.length) {
      const nextExercise = currentWorkout.exercises[updatedWorkout.currentExerciseIndex];
      setCurrentExercise(nextExercise);
      setReps(0);
      setExerciseState('active');
      setTimerValue(nextExercise.duration || 60);
      setTimerActive(true);
    } else {
      // Workout complete
      completeWorkout();
    }
  }, [currentWorkout, currentExercise, reps]);

  /**
   * Complete the current workout
   */
  const completeWorkout = useCallback(async () => {
    if (!currentWorkout) return;
    
    try {
      setLoading(true);
      
      const workoutSummary = {
        workoutId: currentWorkout.id,
        startTime: currentWorkout.startTime,
        endTime: new Date(),
        completedExercises: currentWorkout.completedExercises,
        totalExercises: currentWorkout.exercises.length
      };
      
      await postData('/workouts/complete', workoutSummary);
      
      // Reset current workout state
      setCurrentWorkout(null);
      setCurrentExercise(null);
      setReps(0);
      setExerciseState('inactive');
      setTimerActive(false);
      
      // Refresh exercise history
      await fetchExerciseHistory();
      
      setError(null);
    } catch (err) {
      setError('Failed to save workout results');
    } finally {
      setLoading(false);
    }
  }, [currentWorkout, fetchExerciseHistory]);

  /**
   * Skip the current exercise
   */
  const skipExercise = useCallback(() => {
    if (!currentWorkout || !currentExercise) return;
    
    const skippedExercise = {
      ...currentExercise,
      completedReps: reps,
      skipped: true,
      completedAt: new Date()
    };
    
    const updatedWorkout = {
      ...currentWorkout,
      completedExercises: [...currentWorkout.completedExercises, skippedExercise],
      currentExerciseIndex: currentWorkout.currentExerciseIndex + 1
    };
    
    setCurrentWorkout(updatedWorkout);
    
    // Check if there are more exercises
    if (updatedWorkout.currentExerciseIndex < currentWorkout.exercises.length) {
      const nextExercise = currentWorkout.exercises[updatedWorkout.currentExerciseIndex];
      setCurrentExercise(nextExercise);
      setReps(0);
      setExerciseState('active');
      setTimerValue(nextExercise.duration || 60);
      setTimerActive(true);
    } else {
      // Workout complete
      completeWorkout();
    }
  }, [currentWorkout, currentExercise, reps, completeWorkout]);

  /**
   * Pause the current workout
   */
  const pauseWorkout = useCallback(() => {
    setTimerActive(false);
    setExerciseState('paused');
  }, []);

  /**
   * Resume the current workout
   */
  const resumeWorkout = useCallback(() => {
    setTimerActive(true);
    setExerciseState('active');
  }, []);

  /**
   * Cancel the current workout
   */
  const cancelWorkout = useCallback(() => {
    setCurrentWorkout(null);
    setCurrentExercise(null);
    setReps(0);
    setExerciseState('inactive');
    setTimerActive(false);
  }, []);

  // Pose detection tracking
  useEffect(() => {
    if (!currentExercise || !isPoseDetected || exerciseState !== 'active') return;
    
    const poseDetected = isPoseDetected(currentExercise.pose);
    
    if (poseDetected && !isHolding) {
      // Started holding the pose
      setIsHolding(true);
      setHoldStartTime(Date.now());
    } else if (!poseDetected && isHolding) {
      // Stopped holding the pose
      setIsHolding(false);
      setHoldStartTime(null);
    } else if (poseDetected && isHolding && holdStartTime) {
      // Check if held long enough to count as a rep
      const holdDuration = Date.now() - holdStartTime;
      if (holdDuration >= repThreshold) {
        setReps(prev => prev + 1);
        setIsHolding(false);
        setHoldStartTime(null);
        
        // Check if completed required reps
        if (reps + 1 >= (currentExercise.repetitions || 10)) {
          setExerciseState('resting');
          setTimerValue(currentExercise.restPeriod || 30);
          setTimerActive(true);
        }
      }
    }
  }, [currentExercise, isPoseDetected, exerciseState, isHolding, holdStartTime, reps, repThreshold]);

  // Timer management
  useEffect(() => {
    let interval = null;
    
    if (timerActive && timerValue > 0) {
      interval = setInterval(() => {
        setTimerValue(prev => prev - 1);
      }, 1000);
    } else if (timerActive && timerValue === 0) {
      setTimerActive(false);
      
      if (exerciseState === 'resting') {
        completeExercise();
      }
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerActive, timerValue, exerciseState, completeExercise]);

  // Load workouts on mount
  useEffect(() => {
    fetchWorkouts();
    fetchExerciseHistory();
  }, [fetchWorkouts, fetchExerciseHistory]);

  return {
    workouts,
    currentWorkout,
    currentExercise,
    loading,
    error,
    exerciseHistory,
    reps,
    exerciseState,
    timerValue,
    timerActive,
    isHolding,
    startWorkout,
    completeExercise,
    completeWorkout,
    skipExercise,
    pauseWorkout,
    resumeWorkout,
    cancelWorkout,
    fetchWorkouts,
    fetchExerciseHistory
  };
};

export default useWorkout;
