"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _Piece2 = _interopRequireDefault(require("./Piece"));

var _regeneratorRuntime = _interopRequireDefault(require("regenerator-runtime"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var Game = /*#__PURE__*/function (_Piece) {
  _inherits(Game, _Piece);

  var _super = _createSuper(Game);

  function Game(updateRoomFunction) {
    var _this;

    _classCallCheck(this, Game);

    _this = _super.call(this);

    _this.initActionObject = function () {
      return {
        'ArrowUp': function ArrowUp() {
          return _this.rotateR();
        },
        'ArrowDown': function ArrowDown() {
          return _this.down();
        },
        'ArrowLeft': function ArrowLeft() {
          return _this.left();
        },
        'ArrowRight': function ArrowRight() {
          return _this.rigth();
        },
        ' ': function _() {
          return _this.space();
        }
      };
    };

    _this.blockCPY = function (block) {
      return {
        block: _lodash.default.cloneDeep(block.block),
        y: block.y,
        x: block.x,
        type: 8,
        rotate: block.rotate,
        field: block.field
      };
    };

    _this.makeShadow = function (block) {
      var r = _this.blockCPY(block);

      if (!_this.canPose(r, 0, 1)) {
        _this.shadow = null;
      } else {
        while (_this.canPose(r, 0, 1)) {
          r.y = r.y + 1;
        }

        _this.shadow = r;
      }
    };

    _this.createIntervalGame = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.default.mark(function _callee() {
      var timer;
      return _regeneratorRuntime.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              timer = setTimeout(function () {
                if (_this.isPlaying) {
                  if (!_this.block) {
                    _this.addSheet();

                    _this.block = _lodash.default.cloneDeep(_this.sheets.shift());

                    _this.addSheet();

                    if (!_this.canPose(_this.block, 0, 0)) {
                      _this.end = true;
                      clearTimeout(timer);
                      _this.block = null;

                      _this.updateRoomFunction();

                      return;
                    }
                  }

                  _this.sendMap();

                  if (_this.cantPose) {
                    _this.cantPose = false;

                    if (!_this.canPose(_this.block, 0, 1)) {
                      _this.draw(_this.block, _this.block.type);

                      _this.block = null;

                      _this.destroyFunc(_this.uuid, _this.verifLine());
                    }
                  }

                  if (_this.block) {
                    if (!_this.canPose(_this.block, 0, 1)) {
                      _this.cantPose = true;
                    } else {
                      _this.draw(_this.block, 0);

                      _this.block.y += 1;
                    }
                  }
                }

                setTimeout(_this.createIntervalGame, 0);
              }, _this.timing);

            case 1:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    _this.sendMap = function () {
      _this.makeShadow(_this.block);

      if (_this.shadow) _this.draw(_this.shadow, 8);

      _this.draw(_this.block, _this.block.type);

      _this.currentMapGame = _lodash.default.cloneDeep(_this.nextMapGame);
      if (_this.updateRoomFunction) _this.updateRoomFunction();
      if (_this.shadow) _this.draw(_this.shadow, 0);

      _this.draw(_this.block, 0);
    };

    _this.setMoose = function (yy, xx) {
      if (yy !== 0 && _this.canPose(_this.block, xx, yy)) {
        _this.block.y += yy;
      }

      if (xx !== 0 && _this.canPose(_this.block, xx, yy)) {
        _this.block.x += xx;
      }

      _this.sendMap();
    };

    _this.move = function (event) {
      if (_this.block && event && Object.keys(_this.action).includes(event)) {
        _this.action[event]();
      }
    };

    _this.left = function () {
      _this.setMoose(0, -1);
    };

    _this.rigth = function () {
      _this.setMoose(0, 1);
    };

    _this.down = function () {
      _this.setMoose(1, 0);
    };

    _this.rotateL = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.default.mark(function _callee2() {
      return _regeneratorRuntime.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (_this.block.rotate) {
                _this.rotate(_this.block, 0);

                _this.sendMap();
              }

            case 1:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));
    _this.rotateR = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.default.mark(function _callee3() {
      return _regeneratorRuntime.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              if (_this.block.rotate) {
                _this.rotate(_this.block, 1);

                _this.sendMap();
              }

            case 1:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));
    _this.space = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.default.mark(function _callee4() {
      return _regeneratorRuntime.default.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _this.lock = false;

              while (_this.canPose(_this.block, 0, 1)) {
                _this.block.y += 1;
              }

              _this.sendMap();

              _this.draw(_this.block, _this.block.type);

              _this.addSheet();

              _this.block = null;

              _this.destroyFunc(_this.uuid, _this.verifLine());

              _this.lock = true;

            case 8:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));

    _this.draw = function (blk, z) {
      for (var y = 0; y < 4; y = y + 1) {
        _this.nextMapGame[blk.y + blk.block[y].y][blk.x + blk.block[y].x] = z;
      }
    };

    _this.wash = function (e) {
      _this.nextMapGame.splice(e, 1);

      _this.nextMapGame.unshift([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    };

    _this.verifLine = function () {
      var arr = 0;

      for (var i = 19 - _this.indestructible; i >= 0; i--) {
        var u = 1;

        for (var y = 0; y < 10; y++) {
          if (_this.nextMapGame[i][y] === 0) {
            u = 0;
            break;
          }
        }

        if (u === 1) {
          arr = arr + 1;
          _this.score = Math.ceil((_this.score + 1000) * 1.1);
          if (_this.timing > 100) _this.timing = _this.timing - 30;

          _this.wash(i);

          arr = arr + _this.verifLine();
        }
      }

      return arr;
    };

    _this.updateRoomFunction = updateRoomFunction;
    _this.block = null;
    _this.shadow = null;
    _this.action = null;
    _this.lock = true;
    _this.cantPose = false;
    _this.timing = 1000;
    _this.action = _this.initActionObject();
    return _this;
  }

  return Game;
}(_Piece2.default);

var _default = Game;
exports.default = _default;