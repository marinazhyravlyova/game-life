import React from 'react';
import './App.css';
import GameField from './GameField';

export default class App2 extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isGameStarted: true,
            sizeOfCell: 10,
            gameFields: Array(10).fill(Array(10).fill(false)),
            speed: 1000,
        };
    }

    toggleGameStarted = () => {
        this.setState({ isGameStarted: !this.state.isGameStarted });
    };

    changeGameField = (i, j) => {
        const gameFieldsCopy = this.state.gameFields.map(e => e.slice());
        gameFieldsCopy[i][j] = gameFieldsCopy[i][j] ? 0 : 1;
        this.setState({ gameFields: gameFieldsCopy });
    };

    renderGameCells = () => {
        return this.state.gameFields.reduce((acc, array, i) => {
            array.map((item, j) => {
                acc.push(
                    <GameField
                        key={`${i}--${j}`}
                        isAlive={item}
                        toggleAlive={() => {this.changeGameField(i, j)}}
                    />
                )
            });
            return acc;
        }, [])
    };

    gameLoop = () => {
        if (this.state.isGameStarted) {
            this.updateFields()
            setTimeout(this.gameLoop, this.state.speed);
        }
    };

    updateFields = () => {
        const fieldsCopy = this.state.gameFields.map(e => e.slice());

        for (let i = 0; i < this.state.sizeOfCell; i++) {
            for (let j = 0; j < this.state.sizeOfCell; j++) {
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
        const { isGameStarted } = this.state;
        this.setState({ isGameStarted: true });
        this.gameLoop();
    };

    onChangeFieldSize = (event) => {
        const sizeOfCell = +event.target.value;
        this.setState({
            sizeOfCell,
            gameFields: Array(sizeOfCell).fill(Array(sizeOfCell).fill(false)),
        });
    };

    onChangeSpeed = (event) => {
        const speed = event.target.value;
        this.setState({ speed });
    };

    render() {
        const { sizeOfCell } = this.state;
        const fieldStyles = {
            width : `${sizeOfCell * 30}px`,
            height: `${sizeOfCell * 30}px`,
            gridTemplateColumns: `repeat(${sizeOfCell}, 1fr)`,
            gridTemplateRows: `repeat(${sizeOfCell}, 1fr)`,
        };

        return (
            <>
                <div style={fieldStyles} className="game">
                    {this.renderGameCells()}
                </div>
                <div className='gameSettings'>
                    <div>
                        <p className='description'>Enter speed</p>
                        <input type='number' value={this.state.speed} onChange={this.onChangeSpeed}/>
                    </div>
                    <div>
                        <p className='description'>Enter field size</p>
                        <select onChange={this.onChangeFieldSize} >
                            <option value={10} default>10</option>
                            <option value={20}>20</option>
                            <option value={30}>30</option>
                        </select>
                    </div>
                    <button id='startGame' onClick={this.startGame}>Start the game</button>
                </div>
            </>
        )
    }
}
