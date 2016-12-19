import { api } from '../services/api'
import AuthConstants from './AuthConstants'
import { hashHistory } from 'react-router'
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
  }
}

/**
 * Logs out a user
 */
export function logout () {
  return function (dispatch, getState) {
        // TODO server side call to invalidate token
    dispatch({
      type: AuthConstants.LOGOUT
    })
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
              dispatch(handleTwoFactorSuccess())
              dispatch(push('/form'))
            })
            .catch(function (error) {
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
