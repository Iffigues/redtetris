"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styles = require("@material-ui/core/styles");

var _Button = _interopRequireDefault(require("@material-ui/core/Button"));

var _Modal = _interopRequireDefault(require("@material-ui/core/Modal"));

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Libs
var useStyles = (0, _styles.makeStyles)(function (theme) {
  return {
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3)
    }
  };
});

var ModalResume = function ModalResume(_ref) {
  var setSong = _ref.setSong,
      isPlaying = _ref.isPlaying,
      song = _ref.song,
      player = _ref.player,
      uuidRoom = _ref.uuidRoom;
  var classes = useStyles();

  var handleCloseModal = function handleCloseModal() {
    console.log("HandleCloseModal");
  };

  var leaveRoom = function leaveRoom(e) {
    e.preventDefault();
    sendSocket('server/leave-room', {
      uuidRoom: uuidRoom,
      uuidUser: player.uuid
    });
  };

  var resume = function resume() {
    sendSocket('server/pause-resume', {
      channel: uuidRoom
    });
  };

  var changeSongPref = function changeSongPref(e) {
    e.preventDefault();
    setSong(!song);
  };

  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_Modal.default, {
    className: "d-flex jcnt--center aitems--center fdir--row pt-3",
    open: isPlaying,
    disablePortal: true,
    disableEnforceFocus: true,
    disableAutoFocus: true,
    onClose: handleCloseModal,
    "aria-labelledby": "simple-modal-title",
    "aria-describedby": "simple-modal-description"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: classes.paper
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "aself--center"
  }, /*#__PURE__*/_react.default.createElement("h1", {
    className: "aself--center",
    id: "transition-modal-title"
  }, "Pause")), /*#__PURE__*/_react.default.createElement("div", {
    className: "d-flex jcnt--space-ar fdir--row"
  }, /*#__PURE__*/_react.default.createElement(_Button.default, {
    id: "songRoom",
    "data-testid": "btnSong",
    onClick: function onClick(e) {
      return changeSongPref(e);
    }
  }, song ? "🔈" : "🔇")), /*#__PURE__*/_react.default.createElement("div", {
    className: "d-flex jcnt--space-ar fdir--row"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "aself--fstart p-2"
  }, /*#__PURE__*/_react.default.createElement(_Button.default, {
    id: "leaveRoom",
    variant: "contained",
    color: "secondary",
    "data-testid": "btnCreateRoom",
    onClick: function onClick(e) {
      return leaveRoom(e);
    }
  }, "Quitter la partie ?")), /*#__PURE__*/_react.default.createElement("div", {
    className: "aself--fstart p-2"
  }, /*#__PURE__*/_react.default.createElement(_Button.default, {
    id: "resume",
    variant: "contained",
    color: "primary",
    "data-testid": "btnCreateRoom",
    onClick: resume
  }, "Reprendre"))))));
};

var _default = ModalResume;
exports.default = _default;