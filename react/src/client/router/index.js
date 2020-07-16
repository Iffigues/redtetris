import React from "react";
import { HashRouter, Route, Switch } from 'react-router-dom';
import Home from 'pages/home/home'
import Alerts from 'components/alerts'

const router = () => {
  return (
    <div>
      <Alerts />
      <HashRouter>
        <Switch>
          <Route path="/" component={Home} />
        </Switch>
      </HashRouter>
    </div>
  )
}

export default router;