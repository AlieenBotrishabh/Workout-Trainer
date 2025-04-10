import React, { createContext, useState, useEffect, useContext } from 'react';

// Create the context
const AuthContext = createContext();

// Custom hook for using the auth context
export const useAuth = () => useContext(AuthContext);

// Provider component
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if user is already logged in on initial load
  useEffect(() => {
    const checkLoggedInStatus = async () => {
      try {
        // Get stored user from localStorage
        const storedUser = localStorage.getItem('user');
        
        if (storedUser) {
          setCurrentUser(JSON.parse(storedUser));
        }
      } catch (err) {
        console.error("Failed to restore authentication state:", err);
        setError("Failed to restore authentication state.");
      } finally {
        setLoading(false);
      }
    };

    checkLoggedInStatus();
  }, []);

  // Sign in function
  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      
      // In a real app, this would be an API call
      // Simulating API call with timeout
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          // Mock successful authentication
          if (email && password) {
            const user = {
              id: "user123",
              email,
              name: "John Doe",
              role: "user"
            };
            
            // Store user in localStorage
            localStorage.setItem('user', JSON.stringify(user));
            setCurrentUser(user);
            resolve(user);
          } else {
            reject(new Error("Invalid credentials"));
            setError("Invalid credentials");
          }
          setLoading(false);
        }, 1000);
      });
    } catch (err) {
      setError(err.message);
      setLoading(false);
      throw err;
    }
  };

  // Sign out function
  const logout = () => {
    localStorage.removeItem('user');
    setCurrentUser(null);
  };

  // Sign up function
  const register = async (email, password, name) => {
    try {
      setLoading(true);
      setError(null);
      
      // In a real app, this would be an API call
      // Simulating API call with timeout
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          // Mock successful registration
          if (email && password && name) {
            const user = {
              id: `user_${Date.now()}`,
              email,
              name,
              role: "user"
            };
            
            // Store user in localStorage
            localStorage.setItem('user', JSON.stringify(user));
            setCurrentUser(user);
            resolve(user);
          } else {
            reject(new Error("Missing required fields"));
            setError("Missing required fields");
          }
          setLoading(false);
        }, 1000);
      });
    } catch (err) {
      setError(err.message);
      setLoading(false);
      throw err;
    }
  };

  const value = {
    currentUser,
    loading,
    error,
    login,
    logout,
    register,
    isAuthenticated: !!currentUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;