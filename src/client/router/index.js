import React from "react";
import { HashRouter, BrowserRouter, Route, Switch } from 'react-router-dom';

// components
import Alerts from '../components/Alerts'

// pages
import HomePage from '../pages/home/Home'
import Room from '../pages/_room/Room'
import ErrorPage from '../pages/notfound/ErrorPage'

import SocketLister from '../listeners/SocketListener'
import { SocketContext } from "../context/SocketContext";
import { useEffect, useContext } from 'react';


export default () => {
  const { socketClient } = useContext(SocketContext);
  SocketLister(socketClient);
  return (
    <div>
      <HashRouter hashType="noslash">
        <Alerts />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/:uuidRoom[:login]" render={(props) => {
            return ( <Room {...props } /> )
          }} />
          <Route component={ErrorPage} />
        </Switch>
      </HashRouter>
    </div>
  )
}
