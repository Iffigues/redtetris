import React from 'react';
import Game from './Game'

const OtherPlayerGrid = ({ isAlone, mapGamePreview }) => 
  (!isAlone) ? (
    <Game
      mapGame={mapGamePreview.currentMapGame}
      isOtherUser={true}
    />
  )
  : '';

export default OtherPlayerGrid