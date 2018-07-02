import { env } from '../config'
import { api } from '../services/api'
import AuthConstants from './AuthConstants'

/**
 * Executes a request to log in the user and then
 * dispatches a login success handler and redirects to
 * home page.
 */
export function login (username, password) {
  return function (dispatch, getState) {
    return api
      .login(username, password)
      .then(response => {
        const mfa = env.MultipleFactorAuthentication()
        api.setToken(response.data)
        dispatch(handleLoginSuccess(response.data))

        if (!mfa.enabled) {
          env.History().push('/loading')
        }
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
    const clear = () => {
      api.setToken('')
      dispatch({ type: AuthConstants.LOGOUT })
      env.History().push('/login')
    }
    return api.logout().then(clear).catch(clear)
  }
}

export function tokenError () {
  return function (dispatch, getState) {
    const clear = () => {
      api.setToken('')
      dispatch({ type: AuthConstants.LOGOUT })
      env.History().push('/token')
    }
    return api.logout().then(clear).catch(clear)
  }
}

export function qrcode () {
  return function (dispatch) {
    return api
      .twoFactor()
      .then(response => {
        dispatch(handleTwoFactorQrCode(response.data))
      })
  }
}

export function twofactor (token) {
  return function (dispatch, getState) {
    return api
      .twoFactor(token)
      .then(response => {
        api.setToken(response.data)
        dispatch(handleTwoFactorSuccess())
        env.History().push('/loading')
      })
      .catch(error => {
        api.setToken('')
        dispatch(handleTwoFactorError(error.response.data))
      })
  }
}

export function twofactorreset () {
  return function (dispatch, getState) {
    return api
      .twoFactorReset()
      .then(response => {
        api.setToken(response.data)
        dispatch(handleTwoFactorError('Two factor authentication reset'))
        dispatch(qrcode())
      })
      .catch(error => {
        api.setToken('')
        dispatch(handleTwoFactorError(error.response.data))
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

export function handleTwoFactorError (error) {
  return {
    type: AuthConstants.TWOFACTOR_ERROR,
    error: error
  }
}
