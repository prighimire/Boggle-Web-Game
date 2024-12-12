import React from 'react';
import { GAME_STATE } from '../GameState';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Stack from '@mui/material/Stack';
import './ToggleGameState.css';
import { Container } from '@mui/material';

function ToggleGameState({
  gameState,
  setGameState,
  gridSize,
  setGridSize,
  setTotalTime,
  setTimerId,
  timerId,
}) {
  const handleStartEndClick = () => {
    if (gameState === GAME_STATE.BEFORE || gameState === GAME_STATE.ENDED) {
      setGameState(GAME_STATE.IN_PROGRESS);
      setTotalTime(0);
    } else if (gameState === GAME_STATE.IN_PROGRESS) {
      // User clicked "End Game"
      setGameState(GAME_STATE.ENDED);
      // Clear the timer
      if (timerId) {
        clearInterval(timerId);
        setTimerId(null);
      }
    }
  };

  const handleSizeChange = (event) => {
    setGridSize(event.target.value);
  };

  return (
    <div className="ToggleGameState">
      <Stack
        direction="column"
        spacing={2}
        alignItems="center"
        sx={{ padding: '10px', marginTop: '50px' }}
      >
        <Button variant="contained" onClick={handleStartEndClick}>
          {gameState === GAME_STATE.IN_PROGRESS ? 'End Game' : 'Start Game'}
        </Button>

        <FormControl variant="outlined" className="grid-size-select">
          <InputLabel id="grid-size-label">Grid Size</InputLabel>
          <Select
            labelId="grid-size-label"
            value={gridSize}
            onChange={handleSizeChange}
            label="Grid Size"
            disabled={gameState === GAME_STATE.IN_PROGRESS}
          >
            {[3, 4, 5, 6, 7, 8, 9, 10].map((size) => (
              <MenuItem key={size} value={size}>
                {size}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>
    </div>
  );
}

export default ToggleGameState;
