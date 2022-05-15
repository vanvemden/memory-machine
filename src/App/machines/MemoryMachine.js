import { createMachine } from 'xstate';

import {
  resetSelectedCards,
  setCardCount,
  setCards,
  setGame,
  setMatchedCards,
  setNextPlayer,
  setPlayerCount,
  setScoreCards,
  setSelectedCard,
  setupGame,
  updateScore,
} from './actions';
import { MEMORY_MACHINE_INITIAL_CONTEXT } from './constants';
import { fetchCharacters } from '../data';
import { isMatch, isGameOver } from './helpers';

const MemoryMachine = () =>
  createMachine(
    {
      id: 'memoryMachine',
      initial: 'loading',
      context: MEMORY_MACHINE_INITIAL_CONTEXT,
      states: {
        loading: {
          invoke: {
            src: fetchCharacters,
            onError: 'error',
            onDone: {
              target: 'idle',
              actions: ['setCards'],
            },
          },
        },
        error: {
          on: {
            REFETCH: 'loading',
          },
        },
        setup: {
          always: {
            actions: ['setupGame'],
          },
        },
        idle: {
          on: {
            START_GAME: {
              actions: ['setGame', 'setScoreCards'],
              target: 'waitForFirstCard',
            },
            SELECT_CARD_COUNT: {
              actions: ['setCardCount'],
            },
            SELECT_PLAYER_COUNT: {
              actions: ['setPlayerCount'],
            },
          },
        },
        waitForFirstCard: {
          on: {
            CLICK_CARD: {
              actions: ['setSelectedCard'],
              target: 'waitForSecondCard',
            },
          },
        },
        waitForSecondCard: {
          on: {
            CLICK_CARD: {
              actions: ['setSelectedCard'],
              target: 'pause',
            },
          },
        },
        pause: {
          after: {
            1000: { target: 'compareCards' },
          },
        },
        compareCards: {
          always: [
            {
              actions: [
                'updateScore',
                'setMatchedCards',
                'resetSelectedCards',
                'setScoreCards',
              ],
              cond: isMatch,
              target: 'checkGameStatus',
            },
            {
              actions: ['resetSelectedCards', 'setNextPlayer', 'setScoreCards'],
              cond: !isMatch,
              target: 'waitForFirstCard',
            },
          ],
        },
        checkGameStatus: {
          always: [
            {
              cond: isGameOver,
              target: 'finished',
            },
            {
              cond: !isGameOver,
              target: 'waitForFirstCard',
            },
          ],
        },
        finished: {
          type: 'final',
        },
      },
    },
    {
      actions: {
        setSelectedCard,
        resetSelectedCards,
        setNextPlayer,
        setCardCount,
        setCards,
        setGame,
        setMatchedCards,
        setPlayerCount,
        setScoreCards,
        setupGame,
        updateScore,
      },
    }
  );

export default MemoryMachine;
