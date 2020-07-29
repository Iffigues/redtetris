const game = require("./game");

class player extends game{
	constructor (cb) {
		super()
		this.start()
		this.cb = cb
	}
}

let e = new player();
