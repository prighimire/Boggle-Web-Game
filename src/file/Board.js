import React from 'react';
import './Board.css';

function Board({ grid }) {
  return (
    <div className="Board">
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className="BoardRow">
          {row.map((cell, colIndex) => (
            <div key={colIndex} className="BoardCell">
              {cell}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Board;
