import Block from './Piece'
var Mutex = require('async-mutex').Mutex;
import regeneratorRuntime from "regenerator-runtime";

class Game extends Block {
	constructor(events) {
		super();
		this.mutex = new Mutex();
		this.block = null;
		this.keyBind = [this.left, this.rigth, this.down, this.rotateL, this.rotateR, this.space];
	}

 	setMoose = async (a, b) => {
		const release = await this.mutex.acquire();
		try {
			if (a == 0) {
				 this.block.x+= b;
			} else {
				this.block.y += b;
			}
		}finally {
			release();
		}
	}

	left = () => {
		this.setMoose(0, -1);
	}

	rigth = () => {
		this.setMoose(0, 1);
	}

	down = () => {
		this.setMoose(1, 1);
	}

	rotateL = () => {
	}

	rotateR = () => {
	}

	space = async () => {
		const release = await this.mutex.acquire();
		try {
		while (this.canPose(this.block, 0, 0)) 
			this.block.y += 1;
		this.block.y -= 1;
		} finally {
			release();
		}
	}

	draw = async (blk, z) => {
		console.log(blk);
		for (let y = 0; y < 4; y = y + 1) {
			this.map_game[blk.y + blk.block[y].y][blk.x + blk.block[y].x] = z;
		}
	}
	
	setKey = (i) => {
		if(typeof this.keyBind[i] === 'undefined') {
		} else {
			this.keyBind[i]();
		}
	}

        sleep = (ms) => {
		return new Promise(resolve => setTimeout(resolve, ms));
	}

	start = async () => {
		while (1) {
			if (this.sheets.length == 0 ) {
				await this.addSheet();
			}
			this.block = this.sheets.pop();
			while (1) {
				console.log(this.canPose(this.block, 0, 0));
				if (!this.canPose(this.block, 0, 0)) {
					console.log(this.map_game.length);
					return;
				}
				await this.sleep(1000);
				const release = await this.mutex.acquire();
				await this.draw(this.block, 1);
					console.log(this.map_game);
					await this.draw(this.block, 0);
				try {
					console.log(this.canPose(this.block, 0, 0));
					console.log(this.block);
					//await this.draw(this.block, 1);
					//console.log(this.map_game);
					//await this.draw(this.block, 0);
					this.block.y += 1;
				} finally {
					release();
				}
			}
		}
	}
}

export default Game;
