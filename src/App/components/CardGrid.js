import { useContext } from 'react';
import T from 'prop-types';

import { MachineContext } from '../context';
import Card from './Card';

const CardGrid = ({ cards }) => {
  const memoryMachine = useContext(MachineContext);
  const { state, send } = memoryMachine;
  const { matchedNames, selectedIndices } = state.context;

  return (
    <div className='CardGrid'>
      {cards.map(({ image, name, species }, index) => (
        <Card
          key={index}
          image={image}
          isMatched={matchedNames.has(name)}
          isSelected={selectedIndices.has(index)}
          name={name}
          onClick={
            !selectedIndices.has(index)
              ? () =>
                  send({
                    payload: { index, name },
                    type: 'SELECT',
                  })
              : () => {}
          }
          species={species}
        />
      ))}
    </div>
  );
};

CardGrid.propTypes = {
  cards: T.arrayOf(
    T.shape({
      image: T.string.isRequired,
      name: T.string.isRequired,
      species: T.string.isRequired,
    })
  ),
};

export default CardGrid;
