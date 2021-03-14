"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _Game = _interopRequireDefault(require("./Game"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var OtherPlayerGrid = function OtherPlayerGrid(_ref) {
  var isAlone = _ref.isAlone,
      mapGamePreview = _ref.mapGamePreview;
  return !isAlone ? /*#__PURE__*/_react.default.createElement(_Game.default, {
    mapGame: mapGamePreview.currentMapGame,
    isOtherUser: true
  }) : '';
};

var _default = OtherPlayerGrid;
exports.default = _default;