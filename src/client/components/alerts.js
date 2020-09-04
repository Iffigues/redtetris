import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Alert from '@material-ui/lab/Alert';

const Alerts = ({message, type}) => {
  console.log(message, type)
  if (message && type) {
  return (
      <Alert severity={type}>{message}</Alert>
      )
  }
  return null;
}

const mapStateToProps = (state) => {
  return {
    message: state.alert.message,
    type: state.alert.type
  }
}

Alerts.propTypes = {
  message: PropTypes.string,
  type: PropTypes.string
}

export default connect(mapStateToProps, null)(Alerts)
