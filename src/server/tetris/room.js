import block from './tetriminos'
import uuidv4 from 'uuid'

class Room extends block {
	
	constructor(admin, channel = uuidv4()) {
		super();
		this.state = 0;
		this.channel = channel;
		this.admin = admin;
		this.player = [admin];
	}
	
	addPlayer = (player) => {
		this.player.push(player);
	}
	
	countPlayer = () => {
		let i = this.player.length;
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

export const createRoom = (admin, channel = uuidv4()) => {
	return new Room(admin, channel);
}