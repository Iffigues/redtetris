"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRouterDom = require("react-router-dom");

var _lodash = _interopRequireDefault(require("lodash"));

var _Button = _interopRequireDefault(require("@material-ui/core/Button"));

var _Input = _interopRequireDefault(require("@material-ui/core/Input"));

var _FormControlLabel = _interopRequireDefault(require("@material-ui/core/FormControlLabel"));

var _styles = require("@material-ui/core/styles");

var _Table = _interopRequireDefault(require("@material-ui/core/Table"));

var _TableBody = _interopRequireDefault(require("@material-ui/core/TableBody"));

var _TableCell = _interopRequireDefault(require("@material-ui/core/TableCell"));

var _TableContainer = _interopRequireDefault(require("@material-ui/core/TableContainer"));

var _TableHead = _interopRequireDefault(require("@material-ui/core/TableHead"));

var _TableRow = _interopRequireDefault(require("@material-ui/core/TableRow"));

var _Checkbox = _interopRequireDefault(require("@material-ui/core/Checkbox"));

var _UserContext = require("../../context/UserContext");

var _RoomsContext = require("../../context/RoomsContext");

var _SocketContext = require("../../context/SocketContext");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var FormCreateRoom = function FormCreateRoom(_ref) {
  var login = _ref.login;

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      playSolo = _useState2[0],
      setPlaySolo = _useState2[1];

  var _useContext = (0, _react.useContext)(_SocketContext.SocketContext),
      sendSocket = _useContext.sendSocket;

  var handleChangeCheckBox = function handleChangeCheckBox(event) {
    setPlaySolo(event.target.checked);
  };

  var createRoom = function createRoom(e) {
    e.preventDefault();
    sendSocket('server/create-room', {
      login: login,
      playSolo: playSolo
    });
  };

  return /*#__PURE__*/_react.default.createElement("div", {
    className: "d-flex jcnt--center pt-3"
  }, /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_FormControlLabel.default, {
    control: /*#__PURE__*/_react.default.createElement(_Checkbox.default, {
      checked: playSolo,
      onChange: handleChangeCheckBox,
      color: "primary"
    }),
    label: "Jouer en solo ?"
  })), /*#__PURE__*/_react.default.createElement("div", {
    className: "aself--center"
  }, /*#__PURE__*/_react.default.createElement(_Button.default, {
    className: "aself--center mt-2 test--btn-join-room",
    id: "createRoom",
    variant: "contained",
    color: "primary",
    "data-testid": "btnCreateRoom",
    onClick: function onClick(e) {
      return createRoom(e);
    }
  }, "Cr\xE9e une partie")));
};

var useStyles = (0, _styles.makeStyles)({
  table: {
    minWidth: 650,
    width: 800,
    alignSelf: 'center'
  }
});

