import thunk from 'redux-thunk'
import rootReducer from './reducers'
import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import { historyMiddleware, sectionMiddleware, saveMiddleware, settingsMiddleware, clearErrorsMiddleware } from './middleware/history'
import { env } from './config'

let middleware = []
if (!env.IsProduction()) {
  middleware.push(logger)
}
middleware = [thunk, ...middleware, historyMiddleware, sectionMiddleware, saveMiddleware, settingsMiddleware, clearErrorsMiddleware]

// Creates a redux store that defines the state tree for the application.
// See rootReducer for all sub-states.
const store = createStore(
  rootReducer,
  applyMiddleware(...middleware)
)

export default store
