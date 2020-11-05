import React from 'react'
import Alert from '@material-ui/lab/Alert';
import { Context as AlertContext } from "../context/AlertContext";


const Alerts = () => {
  const {
    state: { message, type }
  } = useContext(AlertContext);
  console.log("Alerts components", message, type)
  if (message && type) {
  return (
      <Alert severity={type}>{message}</Alert>
      )
  }
  return null;
}

export default Alerts

// use memo
