import React from 'react'
import AuthenticatedView from '@views/AuthenticatedView'
import { Link } from 'react-router-dom'

class Help extends React.Component {
  render() {
    return (
      <div>
        <h2>Help</h2>
        <div>
          <Link to="/">Home</Link>
        </div>
        <p>Help page stuffs go here</p>
      </div>
    )
  }
}

export default AuthenticatedView(Help)
