import { createMachine } from 'xstate';

import {
  changeCurrentPlayer,
  initPlayerScores,
  resetSelectedCards,
  setCardCount,
  setCards,
  setMatchedCards,
  setPlayerCount,
  setRandomPage,
  setSelectedCard,
  setTotalPages,
  updatePlayerScore,
  updateScoreBoard,
} from './actions';
import { MEMORY_MACHINE_INITIAL_CONTEXT } from './constants';
import { fetchCharacters, fetchCharactersInfo } from '../data';
import { isMatch, isGameOver } from './helpers';

const MemoryMachine = () =>
  /** @xstate-layout N4IgpgJg5mDOIC5QFszIPYCcCeBZAhgMYAWAlgHZgB0FpALqfgDakBeYAxBOpTeQG7oA1tVQYcBEhWq0GzNmAQVBhfAx4BtAAwBdRKAAO6WPVI99IAB6IATAGY7VG-YCcAFgCMW7x4CsWjwAaEGxEO38qFwA2KN8AdgAOaK0HN3CAX3TgsSw8IjJeWUYWdg4wTEwsKgMmNQAzLGQqHIl86T5TeXYlAXRVdXJtPSQQIxMBi2sEe0dnO3cvH38gkMQPOwTIuzcE3ai7KLiD3yjM7LRcyQKZck6SsABRCqwOACUHgDEHgBUAYQAJCxjUzmEZTGyHLZxNwwtwuGz+BLBUIIFxaSJxdZpeJxXxuLRuGxnEAtPJSQoQJicADKDwAMg9ft8APq-ACCrwAIqyAPIAVQAct8gcYQeRJmEXB4qAkCfson4PPDfHZkbYEtLEVEdoSAnEiVkSRdWuSZJSafTGSyAAp0tkATQer15guFI2BEzBYQSvioSu8vi8+y8zjVCCVbio8TsiS0NjccRc-lixNJV3apHNHGp3w5LIA4mzcA8ReMzOKvQgoloojKPHFtbCArskasEA50S44kcfXFvG5tTHU8aydcqEx0PgIBQoFweDdBCJmiP07wJ1OZz0VGpy0NS2KJajIXHfC5okkTgSViiNrWlc4ovY3Cqky5h+JR+119PyLPypVMGqWo6AaTAmjTNo10nH8oC3Pod00XR909UApmiOIqBPM8ogvatPDDBxNmcBJYniBIHD8Xx30uSDqG-GcngAt5Ph+AFkPLQ8uxcKNvC0eI0ilDZr1sNEnFiDwvH1Tx7ziaiTTHAB3fB6A+LAPlITBYDoX58EwCAOF+OkAElfgAaVZDlOXY0FULWOwUioZ8EhsLtEgVBIBwIki-XhewCV8ZYPBhOTP14JSVKwakwEIHgIB0vSDOMsyLK5ayK1s8MojPOt4x2RM7D8NwvLvXz7OfQLgsNCDTWqfAAFdYE4SwtLUah8DqOhygACj8bwAEoOGqscDHqxq0sPGxvBsKgCoRQlbwSBsXDDfFfUOfKPEW59-NkqqV1oqgYuQEbMDAeKIFgDhxsrJ9HHxfYuxhFygqiMMZhmgJ5RhBwVXiELV2oEhoqEfN8FQak6DUBqrvdUUUKsWx8sw9w4yOI5n3sAiYSoI55iDALthcBJMkNch0AgOALCGjNbjke5roywkCI8aboQhCS0Qkjy7H+g6ii6R5nkwBmEYQQluPIjyPIHaFYjiMMWbWuN5u8AqsN5mrMypEWpjSWtqxsDUlv7DxXrbGM7uxWULdNmw-A1sd6N-HXEG7X1ZUmgIHzmXwsYw88XN8Q3H2faIHa-aCGKFl3wy8aVcQhLQXG2Pi9QI+MZWiZwk4CFmDnDsLlLoVTMHUzTtN0iAY4kgIcaD6tk9WtPzeyw58XrWU0Wck4C+ocLi8i6LYvO6uE0jBMNhVDZwmiM2b1b6E9U7rRu9OPaPwB2qGrAavFvRZyNQKpM7ZSVt5+4tul5z1fe8O9Bjt0s7K-gWGyxs0W7aDmUpMmtEiZrAiC926xi7giW+QNCAgzBmACGUMX6GDhhxG6ZE-Q1hIj6JUpFAEX0Xh3a+YD140RqnUWgsBiCQBjvZWuNg+zJ27HGc88sW44OAcvbuvdd4K39meHhvCeHExJkAA */
  createMachine(
    {
      context: MEMORY_MACHINE_INITIAL_CONTEXT,
      id: 'memoryMachine',
      initial: 'initialize',
      states: {
        initialize: {
          invoke: {
            src: fetchCharactersInfo,
            onDone: [
              {
                actions: 'setTotalPages',
                target: 'idle',
              },
            ],
            onError: [
              {
                target: 'initializeError',
              },
            ],
          },
        },
        initializeError: {
          on: {
            REFETCH: {
              target: 'initialize',
            },
          },
        },
        idle: {
          on: {
            SELECT_CARD_COUNT: {
              actions: 'setCardCount',
            },
            SELECT_PLAYER_COUNT: {
              actions: 'setPlayerCount',
            },
            START_GAME: {
              actions: [
                'setRandomPage',
                'initPlayerScores',
                'updateScoreBoard',
              ],
              target: 'loading',
            },
          },
        },
        loading: {
          invoke: {
            src: ({ randomPage }) => fetchCharacters(randomPage),
            onDone: [
              {
                actions: 'setCards',
                target: 'waitForFirstCard',
              },
            ],
            onError: [
              {
                target: 'loadingError',
              },
            ],
          },
        },
        loadingError: {
          on: {
            REFETCH: {
              target: 'loading',
            },
          },
        },
        waitForFirstCard: {
          on: {
            CLICK_CARD: {
              actions: 'setSelectedCard',
              target: 'waitForSecondCard',
            },
          },
        },
        waitForSecondCard: {
          on: {
            CLICK_CARD: {
              actions: 'setSelectedCard',
              target: 'pause',
            },
          },
        },
        pause: {
          after: {
            1500: {
              target: 'compareCards',
            },
          },
        },
        compareCards: {
          always: [
            {
              actions: [
                'updatePlayerScore',
                'setMatchedCards',
                'resetSelectedCards',
                'updateScoreBoard',
              ],
              cond: 'isMatch',
              target: 'checkGameStatus',
            },
            {
              actions: [
                'resetSelectedCards',
                'changeCurrentPlayer',
                'updateScoreBoard',
              ],
              target: 'waitForFirstCard',
            },
          ],
        },
        checkGameStatus: {
          always: [
            {
              cond: 'isGameOver',
              target: 'finished',
            },
            {
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
        changeCurrentPlayer,
        initPlayerScores,
        resetSelectedCards,
        setCardCount,
        setCards,
        setMatchedCards,
        setPlayerCount,
        setRandomPage,
        setSelectedCard,
        setTotalPages,
        updatePlayerScore,
        updateScoreBoard,
      },
      guards: {
        isGameOver,
        isMatch,
      },
    }
  );

export default MemoryMachine;
