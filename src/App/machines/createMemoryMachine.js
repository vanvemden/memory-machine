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
              actions: ['updateScore', 'setMatchedCards'],
              cond: isMatch,
              target: 'checkGameStatus',
            },
            {
              actions: ['flipCardsBack', 'nextTurn'],
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

        flipCardsBack: assign((context) => {
          context.selectedIndices = new Set();
          context.selectedNames = new Set();
        }),

        nextTurn: assign((context) => {
          context.currentPlayer =
            context.currentPlayer === context.playerCount
              ? 1
              : context.currentPlayer + 1;
        }),

        setGame: assign((context) => {
          context.playerProps = new Map();
          for (let i = 1; i <= context.playerCount; i++) {
            context.playerProps.set(i, { score: 0 });
          }
        }),

        setMatchedCards: assign((context) => {
          context.matchedNames = new Set([
            ...context.matchedNames,
            ...context.selectedNames,
          ]);
        }),

        updateScore: assign((context) => {
          const { score, ...rest } = context.playerProps[context.currentPlayer];
          context.playerProps[context.currentPlayer] = {
            ...rest,
            score: score + 1,
          };
        }),
      },
    }
  );

export default createMemoryMachine;
