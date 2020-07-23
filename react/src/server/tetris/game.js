const block = require('./tetriminos');

class game extends block {

	constructor(events) {
		super();
	}
	start () {
		this.newBlock();
		if (this.canPose(0, 0)) {
			this.block.timer(this.events);	
		} else {
			return;
		}
	}
}

module.exports = game;
