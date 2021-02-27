"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _Tetriminos = _interopRequireDefault(require("./Tetriminos"));

var _uuid = _interopRequireDefault(require("uuid"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _readOnlyError(name) { throw new TypeError("\"" + name + "\" is read-only"); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Room = function Room(player) {
  var solo = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var channel = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : (0, _uuid.default)();

  _classCallCheck(this, Room);

  _initialiseProps.call(this);

  this.isStart = false;
  this.isPlaying = false;
  this.solo = solo;
  this.block = new _Tetriminos.default();
  this.channel = channel;
  this.players = {};
  this.messages = [];
  this.arrPlayer = [];
  this.finalScore = [];
  this.addPlayer(player);
};

var _initialiseProps = function _initialiseProps() {
  var _this = this;

  this.playerEnd = function (uuidUser) {
    var isLast = false;

    if (!_this.players[uuidUser].visitor) {
      _this.finalScore.push({
        login: _lodash.default.clone(_this.players[uuidUser].name),
        score: _lodash.default.clone(_this.players[uuidUser].score)
      });

      _this.finalScore = _this.finalScore.sort(function (a, b) {
        return a.score < b.score;
      });
    }

    _lodash.default.map(_this.players, function (player) {
      if (!player.end && player.uuid !== uuidUser) {
        isLast = true;
      }
    });
  };

  this.reGame = function (uuidUser) {
    var isLast = true;

    _this.arrPlayer.push(uuidUser);

    _lodash.default.map(_this.players, function (player) {
      if (player.uuid !== uuidUser && !player.requestNewGame) {
        isLast = false;
      }
    });

    if (isLast) {
      _this.finalScore = [];
      var index = 0;

      _this.arrPlayer.map(function (uuid_player) {
        if (index > 2) {
          _this.players[uuid_player].initGame();

          _this.players[uuid_player].setVisitor(true);
        } else {
          _this.players[uuid_player].initGame();

          _this.players[uuid_player].addSheetFunc(_this.addSheet);

          _this.players[uuid_player].addDestroyFunc(_this.destroyer);

          index++;
        }
      });

      _this.startGame();

      _this.arrPlayer = [];
    } else {
      _this.players[uuidUser].setRequestNewGame(true);
    }
  };

  this.visitorEnd = function () {
    _lodash.default.map(_this.players, function (player) {
      if (player.visitor) player.end = true;
    });
  };

  this.addMessage = function (data) {
    _this.messages.push(_objectSpread({}, data));
  };

  this.changeVisitorMode = function (uuidUser) {
    var result;

    _lodash.default.map(_this.players, function (player) {
      if (player.uuid === uuidUser) {
        player.visitor = false;
        player.setRequestNewGame(true);
        result = player;
      }
    });

    return result;
  };

  this.removePlayer = function (uuidUser, endGame) {
    delete _this.players[uuidUser];

    if (endGame) {
      var isLastRequestNewGame = true;

      _lodash.default.map(_this.players, function (player) {
        if (player.requestNewGame === false) {
          isLastRequestNewGame = (_readOnlyError("isLastRequestNewGame"), false);
        }
      });

      if (isLastRequestNewGame) {
        _lodash.default.map(_this.players, function (player) {
          player.initGame();
        });
      }
    }
  };

  this.addSheet = function () {
    var sheet = _this.block.newBlock();

    _lodash.default.map(_this.players, function (elem) {
      return elem.sheets.push(_lodash.default.cloneDeep(sheet));
    });
  };

  this.destroyer = function (uuid, i) {
    _lodash.default.map(_this.players, function (player) {
      if (player.uuid !== uuid) {
        player.destroyLine(i);
      }
    });
  };

  this.addPlayer = function (player) {
    if (_this.isStart || _this.solo || Object.keys(_this.players).length >= 3) {
      player.visitor = true;
    } else {
      player.addSheetFunc(_this.addSheet);
      player.addDestroyFunc(_this.destroyer);
    }

    _this.players[player.uuid] = player;
  };

  this.onKey = function (key, uuidUser) {
    _this.players[uuidUser].move(key);
  };

  this.countPlayer = function () {
    var i = _this.players.length;

    if (i === 4) {
      _this.startGame();
    }
  };

  this.startGame = function () {
    _this.isPlaying = true;
    _this.isStart = true;

    _lodash.default.map(_this.players, function (player) {
      if (!player.visitor) {
        player.startGame();
      }
    });
  };

  this.changeIsPlaying = function () {
    _this.isPlaying = !_this.isPlaying;

    _lodash.default.map(_this.players, function (elem) {
      return elem.changePlaying(_this.isPlaying);
    });
  };

  this.getPlayers = function () {
    return _this.players;
  };
};

var _default = Room;
exports.default = _default;