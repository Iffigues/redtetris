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
				this.block.x += b;
				if (!this.willBeposed(this.block))
					this.block.x -= b;
			} else {
				this.block.y += b;
				if (!this.willBePosed(this.block))
					this.block.y -= b;
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

	rotateL = async  () => {
		const release = await this.mutex.acquire();
		try {
			this.rotate(this.block, 0);
		} finally {
			release();
		}
	}

	rotateR = async () => {
		const release = await this.mutex.acquire();
		try {
			this.rotate(this.block, 1);
		} finally {
			release();
		}
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
			if (this.sheets.length == 0 )
				await this.addSheet();
			this.block = this.sheets.pop();
			console.log(this.block);
			await this.rotateL();
			console.log(this.block);
			const res = await this.mutex.acquire();
			try {
				if (!this.canPose(this.block, 0, 0))
					break;
			} finally {
				res();
			}
			while (1) {
				const release = await this.mutex.acquire();
				try {
					if (!this.canPose(this.block, 0, 1))
						break;
					await this.sleep(1000);
					this.block.y += 1;
				} finally {
					release();
				}
			}
		}
	}
}

export default Game;
