import socketIOClient from "socket.io-client"
import Server from "../../src/server/class/Server"
import { params } from "../../params"
import debug from 'debug'

describe('Server tests', () => {
  let socketClient;
  const { host, port, url } = params;
  let server;
  beforeEach(done => {
    socketClient = socketIOClient(url)
    const srvInstance = new Server(true)
    server = srvInstance.app.listen({ host, port }, () => {
      done()
    })

    srvInstance.setServer(server)
  });
  afterEach(() => {
  	server.close();
  });
  
  it('Should ping', () => {
    socketClient.emit("server/ping");
  });

  it('create room', () => {
  	socketClient.emit("server/create-room");
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
