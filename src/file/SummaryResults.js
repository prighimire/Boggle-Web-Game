import React from 'react';
import './SummaryResults.css';

function SummaryResults({ totalWords, totalTime }) {
  return (
    <div className="SummaryResults">
      <h2>Summary</h2>
      <p>Total Words Found: {totalWords}</p>
      <p>Total Time: {totalTime} seconds</p>
    </div>
  );
}

export default SummaryResults;
