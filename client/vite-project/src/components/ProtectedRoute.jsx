import React from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token');

  // If user is not logged in, redirect to login page
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // If token exists, allow access
  return children;
}
