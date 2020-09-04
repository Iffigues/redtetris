import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const App = ({message}) => {
  return (
    <span>{message}</span>
  )
}

const mapStateToProps = (state) => {
  return {
    message: state.message
  }
}

App.propTypes = {
  message: PropTypes.string
}

export default connect(mapStateToProps, null)(App)


