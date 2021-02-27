"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Rooms Singleton
// instance => instance of Rooms
// rooms => Object = key (uuid), value (instance of Room)
var Rooms = function Rooms() {
  var _this = this;

  _classCallCheck(this, Rooms);

  this.addRoom = function (item) {
    if (!Object.keys(_this._data).includes(item.channel)) {
      _this._data[item.channel] = item;
    } else {
      _this._data[item.channel].player.push(item.player);
    }
  };

  this.visitorEnd = function (channel) {
    if (_this._data[channel]) {
      _this._data[channel].visitorEnd();
    }
  };

  this.playerEnd = function (channel, uuidUser) {
    if (_this._data[channel]) {
      _this._data[channel].playerEnd(uuidUser);
    }
  };

  this.reGame = function (channel, uuidUser) {
    _this._data[channel].reGame(uuidUser);
  };

  this.addMessage = function (channel, data) {
    _this._data[channel].addMessage(data);
  };

  this.addPlayer = function (channel, player) {
    _this._data[channel].addPlayer(player);
  };

  this.startGame = function (channel) {
    _this._data[channel].startGame();
  };

  this.onKey = function (key, channel, uuidUser) {
    _this._data[channel].onKey(key, uuidUser);
  };

  this.deleteRoom = function (channel) {
    delete _this._data[channel];
  };

  this.deletePlayer = function (channel, uuidUser, endGame) {
    if (_this._data[channel]) {
      _this._data[channel].removePlayer(uuidUser, endGame);

      return Object.keys(_this._data[channel].players).length === 0;
    }

    return false;
  };

  this.changeVisitorMode = function (channel, uuidUser) {
    return _this._data[channel].changeVisitorMode(uuidUser);
  };

  this.changeIsPlaying = function (channel) {
    _this._data[channel].changeIsPlaying();
  };

  this.get = function (channel) {
    return _this._data[channel];
  };

  if (!Rooms.instance) {
    this._data = {};
    Rooms.instance = this;
  }

  return Rooms.instance;
};

var instanceRooms = new Rooms();
Object.freeze(instanceRooms);
var _default = instanceRooms;
exports.default = _default;