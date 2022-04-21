import React, { useContext } from 'react';

import { MachineContext } from '../context';
import selectScores from '../helpers/selectScores';

const ScoreBoard = () => {
  const memoryMachine = useContext(MachineContext);
  const { state } = memoryMachine;
  const scores = selectScores(state.context);

  return (
    <div className='ScoreBoard'>
      {scores.map(({ isActive, player, score }) => (
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
