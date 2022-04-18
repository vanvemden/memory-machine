import T from 'prop-types';

import Card from './Card';

const CardGrid = ({ cards }) => (
  <div className='CardGrid'>
    {cards.map(({ name, image }, index) => (
      <Card
        key={index}
        name={name}
        image={image}
        isMatched={false}
        isSelected={false}
      />
    ))}
  </div>
);

CardGrid.propTypes = {
  cards: T.arrayOf(
    T.shape({
      name: T.string.isRequired,
      image: T.string.isRequired,
      species: T.string.isRequired,
    })
  ).isRequired,
};

export default CardGrid;
