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
		this.admin = admin;
		this.live = true;
		this.indestructible = 0;
		this.time = 1000;
		this.isPlaying = false;
		this.visitor = false;

		this.currentMapGame = null
		this.nextMapGame = null;
		this.block = null;
		this.sheets = null;
		this.score = null;
		this.end = null;
		this.requestNewGame = null;
		this.initGame();
	}
	
	initGame = () => {
		this.currentMapGame = _.cloneDeep(Array.from(Array(GAME_HEIGHT), () => 
			new Array(GAME_WIDTH).fill(0)
		))
		this.nextMapGame = _.cloneDeep(this.currentMapGame);
		this.block = null;
		this.sheets = _.cloneDeep([]);
		this.score = 0;
		this.end = false;
		this.requestNewGame = false;
		this.createIntervalGame();
	}

	setRequestNewGame = (value) => {
		this.requestNewGame = value
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

	destroyLine = (i) => {
		i = i - 1;
                while (i) {
			this.nextMapGame[19 - this.indestructible].fill(-1);
			this.indestructible = this.indestructible + 1;
			i = i - 1;
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
