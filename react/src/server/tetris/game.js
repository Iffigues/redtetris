const block = require('./piece');

class game extends block {

	constructor(events) {
		super();
	}
	start () {
		this.newBlock();
		if (this.canPose(0, 0)) {
		} else {
			return;
		}
	}
}
let e = new game()
console.log(e);
module.exports = game;
