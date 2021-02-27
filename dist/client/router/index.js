"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRouterDom = require("react-router-dom");

var _Alerts = _interopRequireDefault(require("../components/Alerts"));

var _Home = _interopRequireDefault(require("../pages/home/Home"));

var _Room = _interopRequireDefault(require("../pages/_room/Room"));

var _ErrorPage = _interopRequireDefault(require("../pages/notfound/ErrorPage"));

var _SocketListener = _interopRequireDefault(require("../listeners/SocketListener"));

var _SocketContext = require("../context/SocketContext");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// components
// pages
var _default = function _default() {
  var _useContext = (0, _react.useContext)(_SocketContext.SocketContext),
      socketClient = _useContext.socketClient;

  (0, _SocketListener.default)(socketClient);
  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_reactRouterDom.HashRouter, {
    hashType: "noslash"
  }, /*#__PURE__*/_react.default.createElement(_Alerts.default, null), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Switch, null, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
    exact: true,
    path: "/",
    component: _Home.default
  }), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
    exact: true,
    path: "/:uuidRoom[:login]",
    render: function render(props) {
      return /*#__PURE__*/_react.default.createElement(_Room.default, props);
    }
  }), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
    component: _ErrorPage.default
  }))));
};

exports.default = _default;