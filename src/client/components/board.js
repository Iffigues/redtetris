import React from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Preview from './preview'
import Game from './game'
import StyledTetrisWrapper from './style/styledBoard'
import StyledTetris from './style/styledBoard'


const Board = () => {
  return (
    <Container style={{ backgroundColor: '#cfe8fc', height: '70vh'}}>
      <h1>Partie !</h1>
      <Grid container spacing={3}>
        <StyledTetris>
          <Game game={createGame(false)}/>
        </StyledTetris>        
        <Preview/>
      </Grid>
    </Container>
  );
}
export default Board
