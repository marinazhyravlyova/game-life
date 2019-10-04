import React from 'react';
import classNames from 'classnames';

function GameCell ({ isAlive, toggleAlive }) {
    console.log('rerender');
    return (
        <div 
            className={classNames('cell', {alive: isAlive})}
            onClick={toggleAlive}
        />
    );
}

function areEqual (prevProps, nextProps) {
    if (prevProps.isAlive !== nextProps.isAlive) {
        return false;
    }
    return true;
}

export default React.memo(GameCell, areEqual);