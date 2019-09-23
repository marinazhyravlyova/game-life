import React from 'react';
import './App.css';
import GameField from './GameField';

export default class App2 extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isGameStarted: true,
            gameFields: Array(10).fill(Array(10).fill(false)),
        };
    }

    toggleGameStarted = () => {
        this.setState({ isGameStarted: !this.state.isGameStarted });
    }

    changeGameField = (i, j) => {
        const gameFieldsCopy = this.state.gameFields.map(e => e.slice());
        gameFieldsCopy[i][j] = gameFieldsCopy[i][j] ? 0 : 1;
        this.setState({ gameFields: gameFieldsCopy });
    }

    renderGameCells = () => {
        const gameCells = [];

        for(let i = 0; i < 10; i++) {
            for(let j = 0; j < 10; j++) {
            gameCells.push(
                <GameField
                key={`${i}${j}`}
                isAlive={this.state.gameFields[i][j]}
                toggleAlive={() => {this.changeGameField(i, j)}}
                />
            )
            }
        }

        return gameCells;
    }

    gameLoop = () => {
        this.updateFields()
    }

    updateFields = () => {
        const fieldsCopy = this.state.gameFields.map(e => e.slice());

        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
            fieldsCopy[i][j] = this.getNewCellState(i, j, this.state.gameFields[i][j]);
            }
        }

        this.setState({ gameFields: fieldsCopy });
    };

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
            return (aliveNeighborsCounter === 2 || aliveNeighborsCounter === 3) ? 1 : 0;
        } else {
            return aliveNeighborsCounter === 3 ? 1 : 0;
        }
    };

    startGame = () => {
        // if (isGameStarted) {
          // toggleGameStart(true);
        this.gameLoop();
        // }
    };

    render() {
        return (
            <>
                <div className="game">
                    {this.renderGameCells()}
                </div>
                <button id="startGame" onClick={this.startGame}>Start the game</button>
            </>
        )
    }
}