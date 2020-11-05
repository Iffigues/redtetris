import { useEffect, useContext } from 'react';
import { SocketContext } from "../context/SocketContext";

export default () => {
  const { state: { socketClient } } = useContext(SocketContext);

  useEffect(() => {
    socketClient.on('client/ping', () => { console.log("ping") })
    socketClient.on('client/pong', () => { console.log("pong") })
    socketClient.on('client/created-room', (data) => {
      console.log('client/created-room', data)
      // const { uuidRoom, uuidUser } = data;
      // updateUuidRoom(uuidRoom)
      // updateUuidUser(uuidUser)
      // redirect user to => url/#uuidRoom[name_player]
    })
    return ;
  }, [])
}