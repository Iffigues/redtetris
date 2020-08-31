import fs from 'fs'
const debug = require('debug');
const Promise = require('es6-promise').Promise;
const logerror = debug('tetris:error'), loginfo = debug('tetris:info')

class Server {
	constructor (params) {
		this.app = require('http').createServer();
		this.params = params;
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
			loginfo(`tetris listen on ${params.url}`);
			cb();
		})
	}
	initEngine (io) {
		io.on('connection', function(socket){
			loginfo("Socket connected: " + socket.id)
			socket.on('action', (action) => {
				console.log("hello wep");
				if(action.type === 'server/ping'){
					console.log("oui");
					socket.emit('action', {type: 'pong'});
				}
				if (action.type === 'server/create') {
					console.log("ezezez");
					let data = JSON.parse(action.data);
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
