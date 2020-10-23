import debug from 'debug'
import { rooms } from './tetris/Room';
import { players } from './tetris/Player';
import bodyParser from 'body-parser';
import cors from 'cors'
import express from 'express'
// import { initListener } from './sockets/initSocket';
import { params } from '../../../params'
import SocketsManager from './sockets/SocketsManager';
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
		const socketsManager = new SocketsManager(this.server);
		this.app.io = socketsManager.io;
		this.app.socketsManager = socketsManager;
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

export default Server;
