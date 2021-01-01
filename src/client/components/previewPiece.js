import React from 'react';
import { TETROMINOS } from '../plugins/tetrominos';
import Game from './game';

const PreviewPiece = ({sheet}) => {
  return (
    <div>
      Preview...
      <Game game={{game: TETROMINOS[sheet.type].shape}} />
    </div>
  )
}

export default PreviewPiece
