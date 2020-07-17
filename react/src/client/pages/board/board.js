import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {withRouter} from 'react-router';

const Board = () => {
  return (
    <div>
      <Container style={{ backgroundColor: '#cfe8fc', height: '70vh'}}>
        <h1>Partie !</h1>
      </Container>
    </div>
  );
}
export default withRouter(Board)
