import { assign } from 'xstate';

import { createCards } from './helpers';

export const changeCurrentPlayer = assign((context) => {
  context.currentPlayer =
    context.currentPlayer === context.playerCount
      ? 1
      : context.currentPlayer + 1;
});

export const initPlayerScores = assign((context) => {
  context.playerScores = new Map();
  for (let i = 1; i <= context.playerCount; i++) {
    context.playerScores.set(i, 0);
  }
});

export const resetSelectedCards = assign((context) => {
  context.selectedIndices = new Set();
  context.selectedIDs = new Set();
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

export const setMatchedCards = assign((context) => {
  context.matchedIDs = new Set([...context.matchedIDs, ...context.selectedIDs]);
});

export const setPlayerCount = assign((context, { payload }) => {
  const { value } = payload;
  context.playerCount = value;
});

export const setRandomPage = assign({
  randomPage: ({ totalPages }) =>
    Math.floor(Math.random() * (totalPages - 1) + 1),
});

export const updateScoreBoard = assign((context) => {
  const { currentPlayer, playerCount, playerScores } = context;
  context.scoreBoard = [];
  for (let player = 1; player <= playerCount; player++) {
    context.scoreBoard.push({
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

export const setTotalPages = assign({
  totalPages: (_, event) => event.data.data.characters.info.pages,
});

export const updatePlayerScore = assign((context) => {
  const score = context.playerScores.get(context.currentPlayer);
  context.playerScores.set(context.currentPlayer, score + 1);
});
