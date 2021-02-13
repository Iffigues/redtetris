import React from 'react';
import Cell from './cell'
import StyledStage from './style/styledStage'
import tetrisSong from '../static/media/tetris.mp3';

const Sound = () => <audio src={tetrisSong} volume={0.1} autoPlay loop />;

const Game = ({ song, game }) =>
  (
    <div>
      { song && <Sound /> }
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

export default Game
