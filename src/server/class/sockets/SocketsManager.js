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
    socket.on('server/ping', () => {
      socket.emit('client/pong');
    })
    socket.on('disconnect', () => {
      socket.disconnect();
    });
  }
 
  hello = () => {
  	console.log("rtrtrt");
  }

  // Room listener
  roomListener = (socket) => {
    // Create and join room
    socket.on('server/create-room', (data) => {
      const { login, playSolo } = data
      const player = new Player(login, () => this.updateRooms(), true);
      const room = new Room(player, playSolo)
      this.rooms.add(room);
      socket.join(room.channel);
      socket.join(player.uuid);
      this.updateRooms(this.rooms, socket)
      socket.emit('client/created-room', { uuidRoom: room.channel, player })
    });
    
    // leave room
    socket.on('server/leave-room', (data) => {
      const { uuidRoom, uuidUser } = data;
      this.rooms.deletePlayer(uuidRoom, uuidUser)
      socket.leave(uuidRoom);
      this.updateRooms(this.rooms, socket)
      socket.emit('client/update-user', { uuidRoom: null, player: null })
    });
    
    // join room
    socket.on('server/join-room', (data) => {
      const { channel, login } = data;
      const player = new Player(login, () => this.updateRooms());
      this.rooms.addPlayer(channel, player);
      this.updateRooms(this.rooms, socket)
      socket.emit('client/join-room', { uuidRoom: channel, player });
      socket.join(channel);
      socket.join(player.uuid);
      socket.emit('client/join-room', { uuidRoom: channel, player })
      socket.to(channel).emit('client/global/join-room', { player })
    });
  }
  
  // Game Listener
  gameListener = (socket) => {
    socket.on('server/start-game', (data) => {
      const { uuidRoom } = data;
      this.rooms.startGame(uuidRoom);
      this.updateRooms(this.rooms, socket)
      socket.to(uuidRoom).emit('client/start-game')
    });
    
    socket.on('server/key-up', (data) => {
      // KEY: 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '
      const { key, channel, uuidUser } = data;
      console.log(key, channel, uuidUser)
      this.rooms.onKey(key, channel, uuidUser);
    });
    
    socket.on('server/pause-resume', (data) => {
      // get channel
      const { channel } = data;
      this.rooms.changeIsPlaying(channel);
      this.updateRooms(this.rooms, socket)
    });
  }

  initListener = (socket) => {
    this.defaultListener(socket);
    this.roomListener(socket);
    this.gameListener(socket);
  }
}

export default SocketsManager
