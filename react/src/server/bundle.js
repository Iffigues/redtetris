class pieces {
	getPivot() {
                return this.pivot;
        }
}


class squarre extends pieces {
	constructor() {
		this.pivot = 3;
		this.fixe = false;
		this.field = 1;
		this.squarre = " 11  11 ";
	}
}

class line extends pieces {
	constructor () {
		this.fixe = false;
		this.field = 2;
		this.line = " 1   1   1   1  "
	}
}

class croix extends pieces {
	constructor() {
		super()
		this.pivot = 3;
		this.field = 3;
		this.croix = " 1  111 ";
	}
}

class left extends pieces {
	constructor() {
		this.fixe = false;
		this.field = 4;
		this.field = "11   11 "
	}
	getPivot() {
                return this.pivot;
        }
}

class right extends pieces {
        constructor() {
		this.fixe = false;
                this.field = 5;
                this.field = "11   11 "
        }
	getPivot() {
                return this.pivot;
        }
}


class block {
	constructor() {
		this.block = [squarre];
	}
}

exports.block = block;
