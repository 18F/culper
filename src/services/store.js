import thunk from 'redux-thunk'
import rootReducer from '../reducers'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createLogger } from 'redux-logger'
import queryString from 'query-string'

const middleware = [thunk]
const params = location.search

// Creates a redux store that defines the state tree for the application.
// See rootReducer for all sub-states.
let store
switch (process.env.NODE_ENV) {
  case 'test':
    store = createStore(rootReducer)
    break
  case 'production':
    store = createStore(rootReducer, applyMiddleware(...middleware))
    break
  default:
    if (params) {
      const query = queryString.parse(params)

      if (query.reduxLogger === 'true') {
        middleware.push(createLogger())
      }
    }
    store = createStore(
      rootReducer,
      composeWithDevTools(applyMiddleware(...middleware))
    )
}

export default store
