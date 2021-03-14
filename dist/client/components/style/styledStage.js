"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _templateObject;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var styledStage = _styledComponents.default.div(_templateObject || (_templateObject = _taggedTemplateLiteral(["\nmargin: auto;\ndisplay: grid;\ngrid-template-rows: repeat(\n  ", ",\n  calc(", " / ", ")\n);\ngrid-template-columns: repeat(", ", 1fr);\ngrid-gap: 2px;\nborder: 2px solid rgba(0, 0, 0, 0.2);\nwidth: 100%;\nmax-width: ", ";\nbackground-color: rgba(0, 0, 0, 0.2);\n"])), function (props) {
  return props.height;
}, function (props) {
  return props.isOtherUser ? '15vw' : '25vw';
}, function (props) {
  return props.isOtherUser ? props.width : props.width;
}, function (props) {
  return props.width;
}, function (props) {
  return props.isOtherUser ? '15vw' : '25vw';
});

var _default = styledStage;
exports.default = _default;