"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createPreview = exports.createGame = exports.PREVIEW_HEIGHT = exports.PREVIEW_WIDTH = exports.GAME_HEIGHT = exports.GAME_WIDTH = void 0;
var GAME_WIDTH = 10;
exports.GAME_WIDTH = GAME_WIDTH;
var GAME_HEIGHT = 20;
exports.GAME_HEIGHT = GAME_HEIGHT;
var PREVIEW_WIDTH = 10;
exports.PREVIEW_WIDTH = PREVIEW_WIDTH;
var PREVIEW_HEIGHT = 20;
exports.PREVIEW_HEIGHT = PREVIEW_HEIGHT;

var createGame = function createGame(isOtherUser) {
  return {
    game: Array.from(Array(GAME_HEIGHT), function () {
      return new Array(GAME_WIDTH).fill([0, 'clear']);
    }),
    isOtherUser: isOtherUser
  };
};

exports.createGame = createGame;

var createPreview = function createPreview() {
  return {
    preview: Array.from(Array(PREVIEW_WIDTH), function () {
      return new Array(PREVIEW_HEIGHT).fill([0, 'clear']);
    }),
    isOtherUser: isOtherUser
  };
};

exports.createPreview = createPreview;