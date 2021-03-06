export const ELEMENTS_TO_FILTER = [
  'https://rickandmortyapi.com/api/character/avatar/19.jpeg',
  'https://rickandmortyapi.com/api/character/avatar/189.jpeg',
];

export const MEMORY_MACHINE_INITIAL_CONTEXT = {
  cardCount: 20,
  cards: [],
  currentPlayer: 1,
  matchedIDs: new Set(),
  playerCount: 2,
  playerScores: new Map(),
  scoreBoard: [],
  selectedIDs: new Set(),
  selectedIndices: new Set(),
};
