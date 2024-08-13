import React from 'react';
import './LoadingSpinner.css';

const LoadingSpinner = () => (
  <div className="loading-spinner-container">
    <div className="loading-spinner"></div>
    <p className="loading-text">Loading...</p>
    <span className="loading-message">(it may take some time)</span>
  </div>
);

export default LoadingSpinner;