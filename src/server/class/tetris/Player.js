import uuidv4 from 'uuid'
import Game from './Game'

class Player extends Game {
	constructor (name, admin = false, updateRoomFunction) {
		super(updateRoomFunction)
		this.uuid = uuidv4()
		this.name = name
		this.score = 0;
		this.admin = admin;
		this.live = true;
		this.sheets = [];
		this.map_game = [];
		this.indestructible = 0;
		this.time = 1000;
		for (let i = 0; i < 20; i++) {
			this.map_game.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
		}
		this.block = null;
	}
        
	addSheetFunc = (func) => {
		this.addSheet = func; 
	}

	pushSheet = () => {
		this.addSheet();
	}

	destroyLine = (a) => {
		this.indestructible += a;
		if (this.indestructible <= 0) {
		}
	}

	startGame = () => {
		this.start();
	}

	keyBind = (i) => {
		this.setKey(i);
	}
}

export default Player;
