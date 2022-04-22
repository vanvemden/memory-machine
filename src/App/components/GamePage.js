import T from 'prop-types';

import ScoreBoard from './ScoreBoard';
import CardGrid from './CardGrid';

const GamePage = ({ cards }) => (
  <>
    <ScoreBoard />
    <CardGrid cards={cards} />;
  </>
);

GamePage.propTypes = {
  cards: T.array.isRequired,
};

export default GamePage;
