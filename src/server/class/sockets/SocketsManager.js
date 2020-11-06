import socketIo from 'socket.io';
import Room from '../tetris/Room';
import instanceRooms from '../tetris/Rooms';
import Player from '../tetris/Player';

class SocketsManager {
	constructor (server) {
    this.io = socketIo(server);
    this.io.on('connection', (socket) => {
      this.socket = socket
      this.initListener()
    });
  }

  // Default
  defaultListener = () => {
    console.log(`new user connected : ${this.io}`);
    this.socket.on('server/ping', () => {
      console.log('ping')
      this.socket.emit('client/pong');
      this.socket.emit('client/update-rooms', instanceRooms);
    })
    this.socket.on('disconnect', () => {
      this.socket.disconnect();
    });
  }
  
  // Room listener
  roomListener = () => {
    // Create and join room
    this.socket.on('server/create-room', (data) => {
      console.log('data', data)
      const player = new Player(data, true);
      const room = new Room(player)
      const rooms = instanceRooms;
      console.log("Before", rooms)
      rooms.add(room);
      console.log("After", rooms)
      console.log('server/create')
      console.log("rooms", room.channel)
      console.log('player', player.uuid)
      this.socket.emit('client/update-rooms', instanceRooms);
      this.socket.emit('client/created-room', { uuidRoom: room.channel, uuidUser: player.uuid })
      this.socket.broadcast.join(room.channel);
      console.log(`user join room: ${room.channel}`)
    });
    
    // leave room
    this.socket.on('server/leave-room', (data) => {
      const { channel, uuidUser } = data;
      const rooms = instanceRooms;
      rooms.deletePlayer(channel, uuidUser)
      this.socket.broadcast.leave(channel);
      this.socket.emit('client/update-rooms', instanceRooms);
      console.log(`user leave channel: ${channel}`)
    });
    
    // join room
    this.socket.on('server/join-room', (data) => {
      const { channel, login } = data;
      const player = new Player(login, false);
      const rooms = instanceRooms;
      console.log(channel, login)
      rooms.addPlayer(channel, player);
      this.socket.emit('client/update-rooms', instanceRooms);
      this.socket.emit('client/join-room', { uuidRoom: channel, uuidUser: player.uuid })
      this.socket.broadcast.join(channel);
    });
  }

  // Game Listener
  gameListener = () => {
    this.io.on('server/create-game', (data) => {
      // get channel
    });
    
    this.io.on('server/move-pieces', (data) => {
      // get channel
  
      // get game
      
      // move pieces
      
      // is finish ?
    });
    
    this.io.on('server/pause', (data) => {
      // get channel
  
      // stop timer
  
      // send state pause
    });
  
    this.io.on('server/resume', (data) => {
      // get channel
  
      // restart timer
  
      // send state resume
  
    })
  }

  initListener = () => {
    this.defaultListener();
    this.roomListener();
    this.gameListener();
  }
}

export default SocketsManager