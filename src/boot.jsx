import React from 'react'
import ReactDOM from 'react-dom'
import Main from './components/Main/Main'
import AppWithForm from './components/Main/AppWithForm'
import { Login, Loading, AccessDenied, Locked, TokenRefresh, Help } from './views'
import { Router, Switch, Redirect, Route } from 'react-router'
import { Provider } from 'react-redux'
import { env } from './config'
import store from './services/store'
import { api } from './services/api'
import { handleLoginSuccess, handleTwoFactorSuccess } from './actions/AuthActions'
import tabology from './plugins/tabology'

// This polyfill gives us more control over smooth scrolling throughout the application
import smoothscroll from 'smoothscroll-polyfill'
smoothscroll.polyfill()

var targetNode = document.getElementsByTagName('body')[0]
var config = { attributes: true }
var callback = function (mutationList) {
  tabology()
}
var observer = new MutationObserver(callback)
observer.observe(targetNode, config)

const app = document.getElementById('app')

ReactDOM.render(
  <Provider store={store}>
    <Router history={env.History()}>
      <Main>
        <Switch>
          <Route exact path="/" component={Login} onEnter={onEnter} />
          <Route exact path="/loading" component={Loading} />
          <Route exact path="/form/:section/:subsection+" component={AppWithForm} onEnter={onEnter} />
          <Redirect from="/form/:section" to="/form/:section/intro"/>
          <Route exact path="/help" component={Help} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/accessdenied" component={AccessDenied} />
          <Route exact path="/locked" component={Locked} />
          <Route exact path="/token" component={TokenRefresh} />
        </Switch>
      </Main>
    </Router>
  </Provider>, app, tabology)

/**
 * Check if we have a token in our base Route so that it gets called once
 * when a page renders.
 */
function onEnter () {
  const token = api.getToken()
  if (token && token.length) {
    store.dispatch(handleLoginSuccess())

    const mfa = env.MultipleFactorAuthentication()
    if (mfa.enabled) {
      store.dispatch(handleTwoFactorSuccess())
    }
  }
}
