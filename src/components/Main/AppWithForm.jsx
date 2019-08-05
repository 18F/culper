import React from 'react'
import { connect } from 'react-redux'
import App from 'components/Main/App'
import { Form } from 'views'

const AppWithForm = props => (
  <App {...props}>
    <Form {...props} />
  </App>
)

function mapStateToProps(state) {
  const auth = state.authentication
  return {
    application: state.application,
    authenticated: auth.authenticated,
  }
}

export default connect(mapStateToProps)(AppWithForm)
