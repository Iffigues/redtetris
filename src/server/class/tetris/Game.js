import Block from './Piece'
import regeneratorRuntime from "regenerator-runtime";

class Game extends Block {
	constructor(events) {
		super();
		this.block = null;
		this.keyBind = [left, rigth, up, down, rotateL, rotateR];
	}
	
	left = () => {
	}

	rigth = () => {
	}

	up = () => {
	}

	down = () => {
	} 

	rotateL = () => {
	}

	rotateR = () => {
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
					//return null;
				}
				await this.sleep(1000);
				console.log(this.canPose(this.block, 0, 0));
				console.log(this.block);
				await this.draw(this.block, 1);
				console.log(this.map_game);
				await this.draw(this.block, 0);
				this.block.y += 1;
			}
		}
	}
}

export default Game;
