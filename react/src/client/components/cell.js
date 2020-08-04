import React from 'react';
import StyledCell from 'components/style/styledCell'
import { TETROMINOS } from 'plugins/tetrominos'

const Cell = ({type}) => {
  return (
    <div>
      <StyledCell type={type} color={TETROMINOS[type].color}></StyledCell>
    </div>
  );
}
export default Cell
