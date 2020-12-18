import uuidv4 from 'uuid'
import _ from 'lodash'
import Game from './Game'

const GAME_WIDTH = 10;
const GAME_HEIGHT = 20;
class Player extends Game {
	constructor (name, updateRoomFunction, admin = false) {
		super(updateRoomFunction)
		this.uuid = uuidv4()
		this.name = name
		this.score = 0;
		this.admin = admin;
		this.live = true;
		this.sheets = [];
		this.indestructible = 0;
		this.time = 1000;
		this.isPlaying = false;
		this.visitor = false;
		this.currentMapGame = Array.from(Array(GAME_HEIGHT), () => 
      new Array(GAME_WIDTH).fill(0)
		)
		this.nextMapGame = _.cloneDeep(this.currentMapGame);
		this.block = null;
	}
        
	addSheetFunc = (func) => {
		this.addSheet = func; 
	}

	addDestroyFunc(func) {
		this.destroyFunc = func;
	}	

	pushSheet = () => {
		this.addSheet();
	}

	destroyLine = () => {
		this.nextMapGame[this.indestructible].fill(-1);
		this.indestructible = this.indestructible + 1;
		if (this.indestructible === 19) {
			return;
		}
	}

	startGame = () => {
		this.visitor = false
		this.setIsPlaying(true)
	}

	changePlaying = (isPlaying) => {
		this.setIsPlaying(isPlaying)
	}
}

export default Player;
