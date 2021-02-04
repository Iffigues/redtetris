// Rooms Singleton
// instance => instance of Rooms
// rooms => Object = key (uuid), value (instance of Room)

class Rooms {
  constructor() {
   if (!Rooms.instance){
     this._data = {};
     Rooms.instance = this;
   }
   return Rooms.instance;
  }

  add = item => {
    if (!Object.keys(this._data).includes(item.channel)) {
      this._data[item.channel] = item;
    } else {
      this._data[item.channel].player.push(item.player);
    }
  }

  reGame = (channel, uuidUser) => {
    this._data[channel].reGame(uuidUser)
  }

  addMessage = (channel, data) => {
    this._data[channel].addMessage(data)
  }

  addPlayer = (channel, player) => {
    this._data[channel].addPlayer(player);
  }
  startGame = (channel) => {
    this._data[channel].startGame();
  }

  onKey = (key, channel, uuidUser) => {
    this._data[channel].onKey(key, uuidUser);
  }

  deletePlayer = (channel, uuidUser, endGame) => {
    if (this._data[channel]) this._data[channel].removePlayer(uuidUser, endGame);
  }

  changeIsPlaying = (channel) => {
    this._data[channel].changeIsPlaying();
  }

  get = channel =>  {
    return this._data[channel]
  }
}

const instanceRooms = new Rooms();
Object.freeze(instanceRooms);

export default instanceRooms;

