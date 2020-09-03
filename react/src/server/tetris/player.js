const game = require("./game");

class player extends game {
	constructor (role) {
		super()
		this.score = 0;
		this.role = role;
		this.live = true;
		//this.cb = cb
		this.map = [];
                this.indestructible = 0;
                this.time = 1000;
                for (let i = 0; i < 22; i++)
                        this.map.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
		this.block = null;
	}

	pushSheet(a) {
		this.block = a;
	}
}

module.exports.players =  function players(admin = false) {
        return new player(admin);
}
