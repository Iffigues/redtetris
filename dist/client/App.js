"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _reactHotLoader = require("react-hot-loader");

var _react = _interopRequireDefault(require("react"));

var _index = _interopRequireDefault(require("./router/index"));

var _SocketContext = require("./context/SocketContext");

var _AlertContext = require("./context/AlertContext");

var _UserContext = require("./context/UserContext");

var _RoomsContext = require("./context/RoomsContext");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('./styles/main.scss');

var App = function App() {
  return /*#__PURE__*/_react.default.createElement(_AlertContext.Provider, null, /*#__PURE__*/_react.default.createElement(_UserContext.Provider, null, /*#__PURE__*/_react.default.createElement(_RoomsContext.Provider, null, /*#__PURE__*/_react.default.createElement(_SocketContext.SocketContextProvider, null, /*#__PURE__*/_react.default.createElement(_index.default, null)))));
};

var _default = App;
exports.default = _default;