import React, { useCallback, useState, useContext, useEffect } from 'react';
import _ from 'lodash';
import { Button, Card } from '@material-ui/core';

import { Context as UserContext } from "../context/UserContext";
import { SocketContext } from "../context/SocketContext";

import Preview from './preview'
import Game from './game'
import Chat from './Chat';

const boxProps = {
  bgcolor: 'background.paper',
  bordercolor: 'text.primary',
  border: 1,
  borderradius: "borderRadius",
  style: { backgroundColor: 'white', height: '100%', width: '100%'},
  m: 1
};

const leaveRoom = (e, sendSocket, uuidRoom, uuidUser, endGame) => {
  e.preventDefault()
  sendSocket('server/leave-room', {
    uuidRoom,
    uuidUser,
    endGame
  })
}

const ReGame = ({ player, currentRoom }) => {
  const { sendSocket } = useContext(SocketContext);
  const [haveSendReGame, setHaveSendReGame] = useState(false);
  const [finalScore, setFinalScore] = useState([]);

  useEffect(() => {
    setFinalScore(currentRoom.finalScore)
  }, [currentRoom.finalScore])

  const wantReGame = (e) => {
    e.preventDefault()
    setHaveSendReGame(true)
    sendSocket('server/re-game', {
      channel: currentRoom.channel,
      uuidUser: player.uuid
    })
  }

  return (
    <div className="width-100 d-flex jcnt--center aitems--center fdir--column pt-3">
      {
        (_.filter(currentRoom.players, player => !player.visitor).length > 1)
        ?
          finalScore.map((score, index) => {
            <p key={index}>
              { (index + 1) === 1 ? "🥇 -"
                : (index + 1) === 2 ? "🥈 -"
                : (index + 1) === 3 ? "🥉 -"
                : `${index} -`
              }
              {score.login} {score.score}
            </p>
          })
        : <p>Votre score final est de {currentRoom.players[player.uuid].score}</p>
      }
      
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
                onClick={e => leaveRoom(e, sendSocket, currentRoom.channel, player.uuid, true)}
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

const Board = ({ song, currentRoom, isEnd, uuidRoom, mapGame, mapGamePreview, isAlone, score, sheet }) => {
  const { state: { player } } = useContext(UserContext);
  const { sendSocket } = useContext(SocketContext);


  const joinRoom = (e, channel, uuidUser) => {
    e.preventDefault()
    sendSocket('server/visitor-join-room', {
      channel,
      uuidUser
    })
  }

  useEffect(() => {
    if (isEnd === true && currentRoom) {
      sendSocket('server/end-game-visitor', { channel: uuidRoom })
      sendSocket('server/end-game', { channel: uuidRoom, uuidUser: player.uuid })
    }
  }, [isEnd])

  if (player && player.visitor) {
    return (
      <div>
        Vous regardez en tant que visiteur
        <div className="d-flex jcnt--center aitems--fs fdir--row">
          <div>
            <Button
              id="visiorLeave"
              data-testid='btnVisiorLeave'
              color="secondary"
              onClick={e => leaveRoom(e, sendSocket, currentRoom.channel, player.uuid, false)}
            >
              Quitter la room { isEnd }
            </Button>
            {
              isEnd &&
              <Button
                id="joinRoom"
                data-testid='btnLeave'
                color="primary"
                onClick={e => joinRoom(e, currentRoom.channel, player.uuid)}
              >
                Rejoindre la partie ?
              </Button>
            }
          </div>
          <div className="width-100">
            <Card {...boxProps} variant="outlined">
              <Preview
                mapGamePreview={ { game: mapGamePreview, isOtherUser: true } }
                isVisitor={true}
                isAlone={isAlone}
                score={0}
                sheet={null}
              />
            </Card>
          </div>
          <div style={{ width: '50vw' }}>
            <Card {...boxProps} variant="outlined">
              <Chat uuidRoom={uuidRoom} />
            </Card>
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div className="d-flex jcnt--start aitems--fs fdir--row">
    
        {
          (isEnd)
          ? <ReGame
              player={player}
              currentRoom={currentRoom}
            />
          : (
              <div className="width-100">
                <Card {...boxProps} variant="outlined">
                  <Game game={ { game: mapGame, isOtherUser: false } } song={song} />
                </Card>
              </div>
            )
        }
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
