import { combineReducers } from 'redux'
import authentication from './authentication'
import section from './section'
import { applicationReducers } from './application'

const rootReducer = combineReducers({
  authentication: authentication,
  section: section,
  application: applicationReducers
})

export default rootReducer
