import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Login, Help, Form } from './views'
import { Router, Route, IndexRedirect, hashHistory } from 'react-router'
import { Provider } from 'react-redux'
import store from './store'
import { api } from './services/api'
import { handleLoginSuccess, handleTwoFactorSuccess } from './actions/AuthActions'
// Included so that when webpack processes this, it automatically loads necessary polyfills
import 'babel-polyfill'

const app = document.getElementById('app')

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={App} onEnter={onEnter}>
        <IndexRedirect to="/form/identification/name" />
        <Route path="/help" component={Help} />
        <Route path="/form(/:section(/:subsection))" component={Form} />
      </Route>
      <Route path="/login" component={Login} />
    </Router>
  </Provider>
    , app)

/**
 * Check if we have a token in our base Route so that it gets called once
 * when a page renders.
 */
function onEnter () {
  const token = api.getToken()
  if (token) {
    store.dispatch(handleLoginSuccess(token))
    store.dispatch(handleTwoFactorSuccess())
  }
}
