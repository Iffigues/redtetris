// Libs
import React, { useContext, useState, useEffect } from 'react';
import { withRouter } from 'react-router';
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import _ from 'lodash'

import KeyBoardListener from '../../listeners/KeyBoardListener'
import { Context as AlertContext } from "../../context/AlertContext";
import { Context as UserContext } from "../../context/UserContext";
import { Context as RoomsContext } from "../../context/RoomsContext";
import { SocketContext } from "../../context/SocketContext";
import Board from '../../components/board';


const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  }
}));

const Room = (props) => {
  const { match } = props
  const classes = useStyles();
  const { state: { player } } = useContext(UserContext);
  const { state: { rooms } } = useContext(RoomsContext);
  const { sendSocket } = useContext(SocketContext);
  const { sendAlert } = useContext(AlertContext);
  const [game, setGame] = useState(true);
  const [song, setSong] = useState(true);
  const { uuidRoom } = match.params;
  const history = useHistory()
  KeyBoardListener(game);
  
  

  const leaveRoom = (e) => {
    e.preventDefault()
    sendSocket('server/leave-room', { uuidRoom, uuidUser: player.uuid })
  }

  const resume = () => {
    sendSocket('server/pause-resume', { channel: uuidRoom })
  }

  const handleSetStartGame = () => {
    sendSocket('server/start-game', { uuidRoom })
  }
  
  const handleCloseModal = () => {
    console.log("HandleCloseModal")
  };

  const changeSongPref = (e) => {
    e.preventDefault()
    setSong(!song)
  }
  
  useEffect(() => {
    if (!player || !rooms || !rooms[uuidRoom]) {
      setGame(false);
      history.replace('/');
    }
  }, [player])

  useEffect(
    () => {
      sendAlert(`Bienvenu sur la partie #${uuidRoom}`, 'info')
      setTimeout(() => {
        sendAlert()
      }, 5000)
    }
  ,[])

  if (rooms[uuidRoom]) {
    if (!rooms[uuidRoom].isStart && (player.solo || player.admin)) {
      return (
        <div className="d-flex jcnt--center aitems--center fdir--row pt-3">
          <Button
            className="aself--center"
            variant="contained"
            onClick={handleSetStartGame}
            data-testid='gameElmt'
            >
            Commencer la partie !
          </Button>
        </div>
      )
    } else if (!rooms[uuidRoom].isStart && !player.admin) {
      return (
        <p>
          Veuillez attendre que le maitre du jeux commence la partie
        </p>
      )
    } else if (!rooms[uuidRoom].isPlaying) {
      return (
        <div>
          <Modal
            className="d-flex jcnt--center aitems--center fdir--row pt-3"
            open={!rooms[uuidRoom].isPlaying}
            disablePortal
            disableEnforceFocus
            disableAutoFocus
            onClose={handleCloseModal}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
          >
            <div className={classes.paper}>
              <div className="aself--center">
                <h1 className="aself--center" id="transition-modal-title">Pause</h1>
              </div>
              <div className="d-flex jcnt--space-ar fdir--row">
                <Button
                  id="songRoom"
                  data-testid='btnSong'
                  onClick={e => changeSongPref(e)}
                >
                  { song ? "🔈" : "🔇" }
                </Button>
              </div>
              <div className="d-flex jcnt--space-ar fdir--row">
                <div className="aself--fstart p-2">
                  <Button
                    id="leaveRoom"
                    variant="contained"
                    color="secondary"
                    data-testid='btnCreateRoom'
                    onClick={e => leaveRoom(e)}
                  >
                    Quitter la partie ?
                  </Button>
                </div>
                <div className="aself--fstart p-2">
                  <Button
                    id="resume"
                    variant="contained"
                    color="primary"
                    data-testid='btnCreateRoom'
                    onClick={resume}
                  >
                    Reprendre
                  </Button>
                </div>
              </div>
            </div>
          </Modal>
        </div>
      )
    } else {
      return (
        <div className="overflow-h">
          <Board
            data-testid="gameElmt"
            song={song}
            currentRoom={rooms[uuidRoom]}
            isEnd={rooms[uuidRoom].players[player.uuid].end}
            mapGame={rooms[uuidRoom].players[player.uuid].currentMapGame}
            isAlone={Object.keys(rooms[uuidRoom].players).length === 1}
            mapGamePreview={_.filter(rooms[uuidRoom].players, item => item.uuid !== player.uuid)[0]?.currentMapGame}
            score={rooms[uuidRoom].players[player.uuid].score}
            sheet={rooms[uuidRoom].players[player.uuid].sheets[0]}
            uuidRoom={uuidRoom}
          />
        </div>
      )
    }
  }
}

export default withRouter(Room)
