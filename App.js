import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import StartPage from './StartPage'; // Import StartPage component
import Dashboard from './Dashboard'; // Import Dashboard component
import Signup from './Signup'; // Import Signup component
import WorkoutLogger from './WorkoutLogger'; // Import WorkoutLogger component
import MealTracker from './MealTracker'; 
import './App.css';// Import MealTracker component

// Simulating authentication check (can be replaced with real auth logic)
const isAuthenticated = () => {
  return !!localStorage.getItem('token'); // Example: check for token in localStorage
};

// Protected Route Component
const ProtectedRoute = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/signup" replace />;
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StartPage />} /> {/* StartPage route */}
        <Route path="/signup" element={<Signup />} /> {/* Signup route */}
        {/* Protected Dashboard route */}
        <Route path="/dashboard" element={<Dashboard />} /> 
        <Route path="/workout-logger" element={<WorkoutLogger />} /> {/* WorkoutLogger route */}
        <Route path="/meal-tracker" element={<MealTracker />} /> {/* MealTracker route */}
      </Routes>
    </Router>
  );
};

export default App;
