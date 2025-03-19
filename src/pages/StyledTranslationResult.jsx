import React from 'react';

const StyledTranslationResult = ({ translationResult }) => {
  // Make sure translationResult exists
  if (!translationResult) {
    return <div className="empty-result">No translation available</div>;
  }
  
  // Handle both possible formats: either an object with translatedText property
  // or just a string
  let translatedContent = '';
  
  if (typeof translationResult === 'string') {
    translatedContent = translationResult;
  } else if (typeof translationResult === 'object') {
    // If it's an object, check for translatedText property
    if (translationResult.translatedText) {
      translatedContent = translationResult.translatedText;
    } else {
      // If no translatedText, stringify the entire object for display
      translatedContent = JSON.stringify(translationResult, null, 2);
    }
  }

  // Split the translated text by newline characters to render paragraphs
  const paragraphs = translatedContent.split('\\n').filter(p => p.trim());

  return (
    <div className="translation-result-container">
      <h4>Translation Result</h4>
      <div className="translation-content">
        {paragraphs.map((paragraph, index) => (
          <p key={index} className={paragraph.trim().endsWith(':') ? 'section-header' : ''}>
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
};

export default StyledTranslationResult;