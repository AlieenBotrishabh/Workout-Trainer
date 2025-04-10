// client/pages/DashboardPage.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import useWorkout from '../hooks/useWorkout';
import { fetchData } from '../util/api';

const DashboardPage = () => {
  const { user } = useAuth();
  const { workouts, loading: workoutsLoading } = useWorkout();
  const [stats, setStats] = useState({
    totalWorkouts: 0,
    completedWorkouts: 0,
    favoriteExercise: '',
    currentStreak: 0
  });
  const [recentWorkouts, setRecentWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const statsResponse = await fetchData('/api/v1/users/stats');
        const recentWorkoutsResponse = await fetchData('/api/v1/workouts/recent');
        
        setStats(statsResponse.data || statsResponse);
        setRecentWorkouts(recentWorkoutsResponse.data || recentWorkoutsResponse);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        // Initialize with empty data on error
        setStats({
          totalWorkouts: 0,
          completedWorkouts: 0,
          favoriteExercise: '',
          currentStreak: 0
        });
        setRecentWorkouts([]);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchDashboardData();
    } else {
      setLoading(false); // Make sure to stop loading if there's no user
    }
  }, [user]);

  if (loading || workoutsLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Handle the case when user is not available
  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Please log in to view your dashboard</h1>
        <Link to="/login" className="bg-blue-600 text-white hover:bg-blue-700 font-semibold py-2 px-4 rounded transition duration-300">
          Login
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Welcome back, {user?.name || 'User'}</h1>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-gray-500 mb-1">Total Workouts</h3>
          <p className="text-3xl font-bold">{stats.totalWorkouts}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-gray-500 mb-1">Completed Workouts</h3>
          <p className="text-3xl font-bold">{stats.completedWorkouts}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-gray-500 mb-1">Favorite Exercise</h3>
          <p className="text-3xl font-bold">{stats.favoriteExercise || 'N/A'}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-gray-500 mb-1">Current Streak</h3>
          <p className="text-3xl font-bold">{stats.currentStreak} days</p>
        </div>
      </div>
      
      {/* Recent Workouts */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Recent Workouts</h2>
          <Link to="/workouts" className="text-blue-600 hover:text-blue-800">View All</Link>
        </div>
        
        {recentWorkouts && recentWorkouts.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="py-3 px-4 text-left">Workout</th>
                  <th className="py-3 px-4 text-left">Date</th>
                  <th className="py-3 px-4 text-left">Duration</th>
                  <th className="py-3 px-4 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {recentWorkouts.map((workout) => (
                  <tr key={workout._id} className="border-b border-gray-200">
                    <td className="py-3 px-4">{workout.title || workout.name}</td>
                    <td className="py-3 px-4">{workout.completions && workout.completions[0]?.date 
                      ? new Date(workout.completions[0].date).toLocaleDateString() 
                      : 'N/A'}</td>
                    <td className="py-3 px-4">{workout.completions && workout.completions[0]?.duration 
                      ? `${workout.completions[0].duration} min` 
                      : 'N/A'}</td>
                    <td className="py-3 px-4">
                      <Link to={`/workout/${workout._id}`} className="text-blue-600 hover:text-blue-800">
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">You haven't completed any workouts yet.</p>
            <Link to="/exercises" className="bg-blue-600 text-white hover:bg-blue-700 font-semibold py-2 px-4 rounded transition duration-300">
              Find Exercises
            </Link>
          </div>
        )}
      </div>
      
      {/* Recommended Workouts */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Recommended for You</h2>
          <Link to="/workouts" className="text-blue-600 hover:text-blue-800">See More</Link>
        </div>
        
        {workouts && workouts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {workouts.slice(0, 3).map((workout) => (
              <div key={workout._id} className="border rounded-lg overflow-hidden">
                <div className="bg-gray-100 p-4">
                  <h3 className="font-bold">{workout.title || workout.name}</h3>
                  <p className="text-sm text-gray-500">
                    {workout.difficulty} • {workout.duration || '0'} min
                  </p>
                </div>
                <div className="p-4">
                  <p className="text-gray-600 mb-4">{workout.description}</p>
                  <Link 
                    to={`/workout/${workout._id}`} 
                    className="block text-center bg-blue-600 text-white hover:bg-blue-700 font-semibold py-2 px-4 rounded transition duration-300"
                  >
                    Start Workout
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">No recommended workouts available at the moment.</p>
            <Link to="/workouts/create" className="bg-blue-600 text-white hover:bg-blue-700 font-semibold py-2 px-4 rounded transition duration-300">
              Create Workout
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;