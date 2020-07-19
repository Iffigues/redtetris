import React from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Preview from 'components/preview'
import Game from 'components/game'
import {withRouter} from 'react-router';

const BoardPage = () => {
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
export default withRouter(BoardPage)
