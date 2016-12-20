import { api } from '../services/api'
import AuthConstants from './AuthConstants'
import { push } from '../middleware/history'

/**
 * Executes a request to log in the user and then
 * dispatches a login success handler and redirects to
 * home page.
 */
export function login (username, password) {
  return function (dispatch, getState) {
    return api
      .login(username, password)
      .then(r => {
        dispatch(handleLoginSuccess(r.data))
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
export function logout () {
  return function (dispatch, getState) {
    api.setToken('')
    // TODO server side call to invalidate token
    dispatch({
      type: AuthConstants.LOGOUT
    })
    api.setToken('')
    dispatch(push('/login'))
  }
}

export function qrcode (account) {
  return function (dispatch) {
    return api
      .twoFactor(account)
      .then(response => {
        dispatch(handleTwoFactorQrCode(response.data))
      })
  }
}

export function twofactor (account, token) {
  return function (dispatch, getState) {
    return api
      .twoFactor(account, token)
      .then(response => {
        api.setToken(getState().authentication.token)
        dispatch(handleTwoFactorSuccess())
        dispatch(push('/form'))
      })
      .catch(function (error) {
        // Invalidate any previously acquired token
        api.setToken('')

        if (error.response) {
          switch (error.response.status) {
            case 500:
              // Internal Server Error
              break

            case 401:
              // Unauthorized
              break
          }
        }
      })
  }
}

export function handleLoginSuccess (token) {
  return {
    type: AuthConstants.LOGIN_SUCCESS,
    token: token
  }
}

export function handleLoginError (error) {
  return {
    type: AuthConstants.LOGIN_ERROR,
    error: error
  }
}

export function handleTwoFactorQrCode (png) {
  return {
    type: AuthConstants.TWOFACTOR_QRCODE,
    qrcode: png
  }
}

export function handleTwoFactorSuccess () {
  return {
    type: AuthConstants.TWOFACTOR_SUCCESS
  }
}
