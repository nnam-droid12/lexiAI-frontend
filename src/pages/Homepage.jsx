import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const Homepage = () => {
  const navigate = useNavigate();
  
  const features = [
    {
      title: "Document Upload",
      description: "Easily upload your documents to our secure cloud storage.",
      icon: "📄"
    },
    {
      title: "Data Extraction",
      description: "Automatically extract key information from your documents.",
      icon: "🔍"
    },
    {
      title: "Audio Readout",
      description: "Listen to your documents with our text-to-speech technology.",
      icon: "🔊"
    },
    {
      title: "Multi-language Translation",
      description: "Translate your documents into multiple languages instantly.",
      icon: "🌐"
    }
  ];

  return (
    <div className="homepage">
      <nav className="navbar">
        <div className="logo">LexiAI</div>
        <div className="nav-links">
          <button onClick={() => navigate('/signup')} className="btn btn-secondary">Sign Up</button>
          <button onClick={() => navigate('/signin')} className="btn btn-primary">Sign In</button>
        </div>
      </nav>
      
      <div className="hero-section">
        <div className="hero-content">
          <h1>Transform Your Documents with AI</h1>
          <p>Upload, analyze, listen, and translate your documents with ease.</p>
          <button onClick={() => navigate('/signup')} className="btn btn-primary btn-large">Get Started</button>
        </div>
        <div className="document-animation">
          <div className="floating-docs">
            <div className="doc doc1"></div>
            <div className="doc doc2"></div>
            <div className="doc doc3"></div>
          </div>
        </div>
      </div>
      
      <div className="features-section">
        <h2>Our Features</h2>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
      
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} LexiAI. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Homepage;