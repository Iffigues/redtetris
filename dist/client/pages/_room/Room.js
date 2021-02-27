"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRouter = require("react-router");

var _reactRouterDom = require("react-router-dom");

var _Button = _interopRequireDefault(require("@material-ui/core/Button"));

var _lodash = _interopRequireDefault(require("lodash"));

var _AlertContext = require("../../context/AlertContext");

var _UserContext = require("../../context/UserContext");

var _RoomsContext = require("../../context/RoomsContext");

var _SocketContext = require("../../context/SocketContext");

var _Board = _interopRequireDefault(require("../../components/Board"));

var _ModalResume = _interopRequireDefault(require("../../components/ModalResume"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var Room = function Room(props) {
  var match = props.match;
  var uuidRoom = match.params.uuidRoom;

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      song = _useState2[0],
      setSong = _useState2[1];

  var history = (0, _reactRouterDom.useHistory)();

  var _useContext = (0, _react.useContext)(_UserContext.Context),
      player = _useContext.state.player;

  var _useContext2 = (0, _react.useContext)(_RoomsContext.Context),
      rooms = _useContext2.state.rooms;

  var _useContext3 = (0, _react.useContext)(_SocketContext.SocketContext),
      sendSocket = _useContext3.sendSocket;

  var _useContext4 = (0, _react.useContext)(_AlertContext.Context),
      sendAlert = _useContext4.sendAlert;

  var handleSetStartGame = function handleSetStartGame() {
    sendSocket('server/start-game', {
      uuidRoom: uuidRoom
    });
  };

  (0, _react.useEffect)(function () {
    if (!player || !rooms || !rooms[uuidRoom]) {
      history.replace('/');
    }
  }, [player]);
  (0, _react.useEffect)(function () {
    sendAlert("Bienvenu sur la partie #".concat(uuidRoom), 'info');
    setTimeout(function () {
      sendAlert();
    }, 5000);
  }, []);

  if (player && rooms && rooms[uuidRoom]) {
    if (!rooms[uuidRoom].isStart && (player.solo || player.admin)) {
      return /*#__PURE__*/_react.default.createElement("div", {
        className: "d-flex jcnt--center aitems--center fdir--row pt-3"
      }, /*#__PURE__*/_react.default.createElement(_Button.default, {
        className: "aself--center",
        variant: "contained",
        onClick: handleSetStartGame,
        "data-testid": "gameElmt"
      }, "Commencer la partie !"));
    } else if (!rooms[uuidRoom].isStart && !player.admin) {
      return /*#__PURE__*/_react.default.createElement("p", null, "Veuillez attendre que le maitre du jeux commence la partie");
    } else if (!rooms[uuidRoom].isPlaying) {
      return /*#__PURE__*/_react.default.createElement(_ModalResume.default, {
        isPlaying: !rooms[uuidRoom].isPlaying,
        setSong: setSong,
        song: song,
        player: player,
        uuidRoom: uuidRoom
      });
    } else {
      return /*#__PURE__*/_react.default.createElement("div", {
        className: "overflow-h"
      }, /*#__PURE__*/_react.default.createElement(_Board.default, {
        "data-testid": "gameElmt",
        song: song,
        currentRoom: rooms[uuidRoom],
        isEnd: rooms[uuidRoom].players[player.uuid].end,
        mapGame: rooms[uuidRoom].players[player.uuid].currentMapGame,
        isAlone: Object.keys(rooms[uuidRoom].players).length === 1,
        mapsGamePreview: _lodash.default.filter(rooms[uuidRoom].players, function (item) {
          return item.uuid !== player.uuid && !item.visitor;
        }),
        score: rooms[uuidRoom].players[player.uuid].score,
        sheet: rooms[uuidRoom].players[player.uuid].sheets[0],
        finalScore: rooms[uuidRoom].finalScore,
        uuidRoom: uuidRoom
      }));
    }
  } else {
    return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("p", null, "....."));
  }
};

var _default = (0, _reactRouter.withRouter)(Room);

exports.default = _default;