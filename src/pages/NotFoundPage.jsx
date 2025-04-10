import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-gray-300">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mt-4">Page Not Found</h2>
        <p className="text-gray-500 mt-2 mb-6">
          Sorry, we couldn't find the page you were looking for.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/"
            className="px-6 py-3 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition-colors"
          >
            Go to Home
          </Link>
          <Link
            to="/workouts"
            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-md shadow hover:bg-gray-300 transition-colors"
          >
            View Workouts
          </Link>
        </div>
      </div>
      
      <div className="mt-12 text-center">
        <p className="text-gray-500">
          Need help? <a href="#" className="text-blue-600 hover:underline">Contact Support</a>
        </p>
      </div>
    </div>
  );
};

export default NotFoundPage;