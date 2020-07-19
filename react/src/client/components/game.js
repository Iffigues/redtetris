import React from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

const boxProps = {
  bgcolor: 'background.paper',
  borderColor: 'text.primary',
  border: 1,
  borderRadius: "borderRadius",
  style: { backgroundColor: 'white', height: '60vh', width: '60vw'},
  m: 1
};

const Game = () => {
  return (
    <div>
      <Grid item xs={9}>
        <Box {...boxProps}>
            <p>GAME</p>
        </Box>
      </Grid>
    </div>
  );
}
export default Game
