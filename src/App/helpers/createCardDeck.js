import filterCards from './filterCards';
import shuffleCards from './shuffleCards';

const createCardDeck = ({ cardCount, images }) => {
  const randomCards = shuffleCards(filterCards(images));
  const halfDeck = randomCards.slice(0, cardCount / 2);
  return shuffleCards(halfDeck.concat(halfDeck));
};

export default createCardDeck;
