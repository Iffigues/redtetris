"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _tetrominos = require("../plugins/tetrominos");

var _cell = _interopRequireDefault(require("./cell"));

var _styledPreview = _interopRequireDefault(require("./style/styledPreview"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PreviewPiece = function PreviewPiece(_ref) {
  var sheet = _ref.sheet;
  var game = {
    game: _tetrominos.TETROMINOS[sheet.type].shape
  };
  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_styledPreview.default, {
    isOtherUser: game.isOtherUser,
    width: game.game[0].length,
    height: game.game.length
  }, game.game.map(function (row) {
    return row.map(function (cell, x) {
      return /*#__PURE__*/_react.default.createElement(_cell.default, {
        key: x,
        type: cell,
        isOtherUser: game.isOtherUser
      });
    });
  })));
};

var _default = PreviewPiece;
exports.default = _default;