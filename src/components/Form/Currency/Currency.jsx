import React from 'react'
import Number from '../Number'

/**
 * Wraps a Number component and adds the dollar icon. This is meant mostly for UI purposes. This can be a drop-in
 * replacement for any current field being used for currency purposes. This simply just passes down the props.
 */
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
