"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _core = require("@material-ui/core");

var _RoomsContext = require("../context/RoomsContext");

var _SocketContext = require("../context/SocketContext");

var _UserContext = require("../context/UserContext");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var Chat = function Chat(_ref) {
  var uuidRoom = _ref.uuidRoom;

  var _useContext = (0, _react.useContext)(_SocketContext.SocketContext),
      sendSocket = _useContext.sendSocket;

  var _useContext2 = (0, _react.useContext)(_UserContext.Context),
      player = _useContext2.state.player;

  var _useContext3 = (0, _react.useContext)(_RoomsContext.Context),
      rooms = _useContext3.state.rooms;

  var _useState = (0, _react.useState)(''),
      _useState2 = _slicedToArray(_useState, 2),
      message = _useState2[0],
      setMessage = _useState2[1];

  var _useState3 = (0, _react.useState)(true),
      _useState4 = _slicedToArray(_useState3, 2),
      game = _useState4[0],
      setGame = _useState4[1];

  var keysCode = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' ', 'Escape'];
  (0, _react.useEffect)(function () {
    var getKeyUp = function getKeyUp(event) {
      var key = event.key;

      if (keysCode.includes(key)) {
        if (key === 'Escape') {
          sendSocket('server/pause-resume', {
            channel: uuidRoom
          });
        } else {
          sendSocket('server/key-up', {
            key: key,
            channel: uuidRoom,
            uuidUser: player.uuid
          });
        }
      }
    };

    if (game) {
      document.addEventListener('keyup', getKeyUp);
    } else {
      document.removeEventListener('keyup', getKeyUp);
    }

    return function () {
      document.removeEventListener('keyup', getKeyUp);
    };
  }, [game]);

  var sendMessage = function sendMessage(e) {
    e.preventDefault();

    if (message !== "") {
      sendSocket('server/new-message', {
        content: message,
        uuidRoom: uuidRoom,
        login: player.name,
        id_user: player.uuid
      });
      setMessage("");
      var element = document.getElementById("chat");
      element.scrollTop = 0;
    }
  };

  (0, _react.useEffect)(function () {
    var inputMessage = document.getElementById('input-message');
    inputMessage.addEventListener('focusout', function (event) {
      setGame(true);
    });
    inputMessage.addEventListener('focus', function (event) {
      setGame(false);
    });
  }, []);
  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("div", {
    id: "chat",
    className: "container--chat"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "chat d-flex fdir--column"
  }, rooms && rooms[uuidRoom].messages.map(function (msg) {
    if (!msg.login) {
      return /*#__PURE__*/_react.default.createElement("div", {
        key: msg
      }, /*#__PURE__*/_react.default.createElement("p", null, /*#__PURE__*/_react.default.createElement("span", {
        className: "bold medium-text ".concat(msg.uuidUser === -1 ? "text--green" : "text--red")
      }, msg.time, " -- ", msg.content), /*#__PURE__*/_react.default.createElement("br", null)));
    } else {
      return /*#__PURE__*/_react.default.createElement("div", {
        key: msg,
        className: "".concat(msg.uuidUser === player.uuid ? 'aself--fend bubble--me' : 'aself--fstart bubble--other', "\n                      aself--fstart\n                      pb-2\n                      bubble\n                      ")
      }, /*#__PURE__*/_react.default.createElement("p", null, /*#__PURE__*/_react.default.createElement("span", {
        className: "bold medium-text"
      }, msg.login, ":"), " ", msg.content, " ", /*#__PURE__*/_react.default.createElement("br", null)), /*#__PURE__*/_react.default.createElement("p", {
        className: "thin small-text pt-0"
      }, msg.time));
    }
  }))), /*#__PURE__*/_react.default.createElement("div", {
    className: "d-flex fdir--column"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "aself--center"
  }, /*#__PURE__*/_react.default.createElement("form", {
    onSubmit: sendMessage
  }, /*#__PURE__*/_react.default.createElement(_core.Input, {
    className: "aself--center mb-2 input-size",
    value: message,
    onChange: function onChange(e) {
      return setMessage(e.target.value);
    },
    variant: "outlined",
    required: true,
    name: "message",
    label: "message",
    type: "message",
    id: "input-message",
    inputProps: {
      'data-testid': 'messageChat'
    }
  }), /*#__PURE__*/_react.default.createElement(_core.Button, {
    className: "aself--center mt-2 test--btn-submit-message",
    color: "primary",
    "data-testid": "btnLogin",
    disabled: message.length === 0,
    onClick: sendMessage
  }, "\u27A1\uFE0F")))));
};

var _default = Chat;
exports.default = _default;