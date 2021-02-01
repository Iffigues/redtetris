import React from 'react'
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import _ from 'lodash'
import { Context as AlertContext } from "../../context/AlertContext";
import { Context as UserContext } from "../../context/UserContext";
import { Context as RoomsContext } from "../../context/RoomsContext";
import { SocketContext } from "../../context/SocketContext";
import { useContext, useEffect, useState } from 'react';
import Input from '@material-ui/core/Input';
import { useHistory } from 'react-router-dom'
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';



const useStyles = makeStyles({
  table: {
    minWidth: 650,
    width: 800,
    alignSelf: 'center'
  },
});

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const TablePlayers = () => {
  const classes = useStyles();

  return (
    <div className="table-player d-flex jcnt--center fdir--column">
      <h1 className="aself--center">Choisissez de crée une partie ou d'en rejoindre une</h1>
      <div className="aself--center">
      <h2>Partie en cours:</h2>
      <TableContainer>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Dessert (100g serving)</TableCell>
              <TableCell align="right">Calories</TableCell>
              <TableCell align="right">Fat&nbsp;(g)</TableCell>
              <TableCell align="right">Carbs&nbsp;(g)</TableCell>
              <TableCell align="right">Protein&nbsp;(g)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.calories}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
                <TableCell align="right">{row.carbs}</TableCell>
                <TableCell align="right">{row.protein}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </div>
    </div>
  );

}

const HomePage = () => {
  const { state: {uuidRoom} } = useContext(UserContext);
  const { state, sendAlert } = useContext(AlertContext);
  const { sendSocket } = useContext(SocketContext);
  const [roomSelected, setRoomSelected] = useState('');
  const [playSolo, setPlaySolo] = useState(false);
  const [login, setLogin] = useState('');
  const [wantJoinGame, setWantJoinGame] = useState(false);
  const [haveChooseLogin, setHaveChooseLogin] = useState(false);
  const history = useHistory()

  const createPlayer = () => {
    setHaveChooseLogin(true)
    console.log(login);
  }

  const createRoom = () => {
    if (!wantJoinGame) {
      console.log("playSolo", playSolo)
      sendSocket('server/create-room', { login, playSolo })
   } else {
      sendSocket('server/join-room', { channel: roomSelected, login })
    }
  }
  useEffect(() => {
    if (uuidRoom) {
      history.push(`/room/${uuidRoom}`)
    }
  }, [uuidRoom])

  useEffect(
    () => {
      sendAlert('Soon, will be here a fantastic Tetris ...', 'info')
      sendSocket('server/ping')
      setTimeout(() => {
        sendAlert()
      }, 5000)
    }
    ,[])

  return (
    <div>
        <div className={`${!haveChooseLogin ? 'initial-form-out' : ''} inital-form d-flex jcnt--center fdir--column`}>
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
            data-testid='btnJoinRoom'
            disabled={login.length === 0}
            onClick={createPlayer}
            >
            Valider
          </Button>
        </div>
      { haveChooseLogin && (<TablePlayers />) }
    </div>
  )
}
export default HomePage
