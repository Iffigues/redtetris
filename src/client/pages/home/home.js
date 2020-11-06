import React from 'react'
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { Link } from 'react-router-dom';
import { Context as AlertContext } from "../../context/AlertContext";
import { Context as UserContext } from "../../context/UserContext";
import { Context as RoomsContext } from "../../context/RoomsContext";
import { SocketContext } from "../../context/SocketContext";
import { useContext, useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import instanceRooms from '../../../server/class/tetris/Rooms'
import { useHistory } from 'react-router-dom'
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const SectionGames = (props) => {
  const [open, setOpen] = useState(false);
  const { state: {rooms} } = useContext(RoomsContext);
  const { wantJoinGame, roomSelected, setRoomSelected } = props

  const handleChange = (event) => {
    setRoomSelected(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  if (wantJoinGame) {
    console.log("rooms", rooms)
    if (!rooms || Object.keys(rooms).length === 0) {
      return (
        <Grid item xs={6}>
          Aucune partie n'est disponible pour le moment
        </Grid>
      )
    } else {
      console.log("rooms", rooms)
      return (
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          style={{width: '50%'}}
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={roomSelected}
          onChange={handleChange}
        >
          {
            Object.keys(rooms).map((item, key) => {
              return (
                <MenuItem
                  value={rooms[item].channel}>
                  {rooms[item].players
                    .map((player, index) => `${player.name}${(index !== rooms[item].players.length - 1) ? ', ' : ''}`
                    )
                  }
                </MenuItem>
              )
            })
          }
        </Select>
      )
    }
  } else {
    return '';
  }
}

const HomePage = () => {
  const { state: {uuidRoom} } = useContext(UserContext);
  const { state, sendAlert } = useContext(AlertContext);
  const { sendSocket } = useContext(SocketContext);
  const [roomSelected, setRoomSelected] = useState('');
  const [login, setLogin] = useState('');
  const [wantJoinGame, setWantJoinGame] = useState('');
  const history = useHistory()

  const createRoom = () => {
    if (!wantJoinGame) {
      sendSocket('server/create-room', login)
   } else {
      sendSocket('server/join-room', { channel: roomSelected, login })
    }
  }
  useEffect(() => {
    if (uuidRoom) {
      history.push(`/room/${uuidRoom}`)
    } else {
      console.log("uuidRoom", uuidRoom)
    }
  }, [uuidRoom])

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
            <Button
              variant="contained"
              disabled={login.length === 0}
              onClick={() => { setWantJoinGame(!wantJoinGame) }}
              >
              Rejoindre une partie !
            </Button>
          </Grid>
          <SectionGames
            wantJoinGame={wantJoinGame}
            roomSelected={roomSelected}
            setRoomSelected={setRoomSelected}
          />
          <Grid item xs={6}>
              <Button
                variant="contained"
                disabled={login.length === 0 || (wantJoinGame && !roomSelected)}
                color="primary"
                onClick={createRoom}
              >
                { wantJoinGame ? 'Rejoindre' : 'Crée une partie' }
              </Button>
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}

export default HomePage
