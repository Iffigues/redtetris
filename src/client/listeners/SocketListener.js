import { useEffect, useContext } from 'react';
import { Context as UserContext } from "../context/UserContext";


export default (socketClient) => {
  const {
    updateUuidRoom,
    updateUuidUser
  } = useContext(UserContext);

  useEffect(() => {
    console.log(socketClient, 'UseEffect')
    socketClient.on('client/ping', () => { console.log("ping") })
    socketClient.on('client/pong', () => { console.log("pong") })
    socketClient.on('client/created-room', async (data) => {
      const { uuidRoom, uuidUser } = data;
      await updateUuidRoom(uuidRoom)
      await updateUuidUser(uuidUser)
    })
    socketClient.on('client/join-room', async (data) => {
      const { uuidRoom } = data;
      await updateUuidRoom(uuidRoom)
    })
    return ;
  }, [])
}