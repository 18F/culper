import { combineReducers } from 'redux'
import authentication from './authentication'
import section from './section'
import application from './application'
import AuthConstants from '../actions/AuthConstants'

const appReducer = combineReducers({ application, authentication, section })

const rootReducer = (state, action) => {
  // clear data on logout
  // https://netbasal.com/how-to-secure-your-users-data-after-logout-in-redux-30468c6848e8
  if (action.type === AuthConstants.LOGOUT) {
    state = undefined
  }

  return appReducer(state, action)
}

export default rootReducer
