import React from 'react'
import AuthenticatedView from '../AuthenticatedView'
import { Link } from 'react-router'

class Help extends React.Component {

  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div>
        <h2>Help</h2>
        <div><Link to="/">Home</Link></div>
        <p>Help page stuffs go here</p>
      </div>
    )
  }
}

export default AuthenticatedView(Help)
