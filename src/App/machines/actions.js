import { assign } from 'xstate';

import { createCards } from './helpers';

export const resetSelectedCards = assign((context) => {
  context.selectedIndices = new Set();
  context.selectedIDs = new Set();
});

export const setNextPlayer = assign((context) => {
  context.currentPlayer =
    context.currentPlayer === context.playerCount
      ? 1
      : context.currentPlayer + 1;
});

export const setCardCount = assign((context, { payload }) => {
  const { value } = payload;
  context.cardCount = value;
});

export const setCards = assign({
  cards: ({ cardCount }, event) =>
    createCards({
      cardCount,
      images: event.data.data.characters.results,
    }),
});

export const setGame = assign((context) => {
  context.playerScores = new Map();
  for (let i = 1; i <= context.playerCount; i++) {
    context.playerScores.set(i, 0);
  }
});

export const setPlayerCount = assign((context, { payload }) => {
  const { value } = payload;
  context.playerCount = value;
});

export const setScoreCards = assign((context) => {
  const { currentPlayer, playerCount, playerScores } = context;
  context.scoreCards = [];
  for (let player = 1; player <= playerCount; player++) {
    context.scoreCards.push({
      isActive: player === currentPlayer,
      player,
      score: playerScores.get(player),
    });
  }
});

export const setSelectedCard = assign((context, { payload }) => {
  const { index, name } = payload;
  context.selectedIndices.add(index);
  context.selectedIDs.add(name);
  return context;
});

export const setMatchedCards = assign((context) => {
  context.matchedIDs = new Set([...context.matchedIDs, ...context.selectedIDs]);
});

export const setupGame = assign((context) => {});

export const updateScore = assign((context) => {
  const score = context.playerScores.get(context.currentPlayer);
  context.playerScores.set(context.currentPlayer, score + 1);
});
