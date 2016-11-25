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
        token: action.token
      }

    case AuthConstants.TWOFACTOR_SUCCESS:
      // Logs the user in
      return {
        ...state,
        authenticated: true,
        twofactor: true,
        token: action.token
      }

    case AuthConstants.LOGOUT:
      return {
        ...state,
        authenticated: false,
        twofactor: false,
        token: null
      }
    default:
      return state
  }
}

export default authentication
