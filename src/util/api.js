/**
 * API utility functions for making requests to backend services
 */

// Base URL for API endpoints
const API_BASE_URL = 'https://api.example.com';

/**
 * Make a GET request to the API
 * @param {string} endpoint - The API endpoint to call
 * @param {Object} params - Optional query parameters
 * @returns {Promise<Object>} - The response data
 */
export async function fetchData(endpoint, params = {}) {
  const queryString = new URLSearchParams(params).toString();
  const url = `${API_BASE_URL}${endpoint}${queryString ? `?${queryString}` : ''}`;
  
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAuthToken()}`
      }
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
}

/**
 * Make a POST request to the API
 * @param {string} endpoint - The API endpoint to call
 * @param {Object} data - The data to send in the request body
 * @returns {Promise<Object>} - The response data
 */
export async function postData(endpoint, data = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAuthToken()}`
      },
      body: JSON.stringify(data)
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
}

/**
 * Get the authentication token from localStorage
 * @returns {string|null} The auth token or null if not found
 */
function getAuthToken() {
  return localStorage.getItem('auth_token');
}

/**
 * Set the authentication token in localStorage
 * @param {string} token - The token to store
 */
export function setAuthToken(token) {
  localStorage.setItem('auth_token', token);
}

/**
 * Clear the authentication token from localStorage
 */
export function clearAuthToken() {
  localStorage.removeItem('auth_token');
}

/**
 * Check if the user is authenticated
 * @returns {boolean} True if authenticated, false otherwise
 */
export function isAuthenticated() {
  return !!getAuthToken();
}

const api = {
    fetchData,
    postData,
    isAuthenticated,
    setAuthToken,
    clearAuthToken
  };
  
  export default api;
  