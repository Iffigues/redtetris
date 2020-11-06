import React from 'react'
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { Link } from 'react-router-dom';
import { Context as AlertContext } from "../../context/AlertContext";
import { SocketContext } from "../../context/SocketContext";
import { useContext, useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';


const HomePage = () => {
  const { state, sendAlert } = useContext(AlertContext);
  const { sendSocket } = useContext(SocketContext);
  const [login, setLogin] = useState('');

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
            <TextField
              value={login}
              onInput={e => setLogin(e.target.value)}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="Login"
              label="Login"
              type="Login"
              id="Login"
              autoComplete="current-login"
            />
          </Grid>
          <Grid item xs={6}>
          <Link to="/join-room">
            <Button
              variant="contained"
              disabled={login.length === 0}
            >
              Rejoindre une partie !
            </Button>
          </Link>
          </Grid>
          <Grid item xs={6}>
            <Link to="/create-room">
              <Button
                variant="contained"
                disabled={login.length === 0}
                color="primary"
              >
                Crée une partie
              </Button>
            </Link>
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}

export default HomePage
