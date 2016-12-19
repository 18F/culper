import React from 'react'
import { connect } from 'react-redux'
import AuthenticatedView from '../../../views/AuthenticatedView'

class Identification extends React.Component {
  render () {
    return (
      <div className="identification"></div>
    )
  }
}

export default AuthenticatedView(Identification)
