"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _cell = _interopRequireDefault(require("./cell"));

var _styledStage = _interopRequireDefault(require("./style/styledStage"));

var _tetris = _interopRequireDefault(require("../static/media/tetris.mp3"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Sound = function Sound() {
  return /*#__PURE__*/_react.default.createElement("audio", {
    src: _tetris.default,
    volume: 0.1,
    autoPlay: true,
    loop: true
  });
};

var Game = function Game(_ref) {
  var song = _ref.song,
      mapGame = _ref.mapGame,
      isOtherUser = _ref.isOtherUser;
  return /*#__PURE__*/_react.default.createElement("div", null, song && isNotTest && /*#__PURE__*/_react.default.createElement(Sound, null), /*#__PURE__*/_react.default.createElement(_styledStage.default, {
    isOtherUser: isOtherUser,
    width: mapGame[0].length,
    height: mapGame.length
  }, mapGame.map(function (row) {
    return row.map(function (cell, x) {
      return /*#__PURE__*/_react.default.createElement(_cell.default, {
        key: x,
        type: cell,
        isOtherUser: isOtherUser
      });
    });
  })));
};

var _default = Game;
exports.default = _default;