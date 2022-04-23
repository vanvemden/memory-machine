import { assign, createMachine } from 'xstate';

const isGameOver = (context) =>
  context.matchedNames.size === context.cardCount / 2;

const isMatch = (context) =>
  context.selectedNames.size === 1 && context.selectedIndices.size === 2;

const createMemoryMachine = (initialContext) =>
  createMachine(
    {
      id: 'memoryMachine',
      initial: 'idle',
      context: initialContext,
      states: {
        idle: {
          on: {
            START_GAME: {
              actions: ['setGame'],
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
              actions: ['flipCard'],
              target: 'waitForSecondCard',
            },
          },
        },
        waitForSecondCard: {
          on: {
            CLICK_CARD: {
              actions: ['flipCard'],
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
              actions: ['updateScore', 'setMatchedCards', 'handleCards'],
              cond: isMatch,
              target: 'checkGameStatus',
            },
            {
              actions: ['handleCards', 'nextTurn'],
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
        flipCard: assign((context, { payload }) => {
          const { index, name } = payload;
          context.selectedIndices.add(index);
          context.selectedNames.add(name);
          return context;
        }),

        handleCards: assign((context) => {
          context.selectedIndices = new Set();
          context.selectedNames = new Set();
        }),

        nextTurn: assign((context) => {
          context.currentPlayer =
            context.currentPlayer === context.playerCount
              ? 1
              : context.currentPlayer + 1;
        }),

        setCardCount: assign((context, { payload }) => {
          const { value } = payload;
          context.cardCount = value;
        }),

        setGame: assign((context) => {
          context.playerScores = new Map();
          for (let i = 1; i <= context.playerCount; i++) {
            context.playerScores.set(i, 0);
          }
        }),

        setPlayerCount: assign((context, { payload }) => {
          const { value } = payload;
          context.playerCount = value;
        }),

        setMatchedCards: assign((context) => {
          context.matchedNames = new Set([
            ...context.matchedNames,
            ...context.selectedNames,
          ]);
        }),

        updateScore: assign((context) => {
          const score = context.playerScores.get(context.currentPlayer);
          context.playerScores.set(context.currentPlayer, score + 1);
        }),
      },
    }
  );

export default createMemoryMachine;
