import thunk from 'redux-thunk'
import rootReducer from '../reducers'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createLogger } from 'redux-logger'

const middleware = [thunk]
const urlParams = new URLSearchParams(window.location.search)

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
    if (urlParams.has('logger')) {
      middleware.push(createLogger())
    }
    store = createStore(
      rootReducer,
      composeWithDevTools(applyMiddleware(...middleware))
    )
}

export default store
