"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var mounter = function mounter() {
  _classCallCheck(this, mounter);

  this.newCase = function (x, y, pivot) {
    return !Number.isInteger(x) || !Number.isInteger(y) || typeof pivot !== "boolean" ? false : {
      x: x,
      y: y,
      pivot: pivot
    };
  };
};

var I = /*#__PURE__*/function (_mounter) {
  _inherits(I, _mounter);

  var _super = _createSuper(I);

  function I() {
    var _this;

    _classCallCheck(this, I);

    _this = _super.call(this);
    _this.state = false;
    _this.x = 5;
    _this.y = 0;
    _this.type = 1;
    _this.rotate = true;
    _this.field = 1;
    _this.block = [_this.newCase(-2, 0, false), _this.newCase(-1, 0, false), _this.newCase(0, 0, true), _this.newCase(1, 0, false)];
    return _this;
  }

  return I;
}(mounter);

var O = /*#__PURE__*/function (_mounter2) {
  _inherits(O, _mounter2);

  var _super2 = _createSuper(O);

  function O() {
    var _this2;

    _classCallCheck(this, O);

    _this2 = _super2.call(this);
    _this2.state = false;
    _this2.x = 5;
    _this2.y = 0;
    _this2.type = 2;
    _this2.rotate = false;
    _this2.field = 1;
    _this2.block = [_this2.newCase(-1, 0, false), _this2.newCase(-1, 1, false), _this2.newCase(0, 0, true), _this2.newCase(0, 1, false)];
    return _this2;
  }

  return O;
}(mounter);

var T = /*#__PURE__*/function (_mounter3) {
  _inherits(T, _mounter3);

  var _super3 = _createSuper(T);

  function T() {
    var _this3;

    _classCallCheck(this, T);

    _this3 = _super3.call(this);
    _this3.state = false;
    _this3.x = 5;
    _this3.y = 0;
    _this3.type = 3;
    _this3.rotate = true;
    _this3.field = 1;
    _this3.block = [_this3.newCase(-1, 0, false), _this3.newCase(0, 1, false), _this3.newCase(0, 0, true), _this3.newCase(1, 0, false)];
    return _this3;
  }

  return T;
}(mounter);

var J = /*#__PURE__*/function (_mounter4) {
  _inherits(J, _mounter4);

  var _super4 = _createSuper(J);

  function J() {
    var _this4;

    _classCallCheck(this, J);

    _this4 = _super4.call(this);
    _this4.state = false;
    _this4.x = 5;
    _this4.y = 0;
    _this4.type = 4;
    _this4.rotate = true;
    _this4.field = 1;
    _this4.block = [_this4.newCase(-1, 1, false), _this4.newCase(-1, 0, false), _this4.newCase(0, 0, true), _this4.newCase(1, 0, false)];
    return _this4;
  }

  return J;
}(mounter);

var L = /*#__PURE__*/function (_mounter5) {
  _inherits(L, _mounter5);

  var _super5 = _createSuper(L);

  function L() {
    var _this5;

    _classCallCheck(this, L);

    _this5 = _super5.call(this);
    _this5.state = false;
    _this5.x = 5;
    _this5.y = 0;
    _this5.type = 5;
    _this5.rotate = true;
    _this5.field = 1;
    _this5.block = [_this5.newCase(-1, 0, false), _this5.newCase(0, 0, true), _this5.newCase(1, 0, false), _this5.newCase(1, 1, false)];
    return _this5;
  }

  return L;
}(mounter);

var S = /*#__PURE__*/function (_mounter6) {
  _inherits(S, _mounter6);

  var _super6 = _createSuper(S);

  function S() {
    var _this6;

    _classCallCheck(this, S);

    _this6 = _super6.call(this);
    _this6.state = false;
    _this6.x = 5;
    _this6.y = 0;
    _this6.type = 6;
    _this6.rotate = true;
    _this6.field = 1;
    _this6.block = [_this6.newCase(-1, 0, false), _this6.newCase(0, 0, true), _this6.newCase(0, 1, false), _this6.newCase(1, 1, false)];
    return _this6;
  }

  return S;
}(mounter);

var Z = /*#__PURE__*/function (_mounter7) {
  _inherits(Z, _mounter7);

  var _super7 = _createSuper(Z);

  function Z() {
    var _this7;

    _classCallCheck(this, Z);

    _this7 = _super7.call(this);
    _this7.state = false;
    _this7.x = 5;
    _this7.y = 0;
    _this7.type = 7;
    _this7.rotate = true;
    _this7.field = 1;
    _this7.block = [_this7.newCase(-1, 1, false), _this7.newCase(0, 1, false), _this7.newCase(0, 0, true), _this7.newCase(1, 0, false)];
    return _this7;
  }

  return Z;
}(mounter);

var Block = function Block() {
  var _this8 = this;

  _classCallCheck(this, Block);

  this.newBlock = function () {
    var index = Math.floor(Math.random() * Math.floor(_this8.blocks.length));
    return new _this8.blocks[index]();
  };

  this.blocks = [I, O, T, S, Z, J, L];
};

var _default = Block;
exports.default = _default;