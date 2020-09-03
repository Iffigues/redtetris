const params = require('../../params');
const server = require('./index');
server.create(params.server).then( () => console.log('not yet ready to play tetris with U ...') )
