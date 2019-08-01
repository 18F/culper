import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Router, Switch, Route } from 'react-router'

import AppWithForm from 'components/Main/AppWithForm'
import {
  Login,
  Loading,
  AccessDenied,
  Locked,
  Error,
  TokenRefresh,
  Help,
} from 'views'
import { env } from 'config'
import { initApp } from 'actions/AuthActions'

class Main extends React.Component {
  // // Check if we have a token in our base Route so that it gets called once when a page renders.
  // onEnter() {
  //   console.log("ENTRING MAIN")
  //   const token = api.getToken()
  //   if (token && token.length) {
  //     this.props.dispatch(handleLoginSuccess())
  //   }
  // }

  componentDidMount() {
    const { dispatch } = this.props
    let path = window.location.pathname
    if (path.indexOf('/form') < 0) path = undefined
    dispatch(initApp(path))
  }

  render() {
    return (
      <Router history={env.History()}>
        <Switch>

          {/* <Route exact path="/" component={Login} onEnter={this.onEnter} /> */}

          <Route exact={true} path="/loading" component={Loading} />
          <Route
            exact={true}
            path="/form/:section/:subsection*"
            component={AppWithForm}
            onEnter={this.onEnter}
          />
          <Route exact={true} path="/help" component={Help} />
          <Route exact={true} path="/login" component={Login} />
          <Route exact={true} path="/accessdenied" component={AccessDenied} />
          <Route exact={true} path="/locked" component={Locked} />
          <Route exact={true} path="/error" component={Error} />
          <Route exact={true} path="/token" component={TokenRefresh} />
        </Switch>
      </Router>
    )
  }
}

Main.propTypes = {
  dispatch: PropTypes.func,
}

Main.defaultProps = {
  dispatch: () => {},
}

export default connect()(Main)
