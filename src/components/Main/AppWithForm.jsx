import React from 'react'
import App from 'components/Main/App'
import AuthenticatedView from 'views/AuthenticatedView'
import { Form } from 'views'

class AppWithForm extends React.Component {
  render() {
    return (
      <App {...this.props}>
        <Form {...this.props} />
      </App>
    )
  }
}

export default AuthenticatedView(AppWithForm)
