import React, { useContext } from 'react';

import RickAndMortyLogo from '../images/RickAndMortyLogo';

import SelectList from './SelectList';
import { cardCountOptions, playerCountOptions } from './constants';
import { MachineContext } from '../context';

const HomePage = () => {
  const memoryMachine = useContext(MachineContext);
  const { state, send } = memoryMachine;
  const { cardCount, playerCount } = state.context;

  return (
    <div className='HomePage'>
      <RickAndMortyLogo />
      <h1>MEMORY GAME</h1>
      <div className='FormContainer'>
        <SelectList
          id='PlayerCount'
          items={playerCountOptions}
          label='players'
          onChange={(e) =>
            send({
              payload: { value: parseInt(e.target.value) },
              type: 'SELECT_PLAYER_COUNT',
            })
          }
          value={playerCount}
        />
        <SelectList
          id='CardCount'
          items={cardCountOptions}
          label='cards'
          onChange={(e) =>
            send({
              payload: { value: parseInt(e.target.value) },
              type: 'SELECT_CARD_COUNT',
            })
          }
          value={cardCount}
        />
        <button onClick={() => send({ type: 'START_GAME' })}>start game</button>
      </div>
    </div>
  );
};

export default HomePage;
