import { combineReducers } from 'redux'
import authentication from './authentication'
import section from './section'

const rootReducer = combineReducers({
  authentication: authentication,
  section: section
})

export default rootReducer
