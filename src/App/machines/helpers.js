import { ELEMENTS_TO_FILTER } from './constants';

const isGameOver = (context) =>
  context.matchedIDs.size === context.cardCount / 2;

const isMatch = (context) =>
  context.selectedIDs.size === 1 && context.selectedIndices.size === 2;

const createCards = ({ cardCount, images }) => {
  const randomCards = shuffleElements(filterElements(images));
  const halfDeck = randomCards.slice(0, cardCount / 2);
  return shuffleElements(halfDeck.concat(halfDeck));
};

const filterElements = (cards) => {
  return cards.filter((card) => !ELEMENTS_TO_FILTER.includes(card.image));
};

const shuffleElements = (elements) => {
  for (let i = 0; i < elements.length; i++) {
    const j = Math.floor(Math.random() * (i + 1));
    [elements[i], elements[j]] = [elements[j], elements[i]];
  }
  return elements;
};

export { isGameOver, isMatch, createCards };
