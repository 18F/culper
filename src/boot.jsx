import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Home, Login, Help } from './views'
import { Router, Route, IndexRoute, hashHistory } from 'react-router'
import { Provider } from 'react-redux'
import store from './store'
import { api } from './services/api'
import { handleLoginSuccess } from './actions/AuthActions'
import { push } from './middleware/history'

const app = document.getElementById('app')

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={App} onEnter={onEnter}>
        <IndexRoute component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/help" component={Help} />
      </Route>
    </Router>
  </Provider>
    , app)

/**
 * Check if we have a token in our base Route so that it gets called once
 * when a page renders.
 */
function onEnter () {
  const token = api.getQueryValue('token')
  if (token) {
    store.dispatch(handleLoginSuccess(token))
  }
}
