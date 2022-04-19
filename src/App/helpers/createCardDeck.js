import filterCards from './filterCards';
import shuffleCards from './shuffleCards';

const createCardDeck = (cards, deckSize = 24) => {
  const randomCards = shuffleCards(filterCards(cards));
  const halfDeck = randomCards.slice(0, deckSize / 2);
  return shuffleCards(halfDeck.concat(halfDeck));
};

export default createCardDeck;
