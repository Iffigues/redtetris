import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom'

import _ from 'lodash';
import { Button, Card, CardContent } from '@material-ui/core';

import { Context as UserContext } from "../context/UserContext";
import Preview from './preview'
import Game from './game'
import { SocketContext } from "../context/SocketContext";
import Chat from './Chat';

const boxProps = {
  bgcolor: 'background.paper',
  bordercolor: 'text.primary',
  border: 1,
  borderradius: "borderRadius",
  style: { backgroundColor: 'white', height: '100%', width: '100%'},
  m: 1
};


const ReGame = ({ score, player, currentRoom }) => {
  const { sendSocket } = useContext(SocketContext);
  const [haveSendReGame, setHaveSendReGame] = useState(false);

  const wantReGame = (e) => {
    e.preventDefault()
    setHaveSendReGame(true)
    sendSocket('server/re-game', {
      channel: currentRoom.channel,
      uuidUser: player.uuid
    })
  }

  const leaveRoom = (e) => {
    e.preventDefault()
    sendSocket('server/leave-room', {
      channel: currentRoom.channel,
      uuidUser: player.uuid,
      endGame: true
    })
  }

  return (
    <div className="width-100 d-flex jcnt--center aitems--center fdir--column pt-3">
      <h1 className="aself--center">Vous avez perdu 😞</h1>
      <h1 className="aself--center">Vous avez gagné 🔥</h1>
      <p className="aself--center">Votre score final est de: { score }</p>
      {
        !haveSendReGame
        ?
         (
            <div className="d-flex jcnt--center aitems--center fdir--row">
              <Button
                className="ml-2 test--btn-join-room"
                id="leaveRoom"
                variant="contained"
                color="secondary"
                data-testid='btnLeaveGame'
                onClick={e => leaveRoom(e)}
              >
                Quitter
              </Button>
              <Button
                className="mr-2 test--btn-join-room"
                id="wantReGame"
                variant="contained"
                color="primary"
                data-testid='btnReGame'
                onClick={e => wantReGame(e, currentRoom.channel)}
              >
                Rejouez
              </Button>
            </div>
          )
        : (
            <div className="d-flex jcnt--center aitems--center fdir--row">
              <p>
                Veuillez attendre que votre adversaire accepte de rejouez
              </p>
            </div>
          )
        }
    </div>
  )
}

const RenderGame = ({ song, isEnd, mapGame, currentRoom, score, player }) => {
  if (isEnd) {
    return (
      <ReGame score={score} player={player} currentRoom={currentRoom} />
    )
  } else {
    return (
      <div className="width-100">
        <Card {...boxProps} variant="outlined">
          <Game game={ { game: mapGame, isOtherUser: false } } song={song} />
        </Card>
      </div>
    )
  }
}

const Board = ({ song, currentRoom, isEnd, uuidRoom, mapGame, mapGamePreview, isAlone, score, sheet }) => {
  const { state: { player } } = useContext(UserContext);
  if (player && player.visitor) {
    return (
      <div className="d-flex jcnt--center fdir--column">
        <div className="aself--center">
          Vous regardez en tant que visiteur
        </div>
        <div className="aself--center width-100">
          <Card {...boxProps} variant="outlined">
            <CardContent>
              <Preview mapGamePreview={ { game: mapGamePreview, isOtherUser: true } } isVisitor={true} isAlone={isAlone} score={0} sheet={null}/>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  } else {
    return (
      <div className="d-flex jcnt--start aitems--fs fdir--row">
        <RenderGame
          song={song}
          isEnd={isEnd}
          mapGame={mapGame}
          currentRoom={currentRoom}
          score={score}
          player={player}
        />
        <div className="aself--str">
          <Preview
            mapGamePreview={ { game: mapGamePreview, isOtherUser: true} }
            isVisitor={false}
            isAlone={isAlone}
            score={score}
            sheet={sheet}
            uuidRoom={uuidRoom}
          />
        </div>
        <div style={{ width: '50vw' }}>
          <Card {...boxProps} variant="outlined">
            <Chat uuidRoom={uuidRoom} />
          </Card>
        </div>
      </div>
    );
  }
}

export default Board
