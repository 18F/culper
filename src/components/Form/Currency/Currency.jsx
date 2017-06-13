import React from 'react'
import Number from '../Number'

/**
 * Wraps a Number component and adds the dollar icon. This is meant mostly for UI purposes. This can be a drop-in
 * replacement for any current field being used for currency purposes. This simply just passes down the props.
 */
export default class Currency extends React.Component {
  constructor (props) {
    super(props)
    this.handleError = this.handleError.bind(this)
  }

  handleError (value, arr) {
    arr = arr.map(err => {
      return {
        code: `currency.${err.code}`,
        valid: err.valid,
        uid: err.uid
      }
    })

    return this.props.onError(value, arr.concat(this.constructor.errors.map(err => {
      return {
        code: err.code,
        valid: err.func(value, this.props),
        uid: err.uid
      }
    })))
  }

  render () {
    return (
        <div className="currency">
          <i className="fa fa-dollar"></i>
          <div className="number">
            <Number {...this.props} onError={this.handleError} />
          </div>
        </div>
    )
  }
}

Currency.defaultProps = {
  name: 'currency',
  disabled: false,
  value: '',
  min: '1',
  max: '',
  onError: (value, arr) => { return arr }
}

Currency.errors = []
