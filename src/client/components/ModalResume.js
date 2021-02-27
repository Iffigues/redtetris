// Libs
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import _ from 'lodash'


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

const ModalResume = ({ setSong, isPlaying, song, player, uuidRoom }) => {
  const classes = useStyles();

  const handleCloseModal = () => {
    console.log("HandleCloseModal")
  };

  const leaveRoom = (e) => {
    e.preventDefault()
    sendSocket('server/leave-room', { uuidRoom, uuidUser: player.uuid })
  }

  const resume = () => {
    sendSocket('server/pause-resume', { channel: uuidRoom })
  }

  const changeSongPref = (e) => {
    e.preventDefault()
    setSong(!song)
  }

  return (
    <div className="test--modal-resume">
      <Modal
        className="d-flex jcnt--center aitems--center fdir--row pt-3"
        open={isPlaying}
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
}

export default ModalResume