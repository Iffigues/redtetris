const game = require("./game");

class player extends game{
	constructor () {
		super()
		this.start()
	}
}

let e = new player();
