export const TETROMINOS = {
  "-1": { shape: [[-1]], color: '255,255,255' },
  0: { shape: [[0]], color: '222, 242, 254'},
  1: {
    shape: [
      ['-1', '-1', '-1', '-1', '-1'],
      ['-1', '-1', 1, '-1', '-1'],
      ['-1', '-1', 1, '-1', '-1'],
      ['-1', '-1', 1, '-1', '-1'],
      ['-1', '-1', 1, '-1', '-1'],
      ['-1', '-1', '-1', '-1', '-1']
    ],
    color: '0,184,222'
  },
  2: {
    shape: [
      ['-1', '-1', '-1', '-1', '-1'],
      ['-1', '-1', '-1', '-1', '-1'],
      ['-1', 2, 2, '-1', '-1'],
      ['-1', 2, 2, '-1', '-1'],
      ['-1', '-1', '-1', '-1', '-1'],
      ['-1', '-1', '-1', '-1', '-1'],
    ],
    color: '255,201,24'
  },
  3: {
    shape: [
      ['-1', '-1', '-1', '-1', '-1'],
      ['-1', '-1', '-1', '-1', '-1'],
      ['-1', 3, 3, 3, '-1'],
      ['-1', '-1', 3, '-1', '-1'],
      ['-1', '-1', '-1', '-1', '-1'],
      ['-1', '-1', '-1', '-1', '-1'],
    ],
    color: '81,1,255'
  },
  4: {
    shape: [
      ['-1', '-1', '-1', '-1', '-1'],
      ['-1', '-1', '-1', '-1', '-1'],
      ['-1', 4, 4, 4, '-1'],
      ['-1', '-1', '-1', 4, '-1'],
      ['-1', '-1', '-1', '-1', '-1'],
      ['-1', '-1', '-1', '-1', '-1'],
    ],
    color: '4,7,249'
  },
  5: {
    shape: [
      ['-1', '-1', '-1', '-1', '-1'],
      ['-1', '-1', '-1', '-1', '-1'],
      ['-1', 5, 5, 5, '-1'],
      ['-1', 5, '-1', '-1', '-1'],
      ['-1', '-1', '-1', '-1', '-1'],
      ['-1', '-1', '-1', '-1', '-1'],
    ],
    color: '249,142,2'
  },
  6: {
    shape: [
      ['-1', '-1', '-1', '-1', '-1'],
      ['-1', '-1', '-1', '-1', '-1'],
      ['-1', '-1', 6, 6, '-1'],
      ['-1', 6, 6, '-1', '-1'],
      ['-1', '-1', '-1', '-1', '-1'],
      ['-1', '-1', '-1', '-1', '-1'],
    ],
    color: '37,249,143'
  },
  7: {
    shape: [
      ['-1', '-1', '-1', '-1', '-1'],
      ['-1', '-1', '-1', '-1', '-1'],
      ['-1', 7, 7, '-1', '-1'],
      ['-1', '-1', 7, 7, '-1'],
      ['-1', '-1', '-1', '-1', '-1'],
      ['-1', '-1', '-1', '-1', '-1'],
    ],
    color: '250,7,5'
  }
}