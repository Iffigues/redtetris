"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _lodash = _interopRequireDefault(require("lodash"));

var _core = require("@material-ui/core");

var _SocketContext = require("../context/SocketContext");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var ReGame = function ReGame(_ref) {
  var finalScore = _ref.finalScore,
      player = _ref.player,
      currentRoom = _ref.currentRoom;

  var _useContext = (0, _react.useContext)(_SocketContext.SocketContext),
      sendSocket = _useContext.sendSocket;

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      haveSendReGame = _useState2[0],
      setHaveSendReGame = _useState2[1];

  var leaveRoom = function leaveRoom(e, sendSocket, uuidRoom, uuidUser, endGame) {
    e.preventDefault();
    sendSocket('server/leave-room', {
      uuidRoom: uuidRoom,
      uuidUser: uuidUser,
      endGame: endGame
    });
  };

  var wantReGame = function wantReGame(e) {
    e.preventDefault();
    setHaveSendReGame(true);
    sendSocket('server/re-game', {
      channel: currentRoom.channel,
      uuidUser: player.uuid
    });
  };

  return /*#__PURE__*/_react.default.createElement("div", {
    className: "width-100 d-flex jcnt--center aitems--center fdir--column pt-3"
  }, _lodash.default.filter(currentRoom.players, function (player) {
    return !player.visitor;
  }).length > 1 ? finalScore.map(function (score, index) {
    return /*#__PURE__*/_react.default.createElement("p", {
      key: index
    }, index + 1 === 1 ? "🥇 -" : index + 1 === 2 ? "🥈 -" : index + 1 === 3 ? "🥉 -" : "".concat(index, " -"), score.login, " ", score.score);
  }) : /*#__PURE__*/_react.default.createElement("p", null, "Votre score final est de ", currentRoom.players[player.uuid].score), !haveSendReGame ? /*#__PURE__*/_react.default.createElement("div", {
    className: "d-flex jcnt--center aitems--center fdir--row"
  }, /*#__PURE__*/_react.default.createElement(_core.Button, {
    className: "ml-2 test--btn-join-room",
    id: "leaveRoom",
    variant: "contained",
    color: "secondary",
    "data-testid": "btnLeaveGame",
    onClick: function onClick(e) {
      return leaveRoom(e, sendSocket, currentRoom.channel, player.uuid, true);
    }
  }, "Quitter"), /*#__PURE__*/_react.default.createElement(_core.Button, {
    className: "mr-2 test--btn-join-room",
    id: "wantReGame",
    variant: "contained",
    color: "primary",
    "data-testid": "btnReGame",
    onClick: function onClick(e) {
      return wantReGame(e, currentRoom.channel);
    }
  }, "Rejouez")) : /*#__PURE__*/_react.default.createElement("div", {
    className: "d-flex jcnt--center aitems--center fdir--row"
  }, /*#__PURE__*/_react.default.createElement("p", null, "Veuillez attendre que votre adversaire accepte de rejouez")));
};

var _default = ReGame;
exports.default = _default;