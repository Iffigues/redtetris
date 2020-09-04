import React from 'react';
import Cell from 'components/cell'
import StyledStage from 'components/style/styledStage'

const Game = ({game}) => {
  return (
    <div>
      <StyledStage isOtherUser={game.isOtherUser} width={game.game[0].length} height={game.game.length}>
        {game.game.map(row => 
          row.map((cell, x) => 
            <Cell key={x} type={cell[0]}/>
        ))}
      </StyledStage>
    </div>
  );
}
export default Game
