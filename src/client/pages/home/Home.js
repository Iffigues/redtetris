// Libs
import React from 'react'
import { useHistory } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react';
import _ from 'lodash'
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';

import { Context as UserContext } from "../../context/UserContext";
import { Context as RoomsContext } from "../../context/RoomsContext";
import { SocketContext } from "../../context/SocketContext";


const FormCreateRoom = ({login}) => {
  const [playSolo, setPlaySolo] = useState(false);
  const { sendSocket } = useContext(SocketContext);

  const handleChangeCheckBox = (event) => {
    console.log("playSolo", event.target.checked, playSolo)
    setPlaySolo(event.target.checked);
  };

  const createRoom = (e) => {
    console.log(login, playSolo)
    e.preventDefault()
    sendSocket('server/create-room', { login, playSolo })
  }

  return (
    <div className="d-flex jcnt--center pt-3">
      <div>
        <FormControlLabel
          control={<Checkbox
            checked={playSolo}
            onChange={handleChangeCheckBox}
            color="primary"
            />}
          label="Jouer en solo ?"
        />
      </div>
      <div className="aself--center">
        <Button
          className="aself--center mt-2 test--btn-join-room"
          id="createRoom"
          variant="contained"
          color="primary"
          data-testid='btnCreateRoom'
          onClick={e => createRoom(e)}
        >
          Crée une partie
        </Button>
      </div>
    </div>
  )
}
const useStyles = makeStyles({
  table: {
    minWidth: 650,
    width: 800,
    alignSelf: 'center'
  },
});

const TablePlayers = ({login}) => {
  const { sendSocket } = useContext(SocketContext);
  const { state: { rooms } } = useContext(RoomsContext);
  const classes = useStyles();
  console.log(rooms)

  const joinRoom = (e, roomSelected) => {
    e.preventDefault();
    sendSocket('server/join-room', { channel: roomSelected, login })
  }

  if (!rooms || Object.keys(rooms).length === 0) {
    return (
      <div>
        <div className="d-flex jcnt--center pt-3">
          <p className="aself--center">
            Aucune partie n'est disponible pour le moment 🙁
            <br /> 
            <span className="bold">Mais vous pouvez en créez une des a present !</span>
          </p>
        </div>
        <FormCreateRoom login={login} />
      </div>
    )
  } else {
    return (
      <div className="table-player d-flex jcnt--center fdir--column">
      <h1 className="aself--center">Choisissez de crée une partie ou d'en rejoindre une</h1>
      <div className="aself--center">
      <h2>Partie en cours:</h2>
      <TableContainer>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Numero de la partie</TableCell>
              <TableCell>Participants</TableCell>
              <TableCell>Etat de la partie</TableCell>
              <TableCell>Solo</TableCell>
              <TableCell>Rejoindre</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {
            Object.keys(rooms).map((item, key) => {
               return (
                <TableRow key={key}>
                  <TableCell>
                    #{ rooms[item].channel }
                  </TableCell>
                <TableCell component="th" scope="row">
                {_.map(rooms[item].players, (player, index) =>
                  `${player.name}${(index !== Object.keys(rooms[item].players)[Object.keys(rooms[item].players).length - 1]) ? ', ' : ''}`
                )}
                </TableCell>
                <TableCell>
                  { rooms[item].isStart ? "En partie" : "Dans le salons" }
                </TableCell>
                <TableCell>
                  { rooms[item].solo ? "👍" : "👎" }
                </TableCell>
                <TableCell>
                  <Button
                    className="aself--center mt-2 test--btn-join-room"
                    id="joinRoom"
                    variant="contained"
                    color="primary"
                    data-testid='btnJoinRoom'
                    disabled={login.length === 0}
                    onClick={e => joinRoom(e, rooms[item].channel)}
                  >
                    Rejoindre
                  </Button>
                </TableCell>
              </TableRow>
              )})
            }
          </TableBody>
        </Table>
      </TableContainer>
      </div>
      <FormCreateRoom login={login} />
    </div>
    )
  }
}

const HomePage = () => {
  const { state: { uuidRoom } } = useContext(UserContext);
  const [login, setLogin] = useState('');
  const [haveChooseLogin, setHaveChooseLogin] = useState(false);
  const history = useHistory()

  const createPlayer = () => {
    setHaveChooseLogin(true)
  }

  useEffect(() => {
    console.log(uuidRoom);
    if (uuidRoom) {
      history.push(`/${uuidRoom}[${login}]`)
    }
  }, [uuidRoom])

  return (
    <div>
        <div className="inital-form d-flex jcnt--center fdir--column">
          <h1 className="aself--center">Bienvenu sur Red-tetris !</h1>
          <span className="aself--center pt-3">Veuillez entrez un login.</span>
          <Input
            className="aself--center mb-2 input-size"
            value={login}
            onChange={e => setLogin(e.target.value)}
            variant="outlined"
            required
            name="login"
            label="Login"
            type="Login"
            id="Login"
            inputProps={{
              'data-testid': 'loginInput'
            }}
            autoComplete="current-login"
            />
          <Button
            className="aself--center mt-2 test--btn-join-room"
            variant="contained"
            color="primary"
            data-testid='btnLogin'
            disabled={login.length === 0}
            onClick={createPlayer}
            >
            Valider
          </Button>
        </div>
      { haveChooseLogin && (<TablePlayers login={login} />) }
    </div>
  )
}
export default HomePage
