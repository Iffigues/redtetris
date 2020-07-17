const block = require('./tetriminos');

class map extends block{
	constructor() {
		super();
		this.map = [];
		for (let i = 0; i < 20; i++) {
			this.map.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
		}
	}
	start () {
		this.blocks = this.getBlock();
		this.blocks.canPose(this.map);
	}
}

module.exports = map;