var TablePlayers = function TablePlayers(_ref2) {
  var login = _ref2.login;

  var _useContext2 = (0, _react.useContext)(_SocketContext.SocketContext),
      sendSocket = _useContext2.sendSocket;

  var _useContext3 = (0, _react.useContext)(_RoomsContext.Context),
      rooms = _useContext3.state.rooms;

  var classes = useStyles();

  var joinRoom = function joinRoom(e, roomSelected) {
    e.preventDefault();
    sendSocket('server/join-room', {
      channel: roomSelected,
      login: login
    });
  };

  if (!rooms || Object.keys(rooms).length === 0) {
    return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("div", {
      className: "d-flex jcnt--center pt-3"
    }, /*#__PURE__*/_react.default.createElement("p", {
      className: "aself--center"
    }, "Aucune partie n'est disponible pour le moment \uD83D\uDE41", /*#__PURE__*/_react.default.createElement("br", null), /*#__PURE__*/_react.default.createElement("span", {
      className: "bold"
    }, "Mais vous pouvez en cr\xE9ez une des a present !"))), /*#__PURE__*/_react.default.createElement(FormCreateRoom, {
      login: login
    }));
  } else {
    return /*#__PURE__*/_react.default.createElement("div", {
      className: "table-player d-flex jcnt--center fdir--column test--table-rooms"
    }, /*#__PURE__*/_react.default.createElement("h1", {
      className: "aself--center"
    }, "Choisissez de cr\xE9e une partie ou d'en rejoindre une"), /*#__PURE__*/_react.default.createElement("div", {
      className: "aself--center"
    }, /*#__PURE__*/_react.default.createElement("h2", null, "Partie en cours:"), /*#__PURE__*/_react.default.createElement(_TableContainer.default, null, /*#__PURE__*/_react.default.createElement(_Table.default, {
      className: classes.table,
      "aria-label": "simple table"
    }, /*#__PURE__*/_react.default.createElement(_TableHead.default, null, /*#__PURE__*/_react.default.createElement(_TableRow.default, null, /*#__PURE__*/_react.default.createElement(_TableCell.default, null, "Numero de la partie"), /*#__PURE__*/_react.default.createElement(_TableCell.default, null, "Participants"), /*#__PURE__*/_react.default.createElement(_TableCell.default, null, "Etat de la partie"), /*#__PURE__*/_react.default.createElement(_TableCell.default, null, "Solo"), /*#__PURE__*/_react.default.createElement(_TableCell.default, null, "Rejoindre"))), /*#__PURE__*/_react.default.createElement(_TableBody.default, null, Object.keys(rooms).map(function (item, key) {
      return /*#__PURE__*/_react.default.createElement(_TableRow.default, {
        key: key
      }, /*#__PURE__*/_react.default.createElement(_TableCell.default, null, "#", rooms[item].channel), /*#__PURE__*/_react.default.createElement(_TableCell.default, {
        component: "th",
        scope: "row"
      }, _lodash.default.map(rooms[item].players, function (player, index) {
        return "".concat(player.name).concat(index !== Object.keys(rooms[item].players)[Object.keys(rooms[item].players).length - 1] ? ', ' : '');
      })), /*#__PURE__*/_react.default.createElement(_TableCell.default, null, rooms[item].isStart ? "En partie" : "Dans le salons"), /*#__PURE__*/_react.default.createElement(_TableCell.default, null, rooms[item].solo ? "👍" : "👎"), /*#__PURE__*/_react.default.createElement(_TableCell.default, null, /*#__PURE__*/_react.default.createElement(_Button.default, {
        className: "aself--center mt-2 test--btn-join-room",
        id: "joinRoom",
        variant: "contained",
        color: "primary",
        "data-testid": "btnJoinRoom",
        disabled: login.length === 0,
        onClick: function onClick(e) {
          return joinRoom(e, rooms[item].channel);
        }
      }, "Rejoindre")));
    }))))), /*#__PURE__*/_react.default.createElement(FormCreateRoom, {
      login: login
    }));
  }
};

var HomePage = function HomePage() {
  var _useContext4 = (0, _react.useContext)(_UserContext.Context),
      uuidRoom = _useContext4.state.uuidRoom;

  var _useState3 = (0, _react.useState)(''),
      _useState4 = _slicedToArray(_useState3, 2),
      login = _useState4[0],
      setLogin = _useState4[1];

  var _useState5 = (0, _react.useState)(false),
      _useState6 = _slicedToArray(_useState5, 2),
      haveChooseLogin = _useState6[0],
      setHaveChooseLogin = _useState6[1];

  var history = (0, _reactRouterDom.useHistory)();

  var createPlayer = function createPlayer() {
    setHaveChooseLogin(true);
  };

  (0, _react.useEffect)(function () {
    if (uuidRoom) {
      history.push("/".concat(uuidRoom, "[").concat(login, "]"));
    }
  }, [uuidRoom]);
  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("div", {
    className: "inital-form d-flex jcnt--center fdir--column"
  }, /*#__PURE__*/_react.default.createElement("h1", {
    className: "aself--center"
  }, "Bienvenu sur Red-tetris !"), /*#__PURE__*/_react.default.createElement("span", {
    className: "aself--center pt-3"
  }, "Veuillez entrez un login."), /*#__PURE__*/_react.default.createElement(_Input.default, {
    className: "aself--center mb-2 input-size",
    value: login,
    onChange: function onChange(e) {
      return setLogin(e.target.value);
    },
    variant: "outlined",
    required: true,
    name: "login",
    label: "Login",
    type: "Login",
    id: "Login",
    inputProps: {
      'data-testid': 'loginInput'
    },
    autoComplete: "current-login"
  }), /*#__PURE__*/_react.default.createElement(_Button.default, {
    className: "aself--center mt-2 test--btn-create-room",
    variant: "contained",
    color: "primary",
    "data-testid": "btnLogin",
    disabled: login.length === 0,
    onClick: createPlayer
  }, "Valider")), haveChooseLogin && /*#__PURE__*/_react.default.createElement(TablePlayers, {
    login: login
  }));
};

var _default = HomePage;
exports.default = _default;