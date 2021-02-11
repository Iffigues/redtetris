import Block from './Tetriminos';
import _ from 'lodash'
import uuidv4 from 'uuid';
import Player from './Player';
import regeneratorRuntime from "regenerator-runtime";


class Room {
	
	constructor(player, solo = false, channel = uuidv4()) {
		this.isStart = false;
		this.isPlaying = false;
		this.solo = solo;
		this.block = new Block();
		this.channel = channel;
		this.players = {};
		this.messages = [];
    this.finalScore = [];
		this.addPlayer(player);

	}


  playerEnd = (uuidUser) => {
    let isLast = true;
    this.finalScore.unshift({
      login: this.players[uuidUser].name,
      score: this.players[uuidUser].score
    })
    _.map(this.players, player => {
      if (player.end === false && player.uuid !== uuidUser) {
        isLast = false;
      }
    })
    if (isLast) {
      this.players[uuidUser].win = true
    }
  }
	
	reGame = (uuidUser) => {
		let isLast = true;
		_.map(this.players, player => {
			if (player.requestNewGame === false && player.uuid !== uuidUser) {
				isLast = false;
			}
		})

		if (isLast) {
      this.finalScore = [];
			_.map(this.players, player => {
				player.initGame();
			})
		} else {
			this.players[uuidUser].setRequestNewGame(true)
		}
	}

	visitorEnd = () => {
		_.map(this.players, player => {
			if (player.visitor) player.end = true;
		})
	}

	addMessage = (data) => {
		this.messages.push({
			...data
		})
	}

	changeVisitorMode = (uuidUser) => {
		let result;
		_.map(this.players, player => {
			if (player.uuid === uuidUser) {
				player.visitor = false;
				result = player;
			}
		})
		return result;
	}

	removePlayer = (uuidUser, endGame) => {
    delete this.players[uuidUser]

		if (endGame) {
			const isLastRequestNewGame = true;
			_.map(this.players, player => {
				if (player.requestNewGame === false) {
					isLastRequestNewGame = false
				}
			})
			if (isLastRequestNewGame) {
				_.map(this.players, player => {
					player.initGame();
				})
			}
		}
	}

	addSheet = () => {
		let sheet = this.block.newBlock();
		_.map(this.players, elem => elem.sheets.push(_.cloneDeep(sheet)));
	}

	destroyer = (uuid) => {
		_.map(this.players, player => {
			if (player.uuid !== uuid) {
				player.destroyLine()
			}
		})
	}	

	addPlayer = (player) => {
		player.addSheetFunc(this.addSheet);
		player.addDestroyFunc(this.destroyer);
		if (this.isStart) {
			player.visitor = true
		}
		this.players[player.uuid] = player;
	}

	onKey = (key, uuidUser) => {
		this.players[uuidUser].move(key);
	}

	countPlayer = () => {
		let i = this.players.length;
		if (i === 4) {
			this.startGame();
		}
	}

	startGame = () => {
		this.isPlaying = true;
		this.isStart = true;
		_.map(this.players, elem => elem.startGame());
	}

	changeIsPlaying = () => {
		this.isPlaying = !this.isPlaying;
		_.map(this.players, elem => elem.changePlaying(this.isPlaying));
	}

	getPlayers = () => {
	  return this.players
	}
}

export default Room;
