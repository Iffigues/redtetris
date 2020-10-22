
export default function sendData(socket, { type }, data) {
  socket.emit(type, data);
  return {
    type: 'socket'
  }
}
