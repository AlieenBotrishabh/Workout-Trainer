import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = !!localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-gray-900 shadow-md border-b border-blue-800 px-6 py-4 flex items-center justify-between">
      <div className="text-xl font-semibold text-blue-400">
        <Link to="/">🏋️ Workout Trainer</Link>
      </div>
      <div className="flex gap-4 items-center">
        <Link
          to="/"
          className={`text-sm font-medium px-3 py-2 rounded-md ${
            isActive('/') ? 'bg-blue-700 text-black' : 'text-blue-300 hover:bg-gray-800'
          }`}
        >
          Home
        </Link>

        {isLoggedIn ? (
          <>
            <Link
              to="/workout"
              className={`text-sm font-medium px-3 py-2 rounded-md ${
                isActive('/workout') ? 'bg-blue-700 text-black' : 'text-blue-300 hover:bg-gray-800'
              }`}
            >
              Workout
            </Link>
            <Link
              to="/routine"
              className={`text-sm font-medium px-3 py-2 rounded-md ${
                isActive('/routine') ? 'bg-blue-700 text-black' : 'text-blue-300 hover:bg-gray-800'
              }`}
            >
              Routine
            </Link>
            <button
              onClick={handleLogout}
              className="text-sm font-medium bg-red-800 hover:bg-red-700 text-blue-200 px-3 py-2 rounded-md"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className={`text-sm font-medium px-3 py-2 rounded-md ${
                isActive('/login') ? 'bg-blue-700 text-black' : 'text-blue-300 hover:bg-gray-800'
              }`}
            >
              Login
            </Link>
            <Link
              to="/register"
              className={`text-sm font-medium px-3 py-2 rounded-md ${
                isActive('/register') ? 'bg-blue-700 text-black' : 'text-blue-300 hover:bg-gray-800'
              }`}
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
