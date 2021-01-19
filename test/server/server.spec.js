import socketIOClient from "socket.io-client"
import Server from "../../src/server/class/Server"
import { params } from "../../params"
import debug from 'debug'
import SocketsManager from "../../src/server/class/sockets/SocketsManager";

describe('Server tests', () => {
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

  it.only('create room', (done) => {
    const data = { login: 'owalid', playSolo: false }
    socketClient.on('client/update-rooms', (rooms) => {
      const room = rooms._data[Object.keys(rooms._data)[0]]
      const player = room.players[Object.keys(room.players)[0]]
      expect(player.name).toBe('owalid')
      expect(player.isPlaying).toBe(false)
      expect(player.admin).toBe(true)
      expect(player.visitor).toBe(false)
      expect(room.solo).toBe(false)
      done()
    })
    socketClient.emit("server/create-room", data);
  });

  it('leave room', () =>  {
	 socketClient.emit("server/leave-room");
  });

  it('join room', () => {
	socketClient.emit("server/join-room");
  });

  it ('start room', () =>  {
	socketClient.emit('server/start-game');
  });


  it('key up', () => {
	socketClient.emit('server/key-up');
  });

  it('pause', () => {
	socketClient.emit('server/pauser-resume');
  })

});
