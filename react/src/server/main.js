//import params  from '../../params'
const params = require('../../params');
//import * as server from './index'
const server = require('./index');
server.create(params.server).then( () => console.log('not yet ready to play tetris with U ...') )
