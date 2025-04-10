import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import Button from '../common/Button';
import Card from '../common/Card';
import { toast } from 'react-hot-toast';
import { User, Mail, Lock, Camera, Save, AlertCircle } from 'lucide-react';

const ProfileSettings = () => {
  const { user, updateProfile, updatePassword } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    height: '',
    weight: '',
    fitnessGoal: 'weight_loss',
    fitnessLevel: 'beginner'
  });
  
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name || '',
        email: user.email || '',
        height: user.height || '',
        weight: user.weight || '',
        fitnessGoal: user.fitnessGoal || 'weight_loss',
        fitnessLevel: user.fitnessLevel || 'beginner'
      });
    }
  }, [user]);

  const handleProfileChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value
    });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value
    });
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await updateProfile(profileData);
      toast.success('Profile updated successfully');
    } catch (err) {
      setError(err.message || 'Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError('New passwords do not match');
      return;
    }
    
    setIsLoading(true);
    setError('');

    try {
      await updatePassword(passwordData.currentPassword, passwordData.newPassword);
      toast.success('Password updated successfully');
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (err) {
      setError(err.message || 'Failed to update password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {error && (
        <div className="bg-red-900/30 border border-red-500 text-red-300 px-4 py-3 rounded flex items-start">
          <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}
      
      <Card title="Profile Information">
        <form onSubmit={handleProfileSubmit} className="space-y-6">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <div className="h-24 w-24 rounded-full bg-primary flex items-center justify-center text-2xl font-bold text-white">
                {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
              </div>
              <button
                type="button"
                className="absolute bottom-0 right-0 bg-dark-light p-2 rounded-full border border-gray-700 text-gray-300 hover:text-white"
              >
                <Camera className="h-4 w-4" />
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={profileData.name}
                  onChange={handleProfileChange}
                  className="block w-full pl-10 p-2 bg-dark-light border border-gray-700 rounded-md text-white focus:ring focus:ring-primary"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={profileData.email}
                  disabled
                  className="block w-full pl-10 p-2 bg-dark-light border border-gray-700 rounded-md text-gray-400"
                />
              </div>
            </div>
          </div>
          
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Saving...' : <><Save className="h-4 w-4 mr-2" /> Save Changes</>}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default ProfileSettings;