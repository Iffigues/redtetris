import React from 'react'
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

const Home = () => {
  return (
    <div>
      <Container fixed>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <span>Bienvenu sur red-tetris</span>
          </Grid>
          <Grid item xs={6}>
            <Button variant="contained">Rejoindre une partie</Button>
          </Grid>
          <Grid item xs={6}>
            <Button variant="contained" color="primary">Crée une partie</Button>
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}

export default Home
