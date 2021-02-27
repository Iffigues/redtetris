"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _templateObject;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var StyledPreview = _styledComponents.default.div(_templateObject || (_templateObject = _taggedTemplateLiteral(["\nmargin: auto;\ndisplay: grid;\ngrid-template-rows: repeat(\n  ", ",\n  calc(8vw / ", ")\n);\ngrid-template-columns: repeat(", ", 1fr);\ngrid-gap: 1px;\nwidth: 100%;\nmax-width: 8vw;\nbackground: #fffff;\n"])), function (props) {
  return props.height;
}, function (props) {
  return props.width;
}, function (props) {
  return props.width;
});

var _default = StyledPreview;
exports.default = _default;