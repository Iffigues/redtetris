import Block from './Tetriminos';
import _ from 'lodash'
import uuidv4 from 'uuid';
import Player from './Player';
import regeneratorRuntime from "regenerator-runtime";


class Room {
	
	constructor(player, solo = false, channel = uuidv4()) {
		this.isStart = false;
		this.isPlaying = false;
		this.solo = solo;
		this.block = new Block();
		this.channel = channel;
		this.players = {};
		this.messages = [];
		this.addPlayer(player);
	}
	
	reGame = (uuidUser) => {
		const isLast = true;
		_.map(this.players, player => {
			if (player.requestNewGame === false && player.uuid !== uuidUser) {
				isLast = false;
			}
		})

		if (isLast) {
			_.map(this.players, player => {
				player.initGame();
			})
		} else {
			this.players[uuidUser].setRequestNewGame(true)
		}
	}

	addMessage = (data) => {
		this.messages.push({
			...data
		})
	}

	removePlayer = (uuidUser, endGame) => {
		let res = {};
		_.map(this.players, player => {
			if (player.uuid !== uuidUser) {
				res[player.uuid] = player
			}
		})
		this.players = _.cloneDeep(res);

		if (endGame) {
			const isLastRequestNewGame = true;
			_.map(this.players, player => {
				if (player.requestNewGame === false) {
					isLastRequestNewGame = false
				}
			})
			if (isLastRequestNewGame) {
				_.map(this.players, player => {
					player.initGame();
				})
			}
		}
	}

	addSheet = () => {
		let sheet = this.block.newBlock();
		_.map(this.players, elem => elem.sheets.push(_.cloneDeep(sheet)));
	}

	destroyer = (uuid) => {
		_.map(this.players, player => {
			if (player.uuid !== uuid) {
				player.destroyLine()
			}
		})
	}	

	addPlayer = (player) => {
		player.addSheetFunc(this.addSheet);
		player.addDestroyFunc(this.destroyer);
		if (this.isStart) {
			player.visitor = true
		}
		this.players[player.uuid] = player;
	}

	onKey = (key, uuidUser) => {
		this.players[uuidUser].move(key);
	}

	countPlayer = () => {
		let i = this.players.length;
		if (i === 4) {
			this.startGame();
		}
	}

	startGame = () => {
		this.isPlaying = true;
		this.isStart = true;
		_.map(this.players, elem => elem.startGame());
	}

	changeIsPlaying = () => {
		this.isPlaying = !this.isPlaying;
		_.map(this.players, elem => elem.changePlaying(this.isPlaying));
	}

	getPlayers = () => {
	  return this.players
	}
}

export default Room;
