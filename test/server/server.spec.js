import socketIOClient from "socket.io-client"
import Server from "../../src/server/class/Server"
import instanceRooms from '../../src/server/class/tetris/Rooms'
import { params } from "../../params"
import SocketsManager from "../../src/server/class/sockets/SocketsManager";

describe('Server tests', () => {
  let channel = "";
  let uidplayer = "";
  const { host, port, url } = params;
  let server;
  let socketClient;

  beforeEach(done => {
    socketClient = socketIOClient(url)
    const srvInstance = new Server(true)
    socketClient.on('connect', () => {
      console.log("connected")
    });
    server = srvInstance.app.listen({ host, port }, () => {
      done()
    })
    const socketsManager = new SocketsManager(server);
    srvInstance.setServer(server)
    srvInstance.setSocketManager(socketsManager)
  });

  const getCurrentRoom = () => {
    return (Object.keys(instanceRooms).includes('_data')
          && Object.keys(instanceRooms._data).length > 0)
              ? instanceRooms._data[Object.keys(instanceRooms._data)[0]]
              : false;
  }

  afterEach(() => {
    if (socketClient.connected) {
      socketClient.disconnect()
    }
  	server.close();
  });
  
  it('Should ping', (done) => {
    socketClient.emit("server/ping");
    socketClient.on("client/pong", () => {
      done()
    })
  });

  it('create room', (done) => {
    const data = { login: 'owalid', playSolo: false }
    socketClient.on('client/update-rooms', (rooms) => {
      const room = rooms._data[Object.keys(rooms._data)[0]]
      const player = room.players[Object.keys(room.players)[0]]
      channel = room.channel;
      uidplayer = player.uuid;
      expect(player.name).toBe('owalid')
      expect(player.isPlaying).toBe(false)
      expect(player.admin).toBe(true)
      expect(player.visitor).toBe(false)
      expect(room.solo).toBe(false)
      const current_room = getCurrentRoom()
      expect(current_room.channel).toBe(channel)
      done()
    })
    socketClient.emit("server/create-room", data);
  });

  it('join room', (done) => {
    const current_room = getCurrentRoom()
    const data = { channel: current_room.channel, login: "bobo" }
    console.log("data", data)
	  socketClient.on('client/join-room', (rooms) => {
      let player = rooms.player
      expect(player.end).toBe(false);
      expect(player.lock).toBe(true);
      expect(player.name).toBe("bobo");
      expect(player.admin).toBe(false);
      expect(player.score).toBe(0);
      expect(player.block).toBe(null);
      expect(player.visitor).toBe(false);
      expect(player.indestructible).toBe(0);
      expect(player.indestructible).toBe(0);
      expect(Object.keys(current_room.players).length).toBe(2)
      done()
    });
    socketClient.emit("server/join-room", data);
  });

  it('start room', (done) =>  {
    const current_room = getCurrentRoom()
    const data = { uuidRoom: current_room.channel }
    socketClient.on('client/update-rooms', (rooms) => {
      let room = rooms._data[channel];
      expect(room.isStart).toBe(true);
      expect(room.solo).toBe(false);
      expect(room.isPlaying).toBe(true);
      done()
    });
    socketClient.emit('server/start-game', data);
  });

  it('key up', (done) =>  {
    const current_room = getCurrentRoom()
    const current_player = current_room.players[Object.keys(current_room.players)[0]]
    const data = { key: "ArrowUp", channel: current_room.channel, uuidUser: current_player.uuid }
    
    socketClient.on('client/update-rooms', (rooms) => {
      console.log(rooms);
      done()
    });
    socketClient.emit('server/key-up', data);
  });

  it('pause', (done) => {
    const current_room = getCurrentRoom()
    const data = { channel: current_room.channel }
    expect(current_room.isPlaying).toBe(true)
	  socketClient.on('client/update-rooms', () => {
      expect(current_room.isPlaying).toBe(false)
      done()
    });
    socketClient.emit('server/pause-resume', data);
  });

	it('leave room', (done) =>  {
    const current_room = getCurrentRoom()
    const current_player = current_room.players[Object.keys(current_room.players)[0]]
    const data = { uuidRoom: current_room.channel, uuidUser: current_player.uuid }
    expect(Object.keys(current_room.players).length).toBe(2)
    socketClient.on('client/update-rooms', () => {
      expect(Object.keys(current_room.players).length).toBe(1)
      done()
    })
    socketClient.emit("server/leave-room",  data);
  });

	it('visitor join room', (done) =>  {
    const current_room = getCurrentRoom()
    const current_player = current_room.players[Object.keys(current_room.players)[0]]
    const data = { channel: current_room.channel, uuidUser: current_player.uuid }
    expect(Object.keys(current_room.players).length).toBe(1)
    socketClient.on('client/update-user', (player) => {
      expect(player).not.toBe(null)
      done()
    })
    socketClient.emit("server/visitor-join-room",  data);
  });

	it('end game visitor', (done) =>  {
    const current_room = getCurrentRoom()
    const data = { channel: current_room.channel }
    expect(Object.keys(current_room.players).length).toBe(1)
    socketClient.on('client/update-rooms', () => {
      done()
    });
    socketClient.emit("server/end-game-visitor",  data);
  });

	it('end game', (done) =>  {
    const current_room = getCurrentRoom()
    const current_player = current_room.players[Object.keys(current_room.players)[0]]
    const data = { channel: current_room.channel, uuidUser: current_player.uuid }
    expect(Object.keys(current_room.players).length).toBe(1)
    socketClient.on('client/update-rooms', () => {
      done()
    });
    socketClient.emit("server/end-game",  data);
  });

  
});
