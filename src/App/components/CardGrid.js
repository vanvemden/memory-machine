import { useContext } from 'react';

import { MachineContext } from '../context';
import Card from './Card';

const CardGrid = () => {
  const memoryMachine = useContext(MachineContext);
  const {
    state: { context },
    send,
  } = memoryMachine;
  const { cards, matchedNames, selectedIndices } = context;

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
                    type: 'CLICK_CARD',
                  })
              : () => {}
          }
          species={species}
        />
      ))}
    </div>
  );
};

export default CardGrid;
