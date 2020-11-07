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

	changeIsPlaying = (value) => {
		this.isPlaying = value;
	}
	getPlayers = () => {
    return this.players
  }
}

export default Room;