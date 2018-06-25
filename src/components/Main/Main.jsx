import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { push } from '../../actions/NavActions'

class Main extends React.Component {
  onRouteChanged() {
    this.props.dispatch(push(this.props.location.pathname))
  }

  // https://stackoverflow.com/a/44410281/358804
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.onRouteChanged();
    }
  }

  render () {
    return this.props.children
  }
}

// https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/guides/blocked-updates.md#quick-solution
export default withRouter(connect()(Main))
