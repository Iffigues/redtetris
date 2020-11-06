import { useEffect, useContext } from 'react';
import { Context as UserContext } from "../context/UserContext";
import { Context as RoomsContext } from "../context/RoomsContext";

export default (socketClient) => {
  const {
    updateUuidRoom,
    updateUuidUser
  } = useContext(UserContext);

  const {
    updateRooms
  } = useContext(RoomsContext);

  useEffect(() => {
    console.log(socketClient, 'UseEffect')

    socketClient.on('client/ping', () => { console.log("ping") })

    socketClient.on('client/pong', () => { console.log("pong") })

    socketClient.on('client/created-room', (data) => {
      const { uuidRoom, uuidUser } = data;
      console.log("update", data)
      updateUuidRoom(uuidRoom)
      updateUuidUser(uuidUser)
    })

    socketClient.on('client/join-room', (data) => {
      const { uuidRoom } = data;
      updateUuidRoom(uuidRoom)
    })

    socketClient.on('client/update-rooms', (rooms) => {
      updateRooms(rooms)
    })

    return ;
  }, [])
}