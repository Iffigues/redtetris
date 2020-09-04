import React from 'react'
// import Button from '@material-ui/core/Button';
// import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
// import { Link } from 'react-router-dom';
import FormCreateRoom from 'components/forms/FormCreateRoom'


const CreateRoomPage = () => {
  return (
    <div>
      <Container fixed>
        <FormCreateRoom />
      </Container>
    </div>
  )
}

export default CreateRoomPage
