import React from 'react'
import AuthenticatedView from '../AuthenticatedView'

class Form extends React.Component {
  render () {
    return (
      <div id="eapp-form" className="usa-grid">
        <div id="info" className="usa-width-one-whole">
          <h2>This is the form yo</h2>
        </div>
      </div>
    )
  }
}

export default AuthenticatedView(Form)
