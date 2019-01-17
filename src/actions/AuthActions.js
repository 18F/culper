import queryString from 'query-string'
import { env } from '../config'
import { api } from '../services/api'
import AuthConstants from './AuthConstants'

/**
 * Executes a request to log in the user and then
 * dispatches a login success handler and redirects to
 * home page.
 */
export function login(username, password) {
  // TEMP SOUTION FOR DEVELOPMENT
  let formType
  if (env.IsDevelopment()) {
    const params = location.search
    const query = queryString.parse(params)
    formType = query.formType ? query.formType : '86'
  }
  return function(dispatch, getState) {
    return api
      .login(username, password)
      .then(response => {
        api.setToken(response.data)
        dispatch(handleLoginSuccess(response.data, formType))
        env.History().push('/loading')
      })
      .catch(error => {
        switch (error.response.status) {
          case 500:
            dispatch(handleLoginError(error.response.data))
        }
      })
  }
}

/**
 * Logs out a user
 */
export function logout() {
  return function(dispatch, getState) {
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
  return function(dispatch, getState) {
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

export function handleLoginSuccess(token, formType = '86') {
  return {
    type: AuthConstants.LOGIN_SUCCESS,
    token,
    formType
  }
}

export function handleLoginError(error) {
  return {
    type: AuthConstants.LOGIN_ERROR,
    error
  }
}
