import React from 'react'
import Alert from '@material-ui/lab/Alert';
import { Context as AlertContext } from "../context/AlertContext";
import { useContext } from 'react';

const Alerts = () => {
  const { state: { message, type } } = useContext(AlertContext);
  
  return (
    (message && type) ?
      <Alert severity={type}>{message}</Alert>
      : null
  )
}

export default Alerts

// use memo
