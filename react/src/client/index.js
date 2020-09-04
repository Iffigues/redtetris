import React from 'react'
import ReactDom from 'react-dom'
import createLogger from 'redux-logger'
import thunk from 'redux-thunk'
import { combineReducers, createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { storeStateMiddleWare } from './middleware/storeStateMiddleWare'
import Router from './router/index';
import { alert } from './actions/alert'
import { sendSocket } from './actions/socket'
import alertReducer from './reducers/alert'
import socketReducer from './reducers/socket'

const initialState = {}
const allReducers  = combineReducers({
  socket: socketReducer,
  alert: alertReducer
});

const store = createStore(
  allReducers,
  initialState,
  applyMiddleware(thunk, createLogger())
)

ReactDom.render((
  <Provider store={store}>
    <Router/>
  </Provider>
), document.getElementById('tetris'))

store.dispatch(alert('Soon, will be here a fantastic Tetris ...', 'info'))
store.dispatch(sendSocket('server/ping'))
setTimeout(() => {
  store.dispatch(alert())
}, 5000)
