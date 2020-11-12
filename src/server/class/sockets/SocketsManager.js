import socketIo from 'socket.io';
import Room from '../tetris/Room';
import instanceRooms from '../tetris/Rooms';
import Player from '../tetris/Player';

class SocketsManager {
	constructor (server) {
    this.io = socketIo(server);
    this.io.sockets.on('connection', (socket) => {
      this.socket = socket
      this.initListener()
    });
  }

  updateRooms = (rooms) => {
    this.socket.emit('client/update-rooms', rooms);
    this.io.sockets.emit('client/update-rooms', rooms)
  }

  // Default
  defaultListener = () => {
    console.log(`new user connected : ${this.io}`);
    this.socket.on('server/ping', () => {
      console.log('ping')
      this.socket.emit('client/pong');
    })
    this.socket.on('disconnect', () => {
      this.socket.disconnect();
    });
  }
  
  // Room listener
  roomListener = () => {
    // Create and join room
    this.socket.on('server/create-room', (data) => {
      console.log('create-room', data)
      const { login, playSolo } = data
      const player = new Player(login, true);
      const room = new Room(player, playSolo)
      const rooms = instanceRooms;
      rooms.add(room);
      this.updateRooms(rooms)
      this.socket.emit('client/created-room', { uuidRoom: room.channel, player })
      this.socket.broadcast.join(room.channel);
      console.log(`user join room: ${room.channel}`)
    });
    
    // // leave room
    // this.socket.on('server/leave-room', (data) => {
    //   console.log('leave-room', data)
    //   const { channel, uuidUser } = data;
    //   const rooms = instanceRooms;
    //   rooms.deletePlayer(channel, uuidUser)
    //   this.socket.leave(channel);
    //   this.socket.emit('client/update-rooms', rooms);
    //   console.log(`user leave channel: ${channel}`)
    // });
    
    // join room
    this.socket.on('server/join-room', (data) => {
      console.log('join-room', data)
      const { channel, login } = data;
      const player = new Player(login);
      console.log("before:", instanceRooms.get(channel).getPlayers())
      const rooms = instanceRooms;
      rooms.addPlayer(channel, player);
      console.log("after", instanceRooms.get(channel).getPlayers())
      console.log("join", channel, login)
      this.updateRooms(rooms)
      this.socket.emit('client/join-room', { uuidRoom: channel, player });
      this.socket.broadcast.join(channel);
      console.log(`User join channel ${channel}`)
      // this.socket.to(channel).emit('client/join-room', { uuidRoom: channel, player })
    });
  }
  
  // Game Listener
  gameListener = () => {
    this.socket.on('server/start-game', (data) => {
      console.log('start-game', data)
      const { uuidRoom } = data;
      console.log("before", rooms)
      const rooms = instanceRooms;
      console.log("after", rooms)
      rooms.startGame(uuidRoom);
      console.log('start game', data)
      this.updateRooms(rooms)
      this.io.sockets.in(uuidRoom).emit('client/start-game')
    });
    
    this.socket.on('server/key-up', (data) => {
      // KEY: 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Escape'
      console.log('key-up', data)
      const { key } = data;
      // get channel
      console.log(key)
      // get game
      
      // move pieces
      
      // is finish ?
    });
    
    this.socket.on('server/pause-resume', (data) => {
      console.log('pause-resume', data)
      // get channel
      const { channel } = data;
      const rooms = instanceRooms;
      rooms.changeIsPlaying(channel);
      this.updateRooms(rooms)
      console.log("rooms after", rooms);
      console.log(isPlaying, channel);
      // stop timer
  
      // send state pause
    });
  }

  initListener = () => {
    this.defaultListener();
    this.roomListener();
    this.gameListener();
  }
}

export default SocketsManager