import React, { useEffect, useState } from 'react';
import { useMachine } from '@xstate/react';
import { useQuery } from '@apollo/react-hooks';

import './App.css';
import { CardGrid, ErrorPage, LoadingPage, ScoreBoard } from './components';
import { MachineContext } from './context';
import { GET_CHARACTERS } from '../data/queries';
import { createCardDeck } from './helpers/index';
import { createMemoryMachine } from './machines';
import { MEMORY_MACHINE_INITIAL_CONTEXT } from './machines/constants';

const memoryMachine = createMemoryMachine(MEMORY_MACHINE_INITIAL_CONTEXT);

function App() {
  const { loading, error, data } = useQuery(GET_CHARACTERS);
  const [state, send] = useMachine(memoryMachine);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    if (!loading && !error) setCards(createCardDeck(data.characters.results));
  }, [data, error, loading]);

  if (loading) return <LoadingPage />;
  if (error) return <ErrorPage />;

  return (
    <MachineContext.Provider value={{ state, send }}>
      <ScoreBoard />
      <CardGrid cards={cards} />;
    </MachineContext.Provider>
  );
}

export default App;
