import block from './Tetriminos';
import _ from 'lodash'
import uuidv4 from 'uuid';
import Player from './Player';
import regeneratorRuntime from "regenerator-runtime";


class Room extends block {
	
	constructor(player, io, solo = false, channel = uuidv4()) {
		super();
		this.isStart = false;
		this.isPlaying = false;
		this.solo = solo;
		this.block = new block();
		this.channel = channel;
		this.players = {};
		this.addPlayer(player);
	}
	
	removePlayer = (uuidUser) => {
		this.players = this.players.filter(item => item.uuid !== uuidUser)
	}

	addSheet = async () => {
		let sheet = this.block.newBlock();
			_.map(this.players, elem => elem.sheets.push(sheet));
	}

	addPlayer = (player) => {
		player.addSheetFunc(this.addSheet);
		this.players[player.uuid] = player;
	}

	onKey = (key, uuidUser) => {
		if (key === 'ArrowUp') {
			this.players[uuidUser].rotateR();
		} else if (key === 'ArrowDown') {
			this.players[uuidUser].down();
		} else if (key === 'ArrowLeft') {
			this.players[uuidUser].left();
		} else if (key === 'ArrowRight') {
			this.players[uuidUser].rigth();
		} else if (key === ' ') {
			this.players[uuidUser].space();
		}
	}

	countPlayer = () => {
		let i = this.players.length;
		if (i == 4) {
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
	}

	getPlayers = () => {
	    return this.players
	}
}

export default Room;
