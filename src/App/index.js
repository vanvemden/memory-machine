import React from 'react';
import { useMachine } from '@xstate/react';

import './App.css';
import {
  ConditionalRender,
  ErrorPage,
  GamePage,
  HomePage,
  LoadingPage,
} from './components';
import { MachineContext } from './context';
import { MemoryMachine } from './machines';

const memoryMachine = MemoryMachine();

function App() {
  const [state, send] = useMachine(memoryMachine);

  if (state.matches('error')) return <ErrorPage />;
  if (state.matches('loading')) return <LoadingPage />;

  return (
    <MachineContext.Provider value={{ state, send }}>
      <ConditionalRender
        Component={GamePage}
        FallbackComponent={HomePage}
        shouldRender={!state.matches('idle')}
      />
    </MachineContext.Provider>
  );
}

export default App;
