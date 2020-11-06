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
  addPlayer = (channel, player) => {
    console.log("channels", this._data[channel])
    this._data[channel].addPlayer(player);
  }

  deletePlayer = (uuidUser, channel) => {
    this._data[channel] =
      this._data[channel].player
        .filter(item => item.uuid !== uuidUser)
  }

  get = channel =>  {
    return this._data.find(elmt => elmt.channel === channel)
  }
}

const instanceRooms = new Rooms();
Object.freeze(instanceRooms);

export default instanceRooms;

