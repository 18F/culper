import { env } from 'config'
import * as actionTypes from 'constants/actionTypes'
import { api } from 'services/api'

import AuthConstants from './AuthConstants'

export const initApp = path => ({
  type: actionTypes.INIT_APP,
  path,
})

export const login = (username, password) => ({
  type: actionTypes.LOGIN,
  username,
  password,
})

export const handleLoginSuccess = () => ({
  type: actionTypes.LOGIN_SUCCESS,
})

export const handleLoginError = error => ({
  type: actionTypes.LOGIN_ERROR,
  error,
})

export const showSessionWarning = () => ({
  type: actionTypes.SHOW_SESSION_WARNING,
})

export const hideSessionWarning = () => ({
  type: actionTypes.HIDE_SESSION_WARNING,
})

export const renewSession = () => ({
  type: actionTypes.RENEW_SESSION,
})

/**
 * Logs out a user
 */
export function logout() {
  return (dispatch) => {
    console.log('LOGOUT ACTION')

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
