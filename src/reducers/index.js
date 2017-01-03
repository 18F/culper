import { combineReducers } from 'redux'
import authentication from './authentication'
import section from './section'
import application from './application'

const rootReducer = combineReducers({
  authentication: authentication,
  section: section,
  application: application
})

export default rootReducer
