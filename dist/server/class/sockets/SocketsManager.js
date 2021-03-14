"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _socket = _interopRequireDefault(require("socket.io"));

var _Room = _interopRequireDefault(require("../tetris/Room"));

var _Rooms = _interopRequireDefault(require("../tetris/Rooms"));

var _Player = _interopRequireDefault(require("../tetris/Player"));

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var sockets = {}; //https://stackoverflow.com/questions/40816355/socket-io-send-disconnect-event-with-parameter

var SocketsManager = function SocketsManager(server) {
  var _this = this;

  _classCallCheck(this, SocketsManager);

  this.updateRooms = function () {
    var rooms = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this.rooms;
    var socket = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _this.utilsIo.socket;
    socket.emit('client/update-rooms', rooms);

    _this.io.sockets.emit('client/update-rooms', rooms);
  };

  this.defaultListener = function (socket) {
    socket.on('server/ping', function () {
      socket.emit('client/pong');
    });
    socket.on('disconnect', function () {
      if (Object.keys(sockets).includes(socket.id)) {
        var _sockets$socket$id = sockets[socket.id],
            uuidUser = _sockets$socket$id.uuidUser,
            channel = _sockets$socket$id.channel;

        var isLast = _this.rooms.deletePlayer(channel, uuidUser, false);

        _this.updateRooms(_this.rooms, socket);

        if (isLast === true) _this.rooms.deleteRoom(channel);

        _this.updateRooms(_this.rooms, socket);

        socket.leave(channel);
        socket.leave(uuidUser);
      }

      socket.disconnect();
    });
  };

  this.roomListener = function (socket) {
    socket.on('server/create-room', function (data) {
      var login = data.login,
          playSolo = data.playSolo;
      var date = new Date();
      var player = new _Player.default(login, function () {
        return _this.updateRooms();
      }, true);
      var room = new _Room.default(player, playSolo);

      _this.rooms.addRoom(room);

      sockets[socket.id] = {
        channel: room.channel,
        uuidUser: player.uuid
      };
      socket.join(room.channel);
      socket.join(player.uuid);

      _this.rooms.addMessage(room.channel, {
        login: null,
        uuidUser: -1,
        time: "".concat(date.getHours(), ":").concat(date.getMinutes()),
        content: "".concat(login, " \xE0 rejoint la room")
      });

      _this.updateRooms(_this.rooms, socket);

      socket.emit('client/created-room', {
        uuidRoom: room.channel,
        player: player
      });
    }); // leave room

    socket.on('server/leave-room', function (data) {
      var uuidRoom = data.uuidRoom,
          uuidUser = data.uuidUser,
          endGame = data.endGame;
      var date = new Date();
      endGame = endGame || false;

      var player = _lodash.default.filter(_this.rooms._data[uuidRoom].players, function (player) {
        return player.uuid === uuidUser;
      });

      _this.rooms.addMessage(uuidRoom, {
        login: null,
        uuidUser: -2,
        time: "".concat(date.getHours(), ":").concat(date.getMinutes()),
        content: "".concat(player[0].name, " \xE0 quitt\xE9 la room")
      });

      var isLast = _this.rooms.deletePlayer(uuidRoom, uuidUser, endGame);

      socket.emit('client/update-user', {
        uuidRoom: null,
        player: null
      });

      _this.updateRooms(_this.rooms, socket);

      if (isLast === true) {
        _this.rooms.deleteRoom(uuidRoom);

        _this.updateRooms(_this.rooms, socket);
      } // socket.leave(uuidUser);

    }); // join room

    socket.on('server/join-room', function (data) {
      var channel = data.channel,
          login = data.login;
      var date = new Date();
      var player = new _Player.default(login, function () {
        return _this.updateRooms();
      });

      _this.rooms.addPlayer(channel, player);

      _this.updateRooms(_this.rooms, socket);

      socket.emit('client/join-room', {
        uuidRoom: channel,
        player: player
      });
      socket.join(channel);
      socket.join(player.uuid);

      _this.rooms.addMessage(channel, {
        login: null,
        uuidUser: -1,
        time: "".concat(date.getHours(), ":").concat(date.getMinutes()),
        content: "".concat(login, " \xE0 rejoint la room")
      });

      _this.updateRooms(_this.rooms, socket);

      socket.emit('client/join-room', {
        uuidRoom: channel,
        player: player
      }); // socket.to(channel).emit('client/global/join-room', { player })
    });
  };

  this.gameListener = function (socket) {
    socket.on('server/new-message', function (data) {
      var uuidRoom = data.uuidRoom;
      var date = new Date();

      _this.rooms.addMessage(uuidRoom, {
        login: data.login,
        uuidUser: data.id_user,
        time: "".concat(date.getHours(), ":").concat(date.getMinutes()),
        content: data.content
      });

      _this.updateRooms(_this.rooms, socket);
    });
    socket.on('server/start-game', function (data) {
      var uuidRoom = data.uuidRoom;

      _this.rooms.startGame(uuidRoom);

      _this.updateRooms(_this.rooms, socket);

      socket.to(uuidRoom).emit('client/start-game');
    });
    socket.on('server/key-up', function (data) {
      // KEY: 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '
      var key = data.key,
          channel = data.channel,
          uuidUser = data.uuidUser;

      _this.rooms.onKey(key, channel, uuidUser);

      _this.updateRooms(_this.rooms, socket);
    });
    socket.on('server/pause-resume', function (data) {
      // get channel
      var channel = data.channel;

      _this.rooms.changeIsPlaying(channel);

      _this.updateRooms(_this.rooms, socket);
    });
    socket.on('server/re-game', function (data) {
      var channel = data.channel,
          uuidUser = data.uuidUser;

      _this.rooms.reGame(channel, uuidUser);

      _this.updateRooms(_this.rooms, socket);

      _lodash.default.map(_this.rooms._data[channel].players, function (player) {
        return socket.to(player.uuid).emit('client/update-user', {
          uuidRoom: channel,
          player: player
        });
      });
    });
    socket.on('server/visitor-join-room', function (data) {
      var channel = data.channel,
          uuidUser = data.uuidUser;

      var player = _this.rooms.changeVisitorMode(channel, uuidUser);

      socket.emit('client/update-user', {
        uuidRoom: channel,
        player: player
      });

      _this.updateRooms(_this.rooms, socket);
    });
    socket.on('server/end-game-visitor', function (data) {
      var channel = data.channel;

      _this.rooms.visitorEnd(channel);

      _this.updateRooms(_this.rooms, socket);
    });
    socket.on('server/end-game', function (data) {
      var channel = data.channel,
          uuidUser = data.uuidUser;

      _this.rooms.playerEnd(channel, uuidUser);

      _this.updateRooms(_this.rooms, socket);
    });
  };

  this.initListener = function (socket) {
    _this.defaultListener(socket);

    _this.roomListener(socket);

    _this.gameListener(socket);
  };

  this.io = (0, _socket.default)(server);
  this.rooms = _Rooms.default;
  this.io.on('connection', function (socket) {
    _this.utilsIo = {
      io: _this.io,
      socket: socket
    };

    _this.initListener(socket);
  });
};

var _default = SocketsManager;
exports.default = _default;