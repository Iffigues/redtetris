"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = require("react");

var _UserContext = require("../context/UserContext");

var _RoomsContext = require("../context/RoomsContext");

var _default = function _default(socketClient) {
  var _useContext = (0, _react.useContext)(_UserContext.Context),
      updateUuidRoom = _useContext.updateUuidRoom,
      updatePlayer = _useContext.updatePlayer;

  var _useContext2 = (0, _react.useContext)(_RoomsContext.Context),
      updateRooms = _useContext2.updateRooms;

  (0, _react.useEffect)(function () {
    socketClient.on('client/ping', function () {
      console.log("ping");
    });
    socketClient.on('client/pong', function () {
      console.log("pong");
    });
    socketClient.on('client/created-room', function (data) {
      var uuidRoom = data.uuidRoom,
          player = data.player;
      updateUuidRoom(uuidRoom);
      updatePlayer(player);
    });
    socketClient.on('client/update-user', function (data) {
      var uuidRoom = data.uuidRoom,
          player = data.player;
      updateUuidRoom(uuidRoom);
      updatePlayer(player);
    });
    socketClient.on('client/join-room', function (data) {
      var uuidRoom = data.uuidRoom,
          player = data.player;
      updateUuidRoom(uuidRoom);
      updatePlayer(player);
    });
    socketClient.on('client/update-rooms', function (rooms) {
      updateRooms(rooms);
    });
    socketClient.on('client/start-game', function () {
      console.log('client/start-game');
    });
    return function () {
      return socketClient.disconnect();
    };
  }, []);
};

exports.default = _default;