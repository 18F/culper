import React from 'react'
import AuthenticatedView from '../AuthenticatedView'

class Home extends React.Component {
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
