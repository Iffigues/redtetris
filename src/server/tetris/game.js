import block from './piece'

class game extends block {
	constructor(events) {
		super();
	}
	start = () => {
		this.newBlock();
		if (!this.canPose(0, 0)) {
			return;
		}
	}
}
let e = new game()
console.log(e);

export default game;
