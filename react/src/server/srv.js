import fs from 'fs'
const debug = require('debug');
const Promise = require('es6-promise').Promise;
const logerror = debug('tetris:error'), loginfo = debug('tetris:info')
import {rooms} from './tetris/room';
import {players} from './tetris/player';
const  uuidv4 = require('uuid');

class Server {
	constructor (params) {
		this.app = require('http').createServer();
		this.params = params;
		this.rooms = {};
	}

	AddRoom () {
		console.log("creating new room");
		let p = players(true);
		let r = rooms(null, p);
		if (!(r.name in this.rooms)) {
			//this.rooms[r.name] = r;
			console.log("room created");
		}
	}
	
	initApp (cb)  {
		const {host, port} = this.params;
		const handler = (req, res) => {
			const file = req.url === '/bundle.js' ? '/../../build/bundle.js' : '/../../index.html';
			fs.readFile(__dirname + file, (err, data) => {
				if (err) {
					logerror(err);
					res.writeHead(500);
					return res.end('Error loading index.html');
				}
				res.writeHead(200);
				res.end(data);
			})
		}
		this.app.on('request', handler);
		this.app.listen({host, port}, () =>{
			loginfo(`tetris listen on ${this.params.url}`);
			cb();
		})
	}

	initEngine (io) {
		let addRoom = () => {
			this.AddRoom();
		}
		io.on('connection', function(socket){
			loginfo("Socket connected: " + socket.id)
			socket.on('action', (action) => {
				console.log("hello wep");
				if(action.type === 'server/ping'){
					socket.emit('action', {type: 'pong'});
				}
				if (action.type === 'server/create') {
					let data = JSON.parse(action.data);
					console.log("eee")
				}
				if (action.type === 'server/connect') {
					let data = JSON.parse(action.data)
				}
			})
		})
	}
	creates() {
		const promise = new Promise( (resolve, reject) => {
			this.initApp(() =>{
				const io = require('socket.io')(this.app);
				const stop = (cb) => {
					io.close();
					this.app.close(() => {
						this.app.unref();
					})
					loginfo(`Engine stopped.`);
					cb();
				}
				this.initEngine(io);
				resolve({stop});
			})
		})
		return promise;
	}
}

module.exports.serveSrv =  function serveSrv(params) {
	return new Server(params);
}
