const createCardSet = (cards) => {
  return cards.concat(cards);
};

const shuffleCardSet = (cardSet) => {
  for (let i = 0; i < cardSet.length; i++) {
    const j = Math.floor(Math.random() * (i + 1));
    [cardSet[i], cardSet[j]] = [cardSet[j], cardSet[i]];
  }
  return cardSet;
};

export { createCardSet, shuffleCardSet };
