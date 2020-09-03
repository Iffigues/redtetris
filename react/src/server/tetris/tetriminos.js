const random = require('random');

class mounter {
	constructor () {
	}
	timer() {
                let inter = function () {
                }
                setInterval(inter, this.intervalle);
        }
	newCase(x, y , pivot) {
                if (!Number.isInteger(x) || !Number.isInteger(y) || !typeof pivot == "boolean")
                        return false;
                return {
                        x: x,
                        y: y,
                        pivot: pivot,
                };
        }
}

class I extends mounter {
	constructor() {
		super();
		this.state = false;
		this.x = 5;
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

class O extends mounter {
	constructor() {
		super();
		this.state = false;
		this.x = 5;
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

class T extends mounter {
	constructor() {
		super();
		this.state = false;
		this.x = 5;
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

class J extends mounter {
	constructor() {
		super();
		this.state = false;
		this.x = 5;
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

class L extends mounter {
	constructor() {	
		super();
		this.state = false;
		this.x = 5;
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


class S extends mounter {
	constructor() {
		super();
		this.state = false;
		this.x = 5;
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

class Z extends mounter {
	constructor() {
		super();
		this.state = false;
		this.x = 5;
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


class Block {
	constructor() {
		this.blocks = [I, O, T, S, Z, J, L];
	}
	newBlock() {
		let i = random.int( 0, this.blocks.length - 1);
		return new this.blocks[i]();
	}
}

module.exports = Block;
