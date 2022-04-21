const selectScores = ({ currentPlayer, playerCount, playerProps }) => {
  const props = [];
  for (let player = 1; player <= playerCount; player++) {
    props.push({
      isActive: player === currentPlayer,
      player,
      score: playerProps[player].score,
    });
  }
  return props;
};

export default selectScores;
