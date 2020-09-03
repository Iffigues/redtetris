//import chai from "chai"
const chai = require("chai");
const {startServer, configureStore} = require('./helpers/server')
//import rootReducer from '../src/client/reducers'
const rootReducer = require('../src/client/reducers');
//import {ping} from '../src/client/actions/server'
const {ping} = require("../src/client/actions/server")
const  io = require('socket.io-client');
const params =  require('../params');

chai.should()
describe('Fake server test', function(){
  let tetrisServer
  before(cb => startServer( params.server, function(err, server){
    tetrisServer = server
    cb()
  }))

  after(function(done){tetrisServer.stop(done)})

  it('should pong', function(done){
    const initialState = {}
    const socket = io(params.server.url)
    const store =  configureStore(rootReducer, socket, initialState, {
      'pong': () =>  done()
    })
    store.dispatch(ping())
  });
});
