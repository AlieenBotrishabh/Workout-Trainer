import React, { createContext, useState, useEffect, useContext } from 'react';

// Available themes
const themes = {
  light: {
    name: 'light',
    colors: {
      primary: '#3498db',
      secondary: '#2ecc71',
      background: '#ffffff',
      surface: '#f5f5f5',
      text: '#333333',
      textSecondary: '#666666',
      border: '#dddddd',
      error: '#e74c3c',
      success: '#27ae60',
      warning: '#f39c12'
    },
    shadows: {
      small: '0 2px 4px rgba(0,0,0,0.1)',
      medium: '0 4px 8px rgba(0,0,0,0.1)',
      large: '0 8px 16px rgba(0,0,0,0.1)'
    },
    fontSizes: {
      small: '0.875rem',
      medium: '1rem',
      large: '1.25rem',
      xlarge: '1.5rem',
      xxlarge: '2rem'
    }
  },
  dark: {
    name: 'dark',
    colors: {
      primary: '#2980b9',
      secondary: '#27ae60',
      background: '#121212',
      surface: '#1e1e1e',
      text: '#f5f5f5',
      textSecondary: '#b3b3b3',
      border: '#333333',
      error: '#e74c3c',
      success: '#2ecc71',
      warning: '#f39c12'
    },
    shadows: {
      small: '0 2px 4px rgba(0,0,0,0.3)',
      medium: '0 4px 8px rgba(0,0,0,0.3)',
      large: '0 8px 16px rgba(0,0,0,0.3)'
    },
    fontSizes: {
      small: '0.875rem',
      medium: '1rem',
      large: '1.25rem',
      xlarge: '1.5rem',
      xxlarge: '2rem'
    }
  },
  fitness: {
    name: 'fitness',
    colors: {
      primary: '#ff4757',
      secondary: '#5352ed',
      background: '#f1f2f6',
      surface: '#ffffff',
      text: '#2f3542',
      textSecondary: '#57606f',
      border: '#dfe4ea',
      error: '#ff6b81',
      success: '#2ed573',
      warning: '#ffa502'
    },
    shadows: {
      small: '0 2px 4px rgba(0,0,0,0.05)',
      medium: '0 4px 8px rgba(0,0,0,0.05)',
      large: '0 8px 16px rgba(0,0,0,0.05)'
    },
    fontSizes: {
      small: '0.875rem',
      medium: '1rem',
      large: '1.25rem',
      xlarge: '1.5rem',
      xxlarge: '2rem'
    }
  }
};

// Create the context
const ThemeContext = createContext();

// Custom hook for using the theme context
export const useTheme = () => useContext(ThemeContext);

// Provider component
export const ThemeProvider = ({ children }) => {
  // Check for saved theme preference or default to 'light'
  const getSavedTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme && themes[savedTheme] ? savedTheme : 'light';
  };

  const [currentTheme, setCurrentTheme] = useState(getSavedTheme());
  const [systemPreference, setSystemPreference] = useState(false);

  // Watch for system preference changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e) => {
      if (systemPreference) {
        setCurrentTheme(e.matches ? 'dark' : 'light');
      }
    };

    // Check initially
    if (systemPreference) {
      setCurrentTheme(mediaQuery.matches ? 'dark' : 'light');
    }

    // Add listener for changes
    mediaQuery.addEventListener('change', handleChange);
    
    // Cleanup
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [systemPreference]);

  // Save theme preference to localStorage when it changes
  useEffect(() => {
    if (!systemPreference) {
      localStorage.setItem('theme', currentTheme);
    }
  }, [currentTheme, systemPreference]);

  // Apply theme to document
  useEffect(() => {
    const theme = themes[currentTheme];
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    // Apply color variables to :root
    Object.entries(theme.colors).forEach(([key, value]) => {
      document.documentElement.style.setProperty(`--color-${key}`, value);
    });
  }, [currentTheme]);

  // Theme toggling function
  const toggleTheme = () => {
    setSystemPreference(false);
    setCurrentTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  // Set a specific theme
  const setTheme = (themeName) => {
    if (themes[themeName]) {
      setSystemPreference(false);
      setCurrentTheme(themeName);
    }
  };

  // Use system preference
  const useSystemTheme = () => {
    setSystemPreference(true);
    const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setCurrentTheme(isDarkMode ? 'dark' : 'light');
    localStorage.removeItem('theme');
  };

  const value = {
    currentTheme,
    theme: themes[currentTheme],
    availableThemes: Object.keys(themes),
    toggleTheme,
    setTheme,
    useSystemTheme,
    systemPreference
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;