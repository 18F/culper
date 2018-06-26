import thunk from 'redux-thunk'
import rootReducer from '../reducers'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { historyMiddleware } from '../middleware/history'

const middleware = [thunk, historyMiddleware]

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
  store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middleware)))
}

export default store
