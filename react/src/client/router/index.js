import React from "react";
import { HashRouter, Route, Switch } from 'react-router-dom';
import Home from '/client/pages/home/home'

const router = (props) => {
  return (
    <HashRouter>
      <Switch>
        <Route path="/" component={Home} />
      </Switch>
    </HashRouter>
  )
}

export default router;