class Pieces {
	constructor() {
		this.shadow = {
			x: this.x,
			y: this.y,
		};
		this.interval = 1000;
		this.srs = [[0, 1], [-1, 0]];
		this.lrs = [[0, -1], [1, 0]];
	}

	canPose = (block, xp, yp) => {
		
		let xx = block.x + xp;
		let yy = block.y + yp;

		if (xx < 0 || yy < 0 || xx > 10 || yy > 20)
			return false;

		for (let i = 0; i < 4; i++) {
		
			let abx = block.block[i].x + xx;
			let aby = block.block[i].y + yy;
			
			if (abx < 0 || abx > 10 ||  aby > 19 || aby < 0) {
				return false;
			}
			console.log(aby, abx);
			if (this.map_game[aby][abx] != 0) {
				return false;

			}
		}

		return true
	}

	copyBlock = (block) => {
		let blocker = [];

		for (let i = 0; i < 4; i++) 
			blocker.push(Object.assign(Object.create(Object.getPrototypeOf(block.block[i])), block.block[i]));

		return {
			blockk: blocker,
			y: block.y,
			x: block.x,
			rotate: block.rotate,
			field: block.field,
		};
	}

	retro = (block, blk) => {
		block.x = blk.x;
		block.y = blk.y;
		block.rotate= blk.rotate;
		block.field = blk.field;
		block.block = blk.block;
	}

	willBePosed = (blk) => {
	console.log(blk);	
		for (let i = 0; i < 3; i = i + 1) {
		
			for (let n = 0; n < 3; n = n + 1) {			
			
				if (this.canPose(blk, i, n)) {
					blk.x += n;
					blk.y += i;
					return true;
				}

				if (this.canPose(blk, i, -n)) {
					blk.x += n;
					blk.y += -i;
					return true;
				}

				if (this.canPose(blk, -i, n)) {
					blk.x += -n;
					blk.y += i;
					return true;
				}

				if (this.canPose(blk, -i, -n)) {
					blk.x += -n;
					blk.y += -i;
					return true;
				}
			}
		}

		return false;
	}

	rotate = (block, direction) => {
		
		let srs;

		if (!Number.isInteger(direction))
			return false;

		if (direction == 0) {
			srs = this.srs;
		} else if (direction == 1) {
			srs = this.lrs;
		} else {
			return false
		}

		let blk = this.copyBlock(block);
		
		for (let i = 0; i < 4; i++) {
		
			let xs = srs[0][0] * block.block[i].x + srs[0][1] * block.block[i].y;
			let ys = srs[1][0] * block.block[i].x + srs[1][1] * block.block[i].y;
			block.block[i].x = xs;
			block.block[i].y = ys;
		}

		console.log(block);
		if (this.willBePosed(block)) {
			console.log("eee");
			return true;
		} else{
			console.log("zzz");
			block = this.retro(block, blk);
			return false;
		}

	}

	fallen = () => {

		if (this.canFall())
			this.y++;
	}
}

export default Pieces;
