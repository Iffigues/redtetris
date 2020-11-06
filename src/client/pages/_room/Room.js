import React from 'react';
import {withRouter} from 'react-router';

const Room = (props) => {
    const { match } = props
    console.log("match:,", match.params.uuidRoom);
    return (
      <p>
        Hello world
      </p>
    )
   // match.params.id
}

export default withRouter(Room)
