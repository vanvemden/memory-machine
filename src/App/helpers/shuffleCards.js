const shuffleCards = (cards) => {
  for (let i = 0; i < cards.length; i++) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
  return cards;
};

export default shuffleCards;
