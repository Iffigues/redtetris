import React from 'react'
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { Link } from 'react-router-dom';
import { Context as AlertContext } from "../../context/AlertContext";
import { SocketContext } from "../../context/SocketContext";
import { useContext, useEffect } from 'react';

const HomePage = () => {
  const { state, sendAlert } = useContext(AlertContext);
  const { sendSocket } = useContext(SocketContext);

  useEffect(
    () => {
      console.log(state)
      sendAlert('Soon, will be here a fantastic Tetris ...', 'info')
      sendSocket('server/ping')
      setTimeout(() => {
        sendAlert()
      }, 5000)
    }
    ,[])
  return (
    <div>
      <Container fixed>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <span>Bienvenu sur red-tetris</span>
          </Grid>
          <Grid item xs={6}>
          <Link to="/join-room">
            <Button variant="contained">
              Rejoindre une partie !
            </Button>
          </Link>
          </Grid>
          <Grid item xs={6}>
            <Link to="/create-room">
              <Button variant="contained" color="primary">Crée une partie</Button>
            </Link>
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}

export default HomePage
