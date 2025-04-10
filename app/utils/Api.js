// frontend/utils/api.js

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

/**
 * Generic API request handler with authentication
 * @param {string} endpoint - API endpoint
 * @param {Object} options - Request options
 * @returns {Promise} Response data
 */
const apiRequest = async (endpoint, options = {}) => {
  const token = localStorage.getItem('auth_token');
  
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...defaultOptions,
      ...options,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'API request failed');
    }

    return await response.json();
  } catch (error) {
    console.error('API request error:', error);
    throw error;
  }
};

// Auth API calls
export const auth = {
  login: (credentials) => 
    apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }),

  register: (userData) =>
    apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    }),

  logout: () => {
    localStorage.removeItem('auth_token');
    return Promise.resolve();
  },

  verifyToken: () =>
    apiRequest('/auth/verify'),
};

// Workout API calls
export const workouts = {
  getAll: () =>
    apiRequest('/workouts'),

  getById: (workoutId) =>
    apiRequest(`/workouts/${workoutId}`),

  create: (workoutData) =>
    apiRequest('/workouts', {
      method: 'POST',
      body: JSON.stringify(workoutData),
    }),

  update: (workoutId, workoutData) =>
    apiRequest(`/workouts/${workoutId}`, {
      method: 'PUT',
      body: JSON.stringify(workoutData),
    }),

  delete: (workoutId) =>
    apiRequest(`/workouts/${workoutId}`, {
      method: 'DELETE',
    }),
};

// Progress tracking API calls
export const progress = {
  getHistory: (userId) =>
    apiRequest(`/progress/${userId}`),

  saveWorkoutResult: (progressData) =>
    apiRequest('/progress', {
      method: 'POST',
      body: JSON.stringify(progressData),
    }),

  getStats: (userId, timeRange) =>
    apiRequest(`/progress/${userId}/stats`, {
      method: 'GET',
      params: { timeRange },
    }),

  updateProgress: (progressId, progressData) =>
    apiRequest(`/progress/${progressId}`, {
      method: 'PUT',
      body: JSON.stringify(progressData),
    }),
};

// User profile API calls
export const profile = {
  get: (userId) =>
    apiRequest(`/users/${userId}`),

  update: (userId, profileData) =>
    apiRequest(`/users/${userId}`, {
      method: 'PUT',
      body: JSON.stringify(profileData),
    }),

  updateSettings: (userId, settings) =>
    apiRequest(`/users/${userId}/settings`, {
      method: 'PUT',
      body: JSON.stringify(settings),
    }),

  getWorkoutHistory: (userId) =>
    apiRequest(`/users/${userId}/workouts`),
};

// Exercise API calls
export const exercises = {
  getAll: () =>
    apiRequest('/exercises'),

  getById: (exerciseId) =>
    apiRequest(`/exercises/${exerciseId}`),

  savePoseAnalysis: (exerciseId, poseData) =>
    apiRequest(`/exercises/${exerciseId}/pose`, {
      method: 'POST',
      body: JSON.stringify(poseData),
    }),
};

// Error handling utility
export const handleApiError = (error) => {
  if (error.message === 'Unauthorized') {
    // Handle authentication errors
    auth.logout();
    window.location.href = '/login';
    return;
  }
  
  // Handle other types of errors
  return {
    error: true,
    message: error.message || 'An unexpected error occurred',
  };
};

export default {
  auth,
  workouts,
  progress,
  profile,
  exercises,
  handleApiError,
};