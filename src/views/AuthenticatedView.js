import React from 'react'
import { connect } from 'react-redux'
import { api } from '../services/api'
import { push } from '../middleware/history'

/**
 * AuthenticatedView is a higher-order component that wraps a component
 * and dispatches an action that redirects to the login page when the user
 * is not authenticated.
 *
 * Note that we wrap with connect to include access to dispatcher.
 */
function AuthenticatedView (WrappedComponent) {
  return connect(mapStateToProps)(class RequiresAuth extends React.Component {

    constructor (props) {
      super(props)
    }

    componentWillReceiveProps (nextProps) {
      this.checkAuthentication()
    }

    componentWillMount () {
      this.checkAuthentication()
    }

    checkAuthentication () {
      if (!this.props.authenticated || !this.props.twofactor) {
        this.props.dispatch(push('/login'))
      }
    }

    render () {
      if (this.props.authenticated && this.props.twofactor) {
        return (
          <WrappedComponent />
        )
      }
      return null
    }
  })
}

function mapStateToProps (state) {
  const auth = state.authentication
  return {
    authenticated: auth.authenticated,
    twofactor: auth.twofactor,
    token: auth.token
  }
}

export default AuthenticatedView
