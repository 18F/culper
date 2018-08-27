import React from 'react'
import App from './App'
import { Form } from '../../views'

class AppWithForm extends React.Component {
  render() {
    return (
      <App {...this.props}>
        <Form {...this.props} />
      </App>
    )
  }
}

export default AppWithForm
