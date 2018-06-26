import React from 'react'
import { connect } from 'react-redux'
import { env } from '../config'
import { api } from '../services/api'
import { push } from '../actions/NavActions'

/**
 * AuthenticatedView is a higher-order component that wraps a component
 * and dispatches an action that redirects to the login page when the user
 * is not authenticated.
 *
 * Note that we wrap with connect to include access to dispatcher.
 */
const AuthenticatedView = (WrappedComponent) => {
  return connect(mapStateToProps)(class RequiresAuth extends React.Component {
    componentWillReceiveProps (nextProps) {
      this.checkAuthentication()
    }

    componentWillMount () {
      this.checkAuthentication()
    }

    checkAuthentication () {
      const token = api.getToken()
      const mfa = this.props.mfa || env.MultipleFactorAuthentication()
      if (!token || !this.props.authenticated || !(mfa.enabled ? this.props.twofactor : true)) {
        this.props.dispatch(push('/login'))
      }
    }

    render () {
      const token = api.getToken()
      const mfa = this.props.mfa || env.MultipleFactorAuthentication()
      if (token && this.props.authenticated && (mfa.enabled ? this.props.twofactor : true)) {
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
