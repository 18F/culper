import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Login, AccessDenied, Locked, Help, Form } from './views'
import { Router, Switch, Route } from 'react-router'
import { Provider } from 'react-redux'
import { env } from './config'
import store from './store'
import { api } from './services/api'
import { handleLoginSuccess, handleTwoFactorSuccess } from './actions/AuthActions'

// This polyfill gives us more control over smooth scrolling throughout the application
import smoothscroll from 'smoothscroll-polyfill'
smoothscroll.polyfill()

const app = document.getElementById('app')

class Main extends React.Component {
  render () {
    return this.props.children
  }
}

class AppWithForm extends React.Component {
  render () {
    return (
      <App {...this.props}>
        <Form {...this.props} />
      </App>
    )
  }
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={env.History()}>
      <Main>
        <Switch>
          <Route exact path="/" component={Login} onEnter={onEnter} />
          <Route exact path="/form/:section/:subsection*" component={AppWithForm} onEnter={onEnter} />
          <Route exact path="/help" component={Help} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/accessdenied" component={AccessDenied} />
          <Route exact path="/locked" component={Locked} />
        </Switch>
      </Main>
    </Router>
  </Provider>, app)

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
