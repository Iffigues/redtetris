// import sendData from '../socket/sendData';

// const sendDataApi = (socket, type, data, dispatch) => {
//   dispatch(sendData(socket, type, data));
// }

// export const sendSocket = (actionName, content = null) => {
//   return (dispatch, getState) => {
//     const data = {
//       uuidRoom: getState().socket.uuidRoom,
//       uuidUser: getState().socket.uuidUser,
//       content
//     };
//     console.log("sendSocket function", actionName, getState().socket.socket)
//     sendDataApi(getState().socket.socket, { type: actionName }, data, dispatch);
//   }
// }

// export const updateUuidRoom = (uuidRoom) => {
//   return {
//     type: 'updateUuidRoom',
//     uuidRoom
//   }
// }

// export const updateUuidUser = (uuidUser) => {
//   return {
//     type: 'updateUuidUser',
//     uuidUser
//   }
// }