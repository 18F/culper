import thunk from 'redux-thunk'
import rootReducer from './reducers'
import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import { historyMiddleware, settingsMiddleware, clearErrorsMiddleware } from './middleware/history'

// Creates a redux store that defines the state tree for the application.
// See rootReducer for all sub-states.
const store = createStore(
  rootReducer,
  applyMiddleware(thunk, createLogger(), historyMiddleware, settingsMiddleware, clearErrorsMiddleware)
)

export default store
