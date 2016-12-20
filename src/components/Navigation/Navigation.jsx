import React from 'react'
import { connect } from 'react-redux'
import AuthenticatedView from '../../views/AuthenticatedView'

class Navigation extends React.Component {
  render () {
    return (
      <div className="form-navigation"></div>
    )
  }
}

export default AuthenticatedView(Navigation)
