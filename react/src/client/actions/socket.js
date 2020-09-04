import sendData from '../socket/sendData';

const sendDataApi = (socket, type, data, dispatch) => {
  dispatch(sendData(socket, type, data));
}

export const sendSocket = (actionName, content = null) => {
  return (dispatch, getState) => {
    const data = {
      uuidRoom: getState().socket.uuidRoom,
      uuidUser: getState().socket.uuidUser,
      content
    };
    console.log(actionName, getState().socket.socket)
    sendDataApi(getState().socket.socket, { type: actionName }, data, dispatch);
  }
}