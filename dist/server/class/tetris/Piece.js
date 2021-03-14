"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Piece = function Piece() {
  var _this = this;

  _classCallCheck(this, Piece);

  this.canPose = function (block, xp, yp) {
    var xx = block.x + xp;
    var yy = block.y + yp;

    if (xx < 0 || yy < 0 || xx > 9 || yy >= 20 - _this.indestructible) {
      return false;
    }

    for (var i = 0; i < 4; i++) {
      var abx = block.block[i].x + xx;
      var aby = block.block[i].y + yy;

      if (abx < 0 || abx > 9 || aby >= 20 - _this.indestructible || aby < 0) {
        return false;
      }

      if (_this.nextMapGame[aby][abx] !== 0) {
        return false;
      }
    }

    return true;
  };

  this.copyBlock = function (block) {
    return {
      block: _lodash.default.cloneDeep(block.block),
      y: block.y,
      x: block.x,
      rotate: block.rotate,
      field: block.field
    };
  };

  this.retro = function (block, blk) {
    block.x = blk.x;
    block.y = blk.y;
    block.rotate = blk.rotate;
    block.field = blk.field;
    block.block = blk.block;
  };

  this.willBePosed = function (blk) {
    for (var i = 0; i < 3; i++) {
      for (var n = 0; n < 3; n++) {
        if (_this.canPose(blk, n, i)) {
          blk.x += n;
          blk.y += i;
          return true;
        }

        if (_this.canPose(blk, -n, i)) {
          blk.x += -n;
          blk.y += i;
          return true;
        }

        if (_this.canPose(blk, n, -i)) {
          blk.x += n;
          blk.y += -i;
          return true;
        }

        if (_this.canPose(blk, -n, -i)) {
          blk.x += -n;
          blk.y += -i;
          return true;
        }
      }
    }

    return false;
  };

  this.rotate = function (block, direction) {
    if (!Number.isInteger(direction) || direction > 1 || direction < 0) return false;
    var srs = direction === 0 ? _this.srs : _this.lrs;

    var blk = _this.copyBlock(block);

    for (var i = 0; i < 4; i++) {
      var xs = srs[0][0] * block.block[i].x + srs[0][1] * block.block[i].y;
      var ys = srs[1][0] * block.block[i].x + srs[1][1] * block.block[i].y;
      block.block[i].x = xs;
      block.block[i].y = ys;
    }

    if (!_this.willBePosed(block)) {
      block = _this.retro(block, blk);
      return false;
    }

    return true;
  };

  this.fallen = function () {
    if (_this.canFall()) {
      _this.y++;
    }
  };

  this.shadow = {
    x: this.x,
    y: this.y
  };
  this.interval = 1000;
  this.srs = [[0, 1], [-1, 0]];
  this.lrs = [[0, -1], [1, 0]];
};

var _default = Piece;
exports.default = _default;