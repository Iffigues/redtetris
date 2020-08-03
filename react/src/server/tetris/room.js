const  uuidv4 = require('uuid');

class Room {
	
	constructor(name = uuidv4(), admin) {
		this.state = 0;
		this.name = name;
		this.admin = admin;
		this.player = [admin];
	}
	
	addPlayer(player) {
		this.payer.push(player);
	}
	
	startGame() {
	}
}
