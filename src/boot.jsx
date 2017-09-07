import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Login, Help, Form } from './views'
import { Router, Route, IndexRedirect } from 'react-router'
import { Provider } from 'react-redux'
import { env } from './config'
import store from './store'
import { api } from './services/api'
import { handleLoginSuccess, handleTwoFactorSuccess } from './actions/AuthActions'

// This polyfill gives us more control over smooth scrolling throughout the application
import smoothscroll from 'smoothscroll-polyfill'
smoothscroll.polyfill()

const app = document.getElementById('app')

ReactDOM.render(
  <Provider store={store}>
    <Router history={env.History()}>
      <Route path="/" component={App} onEnter={onEnter}>
        <Route path="/help" component={Help} />
        <Route path="/form(/:section(/:subsection(/**)))" component={Form} />
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
  if (token && token.length) {
    store.dispatch(handleLoginSuccess())
    store.dispatch(handleTwoFactorSuccess())
  }
}
