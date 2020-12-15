import Block from './Piece'
import regeneratorRuntime from "regenerator-runtime";

let timer = null;
class Game extends Block {
	constructor(updateRoomFunction) {
		super();
		this.end = false;
		this.updateRoomFunction = updateRoomFunction;
		this.block = null;
		this.action = null;
		this.keyBind = [this.left, this.rigth, this.down, this.rotateL, this.rotateR, this.space];
		this.isPlaying = false;
		this.lock = true;
		this.action = this.initActionObject();
		this.createIntervalGame();
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

	createIntervalGame = () => {
		const scope = this;
		timer = setTimeout((scope) => {
			if (scope.isPlaying) {
				if (scope.block == null) {
					if (scope.sheets.length === 0) scope.addSheet();
					scope.block = scope.sheets.pop();
					if (!scope.canPose(scope.block, 0, 0)) {
						clearInterval(this.timer);
						this.block = null;
						return;
					};
				}
				scope.sendMap();
				if (scope.end) {
					scope.end = false;
					if (!scope.canPose(scope.block, 0, 1)) {
						console.log(scope.end);
						scope.draw(scope.block, scope.block.type);
						scope.verifLine();
						scope.block = null;
					}
					
				} 
				if (scope.block != null) {
					if (!scope.canPose(scope.block, 0, 1)) {
						//scope.draw(scope.block, scope.block.type);
						scope.end = true;
					} else {
						scope.draw(scope.block, 0);
						scope.block.y += 1;
					}
				}
			}
			setTimeout(scope.createIntervalGame, 0)
		}, 1000, scope)
	}

	setIsPlaying = (isPlaying) => {
		this.isPlaying = isPlaying
	}

	sendMap = () => {
		this.draw(this.block, this.block.type);
		if (this.updateRoomFunction) this.updateRoomFunction();
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
		if (this.block == null) return;
		if (event
			&& Object.keys(this.action).includes(event)) {
			this.action[event]();
			event = null;
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
			this.sendMap();
		}
		this.lock = true;
	}

	draw = (blk, z) => {
		for (let y = 0; y < 4; y = y + 1) {
			this.map_game[blk.y + blk.block[y].y][blk.x + blk.block[y].x] = z;
		}
	}
	
	setKey = (i) => {
		if (typeof this.keyBind[i] === 'undefined') {
		} else {
			this.keyBind[i]();
		}
	}

	wash = (e) => {
		console.log(e);
		this.map_game.splice(e, 1);
		this.map_game.unshift([0,0,0,0,0,0,0,0,0,0]);
	}

	verifLine = () => {
		let arr = 0;
		for (let i = 19 - this.indestructible; i >= 0; i--) {
			let u = 1;
			for (let y = 0; y < 10; y++) {
				if (this.map_game[i][y] == 0) {
					u = 0;
					break;
				}
			}
			if (u == 1) {
				this.Destroy(this.uuid);
				arr = arr + 1;
				this.wash(i);
				this.verifLine();
			}
		}
		return arr;
	}
}

export default Game;
