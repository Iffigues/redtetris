const random = require('random')

class pieces {
	constructor() {
		this.srs = [
			[0, 1],
			[-1, 0],
		]
	}
	getPivot() {
                return this.pivot;
        }
	newCase(x, y , pivot) {
		return {
			x: x,
			y: y,
			pivot: pivot,
		}
	}
	setPivot() {
		let i = 0;
		for (let e = 0; e < this.block.len; e++) {
			if (this.block[e] == '1') {
				i++;
			}
			if (i == 2) {
				return e;
			}
		}
	}
}

class I extends pieces {
	constructor() {
		super();
		this.state = false;
		this.x = 0;
		this.y = 0;
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

let r = new block()
console.log(r.getBlock().getPivot())
exports.block = block;
