import React from 'react';
import T from 'prop-types';

import { CARD_IMAGE_BACKSIDE } from './constants';

const Card = ({ image, isMatched, isSelected, onClick, species }) => {
  // TODO Get random hover-hint from character props
  const hoverHint = `My species is ${species}`;
  const cardImage = isMatched || isSelected ? image : CARD_IMAGE_BACKSIDE;

  return (
    <div className='Card' onClick={onClick}>
      <img
        alt={hoverHint}
        className='Card-image'
        src={cardImage}
        title={hoverHint}
      />
    </div>
  );
};

Card.propTypes = {
  image: T.string.isRequired,
  isMatched: T.bool.isRequired,
  isSelected: T.bool.isRequired,
  onClick: T.func.isRequired,
  species: T.string.isRequired,
};

export default Card;
