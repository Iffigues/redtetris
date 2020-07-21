class pieces {
	constructor() {
		this.shadow = {
			x: this.x,
			y: this.y,
		};
		this.intervalle = 1000;
		this.srs = [[0, 1], [-1, 0]];
		this.lrs = [[0, -1], [1, 0]];
	}

	newCase(x, y , pivot) {
		if (!Number.isInteger(x) || !Number.isInteger(y) || typeof pivot == "boolean")
			return false;
		return {
			x: x,
			y: y,
			pivot: pivot,
		};
	}

	timer(events) {
		setInterval(this.timeDown(this.map, events), this.intervalle);

	}

	timeDown(events) {
	}

	canPose(xp, yp) {
		let xx = this.x + xp;
		let yy = this.y + yp;
		if (xx < 0 || yy < 0 || xx > 10 || yy > 20)
			return false;
		for (let i = 0; i < 4; i++) {
			let abx = this.block[i] + xx;
			let aby = this.block[i] - yy;
			if (abx < 0 || abx > 10 ||  aby > 20 )
				return false;
			if (this.map[abx][aby] != 0)
				return false;
		}
		return true
	}

	copyBlock() {

		let blocker = [];
		
		for (let i = 0; i < 4; i++)
			blocker.push(Object.assign( Object.create( Object.getPrototypeOf(this.block[i])), this.block[i]));
		
		return {
			blk: blocker,
			y: this.y,
			x: this.x,
			rotate: this.rotate,
			field: this.field,
		};
	}

	retro (blk) {
		this.x = blk.x;
		this.y = blk.y;
		this.rotate= blk.rotate;
		this.field = blk.field;
		this.block = blk.block;
	}

	willBePosed(blk) {

		for (let i = 0; i < 3; i = i + 1) {
			
			for (let n = 0; n < 3; n = n + 1) {
			
				if (this.canPose(i, n)) {
					this.x = i;
					this.y = n;
					return true;
				}

				if (this.canPose(i, -n)) {
					this.x = i;
					this.y = -n;
					return true;
				}

				if (this.canPose(-i, n)) {
					this.x = -i;
					this.y = n;
					return true;
				}

				if (this.canPose(-i, -n)) {
					this.x = -i;
					this.y = -n;
					return true;
				}
			}
		}
		this.retro(blk);
		return false;
	}

	rotate (sens) {
		let srs;
		if (!Number.isInteger(sens))
			return false;
		if (sens == 0)
			srs = this.srs;
		else if (sens == 1)
			srs = this.lrs;
		else
			return false
		let blk = this.copyBlock();
		for (let i = 0; i < 4; i++) {
			let xs = srs[0][0] * this.block[i].x + srs[0][1] * this.block[i].y;
			let ys = srs[1][0] * this.block[i].x + srs[1][1] * this.block[i].y;
			this.block[i].x = xs;
			this.block[i].y = ys;
		}
		return this.willBePosed(blk);
	}

	fallen() {
		if (this.canFall()) {
			this.y++;
		}
	}
}

module.exports = pieces;
