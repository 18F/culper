import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import createSagaMiddleware from 'redux-saga'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createLogger } from 'redux-logger'
import queryString from 'query-string'

import rootReducer from 'reducers'
import rootSaga from 'sagas'

const sagaMiddleware = createSagaMiddleware()

const configureStore = (params) => {
  const middleware = [
    sagaMiddleware,
    thunk,
  ]

  switch (process.env.NODE_ENV) {
    case 'test':
      return createStore(rootReducer)

    case 'production':
      return createStore(
        rootReducer,
        applyMiddleware(...middleware)
      )

    default:
      if (params) {
        const query = queryString.parse(params)

        if (query.reduxLogger === 'true') {
          middleware.push(createLogger())
        }
      }

      return createStore(
        rootReducer,
        composeWithDevTools(applyMiddleware(...middleware))
      )
  }
}

const store = configureStore(window.location.search)

sagaMiddleware.run(rootSaga)

export default store
