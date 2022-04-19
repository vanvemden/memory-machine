import { CARD_IMAGE_BACKSIDE } from '../components/constants';

const filterCards = (cards) => {
  return cards.filter((card) => card.image !== CARD_IMAGE_BACKSIDE);
};

export default filterCards;
