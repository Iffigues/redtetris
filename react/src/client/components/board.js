import React from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Preview from 'components/Preview'
import Game from 'components/game'
import StyledTetrisWrapper from 'components/style/styledBoard'
import StyledTetris from 'components/style/styledBoard'


const Board = () => {
  return (
    <div>
      <Container style={{ backgroundColor: '#cfe8fc', height: '70vh'}}>
        <h1>Partie !</h1>
        <Grid container spacing={3}>
          <StyledTetris>
            <Game game={createGame(false)}/>
          </StyledTetris>        
          <Preview/>
        </Grid>
      </Container>
    </div>
  );
}
export default Board
