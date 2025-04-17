// Register Component
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();
  
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/register', form);
      navigate('/login');
    } catch (err) {
      alert('Registration failed. Please try again.');
    }
  };
  
  return (
    <div className="w-screen h-screen bg-black flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-gray-900 p-8 rounded-lg shadow-lg border border-blue-800"
      >
        <h2 className="text-3xl font-semibold text-center text-blue-400 mb-6">Register</h2>
        
        <label className="block mb-2 text-sm font-medium text-blue-300">Name</label>
        <input
          name="name"
          type="text"
          placeholder="Enter your name"
          onChange={handleChange}
          required
          className="w-full px-4 py-2 mb-4 bg-gray-800 border border-blue-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-blue-200 placeholder-blue-500"
        />
        
        <label className="block mb-2 text-sm font-medium text-blue-300">Email</label>
        <input
          name="email"
          type="email"
          placeholder="Enter your email"
          onChange={handleChange}
          required
          className="w-full px-4 py-2 mb-4 bg-gray-800 border border-blue-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-blue-200 placeholder-blue-500"
        />
        
        <label className="block mb-2 text-sm font-medium text-blue-300">Password</label>
        <input
          name="password"
          type="password"
          placeholder="Create a password"
          onChange={handleChange}
          required
          className="w-full px-4 py-2 mb-6 bg-gray-800 border border-blue-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-blue-200 placeholder-blue-500"
        />
        
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-black font-medium py-2 rounded-md transition"
        >
          Register
        </button>
        
        <p className="text-sm text-center mt-4 text-blue-400">
          Already have an account?{' '}
          <span
            onClick={() => navigate('/login')}
            className="text-blue-300 hover:underline cursor-pointer"
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
}