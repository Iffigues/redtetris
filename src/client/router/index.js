import React from "react";
import { HashRouter, BrowserRouter, Route, Switch } from 'react-router-dom';

// components
import Alerts from '../components/Alerts'
import NavBar from '../components/navBar'

// pages
import HomePage from '../pages/home/home'
import BoardPage from '../pages/board/board'
import CreateRoomPage from '../pages/create-room/create-room'
import Room from '../pages/_room/room'

import SocketLister from '../listeners/SocketListener'
import { SocketContext } from "../context/SocketContext";
import { useEffect, useContext } from 'react';


export default () => {
  const { socketClient } = useContext(SocketContext);
  console.log(socketClient, "Router")
  SocketLister(socketClient);
  return (
    <div>
      <BrowserRouter>
        <NavBar/>
        <Alerts />
        <Route exact path="/" component={HomePage} />
        <Route exact path="/create-room" component={CreateRoomPage} />
        <Route exact path="/room/:uuidRoom" render={(props) => {
          return ( <Room {...props } /> )
        }} />
        <Route path="/board" component={BoardPage} />
      </BrowserRouter>
    </div>
  )
}
