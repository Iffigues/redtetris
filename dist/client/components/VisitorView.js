"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _lodash = _interopRequireDefault(require("lodash"));

var _core = require("@material-ui/core");

var _Preview = _interopRequireDefault(require("./Preview"));

var _Chat = _interopRequireDefault(require("./Chat"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var VisitorView = function VisitorView(_ref) {
  var uuidRoom = _ref.uuidRoom,
      currentRoom = _ref.currentRoom,
      player = _ref.player,
      mapsGamePreview = _ref.mapsGamePreview,
      isAlone = _ref.isAlone,
      isEnd = _ref.isEnd,
      boxProps = _ref.boxProps;

  var leaveRoom = function leaveRoom(e, sendSocket, uuidRoom, uuidUser, endGame) {
    e.preventDefault();
    sendSocket('server/leave-room', {
      uuidRoom: uuidRoom,
      uuidUser: uuidUser,
      endGame: endGame
    });
  };

  var joinRoom = function joinRoom(e, channel, uuidUser) {
    e.preventDefault();
    sendSocket('server/visitor-join-room', {
      channel: channel,
      uuidUser: uuidUser
    });
  };

  return /*#__PURE__*/_react.default.createElement("div", null, "Vous regardez en tant que visiteur", /*#__PURE__*/_react.default.createElement("div", {
    className: "d-flex jcnt--center aitems--fs fdir--row"
  }, /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_core.Button, {
    id: "visiorLeave",
    "data-testid": "btnVisiorLeave",
    color: "secondary",
    onClick: function onClick(e) {
      return leaveRoom(e, sendSocket, currentRoom.channel, player.uuid, false);
    }
  }, "Quitter la room ", isEnd), isEnd && /*#__PURE__*/_react.default.createElement(_core.Button, {
    id: "joinRoom",
    "data-testid": "btnLeave",
    color: "primary",
    onClick: function onClick(e) {
      return joinRoom(e, currentRoom.channel, player.uuid);
    }
  }, "Rejoindre la partie ?")), /*#__PURE__*/_react.default.createElement("div", {
    className: "width-100"
  }, /*#__PURE__*/_react.default.createElement(_core.Card, _extends({}, boxProps, {
    variant: "outlined"
  }), /*#__PURE__*/_react.default.createElement(_Preview.default, {
    mapsGamePreview: mapsGamePreview,
    isVisitor: true,
    isAlone: isAlone,
    score: 0,
    sheet: null
  }))), /*#__PURE__*/_react.default.createElement("div", {
    style: {
      width: '50vw'
    }
  }, /*#__PURE__*/_react.default.createElement(_core.Card, _extends({}, boxProps, {
    variant: "outlined"
  }), /*#__PURE__*/_react.default.createElement(_Chat.default, {
    uuidRoom: uuidRoom
  })))));
};

var _default = VisitorView;
exports.default = _default;