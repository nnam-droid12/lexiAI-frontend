import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Signup from './pages/SignUp';
import Signin from './pages/SignIn';
import Dashboard from './pages/UserDashboard';
import './App.css';

// Protected route component
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('accessToken') !== null;
  
  if (!isAuthenticated) {
    return <Navigate to="/signin" />;
  }
  
  return children;
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } 
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;