import React from 'react'
import { Provider } from 'react-redux'
import { Router, Switch, Route } from 'react-router'
import AppWithForm from './AppWithForm'
import { Login, Loading, AccessDenied, Locked, TokenRefresh, Help } from '../../views'
import { env } from '../../config'
import store from '../../services/store'
import { api } from '../../services/api'
import { handleLoginSuccess, handleTwoFactorSuccess } from '../../actions/AuthActions'

class Main extends React.Component {
  constructor (props) {
    super(props)
    this.onEnter = this.onEnter.bind(this)
  }

  // Check if we have a token in our base Route so that it gets called once when a page renders.
  onEnter () {
    const token = api.getToken()
    if (token && token.length) {
      store.dispatch(handleLoginSuccess())

      const mfa = env.MultipleFactorAuthentication()
      if (mfa.enabled) {
        store.dispatch(handleTwoFactorSuccess())
      }
    }
  }

  render () {
    return (
      <Provider store={store}>
        <Router history={env.History()}>
          <Switch>
            <Route exact path="/" component={Login} onEnter={this.onEnter} />
            <Route exact path="/loading" component={Loading} />
            <Route exact path="/form/:section/:subsection*" component={AppWithForm} onEnter={this.onEnter} />
            <Route exact path="/help" component={Help} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/accessdenied" component={AccessDenied} />
            <Route exact path="/locked" component={Locked} />
            <Route exact path="/token" component={TokenRefresh} />
          </Switch>
        </Router>
      </Provider>
    )
  }
}

export default Main
