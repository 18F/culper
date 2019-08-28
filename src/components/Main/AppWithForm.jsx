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
  const { application, authentication } = state
  const { authenticated, showSessionWarning } = authentication

  return {
    application,
    authenticated,
    showSessionWarning,
  }
}

export default connect(mapStateToProps)(AppWithForm)
