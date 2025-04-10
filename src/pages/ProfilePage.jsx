import React, { useState, useEffect } from 'react';

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [editedProfile, setEditedProfile] = useState({
    name: '',
    email: '',
    age: '',
    weight: '',
    height: '',
    fitnessGoal: ''
  });

  useEffect(() => {
    // Simulate fetching profile from an API
    const fetchProfile = async () => {
      try {
        // Replace with actual API call
        setTimeout(() => {
          const userProfile = {
            id: 1,
            name: 'John Doe',
            email: 'john.doe@example.com',
            age: 28,
            weight: '75 kg',
            height: '180 cm',
            fitnessGoal: 'Build muscle and improve endurance',
            memberSince: '2023-06-15'
          };
          setProfile(userProfile);
          setEditedProfile(userProfile);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching profile:', error);
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setProfile(editedProfile);
    setIsEditing(false);
    // Here you would typically make an API call to update the profile
    console.log('Profile updated:', editedProfile);
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  if (loading) {
    return <div className="p-4 text-center">Loading profile...</div>;
  }

  if (!profile) {
    return <div className="p-4 text-center">Profile not found.</div>;
  }

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">User Profile</h1>
      
      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-gray-100 rounded-lg">
          <div>
            <label htmlFor="name" className="block mb-1">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={editedProfile.name}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block mb-1">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={editedProfile.email}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="age" className="block mb-1">Age</label>
              <input
                type="number"
                id="age"
                name="age"
                value={editedProfile.age}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
            </div>
            
            <div>
              <label htmlFor="weight" className="block mb-1">Weight</label>
              <input
                type="text"
                id="weight"
                name="weight"
                value={editedProfile.weight}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                placeholder="e.g. 75 kg"
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="height" className="block mb-1">Height</label>
            <input
              type="text"
              id="height"
              name="height"
              value={editedProfile.height}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              placeholder="e.g. 180 cm"
            />
          </div>
          
          <div>
            <label htmlFor="fitnessGoal" className="block mb-1">Fitness Goal</label>
            <textarea
              id="fitnessGoal"
              name="fitnessGoal"
              value={editedProfile.fitnessGoal}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              rows="3"
            />
          </div>
          
          <div className="flex space-x-4">
            <button 
              type="submit" 
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Save Changes
            </button>
            <button 
              type="button" 
              onClick={handleCancel}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">{profile.name}</h2>
            <button 
              onClick={handleEditClick}
              className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Edit Profile
            </button>
          </div>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-500 text-sm">Email</p>
                <p>{profile.email}</p>
              </div>
              
              <div>
                <p className="text-gray-500 text-sm">Member Since</p>
                <p>{new Date(profile.memberSince).toLocaleDateString()}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 border-t">
              <div>
                <p className="text-gray-500 text-sm">Age</p>
                <p>{profile.age} years</p>
              </div>
              
              <div>
                <p className="text-gray-500 text-sm">Weight</p>
                <p>{profile.weight}</p>
              </div>
              
              <div>
                <p className="text-gray-500 text-sm">Height</p>
                <p>{profile.height}</p>
              </div>
            </div>
            
            <div className="pt-2 border-t">
              <p className="text-gray-500 text-sm">Fitness Goal</p>
              <p>{profile.fitnessGoal}</p>
            </div>
          </div>
        </div>
      )}
      
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Fitness Stats</h2>
        <div className="bg-white shadow rounded-lg p-6">
          <p className="text-center text-gray-500">
            Workout statistics and progress charts will be displayed here.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;