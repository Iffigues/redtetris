import { hot } from "react-hot-loader";
import React from "react";
import Router from '../router/index';
import { SocketContextProvider } from "../context/SocketContext";
import { Provider as AlertContext } from "../context/AlertContext";
import { Provider as UserContext } from "../context/UserContext";


// process.env.NODE_ENV === "production"
//   ? require("../sass/main.css")
//   : require("../sass/main.scss");
const App = () => (
  <AlertContext>
    <UserContext>
      <SocketContextProvider>
        <Router />
      </SocketContextProvider>
    </UserContext>
  </AlertContext>
)

export default hot(module)(App);
