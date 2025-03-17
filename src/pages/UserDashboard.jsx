import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UploadDocument from './UploadDocuments';
import AllDocuments from './DocumentList';
import './Dashboard.css';

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState('upload');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Check authentication
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      navigate('/signin');
    }
  }, [navigate]);

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    navigate('/signin');
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="logo">
          <h2>LexiAI</h2>
        </div>
        <ul className="sidebar-menu">
          <li 
            className={activeSection === 'upload' ? 'active' : ''} 
            onClick={() => setActiveSection('upload')}
          >
            Upload Document
          </li>
          <li 
            className={activeSection === 'all-documents' ? 'active' : ''} 
            onClick={() => setActiveSection('all-documents')}
          >
            All Documents
          </li>
          <li 
            className={activeSection === 'search' ? 'active' : ''} 
            onClick={() => setActiveSection('search')}
          >
            Search Document
          </li>
          <li onClick={handleLogout}>Logout</li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="header">
          <h1>Dashboard</h1>
          <div className="user-info">
            <span>Welcome back</span>
          </div>
        </div>

        {/* Content sections */}
        <div className="content">
          {isLoading && <div className="loader">Loading...</div>}
          {error && <div className="error-message">{error}</div>}

          {/* Different sections will be rendered based on activeSection state */}
          {activeSection === 'upload' && <UploadDocument />}
          {activeSection === 'all-documents' && <AllDocuments />}

          {activeSection === 'search' && (
            <div className="section-container">
              <h2>Search Document</h2>
              <p>Search functionality coming in the next step...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;