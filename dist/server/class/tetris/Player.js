"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _uuid = _interopRequireDefault(require("uuid"));

var _lodash = _interopRequireDefault(require("lodash"));

var _Game2 = _interopRequireDefault(require("./Game"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var GAME_WIDTH = 10;
var GAME_HEIGHT = 20;

var Player = /*#__PURE__*/function (_Game) {
  _inherits(Player, _Game);

  var _super = _createSuper(Player);

  function Player(name, updateRoomFunction) {
    var _this;

    var admin = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    _classCallCheck(this, Player);

    _this = _super.call(this, updateRoomFunction);

    _this.initGame = function () {
      _this.currentMapGame = _lodash.default.cloneDeep(Array.from(Array(GAME_HEIGHT), function () {
        return new Array(GAME_WIDTH).fill(0);
      }));
      _this.nextMapGame = _lodash.default.cloneDeep(_this.currentMapGame);
      _this.block = null;
      _this.sheets = _lodash.default.cloneDeep([]);
      _this.score = 0;
      _this.end = false;
      _this.isPlaying = false;
      _this.requestNewGame = false;
      _this.visitor = false;
      _this.timing = 1000;
      _this.indestructible = 0;
    };

    _this.setVisitor = function (value) {
      _this.visitor = value;
    };

    _this.setRequestNewGame = function (value) {
      _this.requestNewGame = value;
    };

    _this.addSheetFunc = function (func) {
      _this.addSheet = func;
    };

    _this.pushSheet = function () {
      _this.addSheet();
    };

    _this.destroyLine = function (i) {
      while (i > 1) {
        _this.nextMapGame[19 - _this.indestructible].fill(-1);

        _this.indestructible = _this.indestructible + 1;
        i = i - 1;
      }
    };

    _this.startGame = function () {
      _this.isPlaying = true;

      _this.createIntervalGame();
    };

    _this.changePlaying = function (isPlaying) {
      _this.isPlaying = isPlaying;
    };

    _this.uuid = (0, _uuid.default)();
    _this.name = name;
    _this.admin = admin;
    _this.time = 1000;
    _this.currentMapGame = null;
    _this.nextMapGame = null;
    _this.block = null;
    _this.sheets = null;
    _this.score = null;
    _this.end = null;
    _this.requestNewGame = null;
    _this.visitor = false;

    _this.initGame();

    return _this;
  }

  _createClass(Player, [{
    key: "addDestroyFunc",
    value: function addDestroyFunc(func) {
      this.destroyFunc = func;
    }
  }]);

  return Player;
}(_Game2.default);

var _default = Player;
exports.default = _default;