const block = require('./tetriminos');

class game extends block {

	constructor(events) {
		super();
	}
	start () {
		this.newBlock();
		if (this.canPose(0, 0)) {
			console.log(this.block.constructor.name)
		} else {
			return;
		}
	}
}

module.exports = game;
