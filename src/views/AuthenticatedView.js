import React from 'react'
import { connect } from 'react-redux'
import { env } from '@config'
import { api } from '@services/api'

/**
 * AuthenticatedView is a higher-order component that wraps a component
 * and dispatches an action that redirects to the login page when the user
 * is not authenticated.
 *
 * Note that we wrap with connect to include access to dispatcher.
 */
const AuthenticatedView = WrappedComponent => {
  return connect(mapStateToProps)(
    class RequiresAuth extends React.Component {
      componentWillMount() {
        this.checkAuthentication()
      }

      isAuthenticated() {
        const token = api.getToken()
        return token && this.props.authenticated
      }

      checkAuthentication() {
        if (!this.isAuthenticated()) {
          env.History().push('/login')
        }
      }

      render() {
        if (this.isAuthenticated()) {
          return <WrappedComponent {...this.props} />
        }
        return null
      }
    }
  )
}

function mapStateToProps(state) {
  const auth = state.authentication
  return {
    application: state.application,
    authenticated: auth.authenticated
  }
}

export default AuthenticatedView
