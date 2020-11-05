import createDataContext from "./createDataContext";
const initialState = {
  socket: socketIOClient('http://localhost:3004'),
  uuidRoom: null,
  uuidUser: null
};

const socketReducer = (state, action) => {
  switch (action.type) {
    case "updateUuidRoom":
      return {  ...state, uuidRoom: action.uuidRoom };
    case "updateUuidUser":
      return {  ...state, uuidUser: action.uuidUser };
    case "socket":
      return {  ...state, content: action.content, status: 'DONE' };
    default:
      initialState.socket.on('client/ping', () => { console.log("ping") })
      initialState.socket.on('client/pong', () => { console.log("pong") })
      return state;
  }
};

const sendData = (socket, { type }, data) => {
  socket.emit(type, data);
  return { type: 'socket' }
}

const sendSocket = (dispatch, getState) => () => {
  const data = {
    uuidRoom: getState().socket.uuidRoom,
    uuidUser: getState().socket.uuidUser,
    content
  };
  console.log("sendSocket function", actionName, getState().socket.socket)
  return dispatch(sendData(getState().socket.socket, { type: actionName }, data))
}

const updateUuidRoom = dispatch => (uuidRoom) => 
  dispatch({ type: "updateUuidRoom", payload: uuidRoom });

const updateUuidUser = dispatch => uuidUser => 
  dispatch({ type: "updateUuidUser", payload: uuidUser });

export const { Provider, Context } = createDataContext(
  //reducer :
  socketReducer,

  //action functions :
  {
    sendSocket,
    updateUuidRoom,
    updateUuidUser
  },

  //initialState :
  {
   ...initialState
  }
);