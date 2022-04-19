import React from 'react';
import T from 'prop-types';

import { CARD_BACKSIDE_IMAGE } from './constants';

const Card = ({ image, isMatched, isSelected, onClick, species }) => {
  // TODO Get random hover-hint from character props
  const hoverHint = `My species is ${species}`;
  const imageToRender = isMatched || isSelected ? image : CARD_BACKSIDE_IMAGE;

  return (
    <div className='Card' onClick={onClick}>
      <img
        alt={hoverHint}
        className='Card-image'
        src={imageToRender}
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
