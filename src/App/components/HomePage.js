import React, { useContext } from 'react';

import SelectList from './SelectList';
import { cardCountOptions, playerCountOptions } from './constants';
import { MachineContext } from '../context';

const HomePage = () => {
  const memoryMachine = useContext(MachineContext);
  const { state, send } = memoryMachine;

  return (
    <div className='HomePage'>
      <h1>{state.value}</h1>
      <SelectList
        id='CardCount'
        items={cardCountOptions}
        onChange={(e) =>
          send({
            payload: { value: parseInt(e.target.value) },
            type: 'SELECT_CARD_COUNT',
          })
        }
        selected={state.context.cardCount}
      />
      <SelectList
        id='PlayerCount'
        items={playerCountOptions}
        onChange={(e) =>
          send({
            payload: { value: parseInt(e.target.value) },
            type: 'SELECT_PLAYER_COUNT',
          })
        }
        selected={state.context.playerCount}
      />
      <button onClick={() => send({ type: 'START_GAME' })}>Start Game</button>
    </div>
  );
};

export default HomePage;
