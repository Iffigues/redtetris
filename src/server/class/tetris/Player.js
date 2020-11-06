import uuidv4 from 'uuid'
import Game from './Game'

class Player extends Game {
	constructor (name, admin = false) {
		super()
		this.uuid = uuidv4()
		this.name = name
		this.score = 0;
		this.admin = admin;
		this.live = true;
		//this.cb = cb
		this.map_game = [];
		this.indestructible = 0;
		this.time = 1000;
		for (let i = 0; i < 22; i++) {
			this.map_game.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
		}
		this.block = null;
	}

	pushSheet = (a) => {
		this.block = a;
	}
}

export default Player;