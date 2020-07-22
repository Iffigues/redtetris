const block = require('./tetriminosBlock');

class game extends block {

	constructor(events) {
		super();
		this.events = events;
		this.map = [];
		this.indestructible = 0;
		this.time = 1000;
		for (let i = 0; i < 22; i++) {
			this.map.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
		}
	}
	start () {
		this.blocks = this.getBlock();
		if (this.blocks.canPose(this.map)) {
			this.blocks.timer(map, this.events);	
		} else {
			return;
		}
	}
}

module.exports = game;
