class op {
        canFall() {
                return true;
        }
}

class pieces extends op{
	constructor() {
		super();
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

	timer(map, events) {
		setInterval(this.timeDown(map, events), this.intervalle);

	}

	timeDown(map, events) {
	}

	canPose(map, xp, yp) {
		let xx = this.x + xp;
		let yy = this.y + yp;
		if (xx < 0 || yy < 0 || xx > 10 || yy > 20)
			return false;
		for (let i = 0; i < 4; i++) {
			let abx = this.block[i] + xx;
			let aby = this.block[i] - yy;
			if (abx < 0 || abx > 10 || aby < 0 || aby > 20 )
				return false;
			if (map[abx][aby] != 0)
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
	
	getOposite() {
		let i = 0;
		for (let i = 0; i < 4; i++)
                        if (this.block[i].y < i) {
				i = this.block[i];
			}
		return i
	}

	retro (blk) {
		this.x = blk.x;
		this.y = blk.y;
		this.rotate= blk.rotate;
		this.field = blk.field;
		this.block = blk.block;
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
		return true;
	}
	fallen() {
		if (this.canFall()) {
			this.y++;
		}
	}
}

module.exports = pieces;
