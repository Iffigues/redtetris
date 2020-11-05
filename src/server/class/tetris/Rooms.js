class Rooms {
  constructor() {
   if (!Rooms.instance){
     this._data = [];
     Rooms.instance = this;
   }
   return Rooms.instance;
  }

  add = item => {
    this.instance[item.channel] = item;
  }
  get = channel =>  {
    return this.instance.find(elmt => elmt.channel === channel)
  }
}

const instance = new Rooms();
Object.freeze(instance);

export default instance;

