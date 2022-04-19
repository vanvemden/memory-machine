import { CARD_IMAGE_BACKSIDE } from './constants';

const createCardDeck = (cards, deckSize = 24) => {
  const randomCards = shuffleCards(filterCards(cards));
  const halfDeck = randomCards.slice(0, deckSize / 2);
  return shuffleCards(halfDeck.concat(halfDeck));
};

const filterCards = (cards) => {
  return cards.filter((card) => card.image !== CARD_IMAGE_BACKSIDE);
};

const shuffleCards = (cards) => {
  for (let i = 0; i < cards.length; i++) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
  return cards;
};

export { createCardDeck };
