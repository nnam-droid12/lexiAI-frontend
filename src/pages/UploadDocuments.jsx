import React, { useState } from 'react';
import axios from 'axios';

const UploadDocument = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState('');
  const [uploadError, setUploadError] = useState('');
  const [uploadedFileDetails, setUploadedFileDetails] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setUploadSuccess('');
    setUploadError('');
    setUploadedFileDetails(null);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    
    if (!file) {
      setUploadError('Please select a file to upload');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    const token = localStorage.getItem('accessToken');
    if (!token) {
      setUploadError('Authentication token missing. Please log in again.');
      return;
    }

    try {
      setUploading(true);
      setUploadError('');
      
      const response = await axios.post(
        'https://lexiai.onrender.com/api/v1/document/upload',
        formData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      setUploading(false);
      setUploadSuccess('Document uploaded successfully!');
      setUploadedFileDetails(response.data);
      setFile(null);
      
      // Reset the file input
      document.getElementById('file-upload').value = '';
    } catch (error) {
      setUploading(false);
      setUploadError(
        error.response?.data?.message || 
        'Error uploading document. Please try again.'
      );
    }
  };

  return (
    <div className="upload-section">
      <h2>Upload Document</h2>
      
      <div className="upload-container">
        <form onSubmit={handleUpload}>
          <div className="file-input-container">
            <label htmlFor="file-upload" className="file-label">
              {file ? file.name : 'Choose a file'}
            </label>
            <input
              type="file"
              id="file-upload"
              onChange={handleFileChange}
              className="file-input"
              accept=".pdf,.doc,.docx,.txt"
            />
          </div>
          
          {file && (
            <div className="file-info">
              <p>Selected file: {file.name}</p>
              <p>Size: {(file.size / 1024).toFixed(2)} KB</p>
            </div>
          )}
          
          <button 
            type="submit" 
            className="btn" 
            disabled={uploading || !file}
          >
            {uploading ? 'Uploading...' : 'Upload Document'}
          </button>
        </form>
        
        {uploadError && <div className="error-message">{uploadError}</div>}
        {uploadSuccess && <div className="success-message">{uploadSuccess}</div>}
        
        {uploadedFileDetails && (
          <div className="uploaded-file-details">
            <h3>Uploaded Document Details</h3>
            <div className="details-container">
              <p><strong>File Name:</strong> {uploadedFileDetails.fileName}</p>
              <p><strong>File URL:</strong> {uploadedFileDetails.fileUrl}</p>
              <p><strong>Upload Date:</strong> {new Date(uploadedFileDetails.uploadDate).toLocaleString()}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadDocument;