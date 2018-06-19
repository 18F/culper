import React from 'react'
import ReactDOM from 'react-dom'
import { Login, AccessDenied, Locked, Help } from './views'
import { Router, Switch, Route } from 'react-router'
import { Provider } from 'react-redux'
import { env } from './config'
import store from './store'
import { app, Main, onEnter, tabology } from './boot'

ReactDOM.render(
  <Provider store={store}>
    <Router history={env.History()}>
      <Main>
        <Switch>
          <Route exact path="/" component={Login} onEnter={onEnter} />
          <Route exact path="/help" component={Help} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/accessdenied" component={AccessDenied} />
          <Route exact path="/locked" component={Locked} />
        </Switch>
      </Main>
    </Router>
  </Provider>, app, tabology)
