import React from 'react'
import { Login } from './components'
import { GithubOAuth } from './services'
import { connect } from 'react-redux'
import { login, logout } from './actions/AuthActions'

export class App extends React.Component {
  constructor (props) {
    super(props)
    this.logout = this.logout.bind(this)
  }

  logout () {
    window.location = window.location.pathname
  }

  render () {
    let logoutButton = this.props.authenticated ?
        (<button onClick={this.logout}>Logout</button>) : null

    return (
      <div>
        <h1>E-QIP Prototype</h1>
        <div>Basic authenticated: {this.props.authenticated ? 'Yes' : 'No' }</div>
        <div>Two-factor authentication: {this.props.twofactor ? 'Yes' : 'No' }</div>
        {logoutButton}
        {this.props.children}
      </div>
    )
  }
}

/**
 * Maps the relevant subtree state from the applications state tree.
 * In this case, we pull the authentication sub-state. This is mapped
 * to the authentication reducer. When actions are dispatched, this
 * method is executed which causes a re-render.
 *
 */
function mapStateToProps (state) {
  const auth = state.authentication
  return {
    authenticated: auth.authenticated,
    twofactor: auth.twofactor,
    token: auth.token
  }
}

// Wraps the the App component with connect() which adds the dispatch()
// function to the props property for this component
export default connect(mapStateToProps)(App)
