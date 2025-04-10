import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const WorkoutComplete = ({ workoutId, duration, calories, performance }) => {
  const [summaryData, setSummaryData] = useState(null);
  const [showConfetti, setShowConfetti] = useState(true);
  const [loading, setLoading] = useState(true);

  // Default values if props are not provided
  const workoutDuration = duration || '25:00';
  const caloriesBurned = calories || 320;
  const performanceScore = performance || 87;
  
  useEffect(() => {
    // Simulate API call to get workout summary
    const fetchWorkoutSummary = async () => {
      try {
        // In a real app, this would be an actual API call
        setTimeout(() => {
          const data = {
            id: workoutId || '1',
            name: 'Full Body HIIT',
            totalExercises: 8,
            completedExercises: 8,
            personalBest: true,
            previousRecord: '22:30',
            streak: 3,
            nextWorkoutRecommendation: 'Upper Body Focus'
          };
          
          setSummaryData(data);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching workout summary:', error);
        setLoading(false);
      }
    };
    
    fetchWorkoutSummary();
    
    // Cleanup confetti after 5 seconds
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 5000);
    
    return () => clearTimeout(timer);
  }, [workoutId]);
  
  // Simulate confetti animation
  const renderConfetti = () => {
    if (!showConfetti) return null;
    
    const confettiPieces = [];
    const colors = ['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500'];
    
    for (let i = 0; i < 50; i++) {
      const left = `${Math.random() * 100}%`;
      const top = `${Math.random() * 100}%`;
      const size = `${Math.random() * 10 + 5}px`;
      const color = colors[Math.floor(Math.random() * colors.length)];
      const delay = `${Math.random() * 5}s`;
      
      confettiPieces.push(
        <div 
          key={i}
          className={`absolute rounded-full ${color} opacity-70 animate-confetti`}
          style={{ 
            left, 
            top, 
            width: size, 
            height: size,
            animationDelay: delay
          }}
        />
      );
    }
    
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {confettiPieces}
      </div>
    );
  };
  
  if (loading) {
    return <div className="p-4 text-center">Loading workout summary...</div>;
  }
  
  return (
    <div className="relative max-w-2xl mx-auto p-4">
      {renderConfetti()}
      
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold">Workout Complete!</h1>
        <p className="text-gray-600 mt-2">Great job on finishing your workout</p>
      </div>
      
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">{summaryData.name} Summary</h2>
        
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center">
            <p className="text-gray-500 text-sm">Duration</p>
            <p className="text-2xl font-semibold">{workoutDuration}</p>
          </div>
          <div className="text-center">
            <p className="text-gray-500 text-sm">Calories</p>
            <p className="text-2xl font-semibold">{caloriesBurned}</p>
          </div>
          <div className="text-center">
            <p className="text-gray-500 text-sm">Performance</p>
            <p className="text-2xl font-semibold">{performanceScore}%</p>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span>Exercises Completed</span>
            <span className="font-medium">{summaryData.completedExercises}/{summaryData.totalExercises}</span>
          </div>
          
          {summaryData.personalBest && (
            <div className="bg-blue-50 border border-blue-200 rounded-md p-3 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <div>
                <p className="font-medium">New Personal Best!</p>
                <p className="text-sm text-gray-600">Previous: {summaryData.previousRecord}</p>
              </div>
            </div>
          )}
          
          <div className="flex justify-between items-center">
            <span>Current Streak</span>
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">{summaryData.streak} days</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-2">Recommended Next</h2>
        <p className="text-gray-600 mb-4">Based on your performance and history</p>
        
        <div className="border rounded-lg p-4 flex justify-between items-center">
          <div>
            <h3 className="font-medium">{summaryData.nextWorkoutRecommendation}</h3>
            <p className="text-sm text-gray-500">30 minutes • Intermediate</p>
          </div>
          <Link 
            to={`/workouts/recommended`}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            View
          </Link>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
        <Link 
          to="/dashboard" 
          className="flex-1 px-4 py-3 bg-gray-200 text-gray-800 rounded text-center font-medium hover:bg-gray-300"
        >
          Back to Dashboard
        </Link>
        <Link 
          to="/share" 
          className="flex-1 px-4 py-3 bg-blue-500 text-white rounded text-center font-medium hover:bg-blue-600"
        >
          Share Result
        </Link>
      </div>
    </div>
  );
};

export default WorkoutComplete;