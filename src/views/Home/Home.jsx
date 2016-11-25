import React from 'react'
import { Link } from 'react-router'
import AuthenticatedView from '../AuthenticatedView'

class Home extends React.Component {

  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div>
        <h2>Home</h2>
        <div><Link to="/help">Help</Link></div>
      </div>
    )
  }
}

export default AuthenticatedView(Home)
