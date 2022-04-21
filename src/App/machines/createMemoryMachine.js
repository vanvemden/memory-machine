import { assign, createMachine } from 'xstate';

const isGameOver = (context) =>
  context.matchedNames.size === context.cardCount / 2;

const createMemoryMachine = (initialContext) =>
  createMachine(
    {
      id: 'memoryMachine',
      initial: 'idle',
      context: initialContext,
      states: {
        idle: {
          on: {
            SELECT: {
              actions: ['selectCard'],
              target: 'selectedFirst',
            },
          },
        },
        selectedFirst: {
          on: {
            SELECT: {
              actions: ['selectCard'],
              target: 'selectedSecond',
            },
          },
        },
        selectedSecond: {
          after: {
            500: { target: 'comparing' },
          },
        },
        comparing: {
          entry: 'compareSelected',
          always: [
            {
              target: 'finished',
              cond: isGameOver,
            },
            {
              target: 'idle',
              cond: !isGameOver,
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
        compareSelected: assign((context) => {
          if (context.selectedNames.size === 1) {
            // Player scores
            const { score, ...rest } =
              context.playerProps[context.currentPlayer];
            context.playerProps[context.currentPlayer] = {
              ...rest,
              score: score + 1,
            };
            context.matchedNames = new Set([
              ...context.matchedNames,
              ...context.selectedNames,
            ]);
          } else {
            // Next player
            context.currentPlayer =
              context.currentPlayer === context.playerCount
                ? 1
                : context.currentPlayer + 1;
          }
          context.selectedIndices = new Set();
          context.selectedNames = new Set();
          return context;
        }),
        selectCard: assign((context, { payload }) => {
          const { index, name } = payload;
          context.selectedIndices.add(index);
          context.selectedNames.add(name);
          return context;
        }),
      },
    }
  );

export default createMemoryMachine;
