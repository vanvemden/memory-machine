import T from 'prop-types';

import { CARD_BACKSIDE_IMAGE } from './constants';

const Card = ({ name, image, isMatched, isSelected, ...hintProps }) => {
  const imageToRender = isMatched || isSelected ? image : CARD_BACKSIDE_IMAGE;
  const hoverHint = `My species is ${hintProps.species}`;

  return (
    <div className='Card'>
      <img
        className='Card-image'
        alt={hoverHint}
        src={imageToRender}
        title={hoverHint}
      />
    </div>
  );
};

Card.propTypes = {
  name: T.string.isRequired,
  image: T.string.isRequired,
  isMatched: T.bool.isRequired,
};

export default Card;
