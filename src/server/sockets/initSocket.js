// import { chatListener } from './chat';
import { roomListener } from './roomManager';

export const defaultListener = (socket) => {
  console.log(`new user connected : ${socket}`);
  socket.on('server/ping', () => {
    console.log('ping')
    socket.emit('client/pong');
  })
  socket.on('disconnect', () => {
    socket.disconnect();
  });
}

export const initListener = (socket) => {
  defaultListener(socket);
  roomListener(socket);
}