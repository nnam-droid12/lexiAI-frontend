import React, { useState } from 'react';
import axios from 'axios';
import './Dashboard.css';

const SearchDocument = () => {
  const [fileName, setFileName] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!fileName.trim()) {
      setError('Please enter a file name to search');
      return;
    }

    setIsLoading(true);
    setError('');
    
    try {
      const token = localStorage.getItem('accessToken');
      
      if (!token) {
        setError('You are not authenticated. Please sign in.');
        setIsLoading(false);
        return;
      }

      const response = await axios.get(
        `https://lexiai.onrender.com/api/v1/document/search?fileName=${encodeURIComponent(fileName)}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setSearchResults(response.data);
    } catch (error) {
      console.error('Error searching document:', error);
      setError(error.response?.data?.message || 'Failed to search document. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenDocument = (url) => {
    window.open(url, '_blank');
  };

  return (
    <div className="section-container">
      <h2>Search Document</h2>
      
      <form onSubmit={handleSearch}>
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="fileName" style={{ display: 'block', marginBottom: '8px' }}>
            Document File Name:
          </label>
          <div style={{ display: 'flex' }}>
            <input
              type="text"
              id="fileName"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              placeholder="e.g. contract1.pdf"
              style={{
                padding: '10px',
                borderRadius: '4px 0 0 4px',
                border: '1px solid var(--border-color)',
                backgroundColor: 'var(--background-light)',
                color: 'var(--text-light)',
                flexGrow: 1
              }}
            />
            <button 
              type="submit" 
              className="btn"
              disabled={isLoading}
              style={{ borderRadius: '0 4px 4px 0' }}
            >
              {isLoading ? (
                <>
                  <span className="loading-spinner"></span>
                  Searching...
                </>
              ) : (
                'Search'
              )}
            </button>
          </div>
        </div>
      </form>

      {error && <div className="error-message">{error}</div>}

      {searchResults && searchResults.length > 0 ? (
        <div className="search-results-container">
          <h3 style={{ color: 'var(--primary-color)', marginBottom: '15px' }}>
            Search Results ({searchResults.length} documents found)
          </h3>
          
          <div className="search-results-grid">
            {searchResults.map((doc, index) => (
              <div 
                key={index} 
                className="search-result-card"
                onClick={() => handleOpenDocument(doc.fileUrl)}
              >
                <div className="search-result-icon">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" 
                      stroke="var(--primary-color)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M14 2V8H20" stroke="var(--primary-color)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16 13H8" stroke="var(--primary-color)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16 17H8" stroke="var(--primary-color)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M10 9H9H8" stroke="var(--primary-color)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="search-result-info">
                  <h4 className="search-result-title">{doc.fileName}</h4>
                  <p className="search-result-url">{doc.fileUrl.substring(0, 40)}...</p>
                  <button className="btn-secondary btn-sm">View Document</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : searchResults && searchResults.length === 0 ? (
        <div className="no-results">
          <h3>No documents found</h3>
          <p>Try searching with a different file name</p>
        </div>
      ) : null}
    </div>
  );
};

export default SearchDocument;