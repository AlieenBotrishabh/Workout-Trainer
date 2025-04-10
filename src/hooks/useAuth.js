import { useState, useEffect, useCallback } from 'react';
import { fetchData, postData, setAuthToken, clearAuthToken, isAuthenticated } from '../util/api';

/**
 * Custom hook for authentication management
 * @returns {Object} Authentication methods and state
 */
const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Load user data from token if available
   */
  const loadUser = useCallback(async () => {
    if (!isAuthenticated()) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const userData = await fetchData('/user/profile');
      setUser(userData);
      setError(null);
    } catch (err) {
      setError('Failed to load user data');
      clearAuthToken();
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Login user with email and password
   * @param {string} email - User email
   * @param {string} password - User password
   * @returns {Promise<Object>} - User data or error
   */
  const login = async (email, password) => {
    try {
      setLoading(true);
      const response = await postData('/auth/login', { email, password });
      
      if (response.token) {
        setAuthToken(response.token);
        await loadUser();
        return { success: true, user };
      } else {
        throw new Error('No token received');
      }
    } catch (err) {
      setError(err.message || 'Login failed');
      return { success: false, error: err.message || 'Login failed' };
    } finally {
      setLoading(false);
    }
  };

  /**
   * Register a new user
   * @param {Object} userData - User registration data
   * @returns {Promise<Object>} - User data or error
   */
  const register = async (userData) => {
    try {
      setLoading(true);
      const response = await postData('/auth/register', userData);
      
      if (response.token) {
        setAuthToken(response.token);
        await loadUser();
        return { success: true, user };
      } else {
        throw new Error('Registration successful but no token received');
      }
    } catch (err) {
      setError(err.message || 'Registration failed');
      return { success: false, error: err.message || 'Registration failed' };
    } finally {
      setLoading(false);
    }
  };

  /**
   * Logout the current user
   */
  const logout = useCallback(() => {
    clearAuthToken();
    setUser(null);
  }, []);

  /**
   * Update user profile
   * @param {Object} profileData - Updated profile data
   * @returns {Promise<Object>} - Updated user data or error
   */
  const updateProfile = async (profileData) => {
    try {
      setLoading(true);
      const updatedUser = await postData('/user/update', profileData);
      setUser(updatedUser);
      return { success: true, user: updatedUser };
    } catch (err) {
      setError(err.message || 'Failed to update profile');
      return { success: false, error: err.message || 'Failed to update profile' };
    } finally {
      setLoading(false);
    }
  };

  // Load user data on mount
  useEffect(() => {
    loadUser();
  }, [loadUser]);

  return {
    user,
    loading,
    error,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    updateProfile,
    loadUser
  };
};

export default useAuth;