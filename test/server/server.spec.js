import socketIOClient from "socket.io-client"
import Server from "../../src/server/class/Server"
import { params } from "../../params"
import debug from 'debug'
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
    socketClient.on('client/update-rooms' , (rooms) => {
      const room = rooms._data[Object.keys(rooms._data)[0]]
      const player = room.players[Object.keys(room.players)[0]]
	channel = room.channel;
	uidplayer = player.uuid;
      expect(player.name).toBe('owalid')
      expect(player.isPlaying).toBe(false)
      expect(player.admin).toBe(true)
      expect(player.visitor).toBe(false)
      expect(room.solo).toBe(false)
      done()
    })
    socketClient.emit("server/create-room", data);
  });

  it.only('join room', (done) => {
	const data = {channel:channel, login:"bobo"}
	  socketClient.on('client/join-room', (rooms) => {
	   	let player = rooms.player
		expect(player.end).toBe(false);
		expect(player.lock).toBe(true);
		expect(player.name).toBe("bobo");
		expect(player.admin).toBe(false);
		expect(player.live).toBe(true);
		expect(player.score).toBe(0);
		expect(player.block).toBe(null);
		expect(player.visitor).toBe(false);
		expect(player.indestructible).toBe(0);
		done()
	 });
	socketClient.emit("server/join-room", data);
  });

  it.only('start room', (done) =>  {
	const data = {uuidRoom:channel}
	  socketClient.on('client/update-rooms', (rooms) => {
		let room = rooms._data[channel];
		let player = room.players
		done()
	 });
	socketClient.emit('server/start-game',data);
  });

  it('key up', (done) =>  {
	let key = "ArrowUp";
	const data = {key: key, channel:channel, uuidUser: uidplayer}
	/*socketClient.on('client/update-rooms', (rooms) => {
		console.log(rooms);
		done()
	 });*/
	socketClient.emit('server/key-up', data);
  });

  iti.only('pause', (done) => {
	const data = {channel:channel}
	  socketClient.on('client/join-room', (rooms) => {
		done()
	 });
	socketClient.emit('server/pauser-resume',data);
  });

	it.only('leave room', (done) =>  {
	   const data = { login: 'owalid', playSolo: false }
    socketClient.on('client/update-rooms', (rooms) => {
      const room = rooms._data[Object.keys(rooms._data)[0]]
		done()
    })
	 socketClient.emit("server/leave-room",  data);
  });
});
