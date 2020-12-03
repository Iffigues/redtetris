import socketIo from 'socket.io';
import Room from '../tetris/Room';
import instanceRooms from '../tetris/Rooms';
import Player from '../tetris/Player';

class SocketsManager {
	constructor (server) {
    this.io = socketIo(server);
    this.rooms = instanceRooms;
    this.io.on('connection', (socket) => {
      this.utilsIo = {io: this.io, socket};
      this.initListener(socket)
    });
  }

  updateRooms = (rooms = this.rooms, socket = this.utilsIo.socket) => {
    socket.emit('client/update-rooms', rooms);
    this.io.sockets.emit('client/update-rooms', rooms)
  }

  // Default
  defaultListener = (socket) => {
    console.log(`new user connected : ${this.io}`);
    socket.on('server/ping', () => {
      console.log('ping')
      socket.emit('client/pong');
    })
    socket.on('disconnect', () => {
      socket.disconnect();
    });
  }
  
  // Room listener
  roomListener = (socket) => {
    // Create and join room
    socket.on('server/create-room', (data) => {
      console.log('create-room', data)
      const { login, playSolo } = data
      const player = new Player(login, true, () => this.updateRooms());
      const room = new Room(player, playSolo)
      this.rooms.add(room);
      socket.join(room.channel);
      socket.join(player.uuid);
      this.updateRooms(this.rooms, socket)
      socket.emit('client/created-room', { uuidRoom: room.channel, player })
      console.log(`user create room: ${room.channel}`)
    });
    
    // // leave room
    socket.on('server/leave-room', (data) => {
      console.log('leave-room', data)
      const { uuidRoom, uuidUser } = data;
      this.rooms.deletePlayer(uuidRoom, uuidUser)
      socket.leave(uuidRoom);
      this.updateRooms(this.rooms, socket)
      socket.emit('client/update-user', { uuidRoom: null, player: null })
      console.log(`user leave channel: ${uuidRoom}`)
    });
    
    // join room
    socket.on('server/join-room', (data) => {
      console.log('join-room', data)
      const { channel, login } = data;
      const player = new Player(login, () => this.updateRooms());
      console.log("before:", this.rooms.get(channel).getPlayers())
      this.rooms.addPlayer(channel, player);
      console.log("after", this.rooms.get(channel).getPlayers())
      console.log("join", channel, login)
      this.updateRooms(this.rooms, socket)
      socket.emit('client/join-room', { uuidRoom: channel, player });
      socket.join(channel);
      socket.join(player.uuid);
      console.log(`User ${login} join room ${channel}`)
      socket.emit('client/join-room', { uuidRoom: channel, player })
      socket.to(channel).emit('client/global/join-room', { player })
    });
  }
  
  // Game Listener
  gameListener = (socket) => {
    socket.on('server/start-game', (data) => {
      console.log('start-game', data)
      const { uuidRoom } = data;
      this.rooms.startGame(uuidRoom);
      console.log('start game', data)
      this.updateRooms(this.rooms, socket)
      socket.to(uuidRoom).emit('client/start-game')
    });
    
    socket.on('server/key-up', (data) => {
      // KEY: 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Escape'
      console.log('key-up', data)
      const { key, channel, uuidUser } = data;
      // get channel
      this.rooms.onKey(key, channel, uuidUser);
      console.log(key, channel)
      // get game
      
      // move pieces
      
      // is finish ?
    });
    
    socket.on('server/pause-resume', (data) => {
      console.log('pause-resume', data)
      // get channel
      const { channel } = data;
      this.rooms.changeIsPlaying(channel);
      this.updateRooms(this.rooms, socket)
      console.log("rooms after", this.rooms);
      // console.log(isPlaying, channel);
      // stop timer
  
      // send state pause
    });
  }

  initListener = (socket) => {
    this.defaultListener(socket);
    this.roomListener(socket);
    this.gameListener(socket);
  }
}

export default SocketsManager