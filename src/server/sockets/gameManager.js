import { createRoom } from '../tetris/room'
import { createPlayer } from '../tetris/player'

export const gameListener = (socket) => {
  socket.on('server/create-game', (data) => {
    // get channel
  });
  
  socket.on('server/move-pieces', (data) => {
    // get channel

    // get game
    
    // move pieces
    
    // is finish ?
  });
  
  socket.on('server/pause', (data) => {
    // get channel

    // stop timer
    
    // send state pause
  });

  socket.on('server/resume', (data) => {
    // get channel

    // restart timer

    // send state resume

  })
}