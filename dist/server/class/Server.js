"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _debug = _interopRequireDefault(require("debug"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _cors = _interopRequireDefault(require("cors"));

var _express = _interopRequireDefault(require("express"));

var _SocketsManager = _interopRequireDefault(require("./sockets/SocketsManager"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var logerror = (0, _debug.default)('tetris:error'),
    loginfo = (0, _debug.default)('tetris:info');

require('dotenv').config();

var Server = function Server() {
  var _this = this;

  var isTesting = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

  _classCallCheck(this, Server);

  this.setServer = function (value) {
    _this.server = value;
  };

  this.setSocketManager = function (socketsManager) {
    _this.app.io = socketsManager.io;
    _this.app.socketsManager = socketsManager;
  };

  this.app = (0, _express.default)();
  this.app.use((0, _cors.default)());
  this.app.use(_bodyParser.default.json({
    limit: '10mb',
    extended: true
  }));

  if (!isTesting) {
    this.server = this.app.listen(process.env.port || process.env.PORT_DEV_SERVER, function () {
      loginfo("tetris listen on ".concat(process.env.port || process.env.PORT_DEV_SERVER));
    });
    var socketsManager = new _SocketsManager.default(this.server);
    this.app.io = socketsManager.io;
    this.app.socketsManager = socketsManager;
  } else {
    this.server = null;
  }

  this.rooms = {};
};

var _default = Server;
exports.default = _default;