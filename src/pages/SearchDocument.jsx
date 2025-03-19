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

      {searchResults && (
        <div className="result-container">
          <h4>Search Results</h4>
          <div className="result-content">
            <pre>{JSON.stringify(searchResults, null, 2)}</pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchDocument;