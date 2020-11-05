import React, { createContext } from "react"
import { params } from "../../../params"
import socketIOClient from "socket.io-client"

export const SocketContext = createContext();

export const SocketContextProvider = ({ children }) => {
  console.log("init SocketContextProvider", children)
  const socketClient = socketIOClient(params.url);
  // const [state, dispatch] = useReducer(reducer, socketClient);
  
  const sendSocket = (type, data = false) => {
    console.log("sendSocket", data)
    socketClient.emit(type, data);
  }
  
  return (
    <SocketContext.Provider
    value={{socketClient, sendSocket}}
    >
      { children }
    </SocketContext.Provider>
  )
}