"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _lodash = _interopRequireDefault(require("lodash"));

var _core = require("@material-ui/core");

var _UserContext = require("../context/UserContext");

var _SocketContext = require("../context/SocketContext");

var _Preview = _interopRequireDefault(require("./Preview"));

var _Game = _interopRequireDefault(require("./Game"));

var _Chat = _interopRequireDefault(require("./Chat"));

var _ReGame = _interopRequireDefault(require("./ReGame"));

var _VisitorView = _interopRequireDefault(require("./VisitorView"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var boxProps = {
  bgcolor: 'background.paper',
  bordercolor: 'text.primary',
  border: 1,
  borderradius: "borderRadius",
  style: {
    backgroundColor: 'white',
    height: '100%',
    width: '100%'
  },
  m: 1
};

var Board = function Board(_ref) {
  var finalScore = _ref.finalScore,
      song = _ref.song,
      currentRoom = _ref.currentRoom,
      isEnd = _ref.isEnd,
      uuidRoom = _ref.uuidRoom,
      mapGame = _ref.mapGame,
      mapsGamePreview = _ref.mapsGamePreview,
      isAlone = _ref.isAlone,
      score = _ref.score,
      sheet = _ref.sheet;

  var _useContext = (0, _react.useContext)(_UserContext.Context),
      player = _useContext.state.player;

  var _useContext2 = (0, _react.useContext)(_SocketContext.SocketContext),
      sendSocket = _useContext2.sendSocket;

  (0, _react.useEffect)(function () {
    if (isEnd === true && currentRoom) {
      sendSocket('server/end-game-visitor', {
        channel: uuidRoom
      });
      sendSocket('server/end-game', {
        channel: uuidRoom,
        uuidUser: player.uuid
      });
    }
  }, [isEnd]);

  if (player && player.visitor || player && Object.keys(currentRoom).includes('players') && Object.keys(currentRoom.players).includes(player.uuid) && currentRoom.players[player.uuid] && currentRoom.players[player.uuid].visitor) {
    return /*#__PURE__*/_react.default.createElement(_VisitorView.default, {
      uuidRoom: uuidRoom,
      boxProps: boxProps,
      isEnd: isEnd,
      currentRoom: currentRoom,
      player: player,
      mapsGamePreview: mapsGamePreview,
      isAlone: isAlone
    });
  } else {
    return /*#__PURE__*/_react.default.createElement("div", {
      className: "d-flex jcnt--start aitems--fs fdir--row"
    }, isEnd ? /*#__PURE__*/_react.default.createElement(_ReGame.default, {
      player: player,
      currentRoom: currentRoom,
      finalScore: finalScore
    }) : /*#__PURE__*/_react.default.createElement("div", {
      className: "width-100"
    }, /*#__PURE__*/_react.default.createElement(_core.Card, _extends({}, boxProps, {
      variant: "outlined"
    }), /*#__PURE__*/_react.default.createElement(_Game.default, {
      mapGame: mapGame,
      song: song,
      isOtherUser: false
    }))), /*#__PURE__*/_react.default.createElement("div", {
      className: "aself--str"
    }, /*#__PURE__*/_react.default.createElement(_Preview.default, {
      mapsGamePreview: mapsGamePreview,
      isVisitor: false,
      isAlone: isAlone,
      score: score,
      sheet: sheet,
      uuidRoom: uuidRoom
    })), /*#__PURE__*/_react.default.createElement("div", {
      style: {
        width: '50vw'
      }
    }, /*#__PURE__*/_react.default.createElement(_core.Card, _extends({}, boxProps, {
      variant: "outlined"
    }), /*#__PURE__*/_react.default.createElement(_Chat.default, {
      uuidRoom: uuidRoom
    }))));
  }
};

var _default = Board;
exports.default = _default;