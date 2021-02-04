import React from 'react';
import Cell from './cell'
import StyledStage from './style/styledStage'
// const tetrisSong = require("../static/media/tetris.mp3");
import tetrisSong from '../static/media/tetris.mp3';

const Sound = () => <audio src={tetrisSong} autoPlay loop />;

const Game = ({game}) => {
  return (
    <div>
      <Sound />
      
      <StyledStage
        isOtherUser={game.isOtherUser}
        width={game.game[0].length} 
        height={game.game.length}
      >
        {game.game.map(row => 
          row.map((cell, x) => 
            <Cell key={x} type={cell} isOtherUser={game.isOtherUser}/>
        ))}
      </StyledStage>
    </div>
  );
}
export default Game
