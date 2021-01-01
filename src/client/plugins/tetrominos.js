import { colors } from "@material-ui/core";

const TETROMINOS_CHAR = "IOTLJZS";
export const TETROMINOS = {
  0: { shape: [[0]], color: '222, 242, 254'},
  1: {
    shape: [
      [1],
      [1],
      [1],
      [1],
    ],
    color: '0,184,222'
  },
  2: {
    shape: [
      [2, 2],
      [2, 2],
    ],
    color: '255,201,24'
  },
  3: {
    shape: [
      [3,  3,  3],
      [0,    3,    0],
      [0,    3,    0],
    ],
    color: '81,1,255'
  },
  4: {
    shape: [
      [4,   4,  4],
      [0,     0,    4]
    ],
    color: '4,7,249'
  },
  5: {
    shape: [
      [5,   5,  5],
      [5,   0,      0]
    ],
    color: '249,142,2'
  },
  6: {
    shape: [
      [0,   6,  6],
      [6, 6,  0]
    ],
    color: '37,249,143'
  },
  7: {
    shape: [
      [7,  7,    0],
      [0,    7,  7]
    ],
    color: '250,7,5'
  }
}


export const getTetrominos = () => {
  return 'L'
}

// export default {TETROMINOS, getTetrominos};