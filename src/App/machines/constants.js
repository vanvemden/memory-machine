export const MEMORY_MACHINE_INITIAL_CONTEXT = {
  cardCount: 24,
  currentPlayer: 1,
  matchedNames: new Set(),
  playerCount: 2,
  // TODO: Set playerScores shape at game start
  playerProps: {
    1: { score: 0 },
    2: { score: 0 },
  },
  selectedIndices: new Set(),
  selectedNames: new Set(),
};
