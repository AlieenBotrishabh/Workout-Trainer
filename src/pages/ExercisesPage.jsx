import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../util/api';

const ExercisesPage = () => {
  const [exercises, setExercises] = useState([]);
  const [filteredExercises, setFilteredExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMuscleGroups, setSelectedMuscleGroups] = useState([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState('');

  const muscleGroups = [
    'Chest', 'Back', 'Shoulders', 'Arms', 'Legs', 'Core', 'Full Body'
  ];
  
  const difficulties = ['beginner', 'intermediate', 'advanced'];

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await api.get('/exercises');
        setExercises(response.data.data);
        setFilteredExercises(response.data.data);
      } catch (error) {
        console.error('Error fetching exercises:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchExercises();
  }, []);

  useEffect(() => {
    let results = [...exercises];
    
    // Filter by search term
    if (searchTerm) {
      results = results.filter(exercise =>
        exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        exercise.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filter by muscle groups
    if (selectedMuscleGroups.length > 0) {
      results = results.filter(exercise =>
        exercise.muscleGroups.some(group => selectedMuscleGroups.includes(group))
      );
    }
    
    // Filter by difficulty
    if (selectedDifficulty) {
      results = results.filter(exercise => exercise.difficulty === selectedDifficulty);
    }
    
    setFilteredExercises(results);
  }, [searchTerm, selectedMuscleGroups, selectedDifficulty, exercises]);

  const toggleMuscleGroup = (group) => {
    if (selectedMuscleGroups.includes(group)) {
      setSelectedMuscleGroups(selectedMuscleGroups.filter(g => g !== group));
    } else {
      setSelectedMuscleGroups([...selectedMuscleGroups, group]);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Exercise Library</h1>
      
      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search exercises..."
            className="w-full p-3 border border-gray-300 rounded-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Muscle Groups:</h3>
          <div className="flex flex-wrap gap-2">
            {muscleGroups.map(group => (
              <button
                key={group}
                className={`px-3 py-1 rounded-full text-sm ${
                  selectedMuscleGroups.includes(group)
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
                onClick={() => toggleMuscleGroup(group)}
              >
                {group}
              </button>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="font-semibold mb-2">Difficulty:</h3>
          <div className="flex gap-2">
            {difficulties.map(difficulty => (
              <button
                key={difficulty}
                className={`px-3 py-1 rounded-full text-sm ${
                  selectedDifficulty === difficulty
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
                onClick={() => setSelectedDifficulty(difficulty === selectedDifficulty ? '' : difficulty)}
              >
                {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Exercise Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredExercises.length > 0 ? (
          filteredExercises.map(exercise => (
            <div key={exercise._id} className="bg-white rounded-lg shadow-md overflow-hidden">
              {exercise.imageUrl ? (
                <img 
                  src={exercise.imageUrl} 
                  alt={exercise.name} 
                  className="w-full h-48 object-cover"
                />
              ) : (
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400">No image available</span>
                </div>
              )}
              
              <div className="p-4">
                <h2 className="text-xl font-bold mb-2">{exercise.name}</h2>
                
                <div className="flex mb-2">
                  {exercise.muscleGroups.map((group, index) => (
                    <span 
                      key={index}
                      className="bg-blue-100 text-blue-800 text-xs font-semibold mr-1 px-2 py-1 rounded"
                    >
                      {group}
                    </span>
                  ))}
                </div>
                
                <div className="mb-4">
                  <span className={`inline-block px-2 py-1 text-xs font-semibold rounded ${
                    exercise.difficulty === 'beginner' ? 'bg-green-100 text-green-800' :
                    exercise.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {exercise.difficulty.charAt(0).toUpperCase() + exercise.difficulty.slice(1)}
                  </span>
                </div>
                
                <p className="text-gray-600 mb-4">{
                  exercise.description.length > 100
                    ? `${exercise.description.substring(0, 100)}...`
                    : exercise.description
                }</p>
                
                <div className="flex justify-between">
                  <Link 
                    to={`/exercises/${exercise._id}`}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    View Details
                  </Link>
                  
                  {exercise.poseDetectionEnabled && (
                    <span className="text-green-600 font-semibold flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Form Check
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500 text-lg">No exercises match your filters. Try adjusting your search criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExercisesPage;