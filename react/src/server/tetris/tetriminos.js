const random = require('random');
const pieces = require('./tetriminosBlock');

class I extends pieces {
	constructor() {
		super();
		this.state = false;
		this.x = 0;
		this.y = 0;
		this.rotate = true;
		this.field = 1;
		this.block = [
			this.newCase(-2, 0, false),
			this.newCase(-1,0, false),
			this.newCase(0, 0, true),
			this.newCase(1, 0, false),
		];
	}
}

class O extends pieces {
	constructor() {
		super();
		this.state = false;
		this.x = 0;
		this.y = 0;
		this.rotate = false;
		this.field = 1;
		this.block = [
			this.newCase(-1, 0, false),
			this.newCase(-1,1, false),
			this.newCase(0, 0, true),
			this.newCase(0, 1, false),
		];
	}
}

class T extends pieces {
	constructor() {
		super();
		this.state = false;
		this.x = 0;
		this.y = 0;
		this.rotate = true;
		this.field = 1;
		this.block = [
			this.newCase(-1, 0, false),
			this.newCase(0,1, false),
			this.newCase(0, 0, true),
			this.newCase(1, 0, false),
		];
	}
}

class J extends pieces {
	constructor() {
		super();
		this.state = false;
		this.x = 0;
		this.y = 0;
		this.rotate = true;
		this.field = 1;
		this.block = [
			this.newCase(-1, 1, false),
			this.newCase(-1,0, false),
			this.newCase(0, 0, true),
			this.newCase(1, 0, false),
		];
	}
}

class L extends pieces {
	constructor() {
		super();
		this.state = false;
		this.x = 0;
		this.y = 0;
		this.rotate = true;
		this.field = 1;
		this.block = [
			this.newCase(-1, 0, false),
			this.newCase(0,0, true),
			this.newCase(1, 0, false),
			this.newCase(1, 1, false),
		];
	}
}


class S extends pieces {
	constructor() {
		super();
		this.state = false;
		this.x = 0;
		this.y = 0;
		this.rotate = true;
		this.field = 1;
		this.block = [
			this.newCase(-1, 0, false),
			this.newCase(0,0, true),
			this.newCase(0, 1, false),
			this.newCase(1, 1, false),
		];
	}
}

class Z extends pieces {
	constructor() {
		super();
		this.state = false;
		this.x = 0;
		this.y = 0;
		this.rotate = true;
		this.field = 1;
		this.block = [
			this.newCase(-1, 1, false),
			this.newCase(0,1, false),
			this.newCase(0, 0, true),
			this.newCase(1, 0, false),
		];
	}
}


class block {
	constructor() {
		this.block = [I, O, T, S, Z, J, L];
	}
	getBlock() {
		let i = random.int( 0, this.block.length - 1);
		return new this.block[i];
	}
}

module.exports = block;
