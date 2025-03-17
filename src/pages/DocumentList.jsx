import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AllDocuments = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [readingAloud, setReadingAloud] = useState(false);
  const [readResult, setReadResult] = useState(null);
  const [translating, setTranslating] = useState(false);
  const [translationResult, setTranslationResult] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState('es');

  // Available languages for translation
  const languages = [
    { code: 'es', name: 'Spanish', flag: '🇪🇸' },
    { code: 'fr', name: 'French', flag: '🇫🇷' },
    { code: 'de', name: 'German', flag: '🇩🇪' },
    { code: 'it', name: 'Italian', flag: '🇮🇹' },
    { code: 'pt', name: 'Portuguese', flag: '🇵🇹' },
    { code: 'ru', name: 'Russian', flag: '🇷🇺' },
    { code: 'zh', name: 'Chinese', flag: '🇨🇳' },
    { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
    { code: 'ko', name: 'Korean', flag: '🇰🇷' },
    { code: 'ar', name: 'Arabic', flag: '🇦🇪' },
  ];

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      setError('Authentication token missing. Please log in again.');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get(
        'https://lexiai.onrender.com/api/v1/document/get-all-document',
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      
      setDocuments(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching documents:', error);
      setError(
        error.response?.data?.message || 
        'Error fetching documents. Please try again.'
      );
      setLoading(false);
    }
  };

  const handleViewDetails = async (document) => {
    setSelectedDocument(document);
    setAnalysisResult(null);
    setReadResult(null);
    setTranslationResult(null);
    setSuccessMessage('');
    setError('');
    
    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.get(
        `https://lexiai.onrender.com/api/v1/document/get-document-byName/${encodeURIComponent(document.fileName)}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      
      setSelectedDocument(response.data);
    } catch (error) {
      console.error('Error fetching document details:', error);
      setError('Error fetching document details. Please try again.');
    }
  };

  const handleCloseDetails = () => {
    setSelectedDocument(null);
    setAnalysisResult(null);
    setReadResult(null);
    setTranslationResult(null);
    setSuccessMessage('');
    setError('');
  };

  const handleAnalyze = async () => {
    if (!selectedDocument || !selectedDocument.fileUrl) {
      setError('File URL is missing. Cannot analyze document.');
      return;
    }

    try {
      setAnalyzing(true);
      setAnalysisResult(null);
      setError('');
      
      const token = localStorage.getItem('accessToken');
      
      console.log('Sending analyze request with URL:', selectedDocument.fileUrl);
      
      // Attempt using post instead of get for the analyze endpoint
      const response = await axios({
        method: 'post',  // Try POST instead of GET
        url: 'https://lexiai.onrender.com/api/v1/document/analyze',
        params: {
          fileUrl: selectedDocument.fileUrl
        },
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      console.log('Analysis response:', response.data);
      setAnalysisResult(response.data);
      setAnalyzing(false);
    } catch (error) {
      console.error('Error analyzing document:', error);
      setError(
        error.response?.data?.message || 
        `Error analyzing document (${error.response?.status || 'unknown error'}). Please try again.`
      );
      setAnalyzing(false);
    }
  };


  const handleReadAloud = async () => {
  if (!selectedDocument || !selectedDocument.fileUrl) {
    setError('File URL is missing. Cannot read document aloud.');
    return;
  }

  try {
    setReadingAloud(true);
    setReadResult(null);
    setError('');
    
    const token = localStorage.getItem('accessToken');
    if (!token) {
      throw new Error('Authentication token is missing. Please log in again.');
    }
    
    // Create payload
    const payload = analysisResult || { 
      fileUrl: selectedDocument.fileUrl,
      // Include empty structures matching the expected format
      keyValuePairs: {},
      paragraphs: [],
      tables: []
    };
    
    console.log('Read aloud payload:', JSON.stringify(payload));
    
    // Make the request with responseType: 'blob' to handle audio data
    const response = await axios({
      method: 'post',
      url: 'https://lexiai.onrender.com/api/v1/document/read',
      data: payload,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      responseType: 'blob' // This is crucial for handling audio data
    });
    
    console.log('Read response type:', response.data.type);
    
    // Create a URL for the audio blob
    const audioUrl = URL.createObjectURL(response.data);
    
    // Create an audio element to play the speech
    const audio = new Audio(audioUrl);
    
    // Play the audio
    audio.play().then(() => {
      console.log('Audio playback started');
    }).catch(playError => {
      console.error('Audio playback failed:', playError);
      setError('Failed to play audio. Your browser might be blocking autoplay.');
    });
    
    // Set the audio object in state if you want to control it later
    setReadResult({ 
      audioUrl, 
      status: 'Playing audio...',
      // Store the audio object for potential playback control
      audioControl: audio
    });
    
    // Add event listeners for audio completion
    audio.onended = () => {
      console.log('Audio playback completed');
      setReadResult(prev => ({ ...prev, status: 'Audio playback completed' }));
      setReadingAloud(false);
    };
    
    audio.onerror = (e) => {
      console.error('Audio error:', e);
      setError('Error playing audio');
      setReadingAloud(false);
    };
    
  } catch (error) {
    console.error('Error reading document aloud:', error);
    
    if (error.response) {
      console.error('Error response status:', error.response.status);
      console.error('Error response type:', error.response.headers?.['content-type']);
      
      // If we got a 403 but the content type is audio, it might be a CORS issue
      if (error.response.status === 403 && 
          error.response.headers?.['content-type']?.includes('audio')) {
        setError('Audio streaming is blocked. This might be a CORS issue.');
      } else {
        setError(
          error.response?.data?.message || 
          `Error reading document aloud (${error.response?.status || 'unknown error'}). Please try again.`
        );
      }
    } else {
      setError(`Error: ${error.message}`);
    }
    
    setReadingAloud(false);
  }
};



  const handleTranslate = async () => {
    if (!selectedDocument || !selectedDocument.fileUrl) {
      setError('File URL is missing. Cannot translate document.');
      return;
    }

    try {
      setTranslating(true);
      setTranslationResult(null);
      setError('');
      
      const token = localStorage.getItem('accessToken');
      const response = await axios.post(
        'https://lexiai.onrender.com/api/v1/document/translate-document',
        {
          fileUrl: selectedDocument.fileUrl,
          targetLanguage: selectedLanguage
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      setTranslationResult(response.data);
      setTranslating(false);
    } catch (error) {
      console.error('Error translating document:', error);
      setError(
        error.response?.data?.message || 
        `Error translating document (${error.response?.status || 'unknown error'}). Please try again.`
      );
      setTranslating(false);
    }
  };

  const handleDeleteDocument = async (fileName) => {
    if (!fileName) {
      setError('File name is missing. Cannot delete document.');
      return;
    }

    if (!window.confirm('Are you sure you want to delete this document?')) {
      return;
    }

    try {
      setLoading(true);
      setError('');
      
      const token = localStorage.getItem('accessToken');
      await axios.delete(
        `https://lexiai.onrender.com/api/v1/document/delete/${encodeURIComponent(fileName)}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      
      // If the deleted document is currently selected, clear the selection
      if (selectedDocument && selectedDocument.fileName === fileName) {
        setSelectedDocument(null);
      }
      
      // Fetch the updated list of documents
      fetchDocuments();
      setSuccessMessage('Document deleted successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error deleting document:', error);
      setError(
        error.response?.data?.message || 
        'Error deleting document. Please try again.'
      );
      setLoading(false);
    }
  };

  if (loading && documents.length === 0) {
    return <div className="loader">Loading documents...</div>;
  }

  return (
    <div className="all-documents-section">
      <h2>All Documents</h2>
      
      {successMessage && <div className="success-message">{successMessage}</div>}
      {error && <div className="error-message">{error}</div>}
      
      {selectedDocument ? (
        <div className="document-details">
          <div className="document-details-header">
            <h3>Document Details: {selectedDocument.fileName}</h3>
            <button className="btn-close" onClick={handleCloseDetails}>×</button>
          </div>
          <div className="document-details-content">
            <p><strong>File Name:</strong> {selectedDocument.fileName}</p>
            <p><strong>File URL:</strong> {selectedDocument.fileUrl}</p>
            
            <div className="document-actions">
              <button 
                className="btn" 
                onClick={handleAnalyze}
                disabled={analyzing}
              >
                {analyzing ? 'Analyzing...' : 'Analyze'}
              </button>
              <button 
                className="btn btn-secondary" 
                onClick={handleReadAloud}
                disabled={readingAloud}
              >
                {readingAloud ? 'Reading...' : 'Read Aloud'}
              </button>
              
              <div className="translate-container">
                <select 
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="language-select"
                >
                  {languages.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.flag} {lang.name}
                    </option>
                  ))}
                </select>
                <button 
                  className="btn" 
                  onClick={handleTranslate}
                  disabled={translating}
                >
                  {translating ? 'Translating...' : 'Translate'}
                </button>
              </div>
            </div>
            
            {analysisResult && (
              <div className="result-container">
                <h4>Analysis Result</h4>
                <pre className="result-content">{JSON.stringify(analysisResult, null, 2)}</pre>
              </div>
            )}
            
            {readResult && (
  <div className="result-container">
    <h4>Read Aloud</h4>
    <div className="audio-controls">
      <p>{readResult.status}</p>
      {readResult.audioControl && (
        <div className="audio-buttons">
          <button 
            className="btn btn-secondary btn-sm"
            onClick={() => {
              if (readResult.audioControl.paused) {
                readResult.audioControl.play();
                setReadResult(prev => ({ ...prev, status: 'Playing audio...' }));
              } else {
                readResult.audioControl.pause();
                setReadResult(prev => ({ ...prev, status: 'Audio paused' }));
              }
            }}
          >
            {readResult.audioControl.paused ? 'Resume' : 'Pause'}
          </button>
          <button 
            className="btn btn-danger btn-sm"
            onClick={() => {
              readResult.audioControl.pause();
              readResult.audioControl.currentTime = 0;
              setReadResult(prev => ({ ...prev, status: 'Audio stopped' }));
            }}
          >
            Stop
          </button>
        </div>
      )}
    </div>
  </div>
)}
            
            {translationResult && (
              <div className="result-container">
                <h4>Translation Result</h4>
                <pre className="result-content">{JSON.stringify(translationResult, null, 2)}</pre>
              </div>
            )}
          </div>
        </div>
      ) : (
        <>
          {documents.length === 0 ? (
            <div className="no-documents">
              <p>No documents found. Please upload a document first.</p>
            </div>
          ) : (
            <div className="documents-list">
              <table>
                <thead>
                  <tr>
                    <th>File Name</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {documents.map((doc, index) => (
                    <tr key={doc.id || doc.fileName || index}>
                      <td>{doc.fileName}</td>
                      <td>
                        <div className="table-actions">
                          <button 
                            className="btn-secondary btn-sm"
                            onClick={() => handleViewDetails(doc)}
                          >
                            Details
                          </button>
                          <button 
                            className="btn-danger btn-sm"
                            onClick={() => handleDeleteDocument(doc.fileName)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AllDocuments;