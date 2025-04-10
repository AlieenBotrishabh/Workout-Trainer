import React, { useState, useEffect } from 'react';

const WorkoutPage = () => {
  const [workouts, setWorkouts] = useState([]);
  const [newWorkout, setNewWorkout] = useState({
    name: '',
    description: '',
    duration: '',
    type: 'cardio'
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching workouts from an API
    const fetchWorkouts = async () => {
      try {
        // Replace with actual API call
        setTimeout(() => {
          const sampleWorkouts = [
            { id: 1, name: 'Morning Run', description: '5k run around the park', duration: '30 mins', type: 'cardio' },
            { id: 2, name: 'Weight Training', description: 'Upper body workout', duration: '45 mins', type: 'strength' },
            { id: 3, name: 'Yoga Session', description: 'Relaxing yoga flow', duration: '60 mins', type: 'flexibility' }
          ];
          setWorkouts(sampleWorkouts);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching workouts:', error);
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewWorkout(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const workout = {
      id: workouts.length + 1,
      ...newWorkout
    };
    setWorkouts([...workouts, workout]);
    setNewWorkout({
      name: '',
      description: '',
      duration: '',
      type: 'cardio'
    });
  };

  if (loading) {
    return <div className="p-4 text-center">Loading workouts...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Your Workouts</h1>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Add New Workout</h2>
        <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-gray-100 rounded-lg">
          <div>
            <label htmlFor="name" className="block mb-1">Workout Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={newWorkout.name}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          
          <div>
            <label htmlFor="description" className="block mb-1">Description</label>
            <textarea
              id="description"
              name="description"
              value={newWorkout.description}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              rows="3"
            />
          </div>
          
          <div>
            <label htmlFor="duration" className="block mb-1">Duration</label>
            <input
              type="text"
              id="duration"
              name="duration"
              value={newWorkout.duration}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              placeholder="e.g. 30 mins"
              required
            />
          </div>
          
          <div>
            <label htmlFor="type" className="block mb-1">Workout Type</label>
            <select
              id="type"
              name="type"
              value={newWorkout.type}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            >
              <option value="cardio">Cardio</option>
              <option value="strength">Strength</option>
              <option value="flexibility">Flexibility</option>
              <option value="balance">Balance</option>
              <option value="other">Other</option>
            </select>
          </div>
          
          <button 
            type="submit" 
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Add Workout
          </button>
        </form>
      </div>
      
      <div>
        <h2 className="text-xl font-semibold mb-4">Workout History</h2>
        {workouts.length === 0 ? (
          <p>No workouts found. Add your first workout above!</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {workouts.map(workout => (
              <div key={workout.id} className="border rounded-lg p-4 shadow-sm">
                <h3 className="text-lg font-medium">{workout.name}</h3>
                <p className="text-gray-600 mt-1">{workout.description}</p>
                <div className="mt-3 flex justify-between">
                  <span className="text-sm bg-gray-200 px-2 py-1 rounded">
                    {workout.duration}
                  </span>
                  <span className="text-sm bg-blue-100 px-2 py-1 rounded">
                    {workout.type}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkoutPage;