import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Workout from './pages/Workout';
import ProtectedRoute from './components/ProtectedRoute';
import Instructions from './components/Instructions';
import WorkoutRoutine from './pages/WorkoutRoutine';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/workout" element={
          <ProtectedRoute>
            <Workout />
          </ProtectedRoute>
        } />
        <Route path="/instructions" element={<Instructions />} /> {/* Add route for Instructions */}
        <Route path="/routine" element={<WorkoutRoutine />}></Route>
      </Routes>
    </>
  );
}

export default App;
