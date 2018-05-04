import AuthConstants from '../actions/AuthConstants'

const defaultState = {
  authenticated: false,
  token: null
}

// Defines the authentication sub-state for the application.
const authentication = function (state = defaultState, action) {
  switch (action.type) {
  case AuthConstants.LOGIN_SUCCESS:
    // Logs the user in
    return {
      ...state,
      authenticated: true,
      twofactor: false,
      token: action.token,
      qrcode: action.qrcode,
      error: ''
    }

  case AuthConstants.LOGIN_ERROR:
    return {
      ...state,
      authenticated: false,
      twofactor: false,
      token: null,
      error: action.error
    }

  case AuthConstants.TWOFACTOR_QRCODE:
    return {
      ...state,
      qrcode: action.qrcode
    }

  case AuthConstants.TWOFACTOR_SUCCESS:
    return {
      ...state,
      authenticated: true,
      twofactor: true
    }

  case AuthConstants.TWOFACTOR_ERROR:
    return {
      ...state,
      twofactor: false,
      token: null,
      error: action.error
    }

  case AuthConstants.LOGOUT:
    return {
      ...state,
      authenticated: false,
      twofactor: false,
      token: null,
      qrcode: null
    }

  default:
    return state
  }
}

export default authentication
