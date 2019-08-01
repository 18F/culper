import { combineReducers } from 'redux'
import authentication from './authentication'
import section from './section'
import application from './application'
import form from './form'
import AuthConstants from '../actions/AuthConstants'

const appReducer = combineReducers({
  application, authentication, section, form,
})

const rootReducer = (state, action) => {
  let newState = state

  // clear data on logout
  // https://netbasal.com/how-to-secure-your-users-data-after-logout-in-redux-30468c6848e8
  if (action.type === AuthConstants.LOGOUT) {
    newState = undefined
  }

  return appReducer(newState, action)
}

export default rootReducer
