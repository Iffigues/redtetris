import socketIOClient from 'socket.io-client';

const initialState = {
  socket: socketIOClient('http://localhost:3004'),
  uuidRoom: null,
  uuidUser: null
};

const socketReducer = (state = {} , action) => {
  if (action.type === "socket") {
    return {
      ...state,
      content: action.content,
      status: 'DONE'
    };
    // return {actionName: action.actionName, type}
  } else {
    initialState.socket.on('ping', () => { console.log("pong") })
    return initialState
  }
}

export default socketReducer

