import React from 'react';
import Game from './game'
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';

const boxProps = {
  bgcolor: 'background.paper',
  bordercolor: 'text.primary',
  border: 1,
  borderradius: "borderRadius",
  style: { backgroundColor: 'white', width: '100vw'},
};

const OtherPlayerGrid = ({ isAlone, mapGamePreview }) => {
  if (!isAlone) {
    return (
      <Game
        game={mapGamePreview.currentMapGame}
        isOtherUser={true}
      />
    )
  } else {
    return '';
  }
}

export default OtherPlayerGrid