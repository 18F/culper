import React from 'react'
import App from './App'

class AppWithForm extends React.Component {
  render() {
    return (
      <App {...this.props} />
    )
  }
}

export default AppWithForm
