import React from "react";
import { HashRouter, BrowserRouter, Route, Switch } from 'react-router-dom';

// components
import Alerts from '../components/alerts'

// pages
import HomePage from '../pages/home/Home'
import Room from '../pages/_room/Room'

import SocketLister from '../listeners/SocketListener'
import { SocketContext } from "../context/SocketContext";
import { useEffect, useContext } from 'react';


export default () => {
  const { socketClient } = useContext(SocketContext);
  SocketLister(socketClient);
  return (
    <div>
      <BrowserRouter>
        <Alerts />
        <Route exact path="/" component={HomePage} />
        <Route exact path="/room/:uuidRoom" render={(props) => {
          return ( <Room {...props } /> )
        }} />
      </BrowserRouter>
    </div>
  )
}
