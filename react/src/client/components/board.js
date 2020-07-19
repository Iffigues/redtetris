import React from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Preview from 'components/Preview'
import Game from 'components/game'

const Board = () => {
  return (
    <div>
      <Container style={{ backgroundColor: '#cfe8fc', height: '70vh'}}>
        <h1>Partie !</h1>
        <Grid container spacing={3}>
          <Game/>
          <Preview/>
        </Grid>
      </Container>
    </div>
  );
}
export default Board
