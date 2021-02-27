"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledCell = _interopRequireDefault(require("./style/styledCell"));

var _tetrominos = require("../plugins/tetrominos");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Cell = function Cell(_ref) {
  var type = _ref.type,
      isOtherUser = _ref.isOtherUser;
  return /*#__PURE__*/_react.default.createElement(_styledCell.default, {
    type: type,
    color: !isOtherUser || type === 0 ? _tetrominos.TETROMINOS[type].color : '40,40,40'
  });
};

var _default = Cell;
exports.default = _default;