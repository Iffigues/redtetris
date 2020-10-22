import socketIOClient from 'socket.io-client';

const initialState = {
  socket: socketIOClient('http://localhost:3004'),
  uuidRoom: null,
  uuidUser: null
};

const socketReducer = (state = {} , action) => {
  if (action.type === "updateUuidRoom") {
    return {
      ...state,
      uuidRoom: action.uuidRoom
    }
  }
  if (action.type === "updateUuidUser") {
    return {
      ...state,
      uuidUser: action.uuidUser
    }
  }
  if (action.type === "socket") {
    return {
      ...state,
      content: action.content,
      status: 'DONE'
    };
    // return {actionName: action.actionName, type}
  } else {
    initialState.socket.on('client/ping', () => { console.log("ping") })
    initialState.socket.on('client/pong', () => { console.log("pong") })
    return initialState
  }
}

export default socketReducer

