import React from 'react';
import './FoundSolutions.css';

function FoundSolutions({ headerText, words }) {
  return (
    <div className="FoundSolutions">
      <h4>
        {headerText} ({words.length})
      </h4>
      <ul>
        {words.map((word, index) => (
          <li key={index}>{word}</li>
        ))}
      </ul>
    </div>
  );
}

export default FoundSolutions;
