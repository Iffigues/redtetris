import React, { useContext, useEffect } from 'react';
import _ from 'lodash';
import { Button, Card } from '@material-ui/core';

import { Context as UserContext } from "../context/UserContext";
import { SocketContext } from "../context/SocketContext";

import Preview from './Preview'
import Game from './Game'
import Chat from './Chat';
import ReGame from './ReGame';

const boxProps = {
  bgcolor: 'background.paper',
  bordercolor: 'text.primary',
  border: 1,
  borderradius: "borderRadius",
  style: { backgroundColor: 'white', height: '100%', width: '100%'},
  m: 1
};


const Board = ({ finalScore, song, currentRoom, isEnd, uuidRoom, mapGame, mapsGamePreview, isAlone, score, sheet }) => {
  const { state: { player } } = useContext(UserContext);
  const { sendSocket } = useContext(SocketContext);

  const leaveRoom = (e, sendSocket, uuidRoom, uuidUser, endGame) => {
    e.preventDefault()
    sendSocket('server/leave-room', {
      uuidRoom,
      uuidUser,
      endGame
    })
  }

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

  if ((player && player.visitor) || (player && Object.keys(currentRoom).includes('players') && Object.keys(currentRoom.players).includes(player.uuid) && currentRoom.players[player.uuid] && currentRoom.players[player.uuid].visitor)) {
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
                mapsGamePreview={mapsGamePreview}
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
              finalScore={finalScore}
            />
          : (
              <div className="width-100">
                <Card {...boxProps} variant="outlined">
                  <Game
                    game={mapGame}
                    song={song}
                    isOtherUser={false}
                  />
                </Card>
              </div>
            )
        }
        <div className="aself--str">
          <Preview
            mapsGamePreview={mapsGamePreview}
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
