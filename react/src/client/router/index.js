import React from "react";
import { HashRouter, BrowserRouter, Route, Switch } from 'react-router-dom';
import { hot } from 'react-hot-loader/root'

// components
import Alerts from 'components/alerts'
import NavBar from 'components/navBar'

// pages
import Home from 'pages/home/home'
import Board from 'pages/board/board'

const router = () => {
  return (
    <div>
      <BrowserRouter>
        <NavBar/>
        <Alerts />
        <Route exact path="/" component={Home} />
        <Route path="/board" component={Board} />
      </BrowserRouter>
    </div>
  )
}

export default hot(router);