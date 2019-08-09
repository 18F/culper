import {
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  SHOW_SESSION_WARNING,
  HIDE_SESSION_WARNING,
} from 'constants/actionTypes'

const defaultState = {
  authenticated: false,
  token: null,
  error: null,
  showSessionWarning: false,
}

// Defines the authentication sub-state for the application.
const authentication = (state = defaultState, action) => {
  switch (action.type) {
    case SHOW_SESSION_WARNING:
      return {
        ...state,
        showSessionWarning: true,
      }

    case HIDE_SESSION_WARNING:
      return {
        ...state,
        showSessionWarning: false,
      }

    case LOGIN_SUCCESS:
      return {
        ...state,
        authenticated: true,
        error: null,
      }

    case LOGIN_ERROR:
      return {
        ...state,
        authenticated: false,
        error: action.error,
      }
    default:
      return state
  }
}

export default authentication
