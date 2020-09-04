
export default function sendData(socket, type, data) {
  socket.emit('action', type, data);
  return {
    type: 'socket'
  }
}
