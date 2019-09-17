import React, { useState } from 'react';
import './App.css';
import GameField from './GameField';

function App() {
  const [isGameStarted, toggleGameStart] = useState(true);
  const [gameFields, setGameFields] = useState(Array(10).fill(Array(10).fill(false)));

  const changeGameField = (i, j) => {
    const gameFieldsCopy = gameFields.map(e => e.slice());
    gameFieldsCopy[i][j] = !gameFieldsCopy[i][j];
    setGameFields(gameFieldsCopy);
  };

  const gameCells = [];
  for(let i = 0; i < 10; i++) {
    for(let j = 0; j < 10; j++) {
      gameCells.push(
        <GameField
          key={`${i}${j}`}
          isAlive={gameFields[i][j]}
          toggleAlive={() => {changeGameField(i, j)}}
        />
      )
    }
  }

  const gameLoop = () => {
    if (isGameStarted) {
      updateFields();
      setTimeout(() => gameLoop(), 500);
    }
  };

  const updateFields = () => {
    const fieldsCopy = gameFields.map(e => e.slice());

    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        fieldsCopy[i][j] = getNewCellState(i, j, gameFields[i][j]);
      }
    }
    console.log(fieldsCopy);
    setGameFields(fieldsCopy);
  };

  // Вынести в утилс
  const getNewCellState = (row, column, isAlive) => {
    let aliveNeighborsCounter = 0;

    const neighborsCords = [
        [-1, -1],
        [-1, 0],
        [-1, 1],
        [0, -1],
        [0, 1],
        [1, -1],
        [1, 0],
        [1, 1],
    ];

    neighborsCords.forEach(([i, j]) => {
      const fieldsRow = gameFields[row + i];
      fieldsRow && fieldsRow[column + j] && aliveNeighborsCounter++; // HACH
    });

    if(isAlive) {
        return (aliveNeighborsCounter === 2 || aliveNeighborsCounter === 3)
    } else {
        return aliveNeighborsCounter === 3;
    }
  };

  const startGame = () => {
    if (isGameStarted) {
      toggleGameStart(true);
      gameLoop();
    }
  };

  return (
    <>
      <div className="game">
          {gameCells}
      </div>
      <button id="startGame" onClick={startGame}>Start the game</button>
    </>
  );
}

export default App;
