import React, { useContext } from 'react';

import { MachineContext } from '../context';

const ScoreBoard = () => {
  const memoryMachine = useContext(MachineContext);
  const {
    state: { context },
  } = memoryMachine;
  const { scoreCards } = context;

  return (
    <div className='ScoreBoard'>
      {scoreCards.map(({ isActive, player, score }) => (
        <div
          key={player}
          className={`Score ${isActive ? 'active-player' : ''}`}
        >
          <h2>
            PLAYER <code>{player}</code> / <code>{score}</code> POINTS
          </h2>
        </div>
      ))}
    </div>
  );
};

export default ScoreBoard;
