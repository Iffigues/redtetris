import { hot } from "react-hot-loader";
import React from "react";
import Router from '../router/index';
import { Provider as SocketContext } from "../context/SocketContext";
import { Provider as AlertContext } from "../context/AlertContext";


// process.env.NODE_ENV === "production"
//   ? require("../sass/main.css")
//   : require("../sass/main.scss");

  const App = (
    <AlertContext>
      <SocketContext>
        <Router />
      </SocketContext>
    </AlertContext>
  )

export default hot(module)(App);
