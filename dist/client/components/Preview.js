"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _Card = _interopRequireDefault(require("@material-ui/core/Card"));

var _PreviewPiece = _interopRequireDefault(require("./PreviewPiece"));

var _OtherPlayerGrid = _interopRequireDefault(require("./OtherPlayerGrid"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var boxProps = {
  bgcolor: 'background.paper',
  bordercolor: 'text.primary',
  border: 1,
  borderradius: "borderRadius",
  style: {
    backgroundColor: 'white',
    width: '100vw'
  }
};

var Preview = function Preview(_ref) {
  var mapsGamePreview = _ref.mapsGamePreview,
      isAlone = _ref.isAlone,
      isVisitor = _ref.isVisitor,
      score = _ref.score,
      sheet = _ref.sheet;
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
    className: "d-flex jcnt--start fdir--column"
  }, !isVisitor && sheet && /*#__PURE__*/_react.default.createElement("div", {
    className: "aself--fstart width-100 test--container-not-visitor"
  }, /*#__PURE__*/_react.default.createElement(_Card.default, _extends({
    className: "pt-3"
  }, boxProps, {
    style: {
      width: '30vw'
    },
    variant: "outlined"
  }), /*#__PURE__*/_react.default.createElement("p", {
    className: "pl-2"
  }, "Prochaine piece:"), /*#__PURE__*/_react.default.createElement(_PreviewPiece.default, {
    sheet: sheet
  }))), /*#__PURE__*/_react.default.createElement("div", {
    className: "aself--fstart"
  }, /*#__PURE__*/_react.default.createElement(_Card.default, _extends({}, boxProps, {
    style: {
      width: '30vw',
      height: '5vh'
    },
    variant: "outlined"
  }), /*#__PURE__*/_react.default.createElement("p", {
    className: "pl-3"
  }, "Score: ", /*#__PURE__*/_react.default.createElement("span", {
    className: "bold"
  }, score))))), /*#__PURE__*/_react.default.createElement("div", {
    className: "container-grid"
  }, mapsGamePreview.map(function (game) {
    return /*#__PURE__*/_react.default.createElement("div", {
      key: game,
      className: "p-2"
    }, /*#__PURE__*/_react.default.createElement(_OtherPlayerGrid.default, {
      isAlone: isAlone,
      mapGamePreview: game
    }));
  })));
};

var _default = Preview;
exports.default = _default;