const selectScoreProps = ({ currentPlayer, playerCount, playerScores }) => {
  const scoreProps = [];
  for (let player = 1; player <= playerCount; player++) {
    scoreProps.push({
      isActive: player === currentPlayer,
      player,
      score: playerScores.get(player),
    });
  }
  return scoreProps;
};

export default selectScoreProps;
