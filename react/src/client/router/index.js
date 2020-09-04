import React from "react";
import { HashRouter, BrowserRouter, Route, Switch } from 'react-router-dom';
import { hot } from 'react-hot-loader/root'

// components
import Alerts from 'components/alerts'
import NavBar from 'components/navBar'

// pages
import HomePage from 'pages/home/home'
import BoardPage from 'pages/board/board'
import CreateRoomPage from 'pages/create-room/create-room'

const router = () => {
  return (
    <div>
      <BrowserRouter>
        <NavBar/>
        <Alerts />
        <Route exact path="/" component={HomePage} />
        <Route exact path="/create-room" component={CreateRoomPage} />
        <Route path="/board" component={BoardPage} />
      </BrowserRouter>
    </div>
  )
}

export default hot(router);