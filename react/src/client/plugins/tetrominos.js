import { colors } from "@material-ui/core";

const TETROMINOS_CHAR = "IOTLJZS";
export const TETROMINOS = {
  0: { shape: [[0]], color: '222, 242, 254'},
  I: {
    shape: [
      [0,  'I',  0,  0],
      [0,  'I',  0,  0],
      [0,  'I',  0,  0],
      [0,  'I',  0,  0],
    ],
    color: '0,184,222'
  },
  O: {
    shape: [
      ['O', 'O'],
      ['O', 'O'],
    ],
    color: '255,201,24'
  },
  T: {
    shape: [
      ['T',  'T',  'T'],
      [0,    'T',    0],
      [0,    'T',    0],
    ],
    color: '81,1,255'
  },
  L: {
    shape: [
      ['L',   'L',  'L'],
      ['L',   0,      0],
      [0,     0,      0],
    ],
    color: '249,142,2'
  },
  J: {
    shape: [
      ['J',   'J',  'J'],
      [0,     0,    'J'],
      [0,     0,      0],
    ],
    color: '#4,7,249'
  },
  Z: {
    shape: [
      ['Z',  'Z',    0],
      [0,    'Z',  'Z'],
      [0,     0,     0],
    ],
    color: '250,7,5'
  },
  S: {
    shape: [
      [0,   'S',  'S'],
      ['S', 'S',  0],
      [0,    0,   0],
    ],
    color: '37,249,143'
  }
}


export const getTetrominos = () => {
  // console.log(TETROMINOS);
  // console.log(TETROMINOS_CHAR.charAt(Math.floor(Math.random() * TETROMINOS_CHAR.length)));
  return 'L'
}

// export default {TETROMINOS, getTetrominos};