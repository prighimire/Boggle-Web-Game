import React, { useState, useEffect } from 'react';
import { GAME_STATE } from './GameState';
import ToggleGameState from './components/ToggleGameState';
import Board from './components/Board';
import GuessInput from './components/GuessInput';
import SummaryResults from './components/SummaryResults';
import FoundSolutions from './components/FoundSolutions';
import BoggleSolver from './boggleSolver';
import './App.css';

function generateRandomGrid(size) {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const grid = [];
  for (let i = 0; i < size; i++) {
    const row = [];
    for (let j = 0; j < size; j++) {
      const randomLetter = letters.charAt(Math.floor(Math.random() * letters.length));
      row.push(randomLetter);
    }
    grid.push(row);
  }
  return grid;
}

function getDictionary() {
  // Replace with your own dictionary or fetch from an API
  return ['ART', 'EGO', 'GENT', 'GET', 'NET', 'NEW', 'PRY', 'QUART', 'TEN', 'WET', 'TARP'];
}

function App() {
  // State variables
  const [gameState, setGameState] = useState(GAME_STATE.BEFORE);
  const [gridSize, setGridSize] = useState(3);
  const [grid, setGrid] = useState([]);
  const [allSolutions, setAllSolutions] = useState([]);
  const [foundWords, setFoundWords] = useState([]);
  const [startTime, setStartTime] = useState(null);
  const [totalTime, setTotalTime] = useState(0);
  const [message, setMessage] = useState('');
  const [timeLeft, setTimeLeft] = useState(60);
  const [timerId, setTimerId] = useState(null);

  useEffect(() => {
    if (gameState === GAME_STATE.IN_PROGRESS) {
      // Generate random grid
      const newGrid = generateRandomGrid(gridSize);
      setGrid(newGrid);

      // Initialize BoggleSolver
      const dictionary = getDictionary();
      const solver = new BoggleSolver(newGrid, dictionary);
      const solutions = solver.getSolutions();
      setAllSolutions(solutions);

      setFoundWords([]);
      setStartTime(Date.now());
      setMessage('');

      // Start the timer
      setTimeLeft(60);
      const id = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(id);
            setGameState(GAME_STATE.ENDED);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
      setTimerId(id);
    } else if (gameState === GAME_STATE.ENDED) {
      // Clear the timer
      if (timerId) {
        clearInterval(timerId);
        setTimerId(null);
      }

      const endTime = Date.now();
      setTotalTime(((endTime - startTime) / 1000).toFixed(2));

      // Compute missed words
      const missedWords = allSolutions.filter(
        (word) => !foundWords.includes(word)
      );
      setAllSolutions(missedWords);
    }
  }, [gameState]);

  const handleWordSubmit = (word) => {
    const upperWord = word.toUpperCase();
    if (foundWords.includes(upperWord)) {
      setMessage(`You've already found "${upperWord}".`);
    } else if (allSolutions.includes(upperWord)) {
      setFoundWords([...foundWords, upperWord]);
      setMessage(`Good job! "${upperWord}" is correct.`);
    } else {
      setMessage(`"${upperWord}" is not a valid word.`);
    }
  };

  return (
    <div className="App">
      <ToggleGameState
        gameState={gameState}
        setGameState={setGameState}
        gridSize={gridSize}
        setGridSize={setGridSize}
        setTotalTime={setTotalTime}
        setTimerId={setTimerId}
        timerId={timerId}
      />

      {gameState === GAME_STATE.IN_PROGRESS && (
        <>
          <p>Time Left: {timeLeft} seconds</p>
          <Board grid={grid} />
          <GuessInput onWordSubmit={handleWordSubmit} message={message} />
          <FoundSolutions headerText="Words You've Found" words={foundWords} />
        </>
      )}

      {gameState === GAME_STATE.ENDED && (
        <>
          <Board grid={grid} />
          <SummaryResults totalWords={foundWords.length} totalTime={totalTime} />
          <FoundSolutions headerText="Missed Words" words={allSolutions} />
        </>
      )}
    </div>
  );
}

export default App;
