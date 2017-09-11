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
    componentWillReceiveProps (nextProps) {
      this.checkAuthentication()
    }

    componentWillMount () {
      this.checkAuthentication()
    }

    checkAuthentication () {
      if (!api.getToken() || !this.props.authenticated || !this.props.twofactor) {
        this.props.dispatch(push('/login'))
      }
    }

    render () {
      if (api.getToken() && this.props.authenticated && this.props.twofactor) {
        return (<WrappedComponent {...this.props} />)
      }
      return null
    }
  })
}

function mapStateToProps (state) {
  const auth = state.authentication
  return {
    authenticated: auth.authenticated,
    twofactor: auth.twofactor
  }
}

export default AuthenticatedView
