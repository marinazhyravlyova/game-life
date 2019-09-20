import React, { Component } from 'react';
import './App.css';
import GameField from './GameField';

export default class App extends Component {
    constructor(...props) {
        super(...props);

        this.state = {
            isGameStarted: true,
            toggleGameStart: true,
            gameFields: Array(10).fill(Array(10).fill(false)),
            setGameFields: Array(10).fill(Array(10).fill(false)),
            gameCells: [],
        };
    }

    changeGameField = (i, j) => {
        const gameFieldsCopy = this.gameFields.map(e => e.slice());
        gameFieldsCopy[i][j] = !gameFieldsCopy[i][j];
        this.setGameFields(gameFieldsCopy);
    };

    addField = () => {
        for(let i = 0; i < 10; i++) {
            for(let j = 0; j < 10; j++) {
                this.state.gameCells.push(
                    <GameField
                        key={`${i}${j}`}
                        isAlive={this.gameFields[i][j]}
                        toggleAlive={() => {this.changeGameField(i, j)}}
                    />
                )
            }
        }
    };



  gameLoop = () => {
    if (this.state.isGameStarted) {
      this.updateFields();
      this.addField();
      setTimeout(() => this.gameLoop(), 500);
    }
  };

  updateFields = () => {
    const fieldsCopy = this.state.gameFields.map(e => e.slice());

    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        fieldsCopy[i][j] = this.getNewCellState(i, j, this.state.gameFields[i][j]);
      }
    }
    console.log(fieldsCopy);
    this.setGameFields(fieldsCopy);
  };

  // Вынести в утилс
  getNewCellState = (row, column, isAlive) => {
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
      const fieldsRow = this.state.gameFields[row + i];
      fieldsRow && fieldsRow[column + j] && aliveNeighborsCounter++; // HACH
    });

    if(isAlive) {
        return (aliveNeighborsCounter === 2 || aliveNeighborsCounter === 3)
    } else {
        return aliveNeighborsCounter === 3;
    }
  };

  startGame = () => {
    if (this.state.isGameStarted) {
      this.toggleGameStart(true);
      this.gameLoop();
    }
  };
    render()
        {

            return (
                <>
                    <div className="game">
                        {this.state.gameCells}
                    </div>
                    <button id="startGame" onClick={this.startGame}>Start the game</button>
                </>
            );
        }
}

