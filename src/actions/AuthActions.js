import queryString from 'query-string'
import { env } from 'config'

import * as actionTypes from 'constants/actionTypes'
import { api } from 'services/api'

import { NETWORK_ERROR, UNKNOWN_ERROR } from 'constants/errorCodes'

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

// TODO - finish migrating legacy login fn below
/**
 * Executes a request to log in the user and then
 * dispatches a login success handler and redirects to
 * home page.
 */
/*
export function login(username, password) {
  return (dispatch) => {
    return api
      .login(username, password)
      .then((response) => {
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

        if (query.status) {
          window.status = query.status.toUpperCase()
        }
      }
      api.setToken(response.data)
      dispatch(handleLoginSuccess(response.data))
      env.History().push('/loading')
    })
    .catch((error) => {
      // Expected error format:
      // { errors: [{ message: "", code: "" }, { message: "", code: "" }] }
      if (error.response) {
        const { data, status } = error.response
        if (data && data.errors) {
          dispatch(handleLoginError(data.errors))
        } else {
          dispatch(handleLoginError([{
            message: UNKNOWN_ERROR,
            code: UNKNOWN_ERROR,
            status,
          }]))
        }
      } else {
        // No response - API unreachable
        dispatch(handleLoginError([{ message: NETWORK_ERROR, code: NETWORK_ERROR }]))
      }
    })
}
*/
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
