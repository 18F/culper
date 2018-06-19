import React from 'react'
import ReactDOM from 'react-dom'
import { Loading, TokenRefresh, Form } from './views'
import { Router, Switch, Route } from 'react-router'
import { Provider } from 'react-redux'
import { env } from './config'
import store from './store'
import { app, Main, onEnter, tabology } from './boot'

class AppWithForm extends React.Component {
  render() {
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
          <Route exact path="/loading" component={Loading} />
          <Route exact path="/form/:section/:subsection*" component={AppWithForm} onEnter={onEnter} />
          <Route exact path="/token" component={TokenRefresh} />
        </Switch>
      </Main>
    </Router>
  </Provider>, app, tabology)
