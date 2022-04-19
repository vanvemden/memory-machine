import React, { useEffect, useState } from 'react';
import { useMachine } from '@xstate/react';
import { useQuery } from '@apollo/react-hooks';
import { GET_CHARACTERS } from '../Apollo/queries';

import './App.css';
import CardGrid from './CardGrid';
import ErrorPage from './ErrorPage';
import LoadingPage from './LoadingPage';
import { MACHINE_INITIAL_CONTEXT } from './constants';
import { MachineContext } from './context';
import { createCardDeck } from './helpers';
import { createMemoryMachine } from './machines';

const memoryMachine = createMemoryMachine(MACHINE_INITIAL_CONTEXT);

function App() {
  const { loading, error, data } = useQuery(GET_CHARACTERS);
  const [state, send] = useMachine(memoryMachine);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    if (!loading) setCards(createCardDeck(data.characters.results));
  }, [data, loading]);

  if (loading) return <LoadingPage />;
  if (error) return <ErrorPage />;

  return (
    <MachineContext.Provider value={{ state, send }}>
      <CardGrid cards={cards} />;
    </MachineContext.Provider>
  );
}

export default App;
