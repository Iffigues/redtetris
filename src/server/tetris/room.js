import block from './tetriminos'
import uuidv4 from 'uuid'

class Room extends block {
	
	constructor(name = uuidv4(), admin) {
		super();
		this.state = 0;
		this.name = name;
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

export const rooms = (name = uuidv4(), admin) => {
	return new Room(name, admin);
}