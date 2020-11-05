import block from './Tetriminos'
import uuidv4 from 'uuid'

class Room extends block {
	
	constructor(player, channel = uuidv4()) {
		super();
		this.state = 0;
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
		let y = this.newBlock();
		console.log(y)
	}

}
let e = new Room();
console.log(e);
e.startGame();

export default Room;