import socketIOClient from "socket.io-client"
import Server from "../../src/server/class/Server"
import { params } from "../../params"
import debug from 'debug'

describe('Server tests', () => {
  let socketClient;
  const { host, port, url } = params;

  beforeEach(done => {
    socketClient = socketIOClient(url)
    const srvInstance = new Server(true)
    const server = srvInstance.app.listen({ host, port }, () => {
      done()
    })
    srvInstance.setServer(server)
  });

  it('Should ping', () => {
    socketClient.emit("ping")
  });
});