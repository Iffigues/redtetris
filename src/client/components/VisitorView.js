
import React from 'react';
import _ from 'lodash';
import { Card } from '@material-ui/core';

import Preview from './Preview'
import Chat from './Chat';


const VisitorView = ({ currentRoom, player, mapsGamePreview, isAlone }) => {

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

}

export default VisitorView;