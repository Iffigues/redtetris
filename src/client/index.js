// import React from 'react'
// import ReactDom from 'react-dom'
// import createLogger from 'redux-logger'
// import thunk from 'redux-thunk'
// import { combineReducers, createStore, applyMiddleware } from 'redux'
// import { Provider } from 'react-redux'
// import { storeStateMiddleWare } from './middleware/storeStateMiddleWare'
// import Router from './router/index';
// import { alert } from './actions/alert'
// import { sendSocket } from './actions/socket'
// import alertReducer from './reducers/alert'
// import socketReducer from './reducers/socket'
// import { hot } from 'react-hot-loader/root'


// const initialState = {}
// const allReducers  = combineReducers({
//   socket: socketReducer,
//   alert: alertReducer
// });

// const store = createStore(
//   allReducers,
//   initialState,
//   applyMiddleware(thunk, createLogger())
// )

// const App = (
//   <Provider store={store}>
//     <Router/>
//   </Provider>
// )

// const App = hot(module)(
//   <Provider store={store}>
//     <Router/>
//   </Provider>
// )

// export default hot(module)(App);

// ReactDom.render((
//   hot(<App />)
// ), document.getElementById('tetris'))
import React from "react";
import ReactDom from "react-dom";
import App from "./components/App";
import { Context as AlertContext } from "./context/AlertContext";
import { Context as SocketContext } from "./context/SocketContext";


const { sendAlert } = useContext(AlertContext);
const { sendSocket } = useContext(SocketContext);
ReactDOM.render(<App />, document.getElementById("root"));

store.dispatch(sendAlert('Soon, will be here a fantastic Tetris ...', 'info'))
store.dispatch(sendSocket('server/ping'))
setTimeout(() => {
  store.dispatch(sendAlert())
}, 5000)



