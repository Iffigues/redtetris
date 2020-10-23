import Block from './Piece'

class Game extends Block {
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
let e = new Game()
console.log(e);

export default Game;
