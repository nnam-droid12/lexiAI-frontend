import React, { useState } from 'react';

const StyledAnalysisResult = ({ analysisResult }) => {
  const [expandedSections, setExpandedSections] = useState({
    keyValuePairs: true,
    paragraphs: true,
    tables: true
  });

  // Handle toggling sections
  const toggleSection = (section) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section]
    });
  };

  if (!analysisResult) return null;

  // Helper function to render key-value pairs
  const renderKeyValuePairs = () => {
    const pairs = analysisResult.keyValuePairs || {};
    const entries = Object.entries(pairs);
    
    if (entries.length === 0) return <p className="empty-message">No key-value pairs found</p>;
    
    return (
      <div className="key-value-container">
        {entries.map(([key, value], index) => (
          <div className="key-value-row" key={index}>
            <div className="key-field">{key}</div>
            <div className={`value-field ${value === "Unknown Value" ? "unknown-value" : ""} ${value === ":unselected:" ? "unselected-value" : ""}`}>
              {value === ":unselected:" ? "Not Selected" : value}
            </div>
          </div>
        ))}
      </div>
    );
  };

  // Helper function to render paragraphs
  const renderParagraphs = () => {
    const paragraphs = analysisResult.paragraphs || [];
    
    if (paragraphs.length === 0) return <p className="empty-message">No paragraphs found</p>;
    
    return (
      <div className="paragraphs-container">
        {paragraphs.map((paragraph, index) => (
          <div className="paragraph-item" key={index}>
            <div className="paragraph-number">{index + 1}</div>
            <div className="paragraph-text">{paragraph}</div>
          </div>
        ))}
      </div>
    );
  };

  // Helper function to render tables
  const renderTables = () => {
    const tables = analysisResult.tables || [];
    
    if (tables.length === 0) return <p className="empty-message">No tables found</p>;
    
    return (
      <div className="tables-container">
        {tables.map((table, tableIndex) => (
          <div className="table-item" key={tableIndex}>
            <h4 className="table-title">Table {tableIndex + 1}</h4>
            {/* Implement table rendering logic here if you have structure in your tables */}
            <pre className="table-data">{JSON.stringify(table, null, 2)}</pre>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="styled-analysis-result">
      <h3 className="result-title">Document Analysis Result</h3>
      
      {/* Key-Value Pairs Section */}
      <div className="result-section">
        <div 
          className="section-header" 
          onClick={() => toggleSection('keyValuePairs')}
        >
          <h4>Key-Value Pairs</h4>
          <span className="toggle-icon">
            {expandedSections.keyValuePairs ? '−' : '+'}
          </span>
        </div>
        {expandedSections.keyValuePairs && (
          <div className="section-content">
            {renderKeyValuePairs()}
          </div>
        )}
      </div>
      
      {/* Paragraphs Section */}
      <div className="result-section">
        <div 
          className="section-header" 
          onClick={() => toggleSection('paragraphs')}
        >
          <h4>Paragraphs</h4>
          <span className="toggle-icon">
            {expandedSections.paragraphs ? '−' : '+'}
          </span>
        </div>
        {expandedSections.paragraphs && (
          <div className="section-content">
            {renderParagraphs()}
          </div>
        )}
      </div>
      
      {/* Tables Section */}
      <div className="result-section">
        <div 
          className="section-header" 
          onClick={() => toggleSection('tables')}
        >
          <h4>Tables</h4>
          <span className="toggle-icon">
            {expandedSections.tables ? '−' : '+'}
          </span>
        </div>
        {expandedSections.tables && (
          <div className="section-content">
            {renderTables()}
          </div>
        )}
      </div>
    </div>
  );
};

export default StyledAnalysisResult;