const  uuidv4 = require('uuid');

class Room {
	constructor(name = uuidv4()) {
		this.name = name;	
	}
}
