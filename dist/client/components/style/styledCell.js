"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _templateObject;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var styledCell = _styledComponents.default.div(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  height: 100%;\n  background: rgba(", ", 1);\n  border-bottom-color: rgba(", ", 1);\n  border-right-color: rgba(", ", 1);\n  border-left-color: rgba(", ", 1);\n  border-top-color: rgba(", ", 1);\n  "])), function (props) {
  return props.color;
}, function (props) {
  return props.color;
}, function (props) {
  return props.color;
}, function (props) {
  return props.color;
}, function (props) {
  return props.color;
});

var _default = styledCell;
exports.default = _default;