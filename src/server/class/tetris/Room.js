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
    let isLast = false;
    if (!this.players[uuidUser].visitor) {
      this.finalScore.push({
        login: _.clone(this.players[uuidUser].name),
        score: _.clone(this.players[uuidUser].score)
      })
      this.finalScore = _.sortBy(this.finalScore, ["score"])
    }
    _.map(this.players, player => {
      if (!player.end && player.uuid !== uuidUser) {
        isLast = true;
      }
    })
    if (isLast) {
      this.players[uuidUser].win = true
    }
  }
	
	reGame = (uuidUser) => {
		let isLast = true;
		_.map(this.players, player => {
			if (!player.requestNewGame && player.uuid !== uuidUser) {
				isLast = false;
			}
		})

		if (isLast) {
      this.finalScore = [];
			_.map(this.players, player => {
        if (!player.visitor) {
          player.initGame();
          player.addSheetFunc(this.addSheet);
          player.addDestroyFunc(this.destroyer);
        }
			})
      this.startGame();
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
		this.messages.push({ ...data })
	}

	changeVisitorMode = (uuidUser) => {
		let result;
		_.map(this.players, player => {
			if (player.uuid === uuidUser) {
				player.visitor = false;
        player.setRequestNewGame(true);
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

	destroyer = (uuid, i) => {
		_.map(this.players, player => {
			if (player.uuid !== uuid) {
				player.destroyLine(i)
			}
		})
	}	

	addPlayer = (player) => {
    if (this.isStart) {
      player.visitor = true
		} else {
      player.addSheetFunc(this.addSheet);
      player.addDestroyFunc(this.destroyer);
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
		_.map(this.players, player => {
      if (!player.visitor) {
        player.startGame()
      }
    });
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
