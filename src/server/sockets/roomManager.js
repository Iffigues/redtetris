import { createRoom } from '../tetris/room'
import { createPlayer } from '../tetris/player'

export const roomListener = (socket) => {
  // Create room
  socket.on('server/create-room', (data) => {
    const { content } = data
    console.log('data', content)
    const player = createPlayer(content, true);
    const room = createRoom(player)
    console.log('server/create')
    console.log("rooms", room.channel)
    console.log('player', player.uuid)
    socket.emit('client/created-room', { uuidRoom: room.channel, uuidUser: player.uuid })
    socket.broadcast.join(room.channel);
    console.log(`user join channel: ${room.channel}`)
      // socket.broadcast.join(data.uid);
      // console.log(`user join channel: ${data.uid}`)
  });

  socket.on('server/leave-room', (data) => {
    socket.broadcast.leave(data.channel);
    console.log(`user leave channel: ${data.channel}`)
  })
}