const game = require("./game");

class player extends game{
	constructor (cb, role) {
		super()
		this.score = 0;
		this.role = role;
		this.live = true;
		this.start()
		this.cb = cb
	}
}

let e = new player();
