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

// class GameCell extends React.PureComponent {
//     render() {
//         const { isAlive, toggleAlive } = this.props;
//         console.log('rerender');
//         return (
//             <div 
//                 className={classNames('cell', {alive: isAlive})}
//                 onClick={toggleAlive}
//             />
//         );
//     }
// }

export default GameCell;