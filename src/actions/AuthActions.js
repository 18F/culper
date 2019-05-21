import queryString from 'query-string'
import { env } from 'config'
import { api } from 'services/api'
import AuthConstants from './AuthConstants'

export function handleLoginSuccess(token) {
  return {
    type: AuthConstants.LOGIN_SUCCESS,
    token,
  }
}

export function handleLoginError(error) {
  return {
    type: AuthConstants.LOGIN_ERROR,
    error,
  }
}

/**
 * Executes a request to log in the user and then
 * dispatches a login success handler and redirects to
 * home page.
 */
export function login(username, password) {
  return (dispatch) => {
    return api
      .login(username, password)
      .then((response) => {
        /**
         * In local development and staging, we have the ability to manually
         * set the formType by using URL params.
         */
        if (env.IsDevelopment() || env.IsStaging()) {
          const params = location.search
          const query = queryString.parse(params)
          if (query.formType) {
            window.formType = query.formType
          }

          if (query.status) {
            window.status = query.status.toUpperCase()
          }
        }
        api.setToken(response.data)
        dispatch(handleLoginSuccess(response.data))
        env.History().push('/loading')
      })
      .catch((error) => {
        if (error.response.status === 500) {
          dispatch(handleLoginError(error.response.data))
        }
      })
  }
}

/**
 * Logs out a user
 */
export function logout() {
  return (dispatch) => {
    const clear = () => {
      api.setToken('')
      dispatch({ type: AuthConstants.LOGOUT })
      env.History().push('/login')
    }
    return api
      .logout()
      .then(clear)
      .catch(clear)
  }
}

export function tokenError() {
  return (dispatch) => {
    const clear = () => {
      api.setToken('')
      dispatch({ type: AuthConstants.LOGOUT })
      env.History().push('/token')
    }
    return api
      .logout()
      .then(clear)
      .catch(clear)
  }
}
