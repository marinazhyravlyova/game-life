import React from 'react';

function GameCell ({ isAlive, toggleAlive }) {
    return (
        <div 
            className={`cell ${isAlive ? 'alive' : ''}`}
            onClick={toggleAlive}
        />
    );
}

export default GameCell;