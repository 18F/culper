import React from 'react'
import { connect } from 'react-redux'
import { Router, Switch, Route } from 'react-router'
import AppWithForm from './AppWithForm'
import {
  Login,
  Loading,
  AccessDenied,
  Locked,
  Error,
  TokenRefresh,
  Help
} from '../../views'
import { env } from '../../config'
import { api } from '../../services/api'
import { handleLoginSuccess } from '../../actions/AuthActions'

class Main extends React.Component {
  constructor(props) {
    super(props)
    this.onEnter = this.onEnter.bind(this)
  }

  // Check if we have a token in our base Route so that it gets called once when a page renders.
  onEnter() {
    const token = api.getToken()
    // TODO: Need to check for formType to ensure we set that in Redux
    if (token && token.length) {
      this.props.dispatch(handleLoginSuccess())
    }
  }

  render() {
    return (
      <Router history={env.History()}>
        <Switch>
          <Route exact path="/" component={Login} onEnter={this.onEnter} />
          <Route exact path="/loading" component={Loading} />
          <Route
            exact
            path="/form/:section/:subsection*"
            component={AppWithForm}
            onEnter={this.onEnter}
          />
          <Route exact path="/help" component={Help} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/accessdenied" component={AccessDenied} />
          <Route exact path="/locked" component={Locked} />
          <Route exact path="/error" component={Error} />
          <Route exact path="/token" component={TokenRefresh} />
        </Switch>
      </Router>
    )
  }
}

export default connect()(Main)
