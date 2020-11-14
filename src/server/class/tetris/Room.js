import block from './Tetriminos'
import uuidv4 from 'uuid'

class Room extends block {
	
	constructor(player, io, solo = false, channel = uuidv4()) {
		super();
		this.isStart = false;
		this.isPlaying = false;
		this.solo = solo;
		this.channel = channel;
		this.players = [player];
	}
	
	removePlayer = (uuidUser) => {
		this.players = this.players.filter(item => item.uuid !== uuidUser)
	}

	addPlayer = (player) => {
		this.players.push(player);
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
	}

	changeIsPlaying = () => {
		this.isPlaying = !this.isPlaying;
	}
	getPlayers = () => {
    return this.players
  }
}

export default Room;