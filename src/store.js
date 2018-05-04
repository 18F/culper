import thunk from 'redux-thunk'
import rootReducer from './reducers'
import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import { historyMiddleware, sectionMiddleware, saveMiddleware, settingsMiddleware, clearErrorsMiddleware } from './middleware/history'

let middleware = []
if (process.env.NODE_ENV !== 'production') {
  middleware.push(logger)
}
middleware = [thunk, ...middleware, historyMiddleware, sectionMiddleware, saveMiddleware, settingsMiddleware, clearErrorsMiddleware]

// Creates a redux store that defines the state tree for the application.
// See rootReducer for all sub-states.
const store = process.env.NODE_ENV === 'test' ? createStore(rootReducer) : createStore(rootReducer, applyMiddleware(...middleware))

export default store
