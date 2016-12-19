import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Home, Login, Help, Demo, Form } from './views'
import { Router, Route, IndexRoute, hashHistory } from 'react-router'
import { Provider } from 'react-redux'
import store from './store'
import { api } from './services/api'
import { handleLoginSuccess, handleTwoFactorSuccess } from './actions/AuthActions'

const app = document.getElementById('app')

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={App} onEnter={onEnter}>
        <IndexRoute component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/help" component={Help} />
        <Route path="/demo" component={Demo} />
        <Route path="/form(/:section(/:subsection))" component={Form} />
      </Route>
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
