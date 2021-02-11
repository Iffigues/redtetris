import React from 'react';
import StyledCell from './style/styledCell'
import { TETROMINOS } from '../plugins/tetrominos'

const Cell = ({type, isOtherUser}) => {
  if (type == 5) {
    console.log("55555555555")
  }
  return (
    <div>
      <StyledCell type={type} color={(!isOtherUser || type === 0) ? TETROMINOS[type].color : '40,40,40'}></StyledCell>
    </div>
  );
}
export default Cell
