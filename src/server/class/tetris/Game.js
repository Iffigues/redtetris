import _ from 'lodash'
import Piece from './Piece'
import regeneratorRuntime from "regenerator-runtime";

let timer = null;
class Game extends Piece {
	constructor(updateRoomFunction) {
		super();
		this.updateRoomFunction = updateRoomFunction;
		this.block = null;
		this.shadow = null;
		this.action = null;
		this.isPlaying = false;
		this.lock = true;
		this.barre = false;
		this.action = this.initActionObject();
		// this.createIntervalGame();
	}

	initActionObject = () => {
		return {
			'ArrowUp': () => this.rotateR(),
			'ArrowDown': () => this.down(),
			'ArrowLeft': () => this.left(),
			'ArrowRight': () => this.rigth(),
			' ': () => this.space()
		}
	}

	blockCPY = (block) => {
		return {
			block: _.cloneDeep(block.block),
			y: block.y,
			x: block.x,
			type: 8,
			rotate: block.rotate,
			field: block.field,
		};
	}

	makeShadow = (block) => {
		let r = this.blockCPY(block);
		if (!this.canPose(r,0,1)) {
			this.shadow = null;
		} else {
			while (this.canPose(r,0,1))
				r.y = r.y + 1;
			this.shadow = r;
		}
	}

	createIntervalGame = () => {
		timer = setTimeout(() => {
			if (this.isPlaying) {
				if (!this.block) {
					if (this.sheets.length === 0) this.addSheet();
					this.block = _.cloneDeep(this.sheets.shift());
					this.addSheet();
					if (!this.canPose(this.block, 0, 0)) {
						this.end = true;
						clearInterval(timer);
						this.block = null;
						return;
					}
				}
				this.sendMap();
				if (this.end) {
					this.end = false;
					if (!this.canPose(this.block, 0, 1)) {
						this.draw(this.block, this.block.type);
						this.block = null;
						this.verifLine();
					}
				} 
				if (this.block) {
					if (!this.canPose(this.block, 0, 1)) {
						this.end = true;
					} else {
						this.draw(this.block, 0);
						this.block.y += 1;
					}
				}
			}
			setTimeout(this.createIntervalGame, 0)
		}, 1000)
	}

	setIsPlaying = (isPlaying) => {
		this.isPlaying = isPlaying
	}

	sendMap = () => {
		this.makeShadow(this.block);
		if (this.shadow) this.draw(this.shadow, 1);
		console.log(this.shadow);
		this.draw(this.block, this.block.type);
		this.currentMapGame = _.cloneDeep(this.nextMapGame);
		if (this.updateRoomFunction) this.updateRoomFunction();
		if (this.shadow) this.draw(this.shadow,0);
		this.draw(this.block, 0);
	}

 	setMoose = (yy, xx) => {
		if (yy !== 0 && this.canPose(this.block, xx, yy)) {
			this.block.y += yy;
		}
		if (xx !== 0 && this.canPose(this.block, xx, yy)) {
			this.block.x += xx;
		}
		this.sendMap();
	}

	move = (event) => {
		if (this.block && event && Object.keys(this.action).includes(event)) {
			this.action[event]();
		}
	}

	left = () => {
		this.setMoose(0, -1);
	}
	
	rigth = () => {
		this.setMoose(0, 1);
	}
	
	down = () => {
		this.setMoose(1, 0);
	}

	rotateL = async () => {
		if (this.block.rotate) {
			this.rotate(this.block, 0);
			this.sendMap();
		}
	}
	
	rotateR = async () => {
		if (this.block.rotate) {
			this.rotate(this.block, 1);
			this.sendMap();
		}
	}
	
	space = async () => {
		this.lock = false;
		while (this.canPose(this.block, 0, 1)) {
			this.block.y += 1;
		}
		this.sendMap();
		this.draw(this.block, this.block.type);
		this.addSheet();
		this.block = null;
		this.verifLine();
		this.lock = true;
	}

	draw = (blk, z) => {
		for (let y = 0; y < 4; y = y + 1) {
			this.nextMapGame[blk.y + blk.block[y].y][blk.x + blk.block[y].x] = z;
		}
	}

	wash = (e) => {
		this.nextMapGame.splice(e, 1);
		this.nextMapGame.unshift([0,0,0,0,0,0,0,0,0,0]);
	}

	verifLine = () => {
		let arr = 0;
		for (let i = 19 - this.indestructible; i >= 0; i--) {
			let u = 1;
			for (let y = 0; y < 10; y++) {
				if (this.nextMapGame[i][y] === 0) {
					u = 0;
					break;
				}
			}

			if (u === 1) {
				this.score = Math.ceil((this.score + 1000) * 1.1);
				this.destroyFunc(this.uuid);
				arr = arr + 1;
				this.wash(i);
				this.verifLine();
			}
		}
		return arr;
	}
}

export default Game;
