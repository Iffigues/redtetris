"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactRouterDom = require("react-router-dom");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ErrorPage = function ErrorPage() {
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "d-flex jcnt--center aitems--center fdir--column pt-3 error--404-container"
  }, /*#__PURE__*/_react.default.createElement("h1", {
    className: "aself--center"
  }, "404, Page introuvable \uD83D\uDE2D"), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
    className: "aself--center",
    to: "/"
  }, "Revenir \xE0 la page d'accueil"));
};

var _default = ErrorPage;
exports.default = _default;