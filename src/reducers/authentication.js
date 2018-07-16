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
      token: action.token,
      error: ''
    }

  case AuthConstants.LOGIN_ERROR:
    return {
      ...state,
      authenticated: false,
      token: null,
      error: action.error
    }

  default:
    return state
  }
}

export default authentication
