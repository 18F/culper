import * as actionTypes from 'constants/actionTypes'

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

export const logout = (timedOut = false) => ({
  type: actionTypes.LOGOUT,
  timedOut,
})
