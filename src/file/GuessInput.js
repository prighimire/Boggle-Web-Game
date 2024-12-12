import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import './GuessInput.css';

function GuessInput({ onWordSubmit, message }) {
  const [inputValue, setInputValue] = useState('');

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && inputValue.trim() !== '') {
      onWordSubmit(inputValue.trim());
      setInputValue('');
    }
  };

  return (
    <div className="GuessInput">
      <TextField
        label="Enter a word"
        variant="outlined"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default GuessInput;
