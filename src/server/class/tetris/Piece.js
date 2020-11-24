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
			
			if (abx < 0 || abx > 10 ||  aby > 20 )
				return false;
			
			if (this.map_game[aby][abx] != 0)
				return false;
		}

		return true
	}

	copyBlock = () => {
		let blocker = [];

		for (let i = 0; i < 4; i++)
			blocker.push(Object.assign(Object.create(Object.getPrototypeOf(this.block[i])), this.block[i]));

		return {
			blk: blocker,
			y: this.y,
			x: this.x,
			rotate: this.rotate,
			field: this.field,
		};
	}

	retro = (blk) => {
		this.x = blk.x;
		this.y = blk.y;
		this.rotate= blk.rotate;
		this.field = blk.field;
		this.block = blk.block;
	}

	willBePosed = (blk) => {
		
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

		//this.retro(blk);
		return false;
	}

	rotate = (direction) => {
		
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

		let blk = this.copyBlock();
		
		for (let i = 0; i < 4; i++) {
		
			let xs = srs[0][0] * this.block[i].x + srs[0][1] * this.block[i].y;
			let ys = srs[1][0] * this.block[i].x + srs[1][1] * this.block[i].y;
			this.block[i].x = xs;
			this.block[i].y = ys;
		}

		return this.willBePosed(blk);
	}

	fallen = () => {

		if (this.canFall())
			this.y++;
	}
}

export default Pieces;
