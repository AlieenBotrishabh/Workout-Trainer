import React, { createContext, useState, useEffect, useContext } from 'react';
import { useAuth } from './AuthContext';

// Create the context
const WorkoutContext = createContext();

// Custom hook for using the workout context
export const useWorkout = () => useContext(WorkoutContext);

// Provider component
export const WorkoutProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const [workouts, setWorkouts] = useState([]);
  const [currentWorkout, setCurrentWorkout] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch user's workouts when authentication state changes
  useEffect(() => {
    if (currentUser) {
      fetchWorkouts();
    } else {
      // Clear workouts when user logs out
      setWorkouts([]);
      setCurrentWorkout(null);
    }
  }, [currentUser]);

  // Fetch workouts from API or local storage
  const fetchWorkouts = async () => {
    if (!currentUser) return;
    
    try {
      setLoading(true);
      setError(null);
      
      // In a real app, this would be an API call
      // Simulating API call with timeout
      setTimeout(() => {
        // Mock workout data
        const mockWorkouts = [
          {
            id: 'w1',
            title: 'Morning Cardio',
            description: '30-minute cardio session',
            exercises: [
              { name: 'Running', duration: 20, calories: 200 },
              { name: 'Jumping Jacks', duration: 5, reps: 100 },
              { name: 'Burpees', duration: 5, reps: 20 }
            ],
            completed: true,
            date: new Date(Date.now() - 86400000).toISOString()
          },
          {
            id: 'w2',
            title: 'Strength Training',
            description: 'Full body workout',
            exercises: [
              { name: 'Push-ups', sets: 3, reps: 15 },
              { name: 'Squats', sets: 3, reps: 20 },
              { name: 'Lunges', sets: 3, reps: 10 }
            ],
            completed: false,
            date: new Date().toISOString()
          }
        ];
        
        setWorkouts(mockWorkouts);
        setLoading(false);
      }, 1000);
    } catch (err) {
      console.error("Failed to fetch workouts:", err);
      setError("Failed to fetch workouts. Please try again.");
      setLoading(false);
    }
  };

  // Add a new workout
  const addWorkout = async (workoutData) => {
    try {
      setLoading(true);
      setError(null);
      
      // In a real app, this would be an API call
      return new Promise((resolve) => {
        setTimeout(() => {
          const newWorkout = {
            id: `w_${Date.now()}`,
            ...workoutData,
            completed: false,
            date: new Date().toISOString()
          };
          
          setWorkouts(prevWorkouts => [...prevWorkouts, newWorkout]);
          setLoading(false);
          resolve(newWorkout);
        }, 500);
      });
    } catch (err) {
      setError("Failed to add workout. Please try again.");
      setLoading(false);
      throw err;
    }
  };

  // Update an existing workout
  const updateWorkout = async (id, workoutData) => {
    try {
      setLoading(true);
      setError(null);
      
      return new Promise((resolve) => {
        setTimeout(() => {
          setWorkouts(prevWorkouts => 
            prevWorkouts.map(workout => 
              workout.id === id ? { ...workout, ...workoutData } : workout
            )
          );
          
          if (currentWorkout && currentWorkout.id === id) {
            setCurrentWorkout(prev => ({ ...prev, ...workoutData }));
          }
          
          setLoading(false);
          resolve({ id, ...workoutData });
        }, 500);
      });
    } catch (err) {
      setError("Failed to update workout. Please try again.");
      setLoading(false);
      throw err;
    }
  };

  // Delete a workout
  const deleteWorkout = async (id) => {
    try {
      setLoading(true);
      setError(null);
      
      return new Promise((resolve) => {
        setTimeout(() => {
          setWorkouts(prevWorkouts => 
            prevWorkouts.filter(workout => workout.id !== id)
          );
          
          if (currentWorkout && currentWorkout.id === id) {
            setCurrentWorkout(null);
          }
          
          setLoading(false);
          resolve({ success: true });
        }, 500);
      });
    } catch (err) {
      setError("Failed to delete workout. Please try again.");
      setLoading(false);
      throw err;
    }
  };

  // Get a specific workout
  const getWorkout = async (id) => {
    const workout = workouts.find(w => w.id === id);
    setCurrentWorkout(workout || null);
    return workout;
  };

  const value = {
    workouts,
    currentWorkout,
    loading,
    error,
    fetchWorkouts,
    addWorkout,
    updateWorkout,
    deleteWorkout,
    getWorkout,
    setCurrentWorkout
  };

  return (
    <WorkoutContext.Provider value={value}>
      {children}
    </WorkoutContext.Provider>
  );
};

export default WorkoutContext;