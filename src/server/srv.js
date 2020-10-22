import fs from 'fs'
import debug from 'debug'
import { rooms } from './tetris/room';
import { players } from './tetris/player';
import socketIo from 'socket.io';
import bodyParser from 'body-parser';
import cors from 'cors'
import express from 'express'
import { initListener } from './sockets/initSocket';
import { params } from '../../params'
const logerror = debug('tetris:error'), loginfo = debug('tetris:info')

class Server {
	constructor () {
		const { host, port } = params;
		this.app = express();
		this.app.use(cors())
		this.params = params;
		this.app.use(bodyParser.json({limit: '10mb', extended: true}));
		this.server = this.app.listen({ host, port }, () => {
			loginfo(`tetris listen on ${this.params.url}`);
		})
		const io = socketIo(this.server);
		io.on('connection', initListener);
		this.app.io = io;
		this.rooms = {};
	}

	addRoom = () => {
		console.log("creating new room");
		let p = players(true);
		let r = rooms(null, p);
		if (!(r.name in this.rooms)) {
			//this.rooms[r.name] = r;
			console.log("room created");
		}
	}
}

export const serveSrv = (params) => {
	return new Server(params);
}
