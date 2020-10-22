const params = require('../../params');
import { serveSrv } from './srv'

let server = serveSrv(params);
server.create(params.server).then( () => console.log('not yet ready to play tetris with U ...') )
