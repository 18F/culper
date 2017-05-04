import React from 'react'
import Number from '../Number'

function CurrencyWrapper (WrappedComponent) {
  return class extends React.Component {
    render () {
      return (
        <div className="currency">
          <i className="fa fa-dollar"></i>
          <div className="number">
            <Number {...this.props} />
          </div>
        </div>
      )
    }
  }
}

export default CurrencyWrapper(Number)
