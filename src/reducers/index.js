import { combineReducers } from 'redux'

import { LOGOUT } from 'constants/actionTypes'

import authentication from './authentication'
import section from './section'
import application from './application'
import form from './form'

const appReducer = combineReducers({
  application, authentication, section, form,
})

const rootReducer = (state, action) => {
  let newState = state

  if (action.type === LOGOUT) {
    newState = {}
  }

  return appReducer(newState, action)
}

export default rootReducer
